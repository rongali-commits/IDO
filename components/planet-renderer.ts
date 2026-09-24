// A small, dependency-free scene. The cloud map turns around a real spherical
// surface; the lighting and ring plane stay fixed, rather than spinning a photo.
const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform sampler2D clouds;
uniform sampler2D lunar;
const float PI=3.14159265359;
vec4 moon(vec2 q,float radius){
 float d=length(q)/radius;if(d>1.01)return vec4(0);
 vec2 xy=q/radius;vec3 n=vec3(xy,sqrt(max(0.,1.-dot(xy,xy))));
 float a=time*(2.*PI/90.);vec3 surface=vec3(n.x*cos(a)+n.z*sin(a),n.y,-n.x*sin(a)+n.z*cos(a));
 vec2 tex=vec2(atan(surface.x,surface.z)/(2.*PI)+.5,.5-asin(surface.y)/PI);
 float light=max(0.,dot(n,normalize(vec3(-.85,.38,.4))));
 vec3 col=texture2D(lunar,tex).rgb*(.025+light*1.15);
 return vec4(col,1.-smoothstep(.994,1.008,d));
}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float aspect=resolution.x/resolution.y;
 // Match the poster's composition on desktop, keep the planets to the right on phones.
 float mobile=1.-smoothstep(.72,1.15,aspect);
 float phone=1.-smoothstep(.55,.65,aspect);
 float radius=mix(.192,.142,mobile);
 vec2 center=mix(vec2(.755,.59),vec2(.88,.70),mobile);
 center.y=mix(center.y,.44,phone);
 center+=vec2(sin(time*.09)*.004,cos(time*.09)*.006);
 vec2 q=(uv-center)*vec2(aspect,1.)/radius;
 float d2=dot(q,q);vec4 result=vec4(0);
 vec3 axis=normalize(vec3(-.27,.91,.32));
 vec3 east=normalize(vec3(axis.y,-axis.x,0.));vec3 front=cross(east,axis);
 vec3 light=normalize(vec3(-.72,.62,.8));
 float sphereZ=sqrt(max(0.,1.-d2));
 if(d2<1.015){
  vec3 n=normalize(vec3(q,sphereZ));
  float latitude=asin(clamp(dot(n,axis),-1.,1.));
  float longitude=atan(dot(n,east),dot(n,front));
  vec2 tex=vec2(fract(longitude/(2.*PI)+.5+time/72.),.5-latitude/PI);
  vec3 albedo=texture2D(clouds,tex).rgb;
  float diffuse=max(0.,dot(n,light));
  vec3 color=albedo*(.022+pow(diffuse,1.08)*.96);
  color+=vec3(.20,.40,.61)*pow(1.-sphereZ,4.)*diffuse*.36;
  result=vec4(color,1.-smoothstep(.996,1.014,d2));
 }
 // Orthographic ray/plane intersection gives rings correct front/back occlusion.
 float ringZ=-(axis.x*q.x+axis.y*q.y)/axis.z;
 vec3 ringPoint=vec3(q,ringZ);float r=length(ringPoint);
 if(r>1.19&&r<2.04&&(d2>1.||ringZ>sphereZ)){
  float bands=.48+.10*sin(r*87.)+.06*sin(r*193.)+.025*sin(r*331.);
  float gap=1.-.90*(smoothstep(1.70,1.72,r)-smoothstep(1.755,1.77,r));
  float edge=smoothstep(1.19,1.24,r)*(1.-smoothstep(1.98,2.04,r));
  float shade=1.;float t=dot(-ringPoint,light);
  if(t>0.)shade=mix(.18,1.,smoothstep(.97,1.04,length(ringPoint+light*t)));
  vec3 ringColor=mix(vec3(.22,.28,.33),vec3(.64,.65,.64),bands)*shade;
  float alpha=clamp((.55+bands*.42)*gap*edge,0.,1.);
  result=vec4(mix(result.rgb,ringColor,alpha),max(result.a,alpha));
 }
 if(result.a<.01){
  vec2 mc=mix(vec2(.867,.20),vec2(.86,.27),mobile)+vec2(sin(time*.065)*.005,cos(time*.065)*.009);
  mc.y=mix(mc.y,.23,phone);
  result=moon((uv-mc)*vec2(aspect,1.),mix(.083,.058,mobile));
  if(result.a<.01){
   vec2 small=mix(vec2(.88,.88),vec2(.80,.94),mobile)+vec2(cos(time*.013)*.006,sin(time*.013)*.006);
   result=moon((uv-small)*vec2(aspect,1.),.016);
   result.rgb*=vec3(.65,.85,1.15);
  }
 }
 gl_FragColor=result;
}`;

export function createPlanetRenderer(canvas: HTMLCanvasElement, onReady: () => void) {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false, powerPreference: "low-power" });
  if (!gl) return null;
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
    return shader;
  };
  const vs = compile(gl.VERTEX_SHADER, vertex), fs = compile(gl.FRAGMENT_SHADER, fragment);
  const program = gl.createProgram();
  if (!vs || !fs || !program) { if(vs)gl.deleteShader(vs);if(fs)gl.deleteShader(fs);if(program)gl.deleteProgram(program);return null; }
  gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
  gl.deleteShader(vs); gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { gl.deleteProgram(program); return null; }
  const buffer = gl.createBuffer(), texture = gl.createTexture(), moonTexture = gl.createTexture();
  if (!buffer || !texture || !moonTexture) { gl.deleteProgram(program);gl.deleteBuffer(buffer);gl.deleteTexture(texture);gl.deleteTexture(moonTexture);return null; }
  gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program,"position");
  gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const size = gl.getUniformLocation(program,"resolution"), clock = gl.getUniformLocation(program,"time");
  gl.uniform1i(gl.getUniformLocation(program,"clouds"),0);
  gl.uniform1i(gl.getUniformLocation(program,"lunar"),1);
  let ready=false, disposed=false;
  let loaded=0;
  const images = ["/saturn-clouds-2026.webp", "/lunar-surface-2026.webp"].map((src,index)=>{
    const image=new Image();
    image.onload=()=>{
      if(disposed)return;
      gl.activeTexture(index===0?gl.TEXTURE0:gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D,index===0?texture:moonTexture);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      // Both textures use power-of-two dimensions so horizontal filtering wraps cleanly.
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
      loaded++;
      if(loaded===2){ready=true;onReady();}
    };
    image.src=src;
    return image;
  });
  return {
    draw(width:number,height:number,time:number){
      if(!ready||gl.isContextLost())return false;
      const scale=Math.min(window.devicePixelRatio||1,1.25,1600/width);
      const w=Math.round(width*scale),h=Math.round(height*scale);
      if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
      gl.viewport(0,0,w,h);gl.uniform2f(size,w,h);gl.uniform1f(clock,time);
      gl.drawArrays(gl.TRIANGLES,0,6);
      return true;
    },
    dispose(){disposed=true;images.forEach(image=>{image.onload=null;});gl.deleteTexture(texture);gl.deleteTexture(moonTexture);gl.deleteBuffer(buffer);gl.deleteProgram(program);}
  };
}

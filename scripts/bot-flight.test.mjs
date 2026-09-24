import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceFlight, flightAtRest } from '../lib/bot-flight.mjs';
import { createStarfield, starCount, starAlpha } from '../lib/starfield.mjs';
const origin = { x: 0, y: 0, bank: 0, yaw: 0, pitch: 0 };

test('flight leans toward horizontal movement and pitches toward vertical movement', () => {
  const right = advanceFlight(origin, {x: 100, y: -100}, 1/60);
  assert.ok(right.x > 0 && right.x < 100 && right.bank > 0 && right.yaw > 0 && right.pitch > 0);
  const left = advanceFlight(origin, {x: -100, y: 100}, 1/60);
  assert.ok(left.bank < 0 && left.yaw < 0 && left.pitch < 0);
});
test('released flight converges without position overshoot and returns upright', () => {
  const target = {x: 1000, y: 400};
  let state = {...origin, bank: 22, yaw: 27, pitch: -18};
  for (let i=0; i<120; i++) {
    state = advanceFlight(state, target, 1/60, false);
    assert.ok(state.x <= target.x && state.y <= target.y);
  }
  assert.ok(flightAtRest(state, target));
});
test('tracking is time based and reduced motion follows immediately without tilt', () => {
  const target = {x: 500, y: 300};
  let sixty = origin, thirty = origin;
  for(let i=0;i<60;i++) sixty=advanceFlight(sixty,target,1/60);
  for(let i=0;i<30;i++) thirty=advanceFlight(thirty,target,1/30);
  assert.ok(Math.abs(sixty.x-thirty.x)<.001);
  assert.deepEqual(advanceFlight(origin,target,1/60,true,true),{...target,bank:0,yaw:0,pitch:0});
});
test('starfield has bounded adaptive density, varied stars, and smooth bounded light', () => {
  const stars = createStarfield();
  assert.deepEqual(stars,createStarfield());
  assert.equal(stars.length,900);
  assert.equal(starCount(390,844),300);
  assert.ok(starCount(1440,900)>800);
  assert.equal(starCount(3840,2160),900);
  assert.ok(stars.filter(s=>s.bright).length>45 && stars.filter(s=>s.bright).length<120);
  for(const star of stars) for(let t=0;t<20;t+=.5) {
    assert.ok(starAlpha(star,t)>.2 && starAlpha(star,t)<1);
    assert.ok(Math.abs(starAlpha(star,t+.016)-starAlpha(star,t))<.005);
  }
});

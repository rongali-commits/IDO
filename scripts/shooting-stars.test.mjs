import test from "node:test";
import assert from "node:assert/strict";
import { shootingStarAt } from "../lib/shooting-stars.mjs";

test("shooting stars have a quiet opening and gaps between passes", () => {
  assert.equal(shootingStarAt(0,1440,900),null);
  assert.equal(shootingStarAt(1.9,1440,900),null);
  assert.equal(shootingStarAt(6,1440,900),null);
  assert.equal(shootingStarAt(9.9,1440,900),null);
  assert.ok(shootingStarAt(11,1440,900));
});

test("every pass travels bottom-left to top-right at a much faster speed than background stars", () => {
  for (const [width,height] of [[390,844],[820,1180],[1440,900]]) {
    for(let cycle=0;cycle<9;cycle++){
      const first=shootingStarAt(2.6+cycle*8,width,height);
      const second=shootingStarAt(3.6+cycle*8,width,height);
      assert.ok(second.x>first.x);
      assert.ok(second.y<first.y);
      assert.ok(Math.hypot(second.x-first.x,second.y-first.y)>200);
      assert.ok(first.trail<=160);
      assert.ok(first.directionX>0&&first.directionY<0);
    }
  }
});

test("passes fade smoothly and never create an unbounded particle collection", () => {
  assert.equal(shootingStarAt(2,1440,900).opacity,0);
  assert.ok(shootingStarAt(5.59,1440,900).opacity<.03);
  assert.equal(shootingStarAt(6,1440,900),null);
  assert.equal(shootingStarAt(3,0,900),null);
  for(let t=0;t<1000;t+=.1){
    const star=shootingStarAt(t,1440,900);
    if(star)assert.ok(star.opacity>=0&&star.opacity<=.92);
  }
});

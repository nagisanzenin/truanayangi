import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildSync} from 'esbuild';
import {createRequire} from 'node:module';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const out=mkdtempSync(join(tmpdir(),'tnag-case-'));
try{
 buildSync({entryPoints:['src/lib/case-mechanics.ts'],outfile:join(out,'case.cjs'),bundle:true,platform:'node',format:'cjs'});
 const {createSpinProfile,createFoodSelector}=createRequire(import.meta.url)(join(out,'case.cjs'));
 test('normal motion keeps the deliberate case-opening pace',()=>{
  const profile=createSpinProfile(()=>.5,false);
  assert.deepEqual(profile,{durationMs:8500,tiles:35,friction:3});
 });
 test('reduced motion remains readable instead of becoming an instant Windows spin',()=>{
  const profile=createSpinProfile(()=>.5,true);
  assert.deepEqual(profile,{durationMs:4500,tiles:12,friction:3});
 });

 const tiers=[
  {price:25,rarity:0},{price:35,rarity:0},{price:40,rarity:0},
  {price:50,rarity:1},{price:60,rarity:1},{price:65,rarity:1},
  {price:85,rarity:2},{price:90,rarity:2},{price:100,rarity:2},
  {price:110,rarity:3},{price:120,rarity:3},{price:130,rarity:3},
  {price:150,rarity:4},{price:180,rarity:4},{price:230,rarity:4},
 ];
 const byRarity=(sel,pop)=>{const out=[0,0,0,0,0];for(const f of pop)out[f.rarity]+=sel.probabilities.get(f);return out};

 test('a cheap target still keeps a visible shot at the top tier',()=>{
  const sel=createFoodSelector(tiers,30);
  const rarities=byRarity(sel,tiers);
  assert.ok(rarities[4]>0,'top tier must stay reachable, not exactly zero');
  assert.ok(rarities[4]>.0005,'top tier odds must be visible, not vanishingly small');
  assert.ok(Math.abs(sel.expectedPrice-30)<1e-6,'the budget promise still holds despite the floor');
 });
 test('a pricier target shifts weight toward higher tiers without breaking the mean',()=>{
  const cheap=byRarity(createFoodSelector(tiers,35),tiers);
  const pricey=byRarity(createFoodSelector(tiers,150),tiers);
  assert.ok(pricey[4]>cheap[4],'gold odds rise with a higher target');
  assert.ok(pricey[0]<cheap[0],'bottom-tier odds fall with a higher target');
  for(const target of [35,150])assert.ok(Math.abs(createFoodSelector(tiers,target).expectedPrice-target)<1e-6);
 });
 test('every rarity mix still sums to one probability and matches its target',()=>{
  for(let target=30;target<=180;target+=7){
   const sel=createFoodSelector(tiers,target);
   const total=tiers.reduce((s,f)=>s+sel.probabilities.get(f),0);
   assert.ok(Math.abs(total-1)<1e-9,`probabilities must sum to 1 at target=${target}`);
   assert.ok(Math.abs(sel.expectedPrice-target)<1e-6,`mean must match target=${target}`);
  }
 });
 test('a pool with no top-tier dish is unaffected by the floor',()=>{
  const noGold=tiers.filter(f=>f.rarity<4);
  const sel=createFoodSelector(noGold,50);
  assert.equal(Math.abs(sel.expectedPrice-50)<1e-6,true);
 });
 test('a pool that is entirely top-tier is unaffected by the floor',()=>{
  const allGold=tiers.filter(f=>f.rarity===4);
  const sel=createFoodSelector(allGold,180);
  assert.equal(Math.abs(sel.expectedPrice-180)<1e-6,true);
 });
}finally{rmSync(out,{recursive:true,force:true})}

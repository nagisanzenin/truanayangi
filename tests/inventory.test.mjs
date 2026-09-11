import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildSync} from 'esbuild';
import {createRequire} from 'node:module';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const out=mkdtempSync(join(tmpdir(),'tnag-inv-'));
try{
 buildSync({entryPoints:['src/lib/inventory.ts'],outfile:join(out,'inv.cjs'),bundle:true,platform:'node',format:'cjs'});
 const inv=createRequire(import.meta.url)(join(out,'inv.cjs'));
 const {validateInventory,addToInventory,removeFromInventory,inventoryFoods,canTradeUp,drawTradeUp,tradeUpTarget,MAX_ENTRIES}=inv;
 const dish=(image,rarity,price=50)=>({name:'x'+image,sub:'',price,rarity,image,quip:''});

 test('rejects malformed inventory instead of trusting the cookie',()=>{
  assert.throws(()=>validateInventory('nope'));
  assert.throws(()=>validateInventory([{id:'1',count:0}]));
  assert.throws(()=>validateInventory([{id:'1',count:1},{id:'1',count:2}]));
  assert.throws(()=>validateInventory([{id:'1',count:1,extra:true}]));
  assert.deepEqual(validateInventory([{id:'1',count:2}]),[{id:'1',count:2}]);
 });

 test('repeat wins stack instead of adding duplicate entries',()=>{
  let list=addToInventory([],dish(1,0));
  list=addToInventory(list,dish(1,0));
  assert.deepEqual(list,[{id:'1',count:2}]);
 });

 test('oldest entry gives way once the cookie-bounded list is full',()=>{
  let list=[];
  for(let i=0;i<MAX_ENTRIES;i++)list=addToInventory(list,dish(i,0));
  list=addToInventory(list,dish(999,0));
  assert.equal(list.length,MAX_ENTRIES);
  assert.equal(list[0].id,'1');
  assert.equal(list[list.length-1].id,'999');
 });

 test('trade-up consumes exactly the dishes it spends',()=>{
  const list=[{id:'1',count:3},{id:'2',count:1}];
  assert.deepEqual(removeFromInventory(list,['1','1']),[{id:'1',count:1},{id:'2',count:1}]);
  assert.deepEqual(removeFromInventory(list,['2']),[{id:'1',count:3}]);
  assert.throws(()=>removeFromInventory(list,['2','2']));
  assert.throws(()=>removeFromInventory(list,['3']));
 });

 test('dishes removed from the pool drop out of the shown inventory',()=>{
  const shown=inventoryFoods([{id:'1',count:2},{id:'404',count:1}],[dish(1,0)]);
  assert.equal(shown.length,1);
  assert.equal(shown[0].count,2);
 });

 test('trade-up needs eight dishes of a single tier',()=>{
  const eight=r=>Array.from({length:8},(_,i)=>dish(i,r));
  assert.equal(canTradeUp(eight(0)),true);
  assert.equal(canTradeUp(eight(0).slice(0,7)),false);
  assert.equal(canTradeUp([...eight(0).slice(0,7),dish(9,1)]),false);
 });

 test('trade-up returns a dish one tier above, and stays inside the top tier',()=>{
  const pool=[dish(1,0),dish(2,1),dish(3,4,200),dish(4,4,210)];
  const eight=r=>Array.from({length:8},(_,i)=>dish(i,r));
  assert.equal(drawTradeUp(eight(0),pool,()=>0).rarity,1);
  assert.equal(tradeUpTarget(4),4);
  assert.equal(drawTradeUp(eight(4),pool,()=>0).rarity,4);
  assert.throws(()=>drawTradeUp(eight(2),[dish(1,0)],()=>0));
 });
}finally{rmSync(out,{recursive:true,force:true})}

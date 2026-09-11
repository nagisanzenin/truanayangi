import {useCallback,useEffect,useState} from 'react';
import type {Food} from '@/lib/foods';
import {readCookie,writeCookie} from '@/lib/cookies';
import {addToInventory,removeFromInventory,validateInventory,type Inventory} from '@/lib/inventory';

export function useInventory(){
 const [items,setItems]=useState<Inventory>([]);
 const [ready,setReady]=useState(false);
 const [error,setError]=useState('');
 useEffect(()=>{
  try{const saved=readCookie<unknown>('inventory');if(saved!==null)setItems(validateInventory(saved))}
  catch{/* A corrupt cookie starts an empty inventory rather than blocking lunch. */}
  setReady(true);
 },[]);
 const persist=useCallback((next:Inventory)=>{
  setItems(next);
  try{writeCookie('inventory',next);setError('')}catch{setError('full')}
 },[]);
 const record=useCallback((food:Food)=>{persist(addToInventory(readStored(),food))},[persist]);
 const spend=useCallback((ids:string[])=>{persist(removeFromInventory(readStored(),ids))},[persist]);
 return {items,ready,error,record,spend};
}

/** Read-modify-write against the cookie so a second tab cannot silently roll back a win. */
function readStored():Inventory{
 try{const saved=readCookie<unknown>('inventory');return saved===null?[]:validateInventory(saved)}catch{return []}
}

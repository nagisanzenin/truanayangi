import {useEffect,useState,useCallback} from 'react';
import {readCookie,writeCookie} from '@/lib/cookies';
import {musicKitIds,defaultMusicKit} from '@/lib/music-kits';

export function useThemeMusic(){
 const [kit,setKitState]=useState(defaultMusicKit);
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  try{const saved=readCookie<string>('music-kit');if(typeof saved==='string'&&musicKitIds.has(saved))setKitState(saved)}catch{/* Falls back to the Valve default. */}
  setReady(true);
 },[]);
 const setKit=useCallback((next:string)=>{
  const kit=musicKitIds.has(next)?next:defaultMusicKit;
  setKitState(kit);
  try{writeCookie('music-kit',kit)}catch{/* Selection still applies for this visit. */}
 },[]);
 return {kit,ready,setKit};
}

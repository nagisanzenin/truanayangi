import {readCookie,writeCookie} from '@/lib/cookies';
'use client';
import { createSpinProfile, spinProgress, createFoodSelector, stopFraction } from '@/lib/case-mechanics';
import { foods, type Food, type Region } from '@/lib/foods';
import { copy, foodName, foodSubtitle, priceLabel, type Language } from '@/lib/i18n';
import { useLocalSpinCount } from '@/hooks/use-local-spin-count';
import { PreferencesPanel } from '@/components/preferences-panel';
import { usePreferences } from '@/hooks/use-preferences';
import { personalFoods, personalSelector } from '@/lib/personal-pool';
import { CaseAudio } from '@/lib/case-audio';
import { flushSync } from 'react-dom';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, AudioLines, Volume2, VolumeX, Sparkles, Utensils, Leaf } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';


const colors=['#4b69ff','#8847ff','#d32ce6','#eb4b4b','#e4ae39'];
function FoodImage({food,language}:{food:Food;language:Language}){
 if(food.customId)return <div className="food-image custom-food-art" role="img" aria-label={food.name}><Utensils size={64}/></div>;
 const common=food.image>=120,lunch=food.image>=72&&!common,expanded=food.image>=36;
 const index=common?(food.image-120)%12:lunch?(food.image-72)%12:expanded?(food.image-36)%12:food.image%4;
 const atlas=common?`food-common-${Math.floor((food.image-120)/12)}`:lunch?`food-lunch-${Math.floor((food.image-72)/12)}`:expanded?`food-expanded-${Math.floor((food.image-36)/12)}`:`food-hd-${Math.floor(food.image/4)}`;
 return <div role="img" aria-label={foodName(food,language)} className="food-image" style={{clipPath:common?"inset(0 0 4% 0)":lunch?"inset(0 0 7% 0)":undefined,backgroundImage:`url(${basePath}/${atlas}.webp)`,backgroundSize:expanded?'400% 300%':'200% 200%',backgroundPosition:expanded?`${index%4/3*100}% ${(common?[0,50,100]:[0,46,92])[Math.floor(index/4)]}%`:`${index%2*100}% ${Math.floor(index/2)*100}%`}}/>
}
function MysteryArt({language}:{language:Language}){return <div className="mystery-art" role="img" aria-label={copy[language].mysteryAlt}>
 <div className="mystery-rays"/>
 <svg className="mystery-emblem" viewBox="0 0 240 150" aria-hidden="true">
  <path className="gold-orbit" d="M120 5 174 27 193 75 174 123 120 145 66 123 47 75 66 27Z"/>
  <path fill="#b27a16" d="m120 10 16 38 44-18-18 38 55 7-55 14 18 34-44-16-16 33-16-33-44 16 18-34-55-14 55-7-18-38 44 18Z"/>
  <path fill="#ffe59a" d="m120 18 13 41 38-21-23 35 49 2-49 10 23 31-38-18-13 34-13-34-38 18 23-31-49-10 49-2-23-35 38 21Z"/>
  <path fill="#372414" stroke="#eac366" strokeWidth="2" d="m120 34 35 20 0 42-35 20-35-20V54Z"/>
  <path fill="#fff3ba" d="M104 61c0-22 36-24 36-2 0 10-12 13-13 20v4h-13v-6c0-9 12-12 12-18 0-8-11-7-11 2zm10 28h13v13h-13z"/>
  <path fill="#fff5ce" d="m34 29 3 7 8 2-8 3-3 8-2-8-8-3 8-2zm164 66 3 9 10 2-10 3-3 10-3-10-9-3 9-2zM186 19l3 3-3 3-3-3zM52 117l3 3-3 3-3-3z"/>
 </svg>
 <div className="mystery-sheen"/>
</div>}
const Card=memo(function Card({food,language,small=false,slot}:{food:Food;language:Language;small?:boolean;slot?:number}){const mystery=!small&&food.rarity===4,t=copy[language];return <div className={`food-card ${small?'small':''} ${mystery?'mystery-card':''}`} data-slot-id={slot} data-food-id={food.image} style={{'--rarity':colors[food.rarity],...(slot===undefined?{}:{position:'absolute',left:slot*254})} as React.CSSProperties}><span className="tier">{t.tiers[food.rarity]}</span>{mystery?<MysteryArt language={language}/>:<FoodImage food={food} language={language}/>}<div className="card-copy"><strong>{mystery?t.mystery:foodName(food,language)}</strong><span>{small?priceLabel(food.price,language,true):foodSubtitle(food,language)}</span></div></div>});

export default function Home(){
 const {count:localSpins,enabled:counterEnabled,recordSpin}=useLocalSpinCount();
 const [language,setLanguage]=useState<Language>('vi');
 const preferences=usePreferences();
 const [budget,setBudget]=useState('50'),[custom,setCustom]=useState('50'),[veg,setVeg]=useState(false),[region,setRegion]=useState<'all'|Region>('all'),[sound,setSound]=useState(true),[spinning,setSpinning]=useState(false),[result,setResult]=useState<Food|null>(null),[revealed,setRevealed]=useState(false);
 const [reel,setReel]=useState(()=>foods.slice(0,12).map((food,id)=>({food,id}))),[moving,setMoving]=useState(false);
 const busy=useRef(false),viewport=useRef<HTMLDivElement>(null);
 useEffect(()=>{let selected:Language='vi';try{const saved=readCookie<string>('language');selected=saved==='en'||saved==='vi'?saved:'vi'}catch{}setLanguage(selected);document.documentElement.lang=selected;document.title=selected==='en'?'What should I eat for lunch?':'Trưa nay ăn gì?'},[]);
 const changeLanguage=(next:Language)=>{setLanguage(next);document.documentElement.lang=next;document.title=next==='en'?'What should I eat for lunch?':'Trưa nay ăn gì?';try{writeCookie('language',next)}catch{}};

 const [preferencesReady,setPreferencesReady]=useState(false);
 const [cookieError,setCookieError]=useState('');
 useEffect(()=>{const saved=readCookie<Record<string,unknown>>('settings');if(saved&&typeof saved==='object'){if(typeof saved.budget==='string'&&['35','50','75','100','150','custom'].includes(saved.budget))setBudget(saved.budget);if(typeof saved.custom==='string'&&Number(saved.custom)>=30&&Number(saved.custom)<=180)setCustom(saved.custom);if(typeof saved.veg==='boolean')setVeg(saved.veg);if(typeof saved.region==='string'&&['all','north','central','south','intl'].includes(saved.region))setRegion(saved.region as 'all'|Region);if(typeof saved.sound==='boolean')setSound(saved.sound)}setPreferencesReady(true)},[]);
 useEffect(()=>{if(preferencesReady){try{writeCookie('settings',{budget,custom,veg,region,sound});setCookieError('')}catch{setCookieError(language==='vi'?'Không thể lưu cookie. Lựa chọn chỉ giữ trong lần mở trang này.':'Cookies unavailable. Preferences last only for this visit.')}}},[preferencesReady,budget,custom,veg,region,sound,language]);
 const target=budget==='custom'?Number(custom):Number(budget);
 const validTarget=Number.isInteger(target)&&target>=30&&target<=180;
 const population=useMemo(()=>personalFoods(preferences.profile),[preferences.profile]);
 useEffect(()=>{const last=readCookie<{name?:unknown;price?:unknown;veg?:unknown}>('last-choice');if(last&&typeof last==='object'){const match=population.find(f=>f.name===last.name&&f.price===last.price&&!!f.veg===last.veg);if(match)setResult(match)}},[population]);
 const eligible=useMemo(()=>population.filter(f=>{
  if(veg&&!f.veg)return false;
  if(region!=='all'&&!f.customId){const r=f.region??'intl';if(region==='intl'?r!=='intl':r!==region&&r!=='national')return false}
  return true}),[population,veg,region]);
 const lunchSelector=useMemo(()=>personalSelector(eligible,validTarget?target:50),[eligible,target,validTarget]);
 const filteredMean=lunchSelector?.expectedPrice??0;

 const audio=useRef<CaseAudio|null>(null);
 useEffect(()=>{
  const engine=new CaseAudio(basePath);audio.current=engine;engine.preload();
  const hide=()=>{if(document.hidden)engine.pause();else engine.recover()};
  document.addEventListener('visibilitychange',hide);
  return ()=>{document.removeEventListener('visibilitychange',hide);engine.dispose();audio.current=null};
 },[]);
 const [visibleStart,setVisibleStart]=useState(0);
 const t=copy[language];
 const inventoryCards=useMemo(()=>[...eligible].sort((a,b)=>a.rarity-b.rarity||a.price-b.price||foodName(a,language).localeCompare(foodName(b,language),language)).map(f=><Card food={f} language={language} small key={f.customId??f.image}/>),[eligible,language]);

 const track=useRef<HTMLDivElement>(null);
 const position=useRef(-400);
 const attachTrack=useCallback((node:HTMLDivElement|null)=>{track.current=node;if(node)node.style.transform=`translate3d(${position.current}px,0,0)`},[]);
 const frame=useRef(0);
 useEffect(()=>{if(spinning||!eligible.length||!lunchSelector)return;setReel(current=>current.map(item=>({...item,food:eligible.find(f=>(f.customId??f.image)===(item.food.customId??item.food.image))??lunchSelector.choose(eligible)})))},[eligible,lunchSelector,spinning]);
 useEffect(()=>()=>{cancelAnimationFrame(frame.current)},[]);
 function open(){
  if(busy.current||!validTarget||!eligible.length||!lunchSelector||!track.current||!viewport.current)return;
  audio.current?.unlock();
  busy.current=true;
  const winner=lunchSelector.choose(eligible);

  const step=254,tileWidth=240,width=viewport.current.clientWidth;
  const start=position.current;
  const center=Math.floor((width/2-start)/step);
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const profile=createSpinProfile(Math.random,reducedMotion);
  const target=center+profile.tiles;
  const end=width/2-tileWidth*stopFraction()-target*step;
  // Keep visible cards at permanent world coordinates. Generate new cards
  // offscreen to the right; the track only travels left, without a reset.
  const rightEdge=Math.ceil((width-start)/step)+1;
  const items=reel.filter(item=>item.id>=center-Math.ceil(width/step)-2&&item.id<=rightEdge);
  const last=Math.max(...items.map(item=>item.id));
  const recent:Food[]=[];
  for(let id=last+1;id<=target+4;id++){
   const alternatives=eligible.filter(food=>!recent.includes(food)&&(lunchSelector.probabilities.get(food)??0)>0);
   const food=id===target?winner:lunchSelector.choose(alternatives.length?alternatives:eligible);
   items.push({id,food});recent.push(food);if(recent.length>8)recent.shift();
  }
  flushSync(()=>{setReel(items);setSpinning(true);setMoving(true);setResult(null)});
  audio.current?.play('csgo_ui_crate_open');
  const duration=profile.durationMs;
  const started=performance.now();
  let renderedStart=visibleStart;
  let lastCell=Math.floor((start-width/2)/step);
  const animate=(now:number)=>{
   const progress=Math.max(0,Math.min(1,(now-started)/duration));
   const next=start+(end-start)*spinProgress(progress,profile.friction);
   position.current=next;
   // Only mount a viewport-sized strip, with 4 cards of overscan on either side.
   // Absolute slot coordinates and transform never reset when the window advances.
   const firstVisible=Math.max(0,Math.floor(-next/step));
   if(firstVisible-renderedStart>=4||firstVisible<renderedStart){renderedStart=Math.max(0,firstVisible-2);setVisibleStart(renderedStart)}
   if(track.current)track.current.style.transform=`translate3d(${next}px,0,0)`;
   // Tick when a card actually crosses the pointer, including on slow devices.
   const cell=Math.floor((next-width/2)/step);
   if(cell!==lastCell){audio.current?.play('csgo_ui_crate_item_scroll');lastCell=cell}
   if(progress<1){frame.current=requestAnimationFrame(animate);return}
   recordSpin(winner);
   busy.current=false;setSpinning(false);setMoving(false);setResult(winner);setRevealed(true);
   audio.current?.play((['item_reveal3_rare','item_reveal4_mythical','item_reveal5_legendary','item_reveal6_ancient','item_reveal6_ancient'] as const)[winner.rarity]);
  };
  frame.current=requestAnimationFrame(animate);
 }

 return <div className="site-shell">
 <header><a href={`${basePath}/`} className="brand">
  <picture>
   <source media="(max-width: 900px)" srcSet={`${basePath}/brand/icon-cs-v2.webp`}/>
   <img className="brand-logo" src={`${basePath}/brand/logo-cs-v2.webp`} width={180} height={60} alt="Trưa Nay Ăn Gì" fetchPriority="high"/>
  </picture>
 </a><div className="header-actions"><PreferencesPanel preferences={preferences} language={language} disabled={spinning}/><button className="language-button" onClick={()=>changeLanguage(language==='vi'?'en':'vi')} aria-label={t.language}>{language==='vi'?'EN':'VI'}</button><button className="sound-button" onClick={()=>{audio.current?.setMuted(sound);setSound(!sound)}} aria-label={sound?t.turnSoundOff:t.turnSoundOn}>{sound?<Volume2 size={18}/>:<VolumeX size={18}/>}<span>{sound?t.soundOn:t.soundOff}</span></button><a className="social-button facebook-button" href="https://www.facebook.com/share/g/19S49GH46A/" target="_blank" rel="noreferrer" aria-label={language==='vi'?'Tham gia nhóm Facebook Trưa Nay Ăn Gì':'Join the Trưa Nay Ăn Gì Facebook group'}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8V13h2.8v8h3.4Z"/></svg><span>Facebook</span></a><a className="github-button" href="https://github.com/truanayangi-com/truanayangi" target="_blank" rel="noreferrer" aria-label={t.github}><svg className="github-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.91c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.66.35-1.12.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.89v2.8c0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"/></svg><span className="github-label">GitHub</span></a></div></header>
 <main><>{cookieError&&<p role="status" className="preferences-message">{cookieError}</p>}<div className="intro"><h1>{t.title}</h1></div>
 {!eligible.length&&<p className="preferences-message">{language==='vi'?'Pool không có món phù hợp. Tắt bớt bộ lọc hoặc thêm món.':'No matching dishes. Turn off some filters or add dishes.'}</p>}
 {counterEnabled&&<p className="local-counter" title={language==='vi'?'Lượt mở trên trình duyệt này, lưu bằng cookie':'Spins on this browser, stored in cookies'}>{language==='vi'?'Bạn đã mở':'You have opened'} <strong>{localSpins===null?'—':new Intl.NumberFormat(language==='vi'?'vi-VN':'en-US').format(localSpins)}</strong> {language==='vi'?'hòm trên trình duyệt này':'cases on this browser'}</p>}
 {result&&!spinning&&<p className="local-counter">{language==='vi'?'Lựa chọn gần nhất: ':'Last choice: '}<strong>{foodName(result,language)}</strong></p>}
 <section className="case-panel" aria-label={t.caseLabel}>
 <div className={`reel-window ${moving?'is-spinning':''} `} ref={viewport}><div className="selector-line"/><div className="reel-track" ref={attachTrack}>{reel.filter(({id})=>id>=visibleStart&&id<visibleStart+12).map(({food,id})=><Card key={id} food={food} language={language} slot={id}/>)}</div><div className="reel-fade left"/><div className="reel-fade right"/></div></section>
 <div className="control-bar"><div className="filters"><div className="budget"><label id="budget-label">{t.spend}</label><Select value={budget} onValueChange={v=>setBudget(v??'50')} disabled={spinning}><SelectTrigger aria-labelledby="budget-label"><SelectValue>{budget==='custom'?t.custom:priceLabel(budget,language)}</SelectValue></SelectTrigger><SelectContent>{['35','50','75','100','150'].map(v=><SelectItem key={v} value={v}>{priceLabel(v,language)}</SelectItem>)}<SelectItem value="custom">{t.custom}</SelectItem></SelectContent></Select>{budget==='custom'&&<div className="custom-spend"><input aria-label={t.customSpend} aria-invalid={!validTarget} type="number" inputMode="numeric" min="30" max="180" step="1" value={custom} disabled={spinning} onChange={e=>setCustom(e.target.value)}/><span>{t.thousandPerMeal}</span></div>}{!validTarget&&<small className="spend-note" role="alert">{t.spendError}</small>}{validTarget&&eligible.length>0&&(veg||Math.abs(filteredMean-target)>.5)&&<small className="spend-note">{t.vegetarianPool} {priceLabel(Math.round(filteredMean),language,true)} / {language==='vi'?'bữa':'meal'}</small>}</div><label className="veg"><Switch checked={veg} onCheckedChange={setVeg} disabled={spinning} aria-label={t.vegetarianOnly}/><span><Leaf size={15}/> {t.vegetarian}</span></label><div className="region" role="group" aria-label={t.region}><span className="region-label">{t.region}</span><div className="region-chips">{(['all','north','central','south','intl'] as const).map(r=><button key={r} className={`region-chip${region===r?' selected':''}`} disabled={spinning} aria-pressed={region===r} onClick={()=>setRegion(r)}>{t.regions[r]}</button>)}</div></div></div><div className="open-wrap"><button className="open-button" disabled={spinning||!validTarget||!eligible.length} onClick={open}>{spinning?<AudioLines size={22}/>:<Sparkles size={21}/>} {spinning?t.opening:result?t.openAgain:t.open} <span>↗</span></button></div></div>
 <Dialog open={revealed} onOpenChange={setRevealed}><DialogContent className="winner-dialog" showCloseButton={false}>{result&&<><span className="winner-label">{t.newItem}</span><DialogTitle className="winner-title">{foodName(result,language)}</DialogTitle><DialogDescription className="winner-description">{t.referencePrice} · {priceLabel(result.price,language,true)} {t.perPerson}</DialogDescription><div className="winner-art" style={{'--rarity':colors[result.rarity]} as React.CSSProperties}><FoodImage food={result} language={language}/></div><div className="winner-actions"><a className="find-button" href={`https://www.google.com/maps/search/${encodeURIComponent(result.name+' '+t.nearby)}`} target="_blank" rel="noreferrer">{t.find} <ArrowUpRight size={16}/></a><a className="grabfood-button" href={`https://food.grab.com/vn/vi/restaurants?${new URLSearchParams({search:result.name,'support-deeplink':'true',searchParameter:result.name})}`} target="_blank" rel="noreferrer" aria-label={language==='vi'?`Đặt ${result.name} qua GrabFood`:`Find ${foodName(result,language)} on GrabFood`}><span className="grabfood-label">{language==='vi'?'Đặt qua':'Order on'} <strong>GrabFood</strong></span><ArrowUpRight size={17} aria-hidden="true"/></a><button onClick={()=>setRevealed(false)}>{t.continue}</button></div></>}</DialogContent></Dialog>

 <section className="inventory"><div className="section-heading"><div><span className="eyebrow">{t.whatsInside}</span><div className="inventory-title-row"><h2>{t.items} <span>{eligible.length.toString().padStart(2,'0')}</span></h2><PreferencesPanel preferences={preferences} language={language} disabled={spinning} variant="inventory"/></div></div><div className="rarity-legend">{t.tiers.map((tier,i)=><span key={tier}><i style={{background:colors[i]}}/>{tier}</span>)}</div></div><div className="inventory-grid">{inventoryCards}</div></section>

 </><footer><span>Trưa Nay Ăn Gì · <a href={`${basePath}/privacy.html`}>{language==='vi'?'Quyền riêng tư':'Privacy'}</a> · <a href={`${basePath}/terms.html`}>{language==='vi'?'Điều khoản':'Terms'}</a></span><span>{t.footer} <a href="https://github.com/sourcesounds/csgo" target="_blank" rel="noreferrer">SourceSounds</a></span></footer>
 </main></div>
}

import { useMemo, useState } from 'react';
import { Package, ArrowUpRight } from 'lucide-react';
import type { Food } from '@/lib/foods';
import { copy, foodName, priceLabel, type Language } from '@/lib/i18n';
import { FoodImage, rarityColors } from '@/components/food-image';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { canTradeUp, drawTradeUp, foodKey, inventoryFoods, TRADE_UP_COST, tradeUpOutcomes, type Inventory } from '@/lib/inventory';

type Props = {
 inventory: Inventory;
 population: Food[];
 language: Language;
 disabled?: boolean;
 storageError?: boolean;
 onTradeUp: (spent: string[], won: Food) => void;
};

export function InventoryPanel({ inventory, population, language, disabled, storageError, onTradeUp }: Props) {
 const t = copy[language];
 const [open, setOpen] = useState(false);
 const [picked, setPicked] = useState<string[]>([]);
 const [won, setWon] = useState<Food | null>(null);
 const [message, setMessage] = useState('');

 // One entry per owned copy, so eight duplicates of one dish are a valid trade.
 const owned = useMemo(() => inventoryFoods(inventory, population)
  .flatMap(({ food, count }) => Array.from({ length: count }, (_, i) => ({ food, slot: `${foodKey(food)}#${i}` })))
  .sort((a, b) => b.food.rarity - a.food.rarity || a.food.price - b.food.price), [inventory, population]);

 const total = owned.length;
 const selection = picked.flatMap(slot => { const hit = owned.find(o => o.slot === slot); return hit ? [hit.food] : []; });
 const ready = canTradeUp(selection);
 const topTier = selection.length > 0 && selection[0].rarity === 4;

 function toggle(slot: string, food: Food) {
  setMessage('');
  setPicked(current => {
   if (current.includes(slot)) return current.filter(s => s !== slot);
   if (current.length >= TRADE_UP_COST) return current;
   const first = current.length ? owned.find(o => o.slot === current[0])?.food : null;
   if (first && first.rarity !== food.rarity) return current;
   return [...current, slot];
  });
 }

 function confirm() {
  if (!ready) return;
  if (!tradeUpOutcomes(selection[0].rarity, population).length) { setMessage(t.tradeUpNone); return; }
  const result = drawTradeUp(selection, population);
  onTradeUp(selection.map(foodKey), result);
  setWon(result);
  setPicked([]);
 }

 function close() { setOpen(false); setPicked([]); setMessage(''); }

 return <>
  <button className="inventory-button" onClick={() => setOpen(true)} disabled={disabled} aria-label={t.inventory}>
   <Package size={17} /> <span>{t.inventory}</span> <b>{total}</b>
  </button>

  <Dialog open={open} onOpenChange={next => next ? setOpen(true) : close()}>
   <DialogContent className="inventory-dialog">
    <DialogTitle className="inventory-dialog-title">{t.inventory}</DialogTitle>
    <DialogDescription className="inventory-dialog-lead">{t.tradeUpLead}</DialogDescription>
    {storageError && <p className="preferences-message" role="status">{t.inventoryNotSaved}</p>}

    {!total && <p className="inventory-empty">{t.inventoryEmpty}</p>}

    {total > 0 && <>
     <div className="trade-status" role="status">
      <span>{t.tradeUpSelected}: <strong>{picked.length}</strong> / {TRADE_UP_COST}</span>
      {topTier && <span className="trade-note">{t.tradeUpTopTier}</span>}
      {message && <span className="trade-note">{message}</span>}
     </div>
     <div className="inventory-owned">
      {owned.map(({ food, slot }) => {
       const active = picked.includes(slot);
       return <button key={slot} type="button" aria-pressed={active}
        className={`food-card small owned-card ${active ? 'picked' : ''}`}
        style={{ '--rarity': rarityColors[food.rarity] } as React.CSSProperties}
        onClick={() => toggle(slot, food)}>
        <FoodImage food={food} language={language} />
        <div className="card-copy"><strong>{foodName(food, language)}</strong><span>{priceLabel(food.price, language, true)}</span></div>
       </button>;
      })}
     </div>
     <div className="trade-actions">
      <button className="open-button" disabled={!ready} onClick={confirm}>{t.tradeUpConfirm}</button>
      <button className="trade-cancel" onClick={close}>{t.tradeUpCancel}</button>
     </div>
     {!ready && picked.length > 0 && <small className="spend-note">{t.tradeUpNeed}</small>}
    </>}
   </DialogContent>
  </Dialog>

  <Dialog open={!!won} onOpenChange={next => { if (!next) setWon(null); }}>
   <DialogContent className="winner-dialog" showCloseButton={false}>{won && <>
    <span className="winner-label">{t.tradeUpResult}</span>
    <DialogTitle className="winner-title">{foodName(won, language)}</DialogTitle>
    <DialogDescription className="winner-description">{t.referencePrice} · {priceLabel(won.price, language, true)} {t.perPerson}</DialogDescription>
    <div className="winner-art" style={{ '--rarity': rarityColors[won.rarity] } as React.CSSProperties}><FoodImage food={won} language={language} /></div>
    <div className="winner-actions">
     <a className="find-button" href={`https://www.google.com/maps/search/${encodeURIComponent(won.name + ' ' + t.nearby)}`} target="_blank" rel="noreferrer">{t.find} <ArrowUpRight size={16} /></a>
     <button onClick={() => setWon(null)}>{t.continue}</button>
    </div>
   </>}</DialogContent>
  </Dialog>
 </>;
}

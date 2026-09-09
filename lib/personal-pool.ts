import { foods, type Food, type Category, CATEGORIES } from './foods';
import { createFoodSelector, priceRarity } from './case-mechanics';
export type CustomFood = { id: string; name: string; price: number; veg: boolean; cat: Category };
export type PoolProfile = { disabled: number[]; custom: CustomFood[]; revision: number };
export const emptyProfile = (): PoolProfile => ({ disabled: [], custom: [], revision: 0 });
const ids = new Set(foods.map(f => f.image));
export function validateProfile(input: unknown): PoolProfile {
 if (!input || typeof input !== 'object') throw new Error('Invalid profile');
 const p = input as Record<string, unknown>;
 if (Object.keys(p).some(k => !['disabled','custom','revision'].includes(k)) || !Array.isArray(p.disabled) || !Array.isArray(p.custom) || !Number.isSafeInteger(p.revision) || (p.revision as number)<0) throw new Error('Invalid profile');
 if (p.disabled.length>foods.length || p.custom.length>50 || new Set(p.disabled).size!==p.disabled.length || p.disabled.some(id=>!ids.has(id))) throw new Error('Invalid dishes');
 const validCats = new Set(CATEGORIES.map(c=>c.id));
 const custom = p.custom.map((item: unknown): CustomFood => {
  if (!item || typeof item!=='object') throw new Error('Invalid dish');
  const f=item as Record<string,unknown>;
  if(Object.keys(f).some(k=>!['id','name','price','veg','cat'].includes(k)) || typeof f.id!=='string' || !/^[0-9a-f-]{36}$/i.test(f.id) || typeof f.name!=='string' || !f.name.trim() || f.name.length>60 || /[\x00-\x1f\x7f]/.test(f.name) || !Number.isInteger(f.price) || (f.price as number)<10 || (f.price as number)>500 || typeof f.veg!=='boolean') throw new Error('Invalid dish');
  const cat = typeof f.cat === 'string' && validCats.has(f.cat as Category) ? f.cat as Category : 'mon-kho';
  return {id:f.id,name:f.name.trim().normalize('NFC'),price:f.price as number,veg:f.veg,cat};
 });
 if(new Set(custom.map(f=>f.id)).size!==custom.length || foods.length-p.disabled.length+custom.length<1) throw new Error('Keep at least one dish');
 return {disabled:p.disabled as number[],custom,revision:p.revision as number};
}
export function personalFoods(profile: PoolProfile): Food[] {
 return [...foods.filter(f=>!profile.disabled.includes(f.image)), ...profile.custom.map(f=>({...f,customId:f.id,image:-1,sub:'Món của tôi',quip:'',rarity:priceRarity(f.price),cat:f.cat}))];
}
export function personalSelector(population: Food[], target: number) {
 if(!population.length) return null;
 const feasible=Math.max(Math.min(...population.map(f=>f.price)),Math.min(target,Math.max(...population.map(f=>f.price))));
 return createFoodSelector(population,feasible);
}

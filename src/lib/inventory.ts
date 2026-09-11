import { type Food } from './foods';

export type InventoryEntry = { id: string; count: number };
export type Inventory = InventoryEntry[];

// One cookie holds the whole inventory, so keep the entry list bounded well
// under the 3500-character write limit enforced in cookies.ts.
export const MAX_ENTRIES = 60;
export const TRADE_UP_COST = 8;
export const MAX_RARITY = 4;

export const foodKey = (food: Food) => food.customId ?? String(food.image);

export function validateInventory(input: unknown): Inventory {
 if (!Array.isArray(input)) throw new Error('Invalid inventory');
 if (input.length > MAX_ENTRIES) throw new Error('Inventory too large');
 const entries = input.map((item: unknown): InventoryEntry => {
  if (!item || typeof item !== 'object') throw new Error('Invalid entry');
  const e = item as Record<string, unknown>;
  if (Object.keys(e).some(k => !['id', 'count'].includes(k))) throw new Error('Invalid entry');
  if (typeof e.id !== 'string' || !e.id || e.id.length > 40) throw new Error('Invalid entry');
  if (!Number.isSafeInteger(e.count) || (e.count as number) < 1 || (e.count as number) > 999) throw new Error('Invalid entry');
  return { id: e.id, count: e.count as number };
 });
 if (new Set(entries.map(e => e.id)).size !== entries.length) throw new Error('Duplicate entry');
 return entries;
}

export function addToInventory(inventory: Inventory, food: Food): Inventory {
 const id = foodKey(food);
 const existing = inventory.find(e => e.id === id);
 if (existing) return inventory.map(e => e.id === id ? { ...e, count: Math.min(999, e.count + 1) } : e);
 // Oldest entry gives way once the cookie-bounded list is full.
 const trimmed = inventory.length >= MAX_ENTRIES ? inventory.slice(1) : inventory;
 return [...trimmed, { id, count: 1 }];
}

export function removeFromInventory(inventory: Inventory, ids: string[]): Inventory {
 const needed = new Map<string, number>();
 for (const id of ids) needed.set(id, (needed.get(id) ?? 0) + 1);
 const result: Inventory = [];
 for (const entry of inventory) {
  const take = needed.get(entry.id) ?? 0;
  if (take > entry.count) throw new Error('Not enough items');
  if (entry.count > take) result.push({ ...entry, count: entry.count - take });
  needed.delete(entry.id);
 }
 if (needed.size) throw new Error('Not enough items');
 return result;
}

/** Resolves stored ids against the dishes currently in the pool. */
export function inventoryFoods(inventory: Inventory, population: Food[]) {
 const byKey = new Map(population.map(f => [foodKey(f), f]));
 return inventory.flatMap(entry => {
  const food = byKey.get(entry.id);
  return food ? [{ food, count: entry.count }] : [];
 });
}

export function tradeUpTarget(rarity: number) {
 return Math.min(MAX_RARITY, rarity + 1);
}

/** Trade-up needs eight dishes of one rarity; the outcome is drawn from the next tier. */
export function tradeUpOutcomes(rarity: number, population: Food[]) {
 return population.filter(f => f.rarity === tradeUpTarget(rarity));
}

export function canTradeUp(selection: Food[]) {
 if (selection.length !== TRADE_UP_COST) return false;
 return selection.every(f => f.rarity === selection[0].rarity);
}

export function drawTradeUp(selection: Food[], population: Food[], random = Math.random): Food {
 if (!canTradeUp(selection)) throw new Error('Trade-up needs eight dishes of one tier');
 const outcomes = tradeUpOutcomes(selection[0].rarity, population);
 if (!outcomes.length) throw new Error('No dish available at the next tier');
 const draw = random();
 if (!Number.isFinite(draw) || draw < 0 || draw >= 1) throw new Error('Random draw must be in [0,1)');
 return outcomes[Math.min(outcomes.length - 1, Math.floor(draw * outcomes.length))];
}

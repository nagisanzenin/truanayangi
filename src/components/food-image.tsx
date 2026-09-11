import { Utensils } from 'lucide-react';
import type { Food } from '@/lib/foods';
import { foodName, type Language } from '@/lib/i18n';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const rarityColors = ['#4b69ff', '#8847ff', '#d32ce6', '#eb4b4b', '#e4ae39'];

export function FoodImage({ food, language }: { food: Food; language: Language }) {
 if (food.customId) return <div className="food-image custom-food-art" role="img" aria-label={food.name}><Utensils size={64} /></div>;
 const common = food.image >= 120, lunch = food.image >= 72 && !common, expanded = food.image >= 36;
 const index = common ? (food.image - 120) % 12 : lunch ? (food.image - 72) % 12 : expanded ? (food.image - 36) % 12 : food.image % 4;
 const atlas = common ? `food-common-${Math.floor((food.image - 120) / 12)}` : lunch ? `food-lunch-${Math.floor((food.image - 72) / 12)}` : expanded ? `food-expanded-${Math.floor((food.image - 36) / 12)}` : `food-hd-${Math.floor(food.image / 4)}`;
 return <div role="img" aria-label={foodName(food, language)} className="food-image" style={{ clipPath: common ? 'inset(0 0 4% 0)' : lunch ? 'inset(0 0 7% 0)' : undefined, backgroundImage: `url(${basePath}/${atlas}.webp)`, backgroundSize: expanded ? '400% 300%' : '200% 200%', backgroundPosition: expanded ? `${index % 4 / 3 * 100}% ${(common ? [0, 50, 100] : [0, 46, 92])[Math.floor(index / 4)]}%` : `${index % 2 * 100}% ${Math.floor(index / 2) * 100}%` }} />;
}

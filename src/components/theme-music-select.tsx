import { Music2 } from 'lucide-react';
import { musicKits } from '@/lib/music-kits';
import { copy, type Language } from '@/lib/i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = { kit: string; language: Language; onChange: (kit: string) => void };

export function ThemeMusicSelect({ kit, language, onChange }: Props) {
 const t = copy[language];
 return <Select value={kit} onValueChange={v => v && onChange(v)}>
  <SelectTrigger className="theme-music-trigger" aria-label={t.themeMusicLabel}>
   <Music2 size={15} /><SelectValue>{musicKits.find(k => k.id === kit)?.artist ?? kit}</SelectValue>
  </SelectTrigger>
  <SelectContent>{musicKits.map(k => <SelectItem key={k.id} value={k.id}>{k.artist}</SelectItem>)}</SelectContent>
 </Select>;
}

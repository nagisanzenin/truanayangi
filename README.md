# truanayangi

Vietnamese lunch case-opening parody. 36 meals, budget and vegetarian filters, original CS:GO sound assets, Google Maps search for the chosen meal. No payments or backend records.

## Timing reference

The archived CS:GO Panorama client exposes a 2.3 s case-model lead-in plus 0.1 s scroll preparation, a 6 s scroll, cubic-bezier(0.075, 0.82, 0.165, 1), 38 decorative tiles, 42 fixed tick timestamps, and integer landing offsets from 10–90% of the winning tile. The web implementation uses a compositor-driven animation and hides all reel resets behind the case view.

References:
- https://github.com/Desynci/CSGO_Panorama_Code.pbin/blob/main/panorama/scripts/popups/popup_capability_decodable.js
- https://github.com/Desynci/CSGO_Panorama_Code.pbin/blob/main/panorama/styles/popups/popup_capability_decodable.css
- https://www.csgo.com.cn/news/gamebroad/20170911/206155.html

The 625:125:25:5:2 rarity weights reproduce the published standard weapon-case tier ratio. Items within a tier have equal probability. Filters remove unavailable tiers and renormalize the remaining weights. The winner is selected before animation; decorative cards never determine the result. Decorative neighbors avoid immediate repeats to reduce high-speed visual aliasing.

Rarity follows approximate VND price/person: blue ≤40k, purple ≤65k, pink ≤100k, red ≤130k, gold >130k.

This is a browser adaptation, not Valve's engine or backend. The case lead-in is a 2D animation rather than the original 3D model animation. Food art, filtered pools and meal outcomes are intentionally different. Reduced-motion mode keeps timing but suppresses reel motion.

## Assets

Food sheets and warehouse background: generated for this project.
CS:GO SFX: Valve assets mirrored at https://github.com/sourcesounds/csgo/tree/master/sound/ui
Case image: Steam economy image referenced by https://github.com/ByMykel/CSGO-API

## Development

npm install
npm run dev
npm run build


### Find or order the chosen meal

The result links to Google Maps. On small screens or touch devices, a green GrabFood button opens the Vietnamese GrabFood search with the original dish name (including custom dishes). It uses the HTTPS search link tested on a real phone; app handoff depends on Grab and browser/device settings. There is no forced timer redirect, location request, or checkout integration. Google Maps remains available.

export type MusicKit = { id: string; artist: string };

// Track list from https://github.com/sourcesounds/csgo (sound/music/<kit>/mainmenu.mp3),
// the same source ATTRIBUTION.md already credits for the crate sounds.
export const musicKits: MusicKit[] = [
 { id: 'valve_csgo_01', artist: 'Valve (CS:GO)' },
 { id: 'valve_csgo_02', artist: 'Valve (CS:GO) II' },
 { id: 'danielsadowski_01', artist: 'Daniel Sadowski' },
 { id: 'danielsadowski_02', artist: 'Daniel Sadowski II' },
 { id: 'danielsadowski_03', artist: 'Daniel Sadowski III' },
 { id: 'darude_01', artist: 'Darude' },
 { id: 'noisia_01', artist: 'Noisia' },
 { id: 'awolnation_01', artist: 'AWOLNATION' },
 { id: 'hotlinemiami_01', artist: 'Hotline Miami' },
 { id: 'beartooth_01', artist: 'Beartooth' },
 { id: 'mordfustang_01', artist: 'Mord Fustang' },
 { id: 'feedme_01', artist: 'Feed Me' },
 { id: 'sasha_01', artist: 'Sasha' },
 { id: 'austinwintory_01', artist: 'Austin Wintory' },
 { id: 'kellybailey_01', artist: 'Kelly Bailey' },
 { id: 'lenniemoore_01', artist: 'Lennie Moore' },
 { id: 'troelsfolmann_01', artist: 'Troels Folmann' },
 { id: 'mateomessina_01', artist: 'Mateo Messina' },
 { id: 'twinatlantic_01', artist: 'Twin Atlantic' },
 { id: 'midnightriders_01', artist: 'Midnight Riders' },
];

export const defaultMusicKit = musicKits[0].id;
export const musicKitIds = new Set(musicKits.map(k => k.id));

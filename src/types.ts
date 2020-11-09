export type Boon = {
	id: number;
	god?: string;
	type: string;
	name: string;
	description: string;
	image: string;
	extraStats: {
		rarity: string;
		description: string;
		value: string;
	}[];
	legendary?: boolean;
	duo?: string[];
	prerequisites: { count: number; ids: number[] }[];
	activeRarity?: string;
};

export type BoonData = {
	boons: {
		[key in GodsStrings]: {
			boons: Boon[];
		};
	};
};

export type GodsStrings = 'aphrodite' | 'ares' | 'artemis' | 'athena' | 'demeter' | 'dionysus' | 'hermes' | 'poseidon' | 'zeus';

export enum ImagePlaceholders {
	BLOODSTONE = 'BLOODSTONE',
	OBOL = 'OBOL',
	HEALTH = 'HEALTH',
	DARKNESS = 'DARKNESS',
	GEMSTONES = 'GEMSTONES',
}

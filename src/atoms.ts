import { atom, selectorFamily } from 'recoil';
import { Boon } from './types';

export const selectedBoons = atom<Boon[]>({
	key: 'selectedBoons',
	default: [],
});

type PrerequisiteHoverState = {
	[key: number]: {
		hovered: boolean;
		x: number;
		y: number;
	};
};
export const prerequisitesHoverState = atom<PrerequisiteHoverState>({
	key: 'prerequisitesHoverState',
	default: {},
});

export const prerequisiteHovered = selectorFamily({
	key: 'prerequisiteHovered',
	get: (id: number) => ({ get }) => {
		return get(prerequisitesHoverState)[id];
	},
});

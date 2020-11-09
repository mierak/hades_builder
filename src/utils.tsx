import React from 'react';
import { Boon, GodsStrings, ImagePlaceholders } from './types';
import BLOODSTONE from './assets/icons/Ammo.png';
import DARKNESS from './assets/icons/Darkness.png';
import GEMSTONES from './assets/icons/Gemstone.png';
import HEALTH from './assets/icons/Health.png';
import OBOL from './assets/icons/Obol.png';
import aphrodite from './assets/god_icons/Aphrodite_symbol.png';
import ares from './assets/god_icons/Ares_symbol.png';
import artemis from './assets/god_icons/Artemis_symbol.png';
import athena from './assets/god_icons/Athena_symbol.png';
import demeter from './assets/god_icons/Demeter_symbol.png';
import dionysus from './assets/god_icons/Dionysus_symbol.png';
import hermes from './assets/god_icons/Hermes_symbol.png';
import poseidon from './assets/god_icons/Poseidon_symbol.png';
import zeus from './assets/god_icons/Zeus_symbol.png';

export const updateAddress = (boons: { id: number; activeRarity: string | undefined }[]) => {
	const base64 = Buffer.from(JSON.stringify(boons)).toString('base64');
	window.history.pushState('', '', `?data=${base64}`);
};

export const checkPrerequisites = (boon: Boon, selectedBoons: Boon[]): boolean => {
	let disabled = false;
	const selectedBoonsIds = selectedBoons.map((boon) => boon.id);
	for (const b of selectedBoons) {
		if (b.id === boon.id || (boon.type !== 'boon' && b.type === boon.type)) {
			disabled = true;
			break;
		}
	}
	boon.prerequisites.forEach((prereq) => {
		let count = 0;
		prereq.ids.forEach((id) => {
			if (selectedBoonsIds.includes(id)) {
				count++;
			}
		});
		if (count < prereq.count) {
			disabled = true;
		}
	});
	return disabled;
};

const images: { [key: string]: string } = {
	BLOODSTONE,
	DARKNESS,
	GEMSTONES,
	HEALTH,
	OBOL,
};

export const replacePlaceholders = (str: string): React.ReactNode => {
	const arr = str.split(' ');
	const res = [];
	for (let i = 0; i < arr.length; i++) {
		if (!arr[i].startsWith('{')) {
			res.push(`${arr[i]} `);
		} else {
			Object.keys(ImagePlaceholders).forEach((key) => {
				if (arr[i].includes(ImagePlaceholders[key as ImagePlaceholders])) {
					res.push(<img key={`${key}${i}`} className='text-icon' src={images[key]} alt={key} />);
				}
			});
		}
	}

	return res;
};

export const getTextColorClass = (boon: Boon) => {
	if (boon.duo) return 'duo';
	if (boon.legendary) return 'legendary';
	return boon.activeRarity ?? 'common';
};

export const getRarityText = (boon: Boon) => {
	if (boon.duo) return 'Duo';
	if (boon.legendary) return 'Legendary';
	if (boon.activeRarity) {
		return boon.activeRarity.charAt(0).toUpperCase() + boon.activeRarity.slice(1);
	}
	return 'Common';
};

export const translateNumber = (number: number) => {
	switch (number) {
		case 1:
			return 'One';
		case 2:
			return 'Two';
		case 3:
			return 'Three';
	}
};

export const replaceGodWithIcon = (god: GodsStrings) => {
	switch (god) {
		case 'aphrodite':
			return aphrodite;
		case 'ares':
			return ares;
		case 'artemis':
			return artemis;
		case 'athena':
			return athena;
		case 'demeter':
			return demeter;
		case 'dionysus':
			return dionysus;
		case 'hermes':
			return hermes;
		case 'poseidon':
			return poseidon;
		case 'zeus':
			return zeus;
	}
};

export const getBackgroundClassName = (boon: Boon) => {
	if (boon.legendary) {
		return 'legendary';
	}
	if (boon.duo) {
		return 'duo';
	}
	return boon.activeRarity;
};

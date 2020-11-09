import React from 'react';
import { Boon } from './boon/Boon';
import { useRecoilState } from 'recoil';
import { selectedBoons } from '../atoms';
import { updateAddress } from '../utils';
import { Card } from './Card';

export const BoonList: React.FunctionComponent = () => {
	const [boons, setSelectedBoons] = useRecoilState(selectedBoons);

	React.useEffect(() => {
		window.addEventListener('onmousemove', () => {});
	}, []);
	return (
		<Card title='Selected Boons' className='boon-list'>
			{boons.map((boon) => (
				<Boon
					boon={boon}
					list='selected'
					remoevBoon={() => {
						const newBoons = boons.filter((b) => b.id !== boon.id);
						setSelectedBoons(newBoons);
						updateAddress(newBoons.map((boon) => ({ id: boon.id, activeRarity: boon.activeRarity })));
					}}
					updateAddress={(rarity) => {
						const index = boons.findIndex((b) => b.id === boon.id);
						const newBoons = [...boons.slice(0, index), { ...boon, activeRarity: rarity }, ...boons.slice(index + 1)];
						setSelectedBoons(newBoons);
						updateAddress(newBoons.map((boon) => ({ id: boon.id, activeRarity: boon.activeRarity })));
					}}
					key={boon.id}
				/>
			))}
		</Card>
	);
};

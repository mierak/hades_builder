import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedBoons } from '../atoms';
import { Boon as BoonType, BoonData, GodsStrings } from '../types';
import data from '../data.json';
import { Boon } from './boon/Boon';
import { checkPrerequisites, updateAddress } from '../utils';

export const BoonTab: React.FunctionComponent<{ god: GodsStrings }> = ({ god }) => {
	const [selBoons, setSelectedBoons] = useRecoilState(selectedBoons);
	const tabRef = React.useRef<HTMLDivElement>(null);
	const data2: BoonData = data;

	React.useEffect(() => {
		if (!tabRef.current) return;
		tabRef.current.scrollTo({ top: 0 });
	}, [god]);

	return (
		<>
			{data2.boons[god].boons.map((boon) => {
				let newBoon: BoonType;
				if (!boon.legendary && !boon.duo) {
					newBoon = { ...boon, activeRarity: 'common' };
				} else {
					newBoon = boon;
				}
				return (
					<Boon
						disabled={checkPrerequisites(newBoon, selBoons)}
						list='available'
						boon={newBoon}
						key={newBoon.id}
						addBoon={(b: BoonType) => {
							setSelectedBoons([...selBoons, b]);
							updateAddress([...selBoons, b].map((boon) => ({ id: boon.id, activeRarity: boon.activeRarity })));
						}}
					/>
				);
			})}
			{data.boons.duo.boons.reduce<React.ReactNode[]>((acc, boon) => {
				if (!boon.duo?.includes(god)) {
					return acc;
				}
				return [
					...acc,
					<Boon
						disabled={checkPrerequisites(boon, selBoons)}
						list='available'
						boon={boon}
						key={boon.id}
						addBoon={(b: BoonType) => {
							setSelectedBoons([...selBoons, b]);
							updateAddress([...selBoons, b].map((boon) => ({ id: boon.id, activeRarity: boon.activeRarity })));
						}}
					/>,
				];
			}, [])}
		</>
	);
};

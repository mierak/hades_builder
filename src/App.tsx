import React from 'react';
import { useSetRecoilState } from 'recoil';
import './App.css';
import { selectedBoons } from './atoms';
import { BoonList } from './components/BoonList';
import { BoonSelector } from './components/BoonSelector';
import boonData from './data.json';
import { Boon, GodsStrings } from './types';

function App() {
	const setBoons = useSetRecoilState(selectedBoons);

	React.useEffect(() => {
		try {
			const params = new URLSearchParams(window.location.search);
			const data = params.get('data');
			if (!data) return;

			const boons: { id: number; activeRarity: string }[] = JSON.parse(atob(data));
			const newBoons: Boon[] = [];
			Object.keys(boonData.boons).forEach((godKey) => {
				boonData.boons[godKey as GodsStrings].boons.forEach((boon: Boon) => {
					const b = boons.find((bb) => bb.id === boon.id);
					if (b) {
						if (!boon.legendary && !boon.duo) {
							newBoons.push({ ...boon, activeRarity: b.activeRarity });
						} else {
							newBoons.push(boon);
						}
					}
				});
			});
			setBoons(newBoons);
		} catch (err) {
			console.error(err);
			//TODO handle later
		}
	}, [setBoons]);

	return (
		<>
			<div className='App'>
				<div className='content'>
					<h1 className='title'>Hades - Build Planner</h1>
					<BoonList />
					<BoonSelector />
				</div>
			</div>
		</>
	);
}

export default App;

import React from 'react';
import aphrodite from '../assets/god_icons/Aphrodite_symbol.png';
import ares from '../assets/god_icons/Ares_symbol.png';
import artemis from '../assets/god_icons/Artemis_symbol.png';
import athena from '../assets/god_icons/Athena_symbol.png';
import demeter from '../assets/god_icons/Demeter_symbol.png';
import dionysus from '../assets/god_icons/Dionysus_symbol.png';
import hermes from '../assets/god_icons/Hermes_symbol.png';
import poseidon from '../assets/god_icons/Poseidon_symbol.png';
import zeus from '../assets/god_icons/Zeus_symbol.png';
import { GodTab } from './GodTab';
import { BoonTab } from './BoonTab';
import { GodsStrings } from '../types';
import { Card } from './Card';

export const BoonSelector: React.FunctionComponent = () => {
	const [activeTab, setActiveTab] = React.useState<GodsStrings>('aphrodite');

	return (
		<Card
			className='boon-selector'
			title='Available Boons'
			collapsible
			additionalTitleContent={
				<div className='boon-selector-tabs'>
					<GodTab name='Aphrodite' icon={aphrodite} onClick={() => setActiveTab('aphrodite')} active={activeTab === 'aphrodite'} />
					<GodTab name='Ares' icon={ares} onClick={() => setActiveTab('ares')} active={activeTab === 'ares'} />
					<GodTab name='Artemis' icon={artemis} onClick={() => setActiveTab('artemis')} active={activeTab === 'artemis'} />
					<GodTab name='Athena' icon={athena} onClick={() => setActiveTab('athena')} active={activeTab === 'athena'} />
					<GodTab name='Demeter' icon={demeter} onClick={() => setActiveTab('demeter')} active={activeTab === 'demeter'} />
					<GodTab name='Dionysus' icon={dionysus} onClick={() => setActiveTab('dionysus')} active={activeTab === 'dionysus'} />
					<GodTab name='Hermes' icon={hermes} onClick={() => setActiveTab('hermes')} active={activeTab === 'hermes'} />
					<GodTab name='Poseidon' icon={poseidon} onClick={() => setActiveTab('poseidon')} active={activeTab === 'poseidon'} />
					<GodTab name='Zeus' icon={zeus} onClick={() => setActiveTab('zeus')} active={activeTab === 'zeus'} />
				</div>
			}
		>
			<BoonTab god={activeTab} />
		</Card>
	);
};

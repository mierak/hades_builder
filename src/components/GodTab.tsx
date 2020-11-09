import React from 'react';

type Props = {
	name: string;
	icon: string;
	showName?: boolean;
	active?: boolean;
	onClick: () => void;
};

export const GodTab: React.FunctionComponent<Props> = (props) => {
	return (
		<button className={`god-tab${props.active ? ' active' : ''}`} onClick={props.onClick}>
			<img src={props.icon} alt={props.name + ' icon'} className='god-tab-icon' />
			{props.showName && <span className='god-tab-name'>{props.name}</span>}
		</button>
	);
};

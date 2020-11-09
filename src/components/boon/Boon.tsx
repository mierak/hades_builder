import React from 'react';
import { Boon as BoonType, GodsStrings } from '../../types';
import data from '../../data.json';
import * as utils from '../../utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { prerequisiteHovered, prerequisitesHoverState } from '../../atoms';

type Props = {
	boon: BoonType;
	disabled?: boolean;
	list: 'selected' | 'available';
	remoevBoon?: (boon: BoonType) => void;
	addBoon?: (boon: BoonType) => void;
	updateAddress?: (rarity: string) => void;
};

type BoonRarityProps = {
	boon: BoonType;
	list: 'selected' | 'available';
	setRarity: (o: 'next' | 'prev', boon: BoonType) => string;
	updateAddress?: (rarity: string) => void;
	removeBoon?: (boon: BoonType) => void;
};

type ExtraStatsProps = {
	boon: BoonType;
};

const allIds = (() => {
	const obj: { [key: number]: { id: number; name: string; god: string } } = {};
	Object.keys(data.boons).forEach((godKey) => {
		// @ts-ignore
		data.boons[godKey as GodsStrings | 'duo'].boons.forEach((boon) => {
			obj[boon.id] = { id: boon.id, name: boon.name, god: godKey };
		});
	});
	return obj;
})();

const rarityOrder = ['common', 'rare', 'epic', 'heroic'];

const ExtraStats: React.FunctionComponent<ExtraStatsProps> = ({ boon }) => {
	const stat = boon.extraStats.find((s) => s.rarity === boon.activeRarity);
	return (
		<>
			{!boon.activeRarity && boon.extraStats.length > 0 && (
				<>
					<div className='boon-extra-stats-description'>{boon.extraStats[0].description}</div>
					<div className='boon-extra-stats-value'>{utils.replacePlaceholders(boon.extraStats[0].value)}</div>
				</>
			)}
			{boon.extraStats.length > 0 && stat && (
				<>
					<div className='boon-extra-stats-description'>{stat.description}</div>
					<div className='boon-extra-stats-value'>{utils.replacePlaceholders(stat.value)}</div>
				</>
			)}
		</>
	);
};

const BoonRarity: React.FunctionComponent<BoonRarityProps> = ({ boon, list, setRarity, updateAddress, removeBoon }) => {
	return (
		<>
			{!boon.legendary && !boon.duo && (
				<div
					className='switcher1'
					onClick={(event) => {
						event.stopPropagation();
						const rarity = setRarity('next', boon);
						updateAddress && updateAddress(rarity);
					}}
				>
					<div className='rarity-next-icon' />
				</div>
			)}
			<div className={`boon-rarity rarity-text ${utils.getTextColorClass(boon)}`}>{utils.getRarityText(boon)}</div>
			{!boon.legendary && !boon.duo && (
				<div
					className='switcher2'
					onClick={(event) => {
						event.stopPropagation();
						const rarity = setRarity('prev', boon);
						updateAddress && updateAddress(rarity);
					}}
				>
					<div className='rarity-prev-icon' />
				</div>
			)}
			{list === 'selected' && <div className='boon-icon-remove' onClick={() => removeBoon && removeBoon(boon)}></div>}
		</>
	);
};

export type BoonPrerequisitesSectionProps = { count: number; boons: { god: string; name: string }[] };

const BoonPrerequisitesSection: React.FunctionComponent<BoonPrerequisitesSectionProps> = ({ count, boons }) => {
	return (
		<div className='prerequisites-section' key={boons.map((b) => b.name).join()}>
			<h2>{`${utils.translateNumber(count)} of:`}</h2>
			<div className='prerequisites-grid'>
				{boons.map((b) => {
					return (
						<div key={b.name}>
							<img src={utils.replaceGodWithIcon(b.god as GodsStrings)} alt={b.god} />
							{b.name}
						</div>
					);
				})}
			</div>
		</div>
	);
};

const BoonPrerequisites: React.FunctionComponent<ExtraStatsProps> = ({ boon }) => {
	const hovered = useRecoilValue(prerequisiteHovered(boon.id)) ?? {};
	const [tooltip, setTooltip] = React.useState<BoonPrerequisitesSectionProps[]>([]);

	if (!boon.prerequisites.length || !hovered.hovered) {
		return <div className='boon-prerequisites' />;
	}
	if (!tooltip.length) {
		setTooltip(
			boon.prerequisites.map((prereq) => ({
				count: prereq.count,
				boons: prereq.ids.map((id) => ({ name: allIds[id].name, god: allIds[id].god })),
			}))
		);
	}

	const style: { [key: string]: string } = { '--x': `${hovered.x ?? 0}px`, '--y': `${hovered.y ?? 0}px` };

	return (
		<div className={`boon-prerequisites${hovered.hovered && boon.prerequisites.length ? ' visible' : ''}`} style={style}>
			{tooltip.map((t, index) => (
				<BoonPrerequisitesSection key={index} count={t.count} boons={t.boons} />
			))}
		</div>
	);
};

const BoonName: React.FunctionComponent<ExtraStatsProps> = ({ boon }) => {
	const triggerRef = React.useRef<HTMLSpanElement>(null);
	const setHovered = useSetRecoilState(prerequisitesHoverState);

	return (
		<div className={`boon-name ${utils.getTextColorClass(boon)}`}>
			{boon.name}
			{boon.prerequisites.length > 0 && (
				<span
					ref={triggerRef}
					className='prerequisites-trigger'
					onMouseEnter={() =>
						setHovered((oldState) => {
							const newState = { ...oldState };
							let y = triggerRef.current?.getBoundingClientRect().y ?? 0;
							const windowHeight = window.innerHeight;

							if (y > windowHeight - 150) {
								y = windowHeight - 150;
							}
							if (y < 100) {
								y = 100;
							}
							newState[boon.id] = {
								hovered: true,
								x: triggerRef.current?.getBoundingClientRect().x ?? 0,
								y,
							};
							return newState;
						})
					}
					onMouseLeave={() => {
						setHovered((oldState) => {
							const newState = { ...oldState, [boon.id]: { ...oldState[boon.id], hovered: false } };
							return newState;
						});
					}}
				>
					?
				</span>
			)}
		</div>
	);
};
export const Boon: React.FunctionComponent<Props> = (props) => {
	const [image, setImage] = React.useState<string | undefined>();
	const [boon, setBoon] = React.useState(props.boon);
	const boonRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		let canceled = false;
		(async () => {
			const image = boon.duo
				? await import(`../../assets/boons/duo/${boon.image}`)
				: await import(`../../assets/boons/${boon.god}/${boon.image}`);
			!canceled && setImage(image.default);
		})();

		return () => {
			canceled = true;
		};
	});

	const setRarity = (o: 'next' | 'prev', boon: BoonType): string => {
		const index = rarityOrder.findIndex((r) => r === boon.activeRarity);
		if (o === 'next') {
			const newRarity = rarityOrder[(index + 1) % rarityOrder.length];
			setBoon({ ...boon, activeRarity: newRarity });
			return newRarity;
		} else {
			const newIndex = index - 1 < 0 ? rarityOrder.length - 1 : index - 1;
			setBoon({ ...boon, activeRarity: rarityOrder[newIndex] });
			return rarityOrder[newIndex];
		}
	};

	return (
		<div ref={boonRef} className={`boon`} onClick={() => !props.disabled && props.addBoon && props.addBoon(boon)}>
			{image && (
				<>
					<div className={`boon-icon-bg ${utils.getBackgroundClassName(boon)}`} />
					<div className='boon-icon'>
						<img className='boon-icon-image' src={image} alt={boon.name} width='100' height='100' />
					</div>
					<div className='boon-stats'>
						<BoonName boon={boon} />
						<BoonRarity
							boon={boon}
							list={props.list}
							removeBoon={props.remoevBoon}
							setRarity={setRarity}
							updateAddress={props.updateAddress}
						/>
						<div className='boon-description'>{utils.replacePlaceholders(boon.description)}</div>
						<ExtraStats boon={boon} />
					</div>

					{props.disabled && <div className='disabled'></div>}
					<BoonPrerequisites boon={boon} />
				</>
			)}
		</div>
	);
};

import React from 'react';

type Props = {
	className?: string;
	title: string;
	additionalTitleContent?: React.ReactNode;
	collapsible?: boolean;
};

export const Card: React.FunctionComponent<Props> = ({ title, additionalTitleContent, children, className, collapsible }) => {
	const [collapsed, setCollapsed] = React.useState(false);
	return (
		<div className={`card ${className}`}>
			<div className={`card-title-container ${additionalTitleContent ? 'additional-title-content' : ''}`}>
				{collapsible && <div className={`card-btn-collapse${collapsed ? ' collapsed' : ''}`} onClick={() => setCollapsed((c) => !c)}></div>}
				<div className='card-title'>{title}</div>
				{additionalTitleContent && <div className='card-additional-content'>{additionalTitleContent}</div>}
			</div>
			{!collapsed && <div className='card-content'>{children}</div>}
		</div>
	);
};

/**
 * WordPress dependencies
 */
import React from 'react';
import clsx from 'clsx';
import { createSlotFill } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getTabsContainerProps } from './style';

/**
 * Create a unique SlotFill pair using a Symbol to avoid name collisions.
 */
const { Fill, Slot } = createSlotFill(Symbol('BlaBlaBlocksTabsList'));

/**
 * TabFill Component
 *
 * This component registers a Fill for the BlaBlaBlocksTabsList Slot.
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children     - Elements to be rendered inside the Fill.
 * @param {string}          props.tabsClientId - Unique identifier used to scope the Fill to a specific Tabs instance.
 * @return {JSX.Element} A Fill component scoped to the specified Tabs instance.
 */
export const TabFill = ({ children, tabsClientId }) => {
	return <Fill name={`BlaBlaBlocksTabsList-${tabsClientId}`}>{children}</Fill>;
};

/**
 * BlaBlaBlocksTabsListSlot Component
 *
 * This component renders the Slot for a specific Tabs instance.
 * Any TabFill with a matching name will render inside this Slot.
 *
 * @param {Object} props
 * @param {string} props.tabsClientId - Unique identifier used to scope the Slot to a specific Tabs instance.
 * @param {Object} props.attributes   - Block attributes used to derive styling props.
 * @return {JSX.Element} A Slot component that renders TabFill components matching the specified Tabs instance.
 */
export const TabsListSlot = ({ tabsClientId, attributes }) => {
	const { className, style } = getTabsContainerProps(attributes);

	return (
		<Slot
			name={`BlaBlaBlocksTabsList-${tabsClientId}`}
			bubblesVirtually
			as="div"
			role="tablist"
			className={clsx(className, 'blablablocks-tabs-buttons')}
			style={style}
		/>
	);
};

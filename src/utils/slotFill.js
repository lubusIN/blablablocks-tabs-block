/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';

/**
 * Create a unique SlotFill pair using a Symbol to avoid name collisions.
 */
const { Fill, Slot } = createSlotFill( Symbol( 'TabsList' ) );

/**
 * TabFill Component
 *
 * This component registers a Fill for the TabsList Slot.
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children     - Elements to be rendered inside the Fill.
 * @param {string}          props.tabsClientId - Unique identifier used to scope the Fill to a specific Tabs instance.
 * @return {JSX.Element} A Fill component scoped to the specified Tabs instance.
 */
export const TabFill = ( { children, tabsClientId } ) => {
	return <Fill name={ `TabsList-${ tabsClientId }` }>{ children }</Fill>;
};

/**
 * TabsListSlot Component
 *
 * This component renders the Slot for a specific Tabs instance.
 * Any TabFill with a matching name will render inside this Slot.
 *
 * @param {Object} props
 * @param {string} props.tabsClientId - Unique identifier used to scope the Slot to a specific Tabs instance.
 * @return {JSX.Element} A Slot component that renders TabFill components matching the specified Tabs instance.
 */
export const TabsListSlot = ( { tabsClientId } ) => {
	return (
		<Slot
			name={ `TabsList-${ tabsClientId }` }
			bubblesVirtually
			as="div"
			role="tablist"
			className="blablablocks-tabs-buttons"
		/>
	);
};

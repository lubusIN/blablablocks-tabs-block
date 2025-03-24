/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';

const { Fill, Slot } = createSlotFill( 'TabsList' );

export const TabFill = ( { children, tabsClientId } ) => {
	return <Fill name={ `TabsList-${ tabsClientId }` }>{ children }</Fill>;
};

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

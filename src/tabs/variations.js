/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TabsLogo, TabsVerticalLogo } from '../components';

/**
 * Template option choices for predefined tabs layouts.
 */
const variations = [
	{
		name: 'horizontal-tabs',
		title: __( 'Horizontal', 'blablablocks-tabs-block' ),
		description: __( 'Horizontal', 'blablablocks-tabs-block' ),
		icon: TabsLogo,
		attributes: {
			orientation: 'horizontal',
		},
		innerBlocks: [ [ 'blablablocks/tab' ], [ 'blablablocks/tab' ] ],
		scope: [ 'block' ],
	},
	{
		name: 'vertical-tabs',
		title: __( 'Vertical', 'blablablocks-tabs-block' ),
		description: __( 'Vertical', 'blablablocks-tabs-block' ),
		icon: TabsVerticalLogo,
		attributes: {
			orientation: 'vertical',
		},
		innerBlocks: [ [ 'blablablocks/tab' ], [ 'blablablocks/tab' ] ],
		scope: [ 'block' ],
	},
];

export default variations;

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
        title: __('Horizontal Tabs', 'blablablocks-tabs-block'),
        description: __('Horizontal Tabs', 'blablablocks-tabs-block'),
        icon: TabsLogo,
        attributes: {
            orientation: 'row',
        },
        innerBlocks: [
            ['blablablocks/tab'],
            ['blablablocks/tab'],
        ],
        scope: ['block'],
    },
    {
        name: 'vertical-tabs',
        title: __('Vertical Tabs', 'blablablocks-tabs-block'),
        description: __('Vertical Tabs', 'blablablocks-tabs-block'),
        icon: TabsVerticalLogo,
        attributes: {
            orientation: 'column',
        },
        innerBlocks: [
            ['blablablocks/tab'],
            ['blablablocks/tab'],
        ],
        scope: ['block'],
    }
];

export default variations;

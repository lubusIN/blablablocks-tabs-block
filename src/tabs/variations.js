/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Path, SVG, G } from '@wordpress/components';

/**
 * Template option choices for predefined tabs layouts.
 */
const variations = [
    {
        name: 'horizontal-tab',
        title: __('Horizontal Tab', 'blablablocks-tabs-block'),
        description: __('Horizontal Tab', 'blablablocks-tabs-block'),
        icon: (
            <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" x="0px" y="0px"><G data-name="Layer 2"><Path d="M27,9V8a3,3,0,0,0-3-3H17.22A2.985,2.985,0,0,0,15,4H8A3,3,0,0,0,5,7V9a3,3,0,0,0-3,3V25a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V12A3,3,0,0,0,27,9ZM24,7a1,1,0,0,1,1,1V9H18V7Zm4,18a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H6a1,1,0,0,0,1-1V7A1,1,0,0,1,8,6h7a1,1,0,0,1,1,1v3a1,1,0,0,0,1,1H27a1,1,0,0,1,1,1Z"/></G></SVG>
        ),
        innerBlocks: [
            ['blablablocks/tab'],
            ['blablablocks/tab'],
            ['blablablocks/tab'],
            ['blablablocks/tab'],
        ],
        scope: ['block'],
    },
    {
        name: 'vertical-tab',
        title: __('Vertical Tab', 'blablablocks-tabs-block'),
        description: __('Vertical Tab', 'blablablocks-tabs-block'),
        icon: (
            <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" x="0px" y="0px"><G data-name="Layer 2"><Path d="M27,4H5A3,3,0,0,0,2,7v3a3,3,0,0,0,2,2.816V24a3,3,0,0,0,3,3H9.78A2.985,2.985,0,0,0,12,28H27a3,3,0,0,0,3-3V7A3,3,0,0,0,27,4ZM9,18H6V13H9ZM7,25a1,1,0,0,1-1-1V20H9v5Zm21,0a1,1,0,0,1-1,1H12a1,1,0,0,1-1-1V12a1,1,0,0,0-1-1H5a1,1,0,0,1-1-1V7A1,1,0,0,1,5,6H27a1,1,0,0,1,1,1Z" /></G></SVG>
        ),
        innerBlocks: [
            ['blablablocks/tab', {}, [['core/cover']]],
            ['blablablocks/tab', {}, [['core/cover']]],
            ['blablablocks/tab', {}, [['core/cover']]],
        ],
        scope: ['block'],
    },
];

export default variations;

/**
 * Wordpress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { TabLogo } from '../components';

/**
 * Register a slide block
 */
registerBlockType(metadata.name, {
	icon: TabLogo,
	edit: Edit,
	save,
});

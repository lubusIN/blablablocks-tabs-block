/**
 * Wordpress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { TabsLogo } from '../components';

/**
 * Register a tabs block
 */
registerBlockType(metadata.name, {
	icon: TabsLogo,
	edit: Edit,
	save,
});

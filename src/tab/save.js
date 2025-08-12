/**
 * Wordpress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @return {JSX.Element}	The block's save component.
 */
export default function save() {
	return <InnerBlocks.Content />;
}

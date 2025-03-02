/**
 * Wordpress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 */
export default function save({ attributes }) {
    const blockProps = useBlockProps.save();
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return (
        <div
            {...innerBlocksProps}
            data-wp-context={`{ "tab": ${JSON.stringify({ id: attributes.tabId })} }`}
            data-wp-bind--hidden="!state.isActive"
            data-wp-watch="state.isActive"
        />
    );
}

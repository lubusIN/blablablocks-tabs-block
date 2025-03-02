/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    store as blockEditorStore,
    InnerBlocks,
    useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './editor.scss';
import { useEffect } from '@wordpress/element';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.clientId      The client ID for this block instance.
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 *
 * @return {JSX.Element} The component rendering for the block editor.
 */
export default function Edit({ clientId, attributes, setAttributes }) {

    const { hasChildBlocks } = useSelect(
        (select) => {
            const { getBlockOrder } = select(blockEditorStore);
            return {
                hasChildBlocks: getBlockOrder(clientId).length > 0,
            };
        },
        [clientId]
    );

    // Get all ancestors of type 'blablablocks/tabs'
    const parentBlocks = useSelect((select) =>
        select('core/block-editor').getBlockParentsByBlockName(clientId, ['blablablocks/tabs']),
        [clientId]);

    // Get the closest 'blablablocks/tabs' parent
    const closestParentBlockId = parentBlocks?.[parentBlocks.length - 1] || null;

    // Retrieve parent block attributes
    const parentAttributes = useSelect((select) =>
        closestParentBlockId ? select('core/block-editor').getBlock(closestParentBlockId)?.attributes : {},
        [closestParentBlockId]);

    // Retrieve sibling tabs within the parent block
    const siblingTabs = useSelect((select) =>
        closestParentBlockId ? select('core/block-editor').getBlock(closestParentBlockId)?.innerBlocks || [] : [],
        [closestParentBlockId]);

    // Extract orientation and active tab index from parent attributes
    const activeTabIndex = parentAttributes?.activeTab || 0;
    const isActive = siblingTabs.findIndex(tab => tab.clientId === clientId) === activeTabIndex;

    const blockProps = useBlockProps();

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        renderAppender: hasChildBlocks
            ? undefined
            : InnerBlocks.ButtonBlockAppender,
    });

    useEffect(() => {
        if (!attributes.tabId) {
            setAttributes({ tabId: clientId });
        }
    }, [clientId, attributes.tabId]);

    return (
        <>
            {isActive && (
                <div {...innerBlocksProps} />
            )}
        </>
    );
}
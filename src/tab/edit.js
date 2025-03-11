/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * The Edit component for the Tab block.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.clientId      The client ID for this block instance.
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * @return {JSX.Element} The component rendering for the block editor.
 */
export default function Edit({ clientId, attributes, setAttributes }) {
    /**
     * Retrieve block-related data using the `useSelect` hook.
     */
    const { hasChildBlocks, parentBlocks, closestParentBlockId, parentAttributes, siblingTabs } = useSelect(
        (select) => {
            const { getBlockOrder, getBlockParentsByBlockName, getBlock } = select('core/block-editor');
            const parentBlocks = getBlockParentsByBlockName(clientId, ['blablablocks/tabs']);
            const closestParentBlockId = parentBlocks?.[parentBlocks.length - 1] || null;
            const parentAttributes = closestParentBlockId ? getBlock(closestParentBlockId)?.attributes : {};
            const siblingTabs = closestParentBlockId ? getBlock(closestParentBlockId)?.innerBlocks || [] : [];

            return {
                hasChildBlocks: getBlockOrder(clientId).length > 0,
                parentBlocks,
                closestParentBlockId,
                parentAttributes,
                siblingTabs,
            };
        },
        [clientId]
    );

    /**
     * Determine the active tab index from the parent block's attributes.
     * @type {number}
     */
    const activeTabIndex = parentAttributes?.activeTab || 0;

    /**
     * Check if the current tab is the active tab.
     * @type {boolean}
     */
    const isActive = siblingTabs.findIndex((tab) => tab.clientId === clientId) === activeTabIndex;

    /**
     * Props for the block container.
     * @type {Object}
     */
    const blockProps = useBlockProps();

    /**
     * Props for the inner blocks container.
     * @type {Object}
     */
    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        renderAppender: hasChildBlocks ? undefined : InnerBlocks.ButtonBlockAppender,
    });

    /**
     * Set the `tabId` attribute if it doesn't already exist.
     * This ensures each tab has a unique identifier.
     */
    useEffect(() => {
        if (!attributes.tabId) {
            setAttributes({ tabId: clientId });
        }
    }, [clientId, attributes.tabId, setAttributes]);

    /**
     * Render the inner blocks only if the current tab is active.
     */
    return (
        <>
            {isActive && (
                <div {...innerBlocksProps} />
            )}
        </>
    );
}
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.scss';
import Settings from './settings';
import Styles from './styles';
import { generateStyles } from '../utils/style';

/**
 * Default block configuration.
 * @type {Object}
 */
const DEFAULT_BLOCK = {
	name: 'blablablocks/tab',
};

/**
 * Template for initial inner blocks.
 * @type {Array}
 */
const TABS_TEMPLATE = [
	['blablablocks/tab', { tabname: 'Tab 1' }],
	['blablablocks/tab', { tabname: 'Tab 2' }],
];

/**
 * The Edit component for the Tabs block.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.clientId      The client ID for this block instance.
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * @return {JSX.Element} The component rendering for the block editor.
 */
export default function Edit({ clientId, attributes, setAttributes }) {
	const { allowedBlocks, activeTab } = attributes;
	const { insertBlock, selectBlock, updateBlockAttributes } = useDispatch(blockEditorStore);

	/**
	 * Get the inner blocks of the current block.
	 * @type {Array}
	 */
	const innerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(clientId),
		[clientId]
	);

	/**
	 * Get the currently selected block's client ID in the editor.
	 * @type {string}
	 */
	const selectedBlockClientId = useSelect(
		(select) => select(blockEditorStore).getSelectedBlockClientId(),
		[]
	);

	/**
	 * Update the activeTab attribute when a tab is selected from the List View.
	 */
	useEffect(() => {
		if (selectedBlockClientId) {
			const selectedTabIndex = innerBlocks.findIndex(
				(tab) => tab.clientId === selectedBlockClientId
			);

			if (selectedTabIndex !== -1 && selectedTabIndex !== activeTab) {
				setAttributes({ activeTab: selectedTabIndex });
			}
		}
	}, [selectedBlockClientId, innerBlocks, activeTab, setAttributes]);

	/**
	 * Add a new tab to the block.
	 */
	const addTab = useCallback(() => {
		const tabNumber = innerBlocks.length + 1;
		const block = createBlock('blablablocks/tab', {
			tabname: `Tab ${tabNumber}`,
			isDefault: false
		});

		insertBlock(block, innerBlocks.length, clientId, false);
		const newActiveTabIndex = innerBlocks.length;
		setAttributes({ activeTab: newActiveTabIndex });
		selectBlock(block.clientId);
	}, [innerBlocks.length, clientId, insertBlock, setAttributes, selectBlock]);

	/**
	 * Props for the block container.
	 * @type {Object}
	 */
	const blockProps = useBlockProps({
		className: 'blablablocks-tabs',
		style: generateStyles(attributes),
	});

	/**
	 * Props for the inner blocks container.
	 * @type {Object}
	 */
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			template: TABS_TEMPLATE,
			__experimentalCaptureToolbars: true,
			templateLock: false,
			defaultBlock: DEFAULT_BLOCK,
			orientation: 'horizontal',
			allowedBlocks,
		}
	);

	/**
	 * Update the tabs attribute when inner blocks change.
	 */
	useEffect(() => {
		const newTabs = innerBlocks.map((tab) => ({
			id: tab.attributes.tabId || tab.clientId,
			label: tab.attributes.tabname,
			icon: tab.attributes.tabIcon,
			isDefault: tab.attributes.isDefault
		}));
		setAttributes({ tabs: newTabs });
	}, [innerBlocks, setAttributes]);

	return (
		<>
			<div {...blockProps}>
				{innerBlocksProps.children}
			</div>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton onClick={addTab}>
						{__('Add Tab', 'blablablocks-tabs-block')}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<Settings attributes={attributes} setAttributes={setAttributes} />
			<Styles attributes={attributes} setAttributes={setAttributes} />
		</>
	);
}
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
	RichText,
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
	const { allowedBlocks, activeTab, orientation, verticalPosition, justification } = attributes;
	const { insertBlock, selectBlock, updateBlockAttributes } = useDispatch(blockEditorStore);

	/**
	 * Style for the tab buttons container.
	 * @type {Object}
	 */
	const buttonStyle = {
		display: 'flex',
		justifyContent: justification || 'left',
		flexDirection: orientation || 'column',
	};

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
		});

		insertBlock(block, innerBlocks.length, clientId, false);
		const newActiveTabIndex = innerBlocks.length;
		setAttributes({ activeTab: newActiveTabIndex });
		selectBlock(block.clientId);
	}, [innerBlocks.length, clientId, insertBlock, setAttributes, selectBlock]);

	/**
	 * Set the active tab and select it in the editor.
	 *
	 * @param {number} index The index of the tab to set as active.
	 */
	const setActiveTab = (index) => {
		updateBlockAttributes(clientId, { activeTab: index });
		selectBlock(innerBlocks[index].clientId);
	};

	/**
	 * Generate styles based on block attributes.
	 * @type {Object}
	 */
	const applyStyles = generateStyles(attributes);

	/**
	 * Props for the block container.
	 * @type {Object}
	 */
	const blockProps = useBlockProps({
		className: 'blablablocks-tabs',
		style: {
			...applyStyles,
			display: orientation === 'column' ? 'flex' : '',
			flexDirection: orientation === 'column' && verticalPosition === 'right' ? 'row-reverse' : 'row',
		},
	});

	/**
	 * Props for the inner blocks container.
	 * @type {Object}
	 */
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			template: TABS_TEMPLATE,
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
		}));
		setAttributes({ tabs: newTabs });
	}, [innerBlocks, setAttributes]);

	return (
		<>
			<div {...blockProps}>
				{/* Tab Buttons */}
				<div className="blablablocks-tabs-buttons" style={buttonStyle}>
					{innerBlocks.map((tab, index) => (
						<div
							className={`blablablock-tab-btn ${activeTab === index ? 'is-bbb-active-tab' : ''}`}
							key={tab.clientId}
							onClick={() => setActiveTab(index)}
						>
							<RichText
								tagName="div"
								className="tab-button-text"
								aria-label={__('Tab name')}
								placeholder={__('Add tab name...')}
								allowedFormats={['core/bold', 'core/italic']}
								value={tab.attributes.tabname}
								onChange={(value) => {
									updateBlockAttributes(tab.clientId, { tabname: value });
								}}
							/>
						</div>
					))}
				</div>
				{/* Tab Content */}
				<div {...innerBlocksProps}></div>
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
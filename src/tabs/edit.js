/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import {
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	store as blockEditorStore,
	RichText,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.scss';
import Placeholder from './placeholder';
import Settings from './settings';
import Styles from './styles';
import { generateStyles } from '../utils/style';

const DEFAULT_BLOCK = {
	name: 'blablablocks/tab',
};

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
	const { allowedBlocks } = attributes;
	const { insertBlock, selectBlock, updateBlockAttributes } = useDispatch(blockEditorStore);

	// Check if inner blocks exist using useSelect
	const innerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(clientId),
		[clientId]
	);

	const hasInnerBlocks = innerBlocks.length > 0;

	const innerBlocksProps = useInnerBlocksProps({},
		{
			defaultBlock: DEFAULT_BLOCK,
			directInsert: true,
			orientation: 'horizontal',
			allowedBlocks
		}
	);

	const addTab = () => {
		const tabNumber = innerBlocks.length + 1; // Determine next tab number
		const block = createBlock('blablablocks/tab', {
			tabname: `Tab ${tabNumber}`,
		});
		insertBlock(block, innerBlocks.length, clientId, false);
		selectBlock(block.clientId);
	};

	const setActiveTab = (index) => {
		updateBlockAttributes(clientId, { activeTab: index });
	};

	const applyStyles = generateStyles(attributes);

	const blockProps = useBlockProps({
		className: 'blablablocks-tabs',
		style: {
			...applyStyles,
			display: attributes.orientation === 'column' ? 'flex' : '',
			flexDirection: attributes.orientation == 'column' && attributes.verticalPosition === 'right' ? 'row-reverse' : 'row'
		}
	});

	const buttonStyle = {
		display: 'flex',
		justifyContent: attributes.justification || 'left',
		flexDirection: attributes.orientation || 'column'
	};

	// Select child blocks and store them in attributes
	useEffect(() => {
		const newTabs = innerBlocks.map((tab) => ({
			id: tab.attributes.tabId || tab.clientId, // Prefer stored tabId (which is the initial clientId)
			label: tab.attributes.tabname,
		}));
		setAttributes({ tabs: newTabs });
	}, [innerBlocks, setAttributes]);

	return (
		<>
			<div {...blockProps}>
				{/* Tab Buttons */}
				<div className='blablablocks-tabs-buttons' style={buttonStyle}>
					{innerBlocks.map((tab, index) => (
						<div
							className={`blablablock-tab-btn ${attributes.activeTab === index ? 'is-bbb-active-tab' : ''}`}
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
				<div {...innerBlocksProps} />
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
	)
}

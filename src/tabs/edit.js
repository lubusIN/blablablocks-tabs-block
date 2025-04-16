/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.scss';
import Settings from './settings';
import Styles from './styles';
import { generateStyles } from '../utils/style';
import { TabFill } from '../utils/slotFill';
import Placeholder from './placeholder';

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
	const { allowedBlocks } = attributes;

	/**
	 * Get the inner blocks of the current block.
	 * @type {Array}
	 */
	const innerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(clientId),
		[clientId]
	);

	const hasInnerBlocks = innerBlocks.length > 0;

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
		blockProps,
		{
			template: TABS_TEMPLATE,
			__experimentalCaptureToolbars: true,
			templateLock: false,
			defaultBlock: DEFAULT_BLOCK,
			orientation: 'horizontal',
			allowedBlocks
		}
	);

	return hasInnerBlocks ? (
		<>
			<div {...innerBlocksProps}>
				{innerBlocksProps.children}
				<TabFill tabsClientId={clientId}>
					<div className="blablablocks-tab_inserter">
						<InnerBlocks.ButtonBlockAppender />
					</div>
				</TabFill>
			</div>
			<Settings
				attributes={attributes}
				setAttributes={setAttributes}
			/>
			<Styles attributes={attributes} setAttributes={setAttributes} />
		</>
	) : (
		<Placeholder clientId={clientId} setAttributes={setAttributes} />
	);
}

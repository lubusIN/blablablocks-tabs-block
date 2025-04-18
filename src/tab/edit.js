/**
 * WordPress dependencies
 */
import clsx from 'clsx';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useMemo, useState } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	BlockControls,
	store as blockEditorStore,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	ToolbarDropdownMenu,
	ToolbarGroup,
	ToggleControl,
	PanelBody,
	Modal,
	TextareaControl,
	Flex,
	FlexBlock,
	Card,
	Button,
	Notice,
	__experimentalVStack as VStack, // eslint-disable-line
	__experimentalHStack as HStack, // eslint-disable-line
} from '@wordpress/components';
import { code, reset } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { TabFill, TabsListSlot } from '../utils/slotFill';
import Placeholder from './placeholder';

/**
 * The Edit component for the Tab block.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.clientId      The client ID for this block instance.
 * @param {boolean}  props.isSelected    Whether the block is currently selected.
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * @return {JSX.Element} The component rendering for the block editor.
 */
export default function Edit({
	clientId,
	isSelected,
	attributes,
	setAttributes,
}) {
	const [isOpen, setOpen] = useState(false);
	const [svgCode, setSvgCode] = useState('');
	const [isSvgValid, setIsSvgValid] = useState(false);
	const [validationError, setValidationError] = useState('');
	const { updateBlockAttributes, selectBlock } =
		useDispatch(blockEditorStore);

	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	/**
	 * Validate the SVG code.
	 *
	 * @param {string} svg The SVG code to validate.
	 * @return {boolean} Whether the SVG is valid.
	 */
	const validateSvg = (svg) => {
		if (!svg.trim()) {
			setValidationError(
				__('Please paste your SVG code.', 'blablablocks-tabs-block')
			);
			return false;
		}

		// Basic SVG validation using a regex
		const svgRegex = /<svg[^>]*>(.*?)<\/svg>/gis;
		if (!svgRegex.test(svg)) {
			setValidationError(
				__(
					'Invalid SVG code. Please provide a valid SVG.',
					'blablablocks-tabs-block'
				)
			);
			return false;
		}

		// Clear any previous error
		setValidationError('');
		return true;
	};

	/**
	 * Handle SVG code changes.
	 * Updates the SVG code state and validates the new code.
	 *
	 * @param {string} value The new SVG code.
	 */
	const handleSvgCodeChange = (value) => {
		setSvgCode(value);
		setIsSvgValid(validateSvg(value));
	};

	/**
	 * Handle inserting the SVG.
	 */
	const handleInsertSvg = () => {
		if (isSvgValid) {
			setAttributes({ tabIcon: svgCode });
			closeModal();
		}
	};

	/**
	 * Retrieve block-related data using the `useSelect` hook.
	 */
	const {
		hasChildBlocks,
		tabsClientId,
		hasTabSelected,
		isDefaultTab,
		blockIndex,
		isTabsClientSelected,
		forceDisplay,
		hasInnerBlocksSelected,
		lastSelectedTabClientId
	} = useSelect(
		(select) => {
			const {
				getBlockOrder,
				getBlockIndex,
				getBlockRootClientId,
				getBlockAttributes,
				hasSelectedInnerBlock,
				isBlockSelected,
				getMultiSelectedBlocksEndClientId
			} = select('core/block-editor');

			const rootClientId = getBlockRootClientId(clientId);
			const parentBlockAttrs = getBlockAttributes(rootClientId);
			const innerHasTabSelected = hasSelectedInnerBlock(
				rootClientId,
				true
			);
			const innerHasInnerBlocksSelected = hasSelectedInnerBlock(
				clientId,
				true
			);
			const innerBlockIndex = getBlockIndex(clientId);
			const totalTabsCount = getBlockOrder(rootClientId).length;

			// Check if activeTab is a valid index and if this tab is the active one
			const activeTab = parentBlockAttrs?.activeTab;
			const isValidActiveTab =
				typeof activeTab === 'number' &&
				activeTab >= 0 &&
				activeTab < totalTabsCount;
			const innerIsDefaultTab = isValidActiveTab
				? activeTab === innerBlockIndex
				: innerBlockIndex === 0;
			const innerIsTabsClientSelected = isBlockSelected(rootClientId);

			return {
				blockIndex: innerBlockIndex,
				tabsClientId: rootClientId,
				hasChildBlocks: getBlockOrder(clientId).length > 0,
				hasInnerBlocksSelected: innerHasInnerBlocksSelected,
				isTabsClientSelected: innerIsTabsClientSelected,
				isDefaultTab: innerIsDefaultTab,
				forceDisplay: innerIsDefaultTab && innerIsTabsClientSelected,
				hasTabSelected: innerHasTabSelected,
				lastSelectedTabClientId: getMultiSelectedBlocksEndClientId()
			};

		},
		[clientId]
	);

	/**
	 * Determines if the current tab should be displayed as selected based on
	 * various selection states and conditions.
	 *
	 * @type {boolean}
	 */
	const isTabSelected = useMemo(() => {

		if (isSelected || hasInnerBlocksSelected || forceDisplay) {
			return true;
		}

		if (
			isDefaultTab &&
			!isTabsClientSelected &&
			!isSelected &&
			!hasTabSelected
		) {
			return true;
		}

		// If multiple tabs are selected, only show the last one
		if (hasTabSelected && lastSelectedTabClientId === clientId) {
			return true;
		}

		return false;
	}, [
		isSelected,
		hasInnerBlocksSelected,
		isDefaultTab,
		forceDisplay,
		isTabsClientSelected,
		hasTabSelected,
		lastSelectedTabClientId
	]);

	/**
	 * Props for the block container.
	 * @type {Object}
	 */
	const blockProps = useBlockProps({
		className: 'blablablocks-tab',
	});

	/**
	 * Props for the inner blocks container.
	 * @type {Object}
	 */
	const innerBlocksProps = useInnerBlocksProps();

	/**
	 * Sets the default tab by updating the `activeTab` attribute of the parent Tabs block.
	 *
	 * @param {boolean} value - The value to set for the active tab.
	 */
	const handleSetDefault = (value) => {
		updateBlockAttributes(tabsClientId, {
			activeTab: value ? blockIndex : 0,
		});
	};

	/**
	 * Set the `tabId` attribute.
	 *
	 * This effect ensures each tab has a unique identifier by setting the tabId
	 * attribute to the clientId.
	 */
	useEffect(() => {
		setAttributes({ tabId: clientId });
	}, [clientId, attributes.tabId, setAttributes]);

	return (
		<>
			<div {...blockProps}>
				<TabFill tabsClientId={tabsClientId}>
					<div
						className={clsx('blablablock-tab-btn', {
							'is-bbb-active-tab': isTabSelected,
						})}
						role="tab"
						aria-selected={isTabSelected}
						onClick={() => selectBlock(clientId)}
					>
						{ /* Render the tab icon if it exists */}
						{attributes.tabIcon && (
							<span
								className="bbb-tab-icon"
								dangerouslySetInnerHTML={{
									__html: attributes.tabIcon,
								}}
							/>
						)}
						{ /* Render the tab name */}
						<RichText
							tagName="span"
							className="tab-button-text"
							withoutInteractiveFormatting
							value={attributes.tabname}
							placeholder={__('Add tab name…')}
							onChange={(value) =>
								setAttributes({
									tabname: value,
								})
							}
						/>
					</div>
				</TabFill>
				{isTabSelected && (
					<>
						<TabsListSlot tabsClientId={tabsClientId} />
						{hasChildBlocks ? (
							<div {...innerBlocksProps} />
						) : (
							<Placeholder
								clientId={clientId}
								attributes={attributes}
							/>
						)}
					</>
				)}
			</div>

			<InspectorControls>
				<PanelBody
					title={__('Settings', 'blablablocks-tabs-block')}
					initialOpen={true}
				>
					<ToggleControl
						label={__(
							'Set as default tab',
							'blablablocks-tabs-block'
						)}
						checked={isDefaultTab}
						onChange={(value) => handleSetDefault(value)}
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<ToolbarGroup>
					<ToolbarDropdownMenu
						controls={[
							{
								icon: code,
								title: attributes.tabIcon
									? __(
										'Edit custom SVG icon',
										'blablablocks-tabs-block'
									)
									: __(
										'Add custom SVG icon',
										'blablablocks-tabs-block'
									),
								onClick: openModal,
							},
							{
								icon: reset,
								title: __(
									'Reset icon',
									'blablablocks-tabs-block'
								),
								onClick: () => {
									setAttributes({ tabIcon: '' });
									setSvgCode('');
									setIsSvgValid(false);
									setValidationError('');
								},
								isDisabled: !attributes.tabIcon,
							},
						]}
						text={
							attributes.tabIcon
								? __(
									'Replace icon',
									'blablablocks-tabs-block'
								)
								: __('Add Icon', 'blablablocks-tabs-block')
						}
						icon={''}
					/>
				</ToolbarGroup>
			</BlockControls>

			{isOpen && (
				<Modal
					className="bbb-custom-icon-modal"
					title={
						attributes.tabIcon
							? __(
								'Edit Custom Icon',
								'blablablocks-tabs-block'
							)
							: __('Add Custom Icon', 'blablablocks-tabs-block')
					}
					isFullScreen
					onRequestClose={closeModal}
				>
					<Flex
						align="stretch"
						gap={5}
						style={{ height: '100%' }}
					>
						<FlexBlock>
							<TextareaControl
								__nextHasNoMarginBottom
								className="bbb-icon-textarea"
								hideLabelFromVision
								placeholder="Paste your svg code here"
								value={svgCode || attributes.tabIcon}
								onChange={handleSvgCodeChange}
							/>
						</FlexBlock>
						<FlexBlock>
							<VStack
								spacing={5}
								justify="space-between"
								style={{ height: '100%' }}
							>
								<VStack spacing={5}>
									<Card
										style={{ height: '200px' }}
										isRounded={false}
									>
										<div
											className="bbb-icon-preview"
											dangerouslySetInnerHTML={{
												__html:
													svgCode ||
													attributes.tabIcon,
											}}
										/>
									</Card>
									{validationError && (
										<Notice
											status="error"
											isDismissible={false}
										>
											{validationError}
										</Notice>
									)}
								</VStack>
								<HStack justify="flex-end">
									<Button
										variant={'primary'}
										onClick={handleInsertSvg}
										disabled={!isSvgValid}
									>
										{__(
											'Insert custom icon',
											'blablablocks-tabs-block'
										)}
									</Button>
								</HStack>
							</VStack>
						</FlexBlock>
					</Flex>
				</Modal>
			)}
		</>
	);
}

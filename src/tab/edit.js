/**
 * WordPress dependencies
 */
import clsx from 'clsx';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import {
	useBlockProps,
	InnerBlocks,
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
import './editor.scss';
import { TabFill, TabsListSlot } from '../utils/slotFill';
import Placeholder from './placeholder';

/**
 * The Edit component for the Tab block.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.clientId      The client ID for this block instance.
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * @return {JSX.Element} The component rendering for the block editor.
 */
export default function Edit({ clientId, isSelected, attributes, setAttributes }) {
	const [isOpen, setOpen] = useState(false);
	const [svgCode, setSvgCode] = useState('');
	const [isSvgValid, setIsSvgValid] = useState(false);
	const [validationError, setValidationError] = useState('');

	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	/**
	 * Validate the SVG code.
	 *
	 * @param {string} svgCode The SVG code to validate.
	 * @return {boolean} Whether the SVG is valid.
	 */
	const validateSvg = (svgCode) => {
		if (!svgCode.trim()) {
			setValidationError(
				__('Please paste your SVG code.', 'blablablocks-tabs-block')
			);
			return false;
		}

		// Basic SVG validation using a regex
		const svgRegex = /<svg[^>]*>(.*?)<\/svg>/gis;
		if (!svgRegex.test(svgCode)) {
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
	const blockData = useSelect(
		(select) => {
			const {
				getBlockOrder,
				getBlockRootClientId,
				getBlockParentsByBlockName,
				getBlock,
				hasSelectedInnerBlock
			} = select('core/block-editor');

			const parentBlocks = getBlockParentsByBlockName(clientId, [
				'blablablocks/tabs',
			]);
			const closestParentBlockId =
				parentBlocks?.[parentBlocks.length - 1] || null;
			const parentBlockAttrs = closestParentBlockId
				? getBlock(closestParentBlockId)?.attributes
				: {};
			const siblingBlocks = closestParentBlockId
				? getBlock(closestParentBlockId)?.innerBlocks || []
				: [];
			const rootClientId = getBlockRootClientId(clientId);
			const hasInnerBlocksSelected = hasSelectedInnerBlock(
				clientId,
				true
			);

			return {
				tabsClientId: rootClientId,
				hasChildBlocks: getBlockOrder(clientId).length > 0,
				parentBlocks,
				closestParentBlockId,
				parentAttributes: parentBlockAttrs,
				siblingTabs: siblingBlocks,
				hasInnerBlocksSelected,
			};
		},
		[clientId]
	);

	const { hasChildBlocks, tabsClientId, parentAttributes, siblingTabs, hasInnerBlocksSelected } =
		blockData;

	const { updateBlockAttributes, selectBlock } = useDispatch(blockEditorStore);

	/**
	 * Check if the current tab is selected.
	 * @type {boolean}
	 */
	const isTabSelected = isSelected || hasInnerBlocksSelected || attributes.isDefault;

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
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			renderAppender: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	/**
	 * Sets the default tab by updating the `isDefault` attribute of the specified tab and
	 * resetting the `isDefault` attribute of all other tabs.
	 *
	 * @param {boolean} value - The value to set for the `isDefault` attribute.
	 */
	const handleSetDefault = (value) => {
		// Unmark all other tabs as default
		siblingTabs.forEach((tab) => {
			if (tab.clientId !== clientId && tab.attributes.isDefault) {
				updateBlockAttributes(tab.clientId, { isDefault: false });
			}
		});
		// Set the current tab as default
		setAttributes({ isDefault: value });
	};

	/**
	 * Set the `tabId` attribute if it doesn't already exist.
	 * This ensures each tab has a unique identifier.
	 */
	useEffect(() => {
		if (!attributes.tabId) {
			setAttributes({ tabId: clientId });
		}
	}, [clientId, attributes.tabId, setAttributes]);

	return (
		<div {...blockProps}>
			<TabFill tabsClientId={tabsClientId}>
				<div
					className={clsx('blablablock-tab-btn', {
						'is-bbb-active-tab': isTabSelected,
					})}
					role='button'
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
					{hasChildBlocks ?
						(<div {...innerBlocksProps} />)
						: (
							<Placeholder clientId={clientId} attributes={attributes} />
						)
					}
				</>
			)}

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
						checked={attributes.isDefault}
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
		</div>
	);
}

/**
 * WordPress dependencies
 */
import clsx from 'clsx';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useMemo } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	BlockControls,
	store as blockEditorStore,
	getTypographyClassesAndStyles as useTypographyProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { ToggleControl, PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { TabFill, TabsListSlot } from '../utils/slotFill';
import Placeholder from './placeholder';
import IconPicker from '../components/icon-picker';
import { getTabButtonStyles } from '../utils/style';

/**
 * The Edit component for the Tab block.
 *
 * @param {Object}   props               - Component props.
 * @param {string}   props.clientId      - The client ID for this block instance.
 * @param {boolean}  props.isSelected    - Whether the block is currently selected.
 * @param {Object}   props.attributes    - The block attributes.
 * @param {Function} props.setAttributes - Function to update block attributes.
 * @return {JSX.Element} The component rendering for the block editor.
 */
export default function Edit( {
	clientId,
	isSelected,
	attributes,
	setAttributes,
} ) {
	const { updateBlockAttributes, selectBlock } =
		useDispatch( blockEditorStore );

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
		lastSelectedTabClientId,
		parentAttrs,
	} = useSelect(
		( select ) => {
			const {
				getBlockOrder,
				getBlockIndex,
				getBlockRootClientId,
				getBlockAttributes,
				hasSelectedInnerBlock,
				isBlockSelected,
				getMultiSelectedBlocksEndClientId,
			} = select( 'core/block-editor' );

			const rootClientId = getBlockRootClientId( clientId );
			const parentBlockAttrs = getBlockAttributes( rootClientId );
			const innerHasTabSelected = hasSelectedInnerBlock(
				rootClientId,
				true
			);
			const innerHasInnerBlocksSelected = hasSelectedInnerBlock(
				clientId,
				true
			);
			const innerBlockIndex = getBlockIndex( clientId );
			const totalTabsCount = getBlockOrder( rootClientId ).length;

			// Check if activeTab is a valid index and if this tab is the active one
			const activeTab = parentBlockAttrs?.activeTab;
			const isValidActiveTab =
				typeof activeTab === 'number' &&
				activeTab >= 0 &&
				activeTab < totalTabsCount;
			const innerIsDefaultTab = isValidActiveTab
				? activeTab === innerBlockIndex
				: innerBlockIndex === 0;
			const innerIsTabsClientSelected = isBlockSelected( rootClientId );

			return {
				blockIndex: innerBlockIndex,
				tabsClientId: rootClientId,
				hasChildBlocks: getBlockOrder( clientId ).length > 0,
				hasInnerBlocksSelected: innerHasInnerBlocksSelected,
				isTabsClientSelected: innerIsTabsClientSelected,
				isDefaultTab: innerIsDefaultTab,
				forceDisplay: innerIsDefaultTab && innerIsTabsClientSelected,
				hasTabSelected: innerHasTabSelected,
				lastSelectedTabClientId: getMultiSelectedBlocksEndClientId(),
				parentAttrs: parentBlockAttrs,
			};
		},
		[ clientId ]
	);

	/**
	 * Determines if the current tab should be displayed as selected based on
	 * various selection states and conditions.
	 *
	 * @type {boolean}
	 */
	const isTabSelected = useMemo( () => {
		if ( isSelected || hasInnerBlocksSelected || forceDisplay ) {
			return true;
		}

		if (
			isDefaultTab &&
			! isTabsClientSelected &&
			! isSelected &&
			! hasTabSelected
		) {
			return true;
		}

		// If multiple tabs are selected, only show the last one
		if ( hasTabSelected && lastSelectedTabClientId === clientId ) {
			return true;
		}

		return false;
	}, [
		clientId,
		isSelected,
		hasInnerBlocksSelected,
		isDefaultTab,
		forceDisplay,
		isTabsClientSelected,
		hasTabSelected,
		lastSelectedTabClientId,
	] );

	const typographyProps = useTypographyProps( parentAttrs );

	/**
	 * Props for the block container.
	 * @type {Object}
	 */
	const blockProps = useBlockProps( {
		className: clsx(
			'blablablocks-tab',
			'blablablocks-tab-container',
			'blablablocks-tabs__' + parentAttrs.orientation,
			'blablablocks-tabs__' + parentAttrs.verticalPosition,
			'blablablocks-tabs-icon__' + parentAttrs.iconPosition
		),
	} );

	/**
	 * Props for the inner blocks container.
	 * @type {Object}
	 */
	const innerBlocksProps = useInnerBlocksProps( {
		className: 'blablablocks-tab-content',
		'aria-labelledby': `tab-${ attributes.tabId }`,
		id: `tab-${ attributes.tabId }`,
		role: 'tabpanel',
		tabIndex: isTabSelected ? 0 : -1,
	} );

	/**
	 * Sets the default tab by updating the `activeTab` attribute of the parent Tabs block.
	 *
	 * @param {boolean} value - The value to set for the active tab.
	 */
	const handleSetDefault = ( value ) => {
		updateBlockAttributes( tabsClientId, {
			activeTab: value ? blockIndex : 0,
		} );
	};

	/**
	 * Set the `tabId` attribute.
	 *
	 * This effect ensures each tab has a unique identifier by setting the tabId
	 * attribute to the clientId.
	 */
	useEffect( () => {
		setAttributes( { tabId: clientId } );
	}, [ clientId, attributes.tabId, setAttributes ] );

	return (
		<>
			<div { ...blockProps }>
				<TabFill tabsClientId={ tabsClientId }>
					<div
						id={ attributes.tabId }
						className={ clsx( 'blablablock-tab-btn', {
							'is-bbb-active-tab': isTabSelected,
						} ) }
						role="tab"
						tabIndex={ 0 }
						aria-selected={ isTabSelected }
						aria-controls={ attributes.tabId }
						onClick={ () => selectBlock( clientId ) }
						onKeyDown={ ( e ) => {
							if ( e.key === 'Enter' || e.key === ' ' ) {
								e.preventDefault();
								selectBlock( clientId );
							}
						} }
						{ ...getTabButtonStyles( parentAttrs, isTabSelected ) }
					>
						{ /* Render the tab icon if it exists */ }
						{ attributes.tabIcon && (
							<span
								className="bbb-tab-icon"
								dangerouslySetInnerHTML={ {
									__html: attributes.tabIcon,
								} }
							/>
						) }
						{ /* Render the tab name */ }
						<RichText
							tagName="span"
							className={ clsx(
								'tab-button-text',
								typographyProps.className
							) }
							withoutInteractiveFormatting
							value={ attributes.tabname }
							placeholder={ __( 'Add Tab Label…' ) }
							onChange={ ( value ) =>
								setAttributes( {
									tabname: value,
								} )
							}
							style={ typographyProps.style }
						/>
					</div>
				</TabFill>
				{ isTabSelected && (
					<>
						<TabsListSlot
							key={ blockIndex }
							tabsClientId={ tabsClientId }
							attributes={ parentAttrs }
						/>
						{ hasChildBlocks ? (
							<div { ...innerBlocksProps } />
						) : (
							<Placeholder clientId={ clientId } />
						) }
					</>
				) }
			</div>

			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'blablablocks-tabs-block' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __(
							'Set as default tab',
							'blablablocks-tabs-block'
						) }
						help={ __(
							'This tab will be active when the page first loads.',
							'blablablocks-tabs-block'
						) }
						checked={ isDefaultTab }
						onChange={ ( value ) => handleSetDefault( value ) }
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<IconPicker
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</BlockControls>
		</>
	);
}

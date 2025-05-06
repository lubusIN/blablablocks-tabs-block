/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import {
	Modal,
	Placeholder as PlaceholderComponent,
	Button,
    __experimentalGrid as Grid,		 	// eslint-disable-line
    __experimentalVStack as VStack, 	// eslint-disable-line
	__experimentalText as Text,			// eslint-disable-line
} from '@wordpress/components';
import {
	useBlockProps,
	BlockPreview,
    __experimentalBlockVariationPicker as BlockVariationPicker, // eslint-disable-line
	store as blockEditorStore,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import variations from './variations';
import { TabsLogo } from '../components';

/**
 * This component serves as a placeholder for the Tabs block, displaying a block variation picker.
 * It allows users to choose from predefined variations for initializing the block with default settings.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.clientId      The client ID for this block instance.
 * @param {Function} props.setAttributes Function to update block attributes.
 *
 * @return {JSX.Element} The placeholder component for the Tabs block.
 */
function Placeholder( { clientId, setAttributes } ) {
	const [ step, setStep ] = useState( null );
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const blockProps = useBlockProps();

	const defaultPatterns = [];

	const onSelectVariation = ( variation ) => {
		if ( variation?.attributes ) {
			setAttributes( variation.attributes );
		}
		if ( variation?.innerBlocks ) {
			replaceInnerBlocks(
				clientId,
				createBlocksFromInnerBlocksTemplate( variation.innerBlocks ),
				true
			);
		}
	};

	const openTemplatesModal = () => {
		setIsModalOpen( true );
	};

	const applyPattern = ( pattern ) => {
		const parsedBlocks = wp.blocks.parse( pattern.content );
		wp.data
			.dispatch( 'core/block-editor' )
			.replaceBlock( clientId, parsedBlocks );
		setIsModalOpen( false );
	};

	return (
		<div { ...blockProps }>
			{ ! step && (
				<PlaceholderComponent
					icon={ TabsLogo }
					instructions={ __(
						'Choose a template or start blank',
						'blablablocks-tabs-block'
					) }
					label={ __( 'Tabs', 'blablablocks-tabs-block' ) }
				>
					<Button variant="primary" onClick={ openTemplatesModal }>
						{ __( 'Choose', 'blablablocks-tabs-block' ) }
					</Button>
					<Button
						variant="secondary"
						onClick={ () => setStep( 'variations' ) }
					>
						{ __( 'Start blank', 'blablablocks-tabs-block' ) }
					</Button>
				</PlaceholderComponent>
			) }

			{ step === 'variations' && (
				<BlockVariationPicker
					icon={ TabsLogo }
					label={ __( 'Tabs', 'blablablocks-tabs-block' ) }
					instructions={ __(
						'Select a variation to start',
						'blablablocks-tabs-block'
					) }
					variations={ variations }
					onSelect={ ( variation = variations[ 0 ] ) => {
						onSelectVariation( variation );
					} }
					allowSkip
				/>
			) }

			{ isModalOpen && (
				<Modal
					title={ __(
						'Choose a Template',
						'blablablocks-slider-block'
					) }
					isFullScreen
					onRequestClose={ () => setIsModalOpen( false ) }
				>
					<Grid gap={ 4 } columns={ [ 1, 2, 3 ] } align="start">
						{ defaultPatterns?.map( ( pattern ) => (
							<Button
								key={ pattern.name }
								className={ 'slider-pattern-item' }
								onClick={ () => applyPattern( pattern ) }
								style={ { width: '100%', height: '100%' } }
							>
								<VStack
									alignment="top"
									align="left"
									style={ { width: '100%', height: '100%' } }
								>
									<BlockPreview
										blocks={ wp.blocks.parse(
											pattern.content
										) }
									/>
									<Text align="left" size={ 12 }>
										{ pattern.title }
									</Text>
								</VStack>
							</Button>
						) ) }
					</Grid>
				</Modal>
			) }
		</div>
	);
}

export default Placeholder;

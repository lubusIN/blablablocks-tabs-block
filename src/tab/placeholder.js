/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useCallback } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate, parse } from '@wordpress/blocks';
import {
	Modal,
	Placeholder as PlaceholderComponent,
	Button,
	Notice,
} from '@wordpress/components';
import {
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { TabLogo, PatternSidebar, PatternList } from '../components';

/**
 * This component serves as a placeholder for the Tab block, displaying a block variation picker.
 * It allows users to choose from predefined variations for initializing the block with default settings.
 *
 * @param {Object} props            Component props.
 * @param {string} props.clientId   The client ID for this block instance.
 * @param {Object} props.attributes The Attributes for this block.
 * @return {JSX.Element} The placeholder component for the Tabs block.
 */
function Placeholder( { clientId, attributes } ) {
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const blockProps = useBlockProps( { className: 'bbb-tab-placeholder' } );
	const [ step, setStep ] = useState( null );
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ selectedCategory, setSelectedCategory ] = useState( null );
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ error, setError ] = useState( null );

	/**
	 * Creates a blank tab with default content
	 */
	const handleSkip = useCallback( () => {
		try {
			const defaultTemplate = [ [ 'core/paragraph' ] ];
			const blocks =
				createBlocksFromInnerBlocksTemplate( defaultTemplate );
			replaceInnerBlocks( clientId, blocks, true );
			setStep( 'blank' );
		} catch ( err ) {
			setError(
				__(
					'Failed to create blank tab. Please try again.',
					'blablablocks-tabs-block'
				)
			);
		}
	}, [ clientId, replaceInnerBlocks ] );

	/**
	 * Applies a selected pattern to the tab content
	 *
	 * @param {Object} pattern - The pattern object containing content to apply
	 */
	const applyPattern = useCallback(
		( pattern ) => {
			if ( ! pattern || ! pattern.content ) {
				setError(
					__(
						'Invalid pattern selected. Please choose another pattern.',
						'blablablocks-tabs-block'
					)
				);
				return;
			}

			try {
				const parsedBlocks = parse( pattern.content );

				if ( ! parsedBlocks || parsedBlocks.length === 0 ) {
					throw new Error( 'No valid blocks found in pattern' );
				}

				replaceInnerBlocks( clientId, parsedBlocks, true );
				setIsModalOpen( false );
				setStep( 'pattern' );
			} catch ( err ) {
				setError(
					__(
						'Failed to apply pattern. Please try another one.',
						'blablablocks-tabs-block'
					)
				);
			}
		},
		[ clientId, replaceInnerBlocks ]
	);

	/**
	 * Clears current error message
	 */
	const dismissError = () => {
		setError( null );
	};

	/**
	 * Opens pattern selection modal
	 */
	const openPatternModal = () => {
		setIsModalOpen( true );
		setError( null );
	};

	/**
	 * Closes pattern selection modal
	 */
	const closePatternModal = () => {
		setIsModalOpen( false );
	};

	return (
		<div { ...blockProps }>
			{ error && (
				<Notice
					status="error"
					isDismissible={ true }
					onRemove={ dismissError }
				>
					{ error }
				</Notice>
			) }

			{ ! step && (
				<PlaceholderComponent
					icon={ TabLogo }
					instructions={ __(
						'Choose a pattern or skip.',
						'blablablocks-tabs-block'
					) }
					/* translators: %s: the name the user has given this tab */
					label={ sprintf(
						/* translators: %s: the name the user has given this tab */
						__( 'Tab: %s', 'blablablocks-tabs-block' ),
						attributes.tabname ?? ''
					) }
				>
					<Button variant="primary" onClick={ openPatternModal }>
						{ __( 'Choose', 'blablablocks-tabs-block' ) }
					</Button>
					<Button variant="link" onClick={ handleSkip }>
						{ __( 'Skip', 'blablablocks-tabs-block' ) }
					</Button>
				</PlaceholderComponent>
			) }

			{ isModalOpen && (
				<Modal
					title={ __( 'Patterns', 'blablablocks-tabs-block' ) }
					isFullScreen
					onRequestClose={ closePatternModal }
				>
					<div className="bbb-tabs-patterns-container">
						<PatternSidebar
							selectedCategory={ selectedCategory }
							setSelectedCategory={ setSelectedCategory }
							setSearchTerm={ setSearchTerm }
							searchTerm={ searchTerm }
						/>
						<PatternList
							selectedCategory={ selectedCategory }
							searchTerm={ searchTerm }
							onSelect={ applyPattern }
							onError={ setError }
						/>
					</div>
				</Modal>
			) }
		</div>
	);
}

export default Placeholder;

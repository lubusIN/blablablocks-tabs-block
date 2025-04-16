/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEffect, useState, useMemo } from '@wordpress/element';
import { BlockPreview } from '@wordpress/block-editor';
import {
	Button,
	Spinner,
	Notice,
	__experimentalGrid as Grid,			// eslint-disable-line
	__experimentalVStack as VStack,		// eslint-disable-line
	__experimentalText as Text,     	// eslint-disable-line
} from '@wordpress/components';

// Constants
const PATTERNS_PER_PAGE = 20;
const LOADING_DELAY = 300; // ms

/**
 * Component for displaying a list of block patterns with search and selection functionality.
 *
 * @param {Object}   props                  - The component props.
 * @param {string}   props.clientId         - The client ID of the block editor instance.
 * @param {string}   props.selectedCategory - The currently selected category for filtering patterns.
 * @param {string}   props.searchTerm       - The current search term for filtering patterns by title.
 * @param {Function} props.onSelect         - Callback function triggered when a pattern is selected.
 *
 * @return {JSX.Element} The rendered PatternList component.
 */
const PatternList = ( {
	clientId,
	selectedCategory,
	searchTerm,
	onSelect,
} ) => {
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ error, setError ] = useState( null );

	// Get patterns from store with error handling
	const { patterns, hasResolved } = useSelect(
		( select ) => {
			try {
				const coreSelect = select( 'core' );
				return {
					patterns: coreSelect.getBlockPatterns(),
					hasResolved:
						coreSelect.hasFinishedResolution( 'getBlockPatterns' ),
				};
			} catch ( err ) {
				return { patterns: [], hasResolved: true, error: err };
			}
		},
		[ selectedCategory ]
	);

	// Reset to page 1 when search or category changes
	useEffect( () => {
		setCurrentPage( 1 );
	}, [ searchTerm, selectedCategory ] );

	// Handle loading state
	useEffect( () => {
		setIsLoading( true );

		if ( ! hasResolved ) {
			return;
		}

		const timeout = setTimeout(
			() => setIsLoading( false ),
			LOADING_DELAY
		);
		return () => clearTimeout( timeout );
	}, [ patterns, searchTerm, hasResolved ] );

	// Filter patterns based on category and search term
	const filteredPatterns = useMemo( () => {
		if ( ! patterns || ! Array.isArray( patterns ) ) {
			return [];
		}

		return patterns.filter( ( pattern ) => {
			if ( ! pattern ) {
				return false;
			}

			const matchesCategory =
				! selectedCategory ||
				( pattern.categories &&
					pattern.categories.includes( selectedCategory ) );

			const matchesSearch =
				pattern.title &&
				pattern.title
					.toLowerCase()
					.includes( ( searchTerm || '' ).toLowerCase() );

			return matchesCategory && matchesSearch;
		} );
	}, [ patterns, selectedCategory, searchTerm ] );

	// Calculate pagination values
	const totalPages = Math.max(
		1,
		Math.ceil( ( filteredPatterns?.length || 0 ) / PATTERNS_PER_PAGE )
	);

	// Ensure current page is valid after filtering changes
	useEffect( () => {
		if ( currentPage > totalPages ) {
			setCurrentPage( totalPages );
		}
	}, [ totalPages, currentPage ] );

	// Get paginated patterns
	const paginatedPatterns = useMemo( () => {
		return filteredPatterns.slice(
			( currentPage - 1 ) * PATTERNS_PER_PAGE,
			currentPage * PATTERNS_PER_PAGE
		);
	}, [ filteredPatterns, currentPage ] );

	// Handle pattern selection with validation
	const handlePatternSelect = ( pattern ) => {
		if ( pattern && typeof onSelect === 'function' ) {
			try {
				onSelect( pattern );
			} catch ( err ) {
				setError(
					__(
						'Failed to select pattern. Please try again.',
						'blablablocks-tabs-block'
					)
				);
			}
		}
	};

	// Handle pagination
	const goToPage = ( direction ) => {
		setCurrentPage( ( prev ) => {
			const newPage = prev + direction;
			return Math.max( 1, Math.min( newPage, totalPages ) );
		} );
	};

	// Render error message if needed
	if ( error ) {
		return (
			<Notice status="error" isDismissible={ false }>
				{ error }
			</Notice>
		);
	}

	return (
		<div className="tabs-patterns-grid">
			{ isLoading ? (
				<div className="tabs-patterns-loading">
					<Spinner />
				</div>
			) : (
				<>
					{ ! filteredPatterns?.length ? (
						<p className="tabs-patterns-no-results">
							{ __(
								'No patterns found.',
								'blablablocks-tabs-block'
							) }
						</p>
					) : (
						<>
							<Grid
								gap={ 8 }
								columns={ [ 1, 2, 3 ] }
								align="start"
								className="tabs-patterns-grid-content"
							>
								{ paginatedPatterns.map( ( pattern ) => (
									<Button
										key={
											pattern.name ||
											`pattern-${
												pattern.id || Math.random()
											}`
										}
										className="tabs-patterns-item"
										onClick={ () =>
											handlePatternSelect( pattern )
										}
										style={ {
											width: '100%',
											height: '100%',
											textAlign: 'left',
											padding: 0,
											background: 'none',
										} }
									>
										<VStack
											alignment="top"
											align="left"
											style={ {
												width: '100%',
												height: '100%',
											} }
										>
											{ pattern.content ? (
												<BlockPreview
													blocks={ wp.blocks.parse(
														pattern.content
													) }
													viewportWidth={ 800 }
												/>
											) : (
												<div className="tabs-patterns-preview-error">
													{ __(
														'Preview not available',
														'blablablocks-tabs-block'
													) }
												</div>
											) }
											<Text align="left" size={ 12 }>
												{ pattern.title ||
													__(
														'Untitled pattern',
														'blablablocks-tabs-block'
													) }
											</Text>
										</VStack>
									</Button>
								) ) }
							</Grid>

							{ /* Pagination Controls */ }
							{ totalPages > 1 && (
								<div
									style={ {
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										marginTop: '1rem',
										gap: '0.5rem',
									} }
								>
									<Button
										disabled={ currentPage === 1 }
										onClick={ () => goToPage( -1 ) }
										className="tabs-patterns-pagination-prev"
									>
										{ __(
											'Previous',
											'blablablocks-tabs-block'
										) }
									</Button>
									<span className="tabs-patterns-pagination-status">
										{ `${ currentPage } / ${ totalPages }` }
									</span>
									<Button
										disabled={ currentPage === totalPages }
										onClick={ () => goToPage( 1 ) }
										className="tabs-patterns-pagination-next"
									>
										{ __(
											'Next',
											'blablablocks-tabs-block'
										) }
									</Button>
								</div>
							) }
						</>
					) }
				</>
			) }
		</div>
	);
};

export default PatternList;

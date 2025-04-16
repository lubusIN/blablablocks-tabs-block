/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { Button, SearchControl } from '@wordpress/components';

/**
 * PatternSidebar component renders a sidebar for selecting block pattern categories
 *
 * @param {Object}      props                     - The component props.
 * @param {string|null} props.selectedCategory    - The currently selected pattern category.
 * @param {Function}    props.setSelectedCategory - Function to update the selected pattern category.
 * @param {string}      props.searchTerm          - The current search term for filtering patterns by title.
 * @param {Function}    props.setSearchTerm       - Function to update the search term for filtering patterns.
 *
 * @return {JSX.Element} The rendered sidebar component.
 */
const PatternSidebar = ( {
	selectedCategory,
	setSelectedCategory,
	searchTerm,
	setSearchTerm,
} ) => {
	// Fetch pattern categories and block patterns with error handling.
	const { patternCategories, blockPatterns, error } = useSelect(
		( select ) => {
			try {
				const core = select( 'core' );
				return {
					patternCategories: core.getBlockPatternCategories() || [],
					blockPatterns: core.getBlockPatterns() || [],
					error: null,
				};
			} catch ( err ) {
				return {
					patternCategories: [],
					blockPatterns: [],
					error: err,
				};
			}
		},
		[]
	);

	// Show an error message if data fetching fails.
	if ( error ) {
		return (
			<div className="bbb-tabs-patterns-sidebar--error">
				{ __(
					'Failed to load block patterns.',
					'blablablocks-tabs-block'
				) }
			</div>
		);
	}

	// Simple loading state when no data is available.
	if ( ! patternCategories.length && ! blockPatterns.length ) {
		return (
			<div className="bbb-tabs-patterns-sidebar--loading">
				{ __( 'Loading…', 'blablablocks-tabs-block' ) }
			</div>
		);
	}

	// Memoize the filtered categories to optimize performance.
	const filteredCategories = useMemo( () => {
		return patternCategories.filter( ( category ) =>
			blockPatterns.some(
				( pattern ) =>
					Array.isArray( pattern.categories ) &&
					pattern.categories.includes( category.name )
			)
		);
	}, [ patternCategories, blockPatterns ] );

	return (
		<div className="bbb-tabs-patterns-sidebar">
			<SearchControl
				__nextHasNoMarginBottom
				value={ searchTerm }
				placeholder={ __( 'Search', 'blablablocks-tabs-block' ) }
				onChange={ setSearchTerm }
			/>
			<div className="bbb-tabs-patterns-sidebar__list">
				<Button
					__next40pxDefaultSize
					isPressed={ selectedCategory === null }
					onClick={ () => setSelectedCategory( null ) }
					style={ {
						display: 'flex',
						justifyContent: 'space-between',
						width: '100%',
						textAlign: 'left',
					} }
				>
					{ __( 'All', 'blablablocks-tabs-block' ) }
					<span className="bbb-tabs-patterns-sidebar__count">
						{ blockPatterns.length }
					</span>
				</Button>
				{ filteredCategories.map( ( { name, label } ) => {
					const count =
						blockPatterns.filter(
							( pattern ) =>
								Array.isArray( pattern.categories ) &&
								pattern.categories.includes( name )
						).length || 0;
					return (
						<Button
							__next40pxDefaultSize
							key={ name }
							isPressed={ selectedCategory === name }
							onClick={ () => setSelectedCategory( name ) }
							style={ {
								display: 'flex',
								justifyContent: 'space-between',
								width: '100%',
								textAlign: 'left',
							} }
						>
							{ label }
							<span className="bbb-tabs-patterns-sidebar__count">
								{ count }
							</span>
						</Button>
					);
				} ) }
			</div>
		</div>
	);
};

export default PatternSidebar;

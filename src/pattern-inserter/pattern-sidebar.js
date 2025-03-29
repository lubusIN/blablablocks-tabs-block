/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { SearchControl } from '@wordpress/components';

/**
 * PatternSidebar component renders a sidebar for selecting block pattern categories
 *
 * @param {Object} props - The component props.
 * @param {string|null} props.selectedCategory - The currently selected pattern category.
 * @param {Function} props.setSelectedCategory - Function to update the selected pattern category.
 * @param {string} props.searchTerm - The current search term for filtering patterns by title.
 * @param {Function} props.setSearchTerm - Function to update the search term for filtering patterns.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
const PatternSidebar = ({ selectedCategory, setSelectedCategory, searchTerm, setSearchTerm }) => {
    const { patternCategories, blockPatterns } = useSelect((select) => {
        const core = select('core');
        return {
            patternCategories: core.getBlockPatternCategories(),
            blockPatterns: core.getBlockPatterns(),
        };
    }, []);

    // Filter categories to include only those with at least one pattern
    const filteredCategories = patternCategories?.filter((category) => {
        return blockPatterns?.some((pattern) => pattern.categories?.includes(category.name));
    });

    return (
        <div className="bbb-tabs-patterns-sidebar" >
            <SearchControl
                __nextHasNoMarginBottom
                value={searchTerm}
                placeholder={__('Search', 'blablablocks-tabs-block')}
                onChange={(value) => setSearchTerm(value)}
            />
            <div className="bbb-tabs-patterns-sidebar__list" >
                <Button
                    __next40pxDefaultSize
                    isPressed={selectedCategory === null}
                    onClick={() => setSelectedCategory(null)}
                    style={{ display: 'flex', justifyContent: 'space-between', width: '100%', textAlign: 'left' }}
                >
                    {__('All', 'blablablocks-tabs-block')}
                    <span className="bbb-tabs-patterns-sidebar__count" >{blockPatterns.length}</span>
                </Button>
                {filteredCategories?.map(({ name, label }) => {
                    const count = blockPatterns?.filter((pattern) => pattern.categories?.includes(name)).length || 0;
                    return (
                        <Button
                            __next40pxDefaultSize
                            key={name}
                            isPressed={selectedCategory === name}
                            onClick={() => setSelectedCategory(name)}
                            style={{ display: 'flex', justifyContent: 'space-between', width: '100%', textAlign: 'left' }}
                        >
                            {label}
                            <span className="bbb-tabs-patterns-sidebar__count" >{count}</span>
                        </Button>
                    )
                })}
            </div>
        </div>
    );
};

export default PatternSidebar;
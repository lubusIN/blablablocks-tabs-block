/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { BlockPreview } from '@wordpress/block-editor';
import {
    Button,
    Spinner,
    __experimentalGrid as Grid,
    __experimentalVStack as VStack,
    __experimentalText as Text
} from '@wordpress/components';

const PATTERNS_PER_PAGE = 20;

/**
 * Component for displaying a list of block patterns with search and selection functionality.
 *
 * @param {Object} props - The component props.
 * @param {string} props.clientId - The client ID of the block editor instance.
 * @param {string} props.selectedCategory - The currently selected category for filtering patterns.
 * @param {string} props.searchTerm - The current search term for filtering patterns by title.
 * @param {Function} props.onSelect - Callback function triggered when a pattern is selected.
 *
 * @returns {JSX.Element} The rendered PatternList component.
 */
const PatternList = ({ clientId, selectedCategory, searchTerm, onSelect }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const patterns = useSelect(
        (select) => select('core').getBlockPatterns(),
        [selectedCategory]
    );

    useEffect(() => {
        setIsLoading(true);
        const timeout = setTimeout(() => setIsLoading(false), 300); // simulate loader
        return () => clearTimeout(timeout);
    }, [patterns, searchTerm]);

    const filteredPatterns = patterns?.filter((pattern) => {
        const matchesCategory =
            !selectedCategory || pattern.categories?.includes(selectedCategory);
        const matchesSearch =
            pattern.title.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil((filteredPatterns?.length || 0) / PATTERNS_PER_PAGE);
    const paginatedPatterns = filteredPatterns?.slice(
        (currentPage - 1) * PATTERNS_PER_PAGE,
        currentPage * PATTERNS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when search or category changes
    }, [searchTerm, selectedCategory]);

    return (
        <div
            className="tabs-patterns-grid"
        >
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    {filteredPatterns?.length === 0 ? (
                        <p>{__('No patterns found.', 'blablablocks-tabs-block')}</p>
                    ) : (
                        <>
                            <Grid gap={8} columns={[1, 2, 3]} align="start">
                                {paginatedPatterns.map((pattern) => (
                                    <Button
                                        key={pattern.name}
                                        className="slider-pattern-item"
                                        onClick={() => onSelect(pattern)}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            textAlign: 'left',
                                            padding: 0,
                                            background: 'none',
                                        }}
                                    >
                                        <VStack
                                            alignment="top"
                                            align="left"
                                            style={{ width: '100%', height: '100%' }}
                                        >
                                            <BlockPreview blocks={wp.blocks.parse(pattern.content)} />
                                            <Text align="left" size={12}>
                                                {pattern.title}
                                            </Text>
                                        </VStack>
                                    </Button>
                                ))}
                            </Grid>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center', marginTop: '1rem', gap: '0.5rem' }}>
                                    <Button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((prev) => prev - 1)}
                                    >
                                        {__('Previous', 'blablablocks-tabs-block')}
                                    </Button>
                                    <span style={{ lineHeight: '30px' }}>
                                        {`${currentPage} / ${totalPages}`}
                                    </span>
                                    <Button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                    >
                                        {__('Next', 'blablablocks-tabs-block')}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default PatternList;

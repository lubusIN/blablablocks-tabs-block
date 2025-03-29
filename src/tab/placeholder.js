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
} from '@wordpress/components';
import {
    useBlockProps,
    store as blockEditorStore,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { TabLogo } from '../components';
import PatternSidebar from '../pattern-inserter/pattern-sidebar';
import PatternList from '../pattern-inserter/pattern-list';

/**
 * This component serves as a placeholder for the Tab block, displaying a block variation picker.
 * It allows users to choose from predefined variations for initializing the block with default settings.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.clientId      The client ID for this block instance.
 * @return {JSX.Element} The placeholder component for the Tabs block.
 */
function Placeholder({ clientId }) {
    const { replaceInnerBlocks } = useDispatch(blockEditorStore);
    const blockProps = useBlockProps();
    const [step, setStep] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleStartBlank = () => {
        const defaultTemplate = [
            ['core/paragraph', { placeholder: 'Add tab content...' }],
        ];
        const blocks = createBlocksFromInnerBlocksTemplate(defaultTemplate);
        replaceInnerBlocks(clientId, blocks, true);
        setStep('blank');
    };

    const applyPattern = (pattern) => {
        const parsedBlocks = wp.blocks.parse(pattern.content);
        wp.data
            .dispatch('core/block-editor')
            .replaceInnerBlocks(clientId, parsedBlocks, true);
        setIsModalOpen(false);
    };

    return (
        <div {...blockProps}>
            {!step && (
                <PlaceholderComponent
                    icon={TabLogo}
                    instructions={__(
                        'Choose a pattern for the tab.',
                        'blablablocks-tabs-block'
                    )}
                    label={__('Tab', 'blablablocks-tabs-block')}
                >
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                        {__('Choose', 'blablablocks-tabs-block')}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleStartBlank}
                    >
                        {__('Start blank', 'blablablocks-tabs-block')}
                    </Button>
                </PlaceholderComponent>
            )}

            {isModalOpen && (
                <Modal
                    title={__(
                        'Patterns',
                        'blablablocks-slider-block'
                    )}
                    isFullScreen
                    onRequestClose={() => setIsModalOpen(false)}
                >
                    <div className='bbb-tabs-patterns-container'>
                        <PatternSidebar
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            setSearchTerm={setSearchTerm}
                            searchTerm={searchTerm}
                        />
                        <PatternList
                            clientId={clientId}
                            selectedCategory={selectedCategory}
                            searchTerm={searchTerm}
                            onSelect={applyPattern}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Placeholder;

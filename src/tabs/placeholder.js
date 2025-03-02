/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import {
    Placeholder as PlaceholderComponent,
    Button,
    Modal,
    __experimentalText as Text, // eslint-disable-line
} from '@wordpress/components';
import {
    useBlockProps,
    __experimentalBlockVariationPicker as BlockVariationPicker, // eslint-disable-line
    store as blockEditorStore,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import variations from './variations';
import { TabsLogo } from '../components';

/**
 * This component serves as a placeholder for the Slider block, displaying a block variation picker.
 * It allows users to choose from predefined variations for initializing the block with default settings.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.clientId      The client ID for this block instance.
 * @param {Function} props.setAttributes Function to update block attributes.
 *
 * @return {JSX.Element} The placeholder component for the Slider block.
 */
function Placeholder({ clientId, setAttributes }) {
    const { replaceInnerBlocks } = useDispatch(blockEditorStore);
    const blockProps = useBlockProps();
    const [step, setStep] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onSelectVariation = (variation) => {
        if (variation?.attributes) {
            setAttributes(variation.attributes);
        }
        if (clientId && variation?.innerBlocks) {
            replaceInnerBlocks(
                clientId,
                createBlocksFromInnerBlocksTemplate(variation.innerBlocks),
                true
            );
        }
    };

    const openTemplatesModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div {...blockProps}>
            {!step && (
                <PlaceholderComponent
                    icon={TabsLogo}
                    instructions={__(
                        'Choose a pattern for the tabs or start blank',
                        'blablablocks-tabs-block'
                    )}
                    label={__('Tabs', 'blablablocks-tabs-block')}
                >
                    <Button variant="primary" onClick={openTemplatesModal}>
                        {__('Choose', 'blablablocks-tabs-block')}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setStep('variations')}
                    >
                        {__('Start blank', 'blablablocks-tabs-block')}
                    </Button>
                </PlaceholderComponent>
            )}

            {step === 'variations' && (
                <BlockVariationPicker
                    icon={TabsLogo}
                    label={__('Tabs', 'blablablocks-tabs-block')}
                    instructions={__(
                        'Select a variation to start with:',
                        'blablablocks-tabs-block'
                    )}
                    variations={variations}
                    onSelect={(variation = variations[1]) => {
                        onSelectVariation(variation);
                    }}
                    allowSkip
                />
            )}

            {isModalOpen && (
                <Modal
                    title={__(
                        'Choose a Template',
                        'blablablocks-tabs-block'
                    )}
                    isFullScreen
                    onRequestClose={() => setIsModalOpen(false)}
                >
                    <Text>Coming Soon...</Text>
                </Modal>
            )}
        </div>
    );
}

export default Placeholder;

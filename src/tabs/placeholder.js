/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import {
    createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';
import {
    Placeholder as PlaceholderComponent,
    Button,
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
 * This component serves as a placeholder for the Tabs block, displaying a block variation picker.
 * It allows users to choose from predefined variations for initializing the block with default settings.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.clientId      The client ID for this block instance.
 * @param {Function} props.setAttributes Function to update block attributes.
 *
 * @return {JSX.Element} The placeholder component for the Tabs block.
 */
function Placeholder({ clientId, setAttributes }) {
    const { replaceInnerBlocks } = useDispatch(blockEditorStore);
    const blockProps = useBlockProps();

    const [step, setStep] = useState(null);

    const onSelectVariation = (variation) => {
        if (variation?.attributes) {
            setAttributes(variation.attributes);
        }
        if (variation?.innerBlocks) {
            replaceInnerBlocks(
                clientId,
                createBlocksFromInnerBlocksTemplate(variation.innerBlocks),
                true
            );
        }
    };

    return (
        <div {...blockProps}>
            {!step && (
                <PlaceholderComponent
                    icon={TabsLogo}
                    instructions={__(
                        'Choose a pattern for the tabs.',
                        'blablablocks-tabs-block'
                    )}
                    label={__('Tabs', 'blablablocks-tabs-block')}
                >
                    <Button variant="primary" onClick={() => { }}>
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
                    onSelect={(variation = variations[0]) => {
                        onSelectVariation(variation);
                    }}
                    allowSkip
                />
            )}
        </div>
    );
}

export default Placeholder;

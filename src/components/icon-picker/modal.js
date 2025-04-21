/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
    Modal,
    TextareaControl,
    Flex,
    FlexBlock,
    Card,
    Button,
    Notice,
    __experimentalVStack as VStack, // eslint-disable-line
    __experimentalHStack as HStack, // eslint-disable-line
} from '@wordpress/components';

/**
 * IconPickerModal Component
 *
 * A modal for inputting and previewing custom SVG icons.
 * Validates the SVG code and allows users to insert it into the block attributes.
 *
 * @param {Object}   props                   - Component props.
 * @param {Object}   props.attributes        - The block attributes.
 * @param {Function} props.setAttributes     - Function to update block attributes.
 * @param {boolean}  props.isOpen            - Flag to control modal visibility.
 * @param {Function} props.setOpen           - Function to toggle modal open state.
 * @param {string}   props.svgCode           - Current SVG code input.
 * @param {Function} props.setSvgCode        - Function to update the SVG code.
 *
 * @returns {JSX.Element|null} Modal component for inserting a custom SVG icon, or null if modal is closed.
 */
function IconPickerModal({
    attributes,
    setAttributes,
    isOpen,
    setOpen,
    svgCode,
    setSvgCode
}) {
    const [isSvgValid, setIsSvgValid] = useState(false);
    const [validationError, setValidationError] = useState('');

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    /**
     * Validate the SVG code.
     *
     * @param {string} svg The SVG code to validate.
     * @return {boolean} Whether the SVG is valid.
     */
    const validateSvg = (svg) => {
        if (!svg.trim()) {
            setValidationError(
                __('Please paste your SVG code.', 'blablablocks-tabs-block')
            );
            return false;
        }

        // Basic SVG validation using a regex
        const svgRegex = /<svg[^>]*>(.*?)<\/svg>/gis;
        if (!svgRegex.test(svg)) {
            setValidationError(
                __(
                    'Invalid SVG code. Please provide a valid SVG.',
                    'blablablocks-tabs-block'
                )
            );
            return false;
        }

        // Clear any previous error
        setValidationError('');
        return true;
    };

    /**
     * Handle SVG code changes.
     * Updates the SVG code state and validates the new code.
     *
     * @param {string} value The new SVG code.
     */
    const handleSvgCodeChange = (value) => {
        setSvgCode(value);
        setIsSvgValid(validateSvg(value));
    };

    /**
     * Handle inserting the SVG.
     */
    const handleInsertSvg = () => {
        if (isSvgValid) {
            setAttributes({ tabIcon: svgCode });
            closeModal();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Modal
            className="bbb-custom-icon-modal"
            title={
                attributes.tabIcon
                    ? __('Edit Custom Icon', 'blablablocks-tabs-block')
                    : __('Add Custom Icon', 'blablablocks-tabs-block')
            }
            isFullScreen
            onRequestClose={closeModal}
        >
            <Flex align="stretch" gap={5} style={{ height: '100%' }}>
                <FlexBlock>
                    <TextareaControl
                        __nextHasNoMarginBottom
                        className="bbb-icon-textarea"
                        hideLabelFromVision
                        placeholder="Paste your svg code here"
                        value={svgCode || attributes.tabIcon}
                        onChange={handleSvgCodeChange}
                    />
                </FlexBlock>
                <FlexBlock>
                    <VStack
                        spacing={5}
                        justify="space-between"
                        style={{ height: '100%' }}
                    >
                        <VStack spacing={5}>
                            <Card style={{ height: '200px' }} isRounded={false}>
                                <div
                                    className="bbb-icon-preview"
                                    dangerouslySetInnerHTML={{
                                        __html: svgCode || attributes.tabIcon,
                                    }}
                                />
                            </Card>
                            {validationError && (
                                <Notice status="error" isDismissible={false}>
                                    {validationError}
                                </Notice>
                            )}
                        </VStack>
                        <HStack justify="flex-end">
                            <Button
                                variant={'primary'}
                                onClick={handleInsertSvg}
                                disabled={!isSvgValid}
                            >
                                {__(
                                    'Insert custom icon',
                                    'blablablocks-tabs-block'
                                )}
                            </Button>
                        </HStack>
                    </VStack>
                </FlexBlock>
            </Flex>
        </Modal>
    );
};

export default IconPickerModal;
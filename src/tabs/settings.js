/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalHStack as HStack,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import {
    arrowDown,
    arrowRight,
    justifyBottom,
    justifyCenter,
    justifyLeft,
    justifyRight,
    justifyTop
} from '@wordpress/icons';

/**
 * Settings component
 *
 * @param {object}   props               Component props
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * 
 * @returns {JSX.Element} Settings panel
 */
function Settings({ attributes, setAttributes }) {
    return (
        <InspectorControls>
            <PanelBody title={__('Layout', 'blablablocks-tabs-block')}>
                <HStack align={'start'}>
                    <ToggleGroupControl
                        label={__('Justification', 'blablablocks-tabs-block')}
                        value={attributes.justification}
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                        onChange={(value) => setAttributes({ justification: value })}
                    >
                        <ToggleGroupControlOptionIcon icon={justifyLeft} value="left" label="Justify items left" />
                        <ToggleGroupControlOptionIcon icon={justifyCenter} value="center" label="Justify items center" />
                        <ToggleGroupControlOptionIcon icon={justifyRight} value="right" label="Justify items right" />
                    </ToggleGroupControl>
                    <ToggleGroupControl
                        label={__('Orientation', 'blablablocks-tabs-block')}
                        value={attributes.orientation}
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                        onChange={(value) => setAttributes({ orientation: value })}
                    >
                        <ToggleGroupControlOptionIcon icon={arrowRight} value="row" label="Horizontal" />
                        <ToggleGroupControlOptionIcon icon={arrowDown} value="column" label="Vertical" />
                    </ToggleGroupControl>
                </HStack>
                <HStack align={'start'}>
                    <ToggleGroupControl
                        label={__('Icon Position', 'blablablocks-tabs-block')}
                        value={attributes.iconPosition}
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                        onChange={(value) => setAttributes({ iconPosition: value })}
                    >
                        <ToggleGroupControlOptionIcon icon={justifyTop} value="top" label="Align top" />
                        <ToggleGroupControlOptionIcon icon={justifyLeft} value="left" label="Align left" />
                        <ToggleGroupControlOptionIcon icon={justifyBottom} value="bottom" label="Align bottom" />
                        <ToggleGroupControlOptionIcon icon={justifyRight} value="right" label="Align right" />
                    </ToggleGroupControl>
                    <ToggleGroupControl
                        label={__('Position', 'blablablocks-tabs-block')}
                        value={attributes.verticalPosition}
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                        onChange={(value) => setAttributes({ verticalPosition: value })}
                    >
                        <ToggleGroupControlOptionIcon icon={justifyLeft} value="left" label="Left" />
                        <ToggleGroupControlOptionIcon icon={justifyRight} value="right" label="Right" />
                    </ToggleGroupControl>
                </HStack>
            </PanelBody>
        </InspectorControls>
    )
}

export default Settings;

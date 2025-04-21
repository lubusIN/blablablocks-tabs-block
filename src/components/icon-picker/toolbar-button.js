/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarGroup, ToolbarDropdownMenu } from '@wordpress/components';
import { code, reset } from '@wordpress/icons';

/**
 * IconPickerToolbarButton Component
 *
 * A toolbar button that provides a dropdown menu for managing custom SVG icons.
 * Users can open the icon picker modal or reset the selected SVG icon.
 *
 * @param {Object}   props                   - Component props.
 * @param {Object}   props.attributes        - The block attributes.
 * @param {Function} props.setAttributes     - Function to update block attributes.
 * @param {Function} props.setOpen           - Function to toggle modal open state.
 * @param {Function} props.setSvgCode        - Function to update the SVG code.
 *
 * @returns {JSX.Element} A toolbar group containing icon-related actions.
 */
function IconPickerToolbarButton({
    attributes,
    setAttributes,
    setOpen,
    setSvgCode
}) {
    return (
        <ToolbarGroup>
            <ToolbarDropdownMenu
                controls={[
                    {
                        icon: code,
                        title: attributes.tabIcon
                            ? __(
                                'Edit custom SVG icon',
                                'blablablocks-tabs-block'
                            )
                            : __(
                                'Add custom SVG icon',
                                'blablablocks-tabs-block'
                            ),
                        onClick: () => setOpen(true),
                    },
                    {
                        icon: reset,
                        title: __('Reset icon', 'blablablocks-tabs-block'),
                        onClick: () => {
                            setAttributes({ tabIcon: '' });
                            setSvgCode('');
                        },
                        isDisabled: !attributes.tabIcon,
                    },
                ]}
                text={
                    attributes.tabIcon
                        ? __('Replace icon', 'blablablocks-tabs-block')
                        : __('Add Icon', 'blablablocks-tabs-block')
                }
                icon={''}
            />
        </ToolbarGroup>
    );
};

export default IconPickerToolbarButton;
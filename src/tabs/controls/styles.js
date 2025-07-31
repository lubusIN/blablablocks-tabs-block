/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	__experimentalSpacingSizesControl as SpacingSizesControl, // eslint-disable-line
} from '@wordpress/block-editor';
import {
	__experimentalToolsPanelItem as ToolsPanelItem, 		  // eslint-disable-line
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ColorControlDropdown } from '../../components';

/**
 * Styles component
 *
 * @param {Object}   props               Component props
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 *
 * @return {JSX.Element} Styles panel
 */
function Styles({ attributes, setAttributes, clientId }) {
	const colorControls = [
		{ key: 'textColor', label: __('Tab Text', 'blablablocks-tabs-block') },
		{ key: 'backgroundColor', label: __('Tab Background', 'blablablocks-tabs-block') },
		{ key: 'iconColor', label: __('Tab Icon', 'blablablocks-tabs-block') },
	];

	const { tabColor = {} } = attributes;

	const clearColor = (colorKey) => {
		setAttributes({
			tabColor: {
				...tabColor,
				[colorKey]: { default: undefined, hover: undefined, active: undefined },
			},
		});
	};

	return (
		<>
			<InspectorControls group="color">
				{colorControls.map(({ key, label }) => {
					const value = tabColor[key] || {};
					const hasValue = [value.default, value.hover, value.active].some(Boolean);

					return (
						<ToolsPanelItem
							key={key}
							label={label}
							className="bbb-tabs_color-support-panel"
							panelId={clientId}
							isShownByDefault
							hasValue={() => hasValue}
							onDeselect={() => clearColor(key)}
							resetAllFilter={() => clearColor(key)}
						>
							<ColorControlDropdown
								label={label}
								colorValue={value}
								onChangeColor={(newColor) =>
									setAttributes({ tabColor: { ...tabColor, [key]: newColor } })
								}
								hasHover
								hasActive
							/>
						</ToolsPanelItem>
					);
				})}
			</InspectorControls>
			<InspectorControls group="dimensions">
				<ToolsPanelItem
					label={__('Tab Padding', 'blablablocks-tabs-block')}
					panelId={clientId}
					isShownByDefault
					hasValue={() => !!attributes.tabPadding}
					onDeselect={() =>
						setAttributes({ tabPadding: undefined })
					}
					resetAllFilter={() =>
						setAttributes({ tabPadding: undefined })
					}
				>
					<SpacingSizesControl
						values={attributes.tabPadding}
						onChange={(value) =>
							setAttributes({ tabPadding: value })
						}
						label={__('Tab Padding', 'blablablocks-tabs-block')}
						allowReset={false}
						splitOnAxis={true}
					/>
				</ToolsPanelItem>
			</InspectorControls>
		</>
	);
}

export default Styles;

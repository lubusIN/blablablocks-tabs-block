/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	__experimentalBorderRadiusControl as BorderRadiusControl,									// eslint-disable-line
	__experimentalSpacingSizesControl as SpacingSizesControl,									// eslint-disable-line
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients	// eslint-disable-line
} from '@wordpress/block-editor';
import {
	ToggleControl,
	BorderBoxControl,
	__experimentalVStack as VStack, 						// eslint-disable-line
	__experimentalToolsPanel as ToolsPanel, 				// eslint-disable-line
	__experimentalToolsPanelItem as ToolsPanelItem, 		// eslint-disable-line
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
	const {
		tabTextColor = {},
		tabBackgroundColor = {},
		tabIconColor = {},
		tabBorder = {}
	} = attributes;

	const colorControls = [
		{
			key: 'tabTextColor',
			state: tabTextColor,
			label: __('Tab Text', 'blablablocks-tabs-block'),
		},
		{
			key: 'tabBackgroundColor',
			state: tabBackgroundColor,
			label: __('Tab Background', 'blablablocks-tabs-block'),
		},
		{
			key: 'tabIconColor',
			state: tabIconColor,
			label: __('Tab Icon', 'blablablocks-tabs-block'),
		},
	];

	const clearColor = (colorKey) => {
		setAttributes({
			[colorKey]: { default: undefined, hover: undefined, active: undefined },
		});
	};

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	return (
		<>
			<InspectorControls group="color">
				{colorControls.map(({ key, state, label }) => {
					const value = state || {};
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
									setAttributes({ [key]: { ...value, ...newColor } })
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
			<InspectorControls group='styles'>
				<ToolsPanel
					label="Tab Border"
					resetAll={() =>
						setAttributes({
							tabBorder: {
								border: undefined,
								onActive: undefined,
							},
						})
					}
				>
					<ToolsPanelItem
						label={__('Border', 'blablablocks-tabs-block')}
						hasValue={() => !!tabBorder.border}
						onDeselect={() =>
							setAttributes({
								tabBorder: {
									border: undefined
								},
							})
						}
					>
						<VStack spacing={4}>
							<BorderBoxControl
								__next40pxDefaultSize
								label={__('Border', 'blablablocks-tabs-block')}
								hideLabelFromVision
								value={tabBorder.border}
								onChange={(value) =>
									setAttributes({
										tabBorder: { ...tabBorder, border: value },
									})
								}
								{...colorGradientSettings}
							/>
							<ToggleControl
								label={__('Only show border on active tab', 'blablablocks-tabs-block')}
								checked={tabBorder.onActive}
								onChange={(value) =>
									setAttributes({
										tabBorder: { ...tabBorder, onActive: value },
									})
								}
							/>
						</VStack>
					</ToolsPanelItem>
					<ToolsPanelItem
						label={__('Radius', 'blablablocks-tabs-block')}
						hasValue={() => !!tabBorder?.border?.radius}
						onDeselect={() =>
							setAttributes({
								tabBorder: {
									...tabBorder,
									border: {
										...tabBorder.border,
										radius: undefined
									}
								},
							})
						}
					>
						<BorderRadiusControl
							__next40pxDefaultSize
							label={__('Radius', 'blablablocks-tabs-block')}
							values={tabBorder?.border?.radius}
							onChange={(value) =>
								setAttributes({
									tabBorder: {
										...tabBorder,
										border: {
											...tabBorder.border,
											radius: value
										}
									}
								})
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
		</>
	);
}

export default Styles;


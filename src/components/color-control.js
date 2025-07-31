/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	ColorPalette,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients // eslint-disable-line
} from '@wordpress/block-editor';
import {
	Button,
	Dropdown,
	ColorIndicator,
	__experimentalZStack as ZStack,  // eslint-disable-line
	__experimentalHStack as HStack,  // eslint-disable-line
	__experimentalText as Text,      // eslint-disable-line
	TabPanel,
} from '@wordpress/components';

/**
 * Renders a color control dropdown for selecting colors.
 *
 * @param {Object}   props               - The component props.
 * @param {string}   props.label         - The label for the color control.
 * @param {Object}   props.colorValue    - The current color values. Should include `default` and optionally `hover` (if `hasHover` is true).
 * @param {Function} props.onChangeColor - Callback function to handle color changes. Accepts an object with updated color values.
 * @param {boolean}  props.hasHover      - Determines if hover color support is enabled. If true, a tab for hover colors is displayed.
 * @param {boolean}  props.hasActive     - Determines if active color support is enabled. If true, a tab for active colors is displayed.
 *
 * @return {JSX.Element} The rendered ColorControlDropdown component.
 */
function ColorControlDropdown({
	label,
	colorValue = {},
	onChangeColor,
	hasHover = false,
	hasActive = false,
}) {

	const colorGradientSettings = useMultipleOriginColorsAndGradients()

	return (
		<Dropdown
			popoverProps={{
				placement: 'left-start',
				offset: 36,
				shift: true,
			}}
			contentClassName="bbb-tabs_color_popover"
			renderToggle={({ isOpen, onToggle }) => (
				<Button
					className={`bbb-tabs_color_button ${isOpen ? 'isOpen' : ''
						}`}
					aria-expanded={isOpen}
					onClick={onToggle}
				>
					<HStack justify="left">
						<ZStack offset={10}>
							<ColorIndicator colorValue={colorValue.default} />
							{hasHover && (
								<ColorIndicator
									colorValue={colorValue.hover}
								/>
							)}
							{hasActive && (
								<ColorIndicator
									colorValue={colorValue.active}
								/>
							)}
						</ZStack>
						<Text>{label}</Text>
					</HStack>
				</Button>
			)}
			renderContent={() =>
				hasHover || hasActive ? (
					<TabPanel
						tabs={[
							{
								name: 'default',
								title: __(
									'Default',
									'blablablocks-tabs-block'
								),
							},
							{
								name: 'hover',
								title: __('Hover', 'blablablocks-tabs-block'),
							},
							{
								name: 'active',
								title: __(
									'Active',
									'blablablocks-tabs-block'
								),
							},
						]}
					>
						{(tab) => (
							<ColorPalette
								__experimentalIsRenderedInSidebar
								value={colorValue[tab.name] || ''}
								onChange={(color) => {
									onChangeColor({
										...colorValue,
										[tab.name]: color,
									});
								}}
								{...colorGradientSettings}
								enableAlpha
							/>
						)}
					</TabPanel>
				) : (
					<ColorPalette
						className="bbb-color-pallete-container"
						__experimentalIsRenderedInSidebar
						value={colorValue.default || ''}
						onChange={(color) => {
							onChangeColor({ ...colorValue, default: color });
						}}
						{...colorGradientSettings}
						enableAlpha
					/>
				)
			}
		/>
	);
}

export default ColorControlDropdown;

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
	TabPanel,
	Dropdown,
	ColorIndicator,
	__experimentalZStack as ZStack,  // eslint-disable-line
	__experimentalHStack as HStack,  // eslint-disable-line
	__experimentalText as Text,      // eslint-disable-line
} from '@wordpress/components';

/**
 * Resolve a raw selection from ColorPalette against the provided
 * colorGradientSettings to see if it corresponds to a theme/preset color.
 *
 * @param {string|Object} rawColor
 * @param {Array} colorGradientSettings  - the array you get from useMultipleOriginColorsAndGradients()
 * @returns {{ color: string|undefined, slug: string|undefined }}
 */
function resolveColorSelection(rawColor, colorGradientSettings) {
	let pickedColor = '';

	if (typeof rawColor === 'object') {
		pickedColor = rawColor.color || rawColor;
	} else if (typeof rawColor === 'string') {
		pickedColor = rawColor;
	}

	if (!pickedColor) {
		return { color: undefined, slug: undefined };
	}

	const normalize = (c) => String(c).trim().toLowerCase();
	const target = normalize(pickedColor);

	const palettes = Array.isArray(colorGradientSettings?.colors)
		? colorGradientSettings.colors
		: [];

	for (const palette of palettes) {
		if (!Array.isArray(palette.colors)) continue;

		for (const entry of palette.colors) {
			if (!entry || !entry.color) continue;

			if (normalize(entry.color) === target) {
				return {
					color: pickedColor,
					slug: entry.slug,
				};
			}

			// crude handling for function-style colors like color-mix
			if (
				entry.color.includes('color-mix') &&
				target.includes(entry.color.replace(/\s+/g, '').toLowerCase())
			) {
				return {
					color: pickedColor,
					slug: entry.slug,
				};
			}
		}
	}

	return {
		color: pickedColor,
		slug: undefined,
	};
}

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

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const handleChange = (tabName, rawColor) => {
		const normalized = resolveColorSelection(rawColor, colorGradientSettings);
		onChangeColor({
			...colorValue,
			[tabName]: normalized,
		});
	};

	const defaultIndicator = colorValue.default?.color || '';
	const hoverIndicator = hasHover ? colorValue.hover?.color : null;
	const activeIndicator = hasActive ? colorValue.active?.color : null;

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
							<ColorIndicator colorValue={defaultIndicator} />
							{hasHover && (
								<ColorIndicator
									colorValue={hoverIndicator}
								/>
							)}
							{hasActive && (
								<ColorIndicator
									colorValue={activeIndicator}
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
								value={colorValue[tab.name]?.color || ''}
								onChange={(color) => handleChange(tab.name, color)}
								{...colorGradientSettings}
								enableAlpha
							/>
						)}
					</TabPanel>
				) : (
					<ColorPalette
						className="bbb-color-pallete-container"
						__experimentalIsRenderedInSidebar
						value={colorValue.default?.color || ''}
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

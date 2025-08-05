/**
 * WordPress dependencies
 */
import {
	__experimentalGetGapCSSValue as getGapCSSValue,							// eslint-disable-line
	__experimentalUseBorderProps as useBorderProps,							// eslint-disable-line
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,		// eslint-disable-line
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles	// eslint-disable-line
} from '@wordpress/block-editor';

const DEFAULT_GAP = '0.5em';

/**
 * Generates CSS gap styles for a block based on the provided gap and orientation.
 *
 * @param {string|object} blockGap                   - The gap value for the block. Can be a string (e.g., "10px") or an object with `top` and `left` properties.
 * @param {string}        [orientation='horizontal'] - The orientation of the block. Can be 'horizontal' or 'vertical'.
 * @return {Array<string>} - An array containing two CSS gap values
 */
const generateGapStyles = (blockGap, orientation = 'horizontal') => {
	let tabListGap = DEFAULT_GAP;
	let tabGap = DEFAULT_GAP;

	if (typeof blockGap === 'string') {
		tabListGap = blockGap;
		tabGap = blockGap;
	} else if (typeof blockGap === 'object' && blockGap !== null) {
		tabListGap = blockGap.top || DEFAULT_GAP;
		tabGap = blockGap.left || DEFAULT_GAP;
	}

	// Convert to valid CSS values
	const main = getGapCSSValue(tabListGap);
	const cross = getGapCSSValue(tabGap);

	// If vertical, swap main⇄cross
	return orientation === 'vertical' ? [main, cross] : [cross, main];
};

/**
 * Resolves a spacing size value into a usable CSS value.
 *
 * @param {string|number} value        - The input spacing size value.
 * @param {string|number} defaultValue - The default value.
 * @return {string} - A valid CSS spacing size value.
 */
const resolveSpacingSizeValue = (value, defaultValue = '0px') => {
	if (typeof value === 'string') {
		if (value.startsWith('var:')) {
			// Convert "var:some|value" into "var(--wp--some--value)"
			return `var(${value.replace('var:', '--wp--').replace(/\|/g, '--')})`;
		}
		return value; // If it's a valid CSS string, return as-is
	}

	return typeof value === 'number' ? `${value}px` : defaultValue;
};

/**
 * Helper to get border props with numeric radius handling.
 * 
 * @param {Object} borderAttributes - Attributes object to pass to useBorderProps
 * @param {Function} radiusPath - Function that returns the border radius value
 * @return {Object} Border props with className and style, including converted numeric radius
 */
const getBorderPropsWithRadius = (borderAttributes, radiusPath) => {
	const rawBorder = useBorderProps(borderAttributes);
	const borderRadius = radiusPath?.();

	return {
		...rawBorder,
		style: {
			...rawBorder.style,
			...(typeof borderRadius === 'number' && { borderRadius: `${borderRadius}px` })
		}
	};
};

/**
 * Helper function to resolve color value based on slug
 * 
 * @param {Object} colorObj - Color object with color and slug properties
 * @param {string} fallback - Fallback color value
 * @return {string} - CSS color value or custom property
 */
const resolveColorValue = (colorObj, fallback) => {
	if (!colorObj) return fallback;

	// If we have a slug, use the WordPress preset color custom property
	if (colorObj.slug) {
		return `var(--wp--preset--color--${colorObj.slug})`;
	}

	// Otherwise use the direct color value
	return colorObj.color || fallback;
};

/**
 * Generates a set of CSS variable mappings based on provided attributes.
 * The returned object excludes variables with invalid or undefined values.
 *
 * @param {Object} attributes - The attributes used to customize styles.
 * @return {Object} - An object with CSS variable definitions.
 */
export const generateStyles = (attributes = {}) => {
	const styles = {};

	// Padding
	const padding = attributes.tabPadding || {};
	styles['--bbb-tab-padding'] = [
		resolveSpacingSizeValue(padding.top, '5px'),
		resolveSpacingSizeValue(padding.right, '15px'),
		resolveSpacingSizeValue(padding.bottom, '5px'),
		resolveSpacingSizeValue(padding.left, '15px')
	].join(' ');

	// Colors for different states
	const colorDefaults = {
		default: { text: '#000', bg: '#fff', icon: '#000' },
		hover: { text: '#fff', bg: '#000', icon: '#fff' },
		active: { text: '#fff', bg: '#000', icon: '#fff' }
	};

	Object.entries(colorDefaults).forEach(([state, defaults]) => {
		const stateKey = state === 'default' ? 'default' : state;

		// Text color
		styles[`--bbb-tab-text-${state}-color`] = resolveColorValue(
			attributes.tabTextColor?.[stateKey],
			defaults.text
		);

		// Background color
		styles[`--bbb-tab-background-${state}-color`] = resolveColorValue(
			attributes.tabBackgroundColor?.[stateKey],
			defaults.bg
		);

		// Icon color
		const iconColorValue = attributes.tabIconColor?.[stateKey] ||
			(state === 'active' ? attributes.tabIconColor?.default : null);
		styles[`--bbb-tab-icon-${state}-color`] = resolveColorValue(
			iconColorValue,
			defaults.icon
		);
	});

	// Other styles
	styles['--bbb-tab-buttons-justify-content'] = attributes.justification || 'left';
	styles['--bbb-tab-icon-size'] = `${attributes.iconSize || 24}px`;

	// Gap styles
	const [listGap, tabsGap] = generateGapStyles(
		attributes.style?.spacing?.blockGap || null,
		attributes.orientation
	);
	styles['--bbb-tabs-list-gap'] = listGap;
	styles['--bbb-tabs-gap'] = tabsGap;

	return styles;
};

/**
 * Return consolidated className + style for the Tabs container:
 * – spacing classes & styles
 * – border props (with numeric radius)
 * – horizontal margin based on orientation/justification
 *
 * @param {Object} attributes - The attributes used to customize styles.
 * @return {{ className: string, style: Object }}
 */
export function getTabsContainerProps(attributes) {
	// spacing
	const spacingProps = getSpacingClassesAndStyles(attributes);

	// color
	const colorProps = getColorClassesAndStyles(attributes);

	// border (useBorderProps gives { className, style })
	const borderProps = getBorderPropsWithRadius(
		attributes,
		() => attributes.style?.border?.radius
	);

	// margin
	const marginStyle =
		attributes.orientation === 'horizontal'
			? (() => {
				switch (attributes.justification) {
					case 'right': return { margin: '0 0 0 auto' };
					case 'center': return { margin: '0 auto' };
					case 'left':
					default: return { margin: '0 0 auto' };
				}
			})()
			: {};

	// width
	const width = attributes.orientation === 'vertical'
		? { maxWidth: `${attributes.width || 50}%` }
		: {};

	// combine
	return {
		className: [spacingProps.classes, borderProps.className, colorProps.className]
			.filter(Boolean)
			.join(' '),
		style: {
			...spacingProps.style,
			...borderProps.style,
			...colorProps.style,
			...marginStyle,
			...width
		},
	};
}

/**
 * Return consolidated style for the Tab button:
 *
 * @param {Object} attributes - The attributes used to customize styles.
 * @return {{ style: Object }}
 */
export function getTabButtonStyles(attributes, isActive) {

	// If tabBorder has an onActive flag and it's true, only apply border when this tab is active.
	const shouldApplyBorder =
		attributes?.tabBorder?.onActive ? isActive : true;

	// Tab Border (only if allowed by shouldApplyBorder)
	const borderInput = shouldApplyBorder
		? { style: attributes?.tabBorder }
		: { style: {} };

	const borderProps = getBorderPropsWithRadius(
		borderInput,
		() => attributes?.tabBorder?.border?.radius
	);

	return {
		style: { ...borderProps.style },
	};
}

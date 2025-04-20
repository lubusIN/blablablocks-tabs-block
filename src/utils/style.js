/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import {
	__experimentalGetGapCSSValue as getGapCSSValue,
} from '@wordpress/block-editor';

const DEFAULT_GAP = '0.5em';

/**
 * Generates CSS gap styles for a block based on the provided gap and orientation.
 *
 * @param {string|object} blockGap            - The gap value for the block. Can be a string (e.g., "10px") or an object with `top` and `left` properties.
 * @param {string} [orientation='horizontal'] - The orientation of the block. Can be 'horizontal' or 'vertical'.
 * @returns {Array<string>} - An array containing two CSS gap values
 */
const generateGapStyles = (blockGap, orientation = 'horizontal') => {
	// Compute the two CSS vars in one useMemo
	const [listGap, tabsGap] = useMemo(() => {
		const tabListGap = blockGap
			? typeof blockGap === 'string'
				? blockGap
				: blockGap.top || DEFAULT_GAP
			: DEFAULT_GAP;

		const tabGap = blockGap
			? typeof blockGap === 'string'
				? blockGap
				: blockGap.left || DEFAULT_GAP
			: DEFAULT_GAP;

		// Convert to valid CSS values
		const main = getGapCSSValue(tabListGap);
		const cross = getGapCSSValue(tabGap);

		// If vertical, swap main⇄cross
		return orientation === 'vertical'
			? [main, cross]
			: [cross, main];
	}, [blockGap, orientation]);

	return [listGap, tabsGap];
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
			const cssVariable = value
				.replace('var:', '--wp--')
				.replace(/\|/g, '--');
			return `var(${cssVariable})`;
		}
		return value; // If it's a valid CSS string, return as-is
	}

	if (typeof value === 'number') {
		return `${value}px`; // Convert numbers to pixel values
	}

	// use defaultValue if value is invalid or undefined
	return defaultValue;
};

/**
 * Generates border styles based on provided attributes.
 *
 * @param {Object} border - The border definition object.
 * @return {Object} - An object containing border styles.
 */
const getBorderStyles = (border = {}) => {
	const styles = {};

	// Loop through each border side and assign styles
	['top', 'right', 'bottom', 'left'].forEach((side) => {
		const width = border?.[side]?.width ?? border?.width ?? '0px';
		const style = border?.[side]?.style ?? border?.style ?? 'solid';
		const color = border?.[side]?.color ?? border?.color ?? '';

		styles[
			`--bbb-tab-border-${side}`
		] = `${width} ${style} ${color}`;
	});

	return styles;
};

/**
 * Generates a set of CSS variable mappings based on provided attributes.
 * The returned object excludes variables with invalid or undefined values.
 *
 * @param {Object} attributes - The attributes used to customize styles.
 *
 * @return {Object} - An object with CSS variable definitions.
 */
export const generateStyles = (attributes = {}) => {
	const styles = {};

	// Helper function to add a style with a fallback to default values
	const addStyle = (key, value, defaultValue = '0px') => {
		if (value !== undefined && value !== null) {
			styles[key] = value;
		} else if (defaultValue) {
			styles[key] = defaultValue;
		}
	};

	// Tab Color using Tailwind's gray shades
	addStyle(
		'--bbb-tab-text-color',
		attributes?.tabColor?.textColor?.default || '#000'
	);
	addStyle(
		'--bbb-tab-background-color',
		attributes?.tabColor?.backgroundColor?.default || '#fff'
	);
	addStyle(
		'--bbb-tab-icon-color',
		attributes?.tabColor?.iconColor?.default || '#000'
	);
	addStyle(
		'--bbb-tab-text-hover-color',
		attributes?.tabColor?.textColor?.hover || '#fff'
	);
	addStyle(
		'--bbb-tab-background-hover-color',
		attributes?.tabColor?.backgroundColor?.hover || '#000'
	);
	addStyle(
		'--bbb-tab-icon-hover-color',
		attributes?.tabColor?.iconColor?.hover || '#fff'
	);
	addStyle(
		'--bbb-tab-text-active-color',
		attributes?.tabColor?.textColor?.active || '#fff'
	);
	addStyle(
		'--bbb-tab-background-active-color',
		attributes?.tabColor?.backgroundColor?.active || '#000'
	);
	addStyle(
		'--bbb-tab-icon-active-color',
		attributes?.tabColor?.iconColor?.active || '#fff'
	);

	// Padding styles with defaults
	addStyle(
		'--bbb-tab-padding-top',
		resolveSpacingSizeValue(attributes?.tabPadding?.top, '5px')
	);
	addStyle(
		'--bbb-tab-padding-right',
		resolveSpacingSizeValue(attributes?.tabPadding?.right, '15px')
	);
	addStyle(
		'--bbb-tab-padding-bottom',
		resolveSpacingSizeValue(attributes?.tabPadding?.bottom, '5px')
	);
	addStyle(
		'--bbb-tab-padding-left',
		resolveSpacingSizeValue(attributes?.tabPadding?.left, '15px')
	);

	// Border styles
	Object.assign(styles, getBorderStyles(attributes?.tabBorder));

	// Tab Buttons styles
	addStyle(
		'--bbb-tab-buttons-justify-content',
		attributes?.justification || 'left'
	);

	// Icon Size
	addStyle(
		'--bbb-tab-icon-size',
		attributes?.iconSize ? `${attributes?.iconSize}px` : '24px'
	);

	// Tab List Gap
	const [listGap, tabsGap] = generateGapStyles(
		attributes.style?.spacing?.blockGap || null,
		attributes.orientation
	);
	addStyle('--bbb-tabs-list-gap', listGap);
	addStyle('--bbb-tabs-gap', tabsGap);

	return styles;
};

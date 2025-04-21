/**
 * WordPress dependencies
 */
import {
	__experimentalGetGapCSSValue as getGapCSSValue // eslint-disable-line
} from '@wordpress/block-editor';

const DEFAULT_GAP = '0.5em';

/**
 * Generates CSS gap styles for a block based on the provided gap and orientation.
 *
 * @param {string|object} blockGap                   - The gap value for the block. Can be a string (e.g., "10px") or an object with `top` and `left` properties.
 * @param {string}        [orientation='horizontal'] - The orientation of the block. Can be 'horizontal' or 'vertical'.
 * @return {Array<string>} - An array containing two CSS gap values
 */
const generateGapStyles = ( blockGap, orientation = 'horizontal' ) => {
	let tabListGap = DEFAULT_GAP;
	let tabGap = DEFAULT_GAP;

	if ( typeof blockGap === 'string' ) {
		tabListGap = blockGap;
		tabGap = blockGap;
	} else if ( typeof blockGap === 'object' && blockGap !== null ) {
		tabListGap = blockGap.top || DEFAULT_GAP;
		tabGap = blockGap.left || DEFAULT_GAP;
	}

	// Convert to valid CSS values
	const main = getGapCSSValue( tabListGap );
	const cross = getGapCSSValue( tabGap );

	// If vertical, swap main⇄cross
	return orientation === 'vertical' ? [ main, cross ] : [ cross, main ];
};

/**
 * Resolves a spacing size value into a usable CSS value.
 *
 * @param {string|number} value        - The input spacing size value.
 * @param {string|number} defaultValue - The default value.
 * @return {string} - A valid CSS spacing size value.
 */
const resolveSpacingSizeValue = ( value, defaultValue = '0px' ) => {
	if ( typeof value === 'string' ) {
		if ( value.startsWith( 'var:' ) ) {
			// Convert "var:some|value" into "var(--wp--some--value)"
			const cssVariable = value
				.replace( 'var:', '--wp--' )
				.replace( /\|/g, '--' );
			return `var(${ cssVariable })`;
		}
		return value; // If it's a valid CSS string, return as-is
	}

	if ( typeof value === 'number' ) {
		return `${ value }px`; // Convert numbers to pixel values
	}

	// use defaultValue if value is invalid or undefined
	return defaultValue;
};

/**
 * Generates a set of CSS variable mappings based on provided attributes.
 * The returned object excludes variables with invalid or undefined values.
 *
 * @param {Object} attributes - The attributes used to customize styles.
 *
 * @return {Object} - An object with CSS variable definitions.
 */
export const generateStyles = ( attributes = {} ) => {
	const styles = {};

	// Helper function to add a style with a fallback to default values
	const addStyle = ( key, value, defaultValue = '0px' ) => {
		if ( value !== undefined && value !== null ) {
			styles[ key ] = value;
		} else if ( defaultValue ) {
			styles[ key ] = defaultValue;
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
		resolveSpacingSizeValue( attributes?.tabPadding?.top, '5px' )
	);
	addStyle(
		'--bbb-tab-padding-right',
		resolveSpacingSizeValue( attributes?.tabPadding?.right, '15px' )
	);
	addStyle(
		'--bbb-tab-padding-bottom',
		resolveSpacingSizeValue( attributes?.tabPadding?.bottom, '5px' )
	);
	addStyle(
		'--bbb-tab-padding-left',
		resolveSpacingSizeValue( attributes?.tabPadding?.left, '15px' )
	);

	// Tab Buttons styles
	addStyle(
		'--bbb-tab-buttons-justify-content',
		attributes?.justification || 'left'
	);

	// Icon Size
	addStyle(
		'--bbb-tab-icon-size',
		attributes?.iconSize ? `${ attributes?.iconSize }px` : '24px'
	);

	// Tab List Gap
	const [ listGap, tabsGap ] = generateGapStyles(
		attributes.style?.spacing?.blockGap || null,
		attributes.orientation
	);
	addStyle( '--bbb-tabs-list-gap', listGap );
	addStyle( '--bbb-tabs-gap', tabsGap );

	return styles;
};

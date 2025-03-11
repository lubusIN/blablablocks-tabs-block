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

        styles[`--bbb-tab-border-${side}`] = `${width} ${style} ${color}`;
    });

    return styles;
};

/**
 * Generates a border-radius string from either a string or an object.
 *
 * @param {string|object} borderRadius - The border radius definition.
 * @param {string|number} defaultValue - The default value.
 * @return {string} - A valid CSS border-radius value.
 */
const getBorderRadiusStyles = (borderRadius, defaultValue = '0px') => {
    if (typeof borderRadius === 'string') {
        return borderRadius;
    }

    // If it's an object, return a four-value shorthand for border-radius
    const topLeft = borderRadius?.topLeft || defaultValue;
    const topRight = borderRadius?.topRight || defaultValue;
    const bottomRight = borderRadius?.bottomRight || defaultValue;
    const bottomLeft = borderRadius?.bottomLeft || defaultValue;
    return `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`;
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

    // Tab Color
    addStyle(
        '--bbb-tab-color',
        attributes?.tabColor?.color?.default,
        '#000'
    );
    addStyle(
        '--bbb-tab-background-color',
        attributes?.tabColor?.backgroundColor?.default,
        'transparent'
    );
    addStyle(
        '--bbb-tab-hover-color',
        attributes?.tabColor?.color?.hover,
        '#333'
    );
    addStyle(
        '--bbb-tab-background-hover-color',
        attributes?.tabColor?.backgroundColor?.hover,
        'transparent'
    );
    addStyle(
        '--bbb-tab-active-color',
        attributes?.tabColor?.color?.active,
        '#333'
    );
    addStyle(
        '--bbb-tab-background-active-color',
        attributes?.tabColor?.backgroundColor?.active,
        'transparent'
    );

    // Tab Border Radius
    addStyle(
        '--bbb-tab-border-radius',
        getBorderRadiusStyles(attributes?.tabBorderRadius, '4px')
    );

    // Padding styles with defaults
    addStyle(
        '--bbb-tab-padding-top',
        resolveSpacingSizeValue(attributes?.tabPadding?.top, '0px')
    );
    addStyle(
        '--bbb-tab-padding-right',
        resolveSpacingSizeValue(attributes?.tabPadding?.right, '0px')
    );
    addStyle(
        '--bbb-tab-padding-bottom',
        resolveSpacingSizeValue(attributes?.tabPadding?.bottom, '0px')
    );
    addStyle(
        '--bbb-tab-padding-left',
        resolveSpacingSizeValue(attributes?.tabPadding?.left, '0px')
    );

    // Spacing styles with defaults
    addStyle(
        '--bbb-tab-spacing',
        resolveSpacingSizeValue(attributes?.tabSpacing, '20px')
    );

    // Border styles
    Object.assign(styles, getBorderStyles(attributes?.tabBorder));

    // Tab Buttons styles
    addStyle(
        '--bbb-tab-buttons-justify-content',
        attributes?.justification || 'left'
    );
    addStyle(
        '--bbb-tab-buttons-flex-direction',
        attributes?.orientation || 'column'
    );

    // Tabs styles
    addStyle(
        '--bbb-tabs-display',
        attributes?.orientation === 'column' ? 'flex' : ''
    );
    addStyle(
        '--bbb-tabs-flex-direction',
        attributes?.orientation === 'column' && attributes?.verticalPosition === 'right' ? 'row-reverse' : 'row'
    );

    return styles;
};

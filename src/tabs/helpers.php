<?php

/**
 * Helpers Tabs Block.
 */

/**
 * Extract tab data from inner blocks.
 *
 * @param array $inner_blocks Inner blocks array.
 * @return array
 */
if (! function_exists('blablablocks_extract_tab_data')) {
    function blablablocks_extract_tab_data(array $inner_blocks): array
    {
        return array_map(static function ($inner_block, $index) {
            $attrs = $inner_block['attrs'] ?? [];
            $hasInnerblock = !empty($inner_block['innerBlocks']);
            return [
                'id'            => 'tab-' . ($attrs['tabId'] ?? $index),
                'label'         => $attrs['tabname'] ?? '',
                'hasInnerblock' => $hasInnerblock,
            ];
        }, $inner_blocks, array_keys($inner_blocks));
    }
}

/**
 * Resolves a spacing size value into a usable CSS value.
 *
 * @param mixed $value The input spacing size value.
 * @param mixed $defaultValue The default value.
 * @return string A valid CSS spacing size value.
 */
if (! function_exists('resolveSpacingSizeValue')) {
    function resolveSpacingSizeValue($value, $defaultValue = '0px')
    {
        if (is_string($value)) {
            if (strpos($value, 'var:') === 0) {
                // Convert "var:some|value" into "var(--wp--some--value)"
                $cssVariable = str_replace('|', '--', str_replace('var:', '--wp--', $value));
                return "var($cssVariable)";
            }
            return $value; // If it's a valid CSS string, return as-is
        }

        if (is_numeric($value)) {
            return "{$value}px"; // Convert numbers to pixel values
        }

        // use defaultValue if value is invalid or undefined
        return $defaultValue;
    }
}

/**
 * Generates CSS gap styles for the tabs block.
 *
 * @param array  $attributes  Block attributes.
 * @return string A string of CSS variables.
 */
if (! function_exists('getGapStyles')) {
    function getGapStyles($attributes)
    {
        $DEFAULT_GAP = '0.5em';
        $orientation = isset($attributes['orientation']) ? $attributes['orientation'] : 'horizontal';

        // Get blockGap from attributes
        $blockGap = isset($attributes['style']['spacing']['blockGap'])
            ? $attributes['style']['spacing']['blockGap']
            : null;

        // Compute the two CSS values
        $tabListGap = $blockGap
            ? (is_string($blockGap)
                ? $blockGap
                : (isset($blockGap['top']) ? $blockGap['top'] : $DEFAULT_GAP))
            : $DEFAULT_GAP;

        $tabGap = $blockGap
            ? (is_string($blockGap)
                ? $blockGap
                : (isset($blockGap['left']) ? $blockGap['left'] : $DEFAULT_GAP))
            : $DEFAULT_GAP;

        // Convert to valid CSS values
        $main = getGapCSSValue($tabListGap);
        $cross = getGapCSSValue($tabGap);

        // If vertical, swap main and cross
        list($listGap, $tabsGap) = $orientation === 'vertical'
            ? [$main, $cross]
            : [$cross, $main];

        return [
            '--bbb-tabs-list-gap' => $listGap,
            '--bbb-tabs-gap' => $tabsGap
        ];
    }
}

/**
 * Converts a gap value to a valid CSS value.
 * Handles preset values (e.g., "var:preset|spacing|40") by converting them to CSS variables.
 *
 * @param string $value The gap value to convert.
 * @return string The converted CSS value.
 */
if (! function_exists('getGapCSSValue')) {
    function getGapCSSValue($value)
    {
        if (preg_match('/^var:preset\|spacing\|\d+$/', $value)) {
            return 'var(--wp--preset--spacing--' . substr($value, strrpos($value, '|') + 1) . ')';
        }
        return $value;
    }
}

/**
 * Returns typography classnames depending on whether there are named font sizes/families.
 *
 * @param array $attributes The block attributes.
 *
 * @return string The typography color classnames to be applied to the block elements.
 */
if (! function_exists('bbb_get_typography_classes')) {
    function bbb_get_typography_classes($attributes)
    {
        $typography_classes    = [];
        $has_named_font_family = ! empty($attributes['fontFamily']);
        $has_named_font_size   = ! empty($attributes['fontSize']);

        if ($has_named_font_size) {
            $typography_classes[] = sprintf('has-%s-font-size', esc_attr($attributes['fontSize']));
        }

        if ($has_named_font_family) {
            $typography_classes[] = sprintf('has-%s-font-family', esc_attr($attributes['fontFamily']));
        }

        return implode(' ', $typography_classes);
    }
}

/**
 * Returns typography styles to be included in an HTML style tag.
 *
 * @param array $attributes The block attributes.
 *
 * @return string A string of typography CSS declarations.
 */
if (! function_exists('bbb_get_typography_styles')) {
    function bbb_get_typography_styles($attributes)
    {
        $typography_styles = [];

        // Add typography styles.
        if (! empty($attributes['style']['typography']['fontSize'])) {
            $typography_styles[] = sprintf(
                'font-size: %s;',
                wp_get_typography_font_size_value(
                    array(
                        'size' => $attributes['style']['typography']['fontSize'],
                    )
                )
            );
        }

        if (! empty($attributes['style']['typography']['fontFamily'])) {
            $typography_styles[] = sprintf('font-family: %s;', $attributes['style']['typography']['fontFamily']);
        }

        if (! empty($attributes['style']['typography']['letterSpacing'])) {
            $typography_styles[] = sprintf('letter-spacing: %s;', $attributes['style']['typography']['letterSpacing']);
        }

        if (! empty($attributes['style']['typography']['fontWeight'])) {
            $typography_styles[] = sprintf('font-weight: %s;', $attributes['style']['typography']['fontWeight']);
        }

        if (! empty($attributes['style']['typography']['fontStyle'])) {
            $typography_styles[] = sprintf('font-style: %s;', $attributes['style']['typography']['fontStyle']);
        }

        if (! empty($attributes['style']['typography']['lineHeight'])) {
            $typography_styles[] = sprintf('line-height: %s;', $attributes['style']['typography']['lineHeight']);
        }

        if (! empty($attributes['style']['typography']['textTransform'])) {
            $typography_styles[] = sprintf('text-transform: %s;', $attributes['style']['typography']['textTransform']);
        }

        if (! empty($attributes['style']['typography']['textDecoration'])) {
            $typography_styles[] = sprintf('text-decoration: %s;', $attributes['style']['typography']['textDecoration']);
        }

        return implode('', $typography_styles);
    }
}

/**
 * Generates a set of CSS variable mappings based on provided attributes.
 * The returned array excludes variables with invalid or undefined values.
 *
 * @param array $attributes The attributes used to customize styles.
 * @return array An array with CSS variable definitions.
 */
if (! function_exists('generateStyles')) {
    function generateStyles($attributes = array())
    {
        $styles = array();

        // Helper function to add a style with a fallback to default values
        $addStyle = function ($key, $value, $defaultValue = '0px') use (&$styles) {
            if ($value !== null && $value !== '') {
                $styles[$key] = $value;
            } elseif ($defaultValue !== null) {
                $styles[$key] = $defaultValue;
            }
        };

        // Add gap styles
        $styles = array_merge($styles, getGapStyles($attributes));

        // Tab Color using Tailwind's gray shades
        $addStyle(
            '--bbb-tab-text-color',
            $attributes['tabColor']['textColor']['default'] ?? '#000'
        );
        $addStyle(
            '--bbb-tab-background-color',
            $attributes['tabColor']['backgroundColor']['default'] ?? '#fff'
        );
        $addStyle(
            '--bbb-tab-icon-color',
            $attributes['tabColor']['iconColor']['default'] ?? '#000'
        );
        $addStyle(
            '--bbb-tab-text-hover-color',
            $attributes['tabColor']['textColor']['hover'] ?? '#fff'
        );
        $addStyle(
            '--bbb-tab-background-hover-color',
            $attributes['tabColor']['backgroundColor']['hover'] ?? '#000'
        );
        $addStyle(
            '--bbb-tab-icon-hover-color',
            $attributes['tabColor']['iconColor']['hover'] ?? '#fff'
        );
        $addStyle(
            '--bbb-tab-text-active-color',
            $attributes['tabColor']['textColor']['active'] ?? '#fff'
        );
        $addStyle(
            '--bbb-tab-background-active-color',
            $attributes['tabColor']['backgroundColor']['active'] ?? '#000'
        );
        $addStyle(
            '--bbb-tab-icon-active-color',
            $attributes['tabColor']['iconColor']['active'] ?? '#fff'
        );

        // Padding styles with defaults
        $addStyle(
            '--bbb-tab-padding-top',
            resolveSpacingSizeValue($attributes['tabPadding']['top'] ?? null, '5px')
        );
        $addStyle(
            '--bbb-tab-padding-right',
            resolveSpacingSizeValue($attributes['tabPadding']['right'] ?? null, '15px')
        );
        $addStyle(
            '--bbb-tab-padding-bottom',
            resolveSpacingSizeValue($attributes['tabPadding']['bottom'] ?? null, '5px')
        );
        $addStyle(
            '--bbb-tab-padding-left',
            resolveSpacingSizeValue($attributes['tabPadding']['left'] ?? null, '15px')
        );

        // Tab Buttons styles
        $addStyle(
            '--bbb-tab-buttons-justify-content',
            $attributes['justification'] ?? 'left'
        );

        // Icon Size
        $addStyle(
            '--bbb-tab-icon-size',
            isset($attributes['iconSize']) ? "{$attributes['iconSize']}px" : '24px'
        );

        return $styles;
    }
}

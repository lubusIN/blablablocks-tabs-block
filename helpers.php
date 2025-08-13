<?php

/**
 * Helpers Tabs Block.
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Extract tab data from inner blocks.
 *
 * @param array $inner_blocks Inner blocks array.
 * @return array
 */
if (! function_exists('blabtabl_extract_tab_data')) {
    function blabtabl_extract_tab_data(array $inner_blocks): array
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
if (! function_exists('blabtabl_resolve_spacing_size')) {
    function blabtabl_resolve_spacing_size($value, $defaultValue = '0px')
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
if (! function_exists('blabtabl_get_gap_styles')) {
    function blabtabl_get_gap_styles($attributes)
    {
        $blockGap = $attributes['style']['spacing']['blockGap'] ?? '0.5em';
        $orientation = $attributes['orientation'] ?? 'horizontal';

        // Get main and cross axis gaps
        if (is_string($blockGap)) {
            $main = $cross = blabtabl_get_gap_css_value($blockGap);
        } else {
            $main = blabtabl_get_gap_css_value($blockGap['top'] ?? '0.5em');
            $cross = blabtabl_get_gap_css_value($blockGap['left'] ?? '0.5em');
        }

        // Swap for vertical orientation
        [$listGap, $tabsGap] = $orientation === 'vertical' ? [$main, $cross] : [$cross, $main];

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
if (! function_exists('blabtabl_get_gap_css_value')) {
    function blabtabl_get_gap_css_value($value)
    {
        if (preg_match('/^var:preset\|spacing\|\d+$/', $value)) {
            return 'var(--wp--preset--spacing--' . substr($value, strrpos($value, '|') + 1) . ')';
        }
        return $value;
    }
}

/**
 * Helper function to resolve color value based on slug
 * 
 * @param mixed $colorValue - Color value (can be string, array with 'color' and 'slug', or null)
 * @param string $fallback - Fallback color value
 * @return string - CSS color value or custom property
 */
if (! function_exists('blabtabl_resolve_color_value')) {
    function blabtabl_resolve_color_value($colorValue, $fallback = '')
    {
        // If it's null or empty, return fallback
        if (empty($colorValue)) {
            return $fallback;
        }

        // If it's a string, return as-is (direct color value)
        if (is_string($colorValue)) {
            return $colorValue;
        }

        // If it's an array (normalized color object from JS)
        if (is_array($colorValue)) {
            // If we have a slug, use the WordPress preset color custom property
            if (!empty($colorValue['slug'])) {
                return "var(--wp--preset--color--{$colorValue['slug']})";
            }

            // Otherwise use the direct color value
            if (!empty($colorValue['color'])) {
                return $colorValue['color'];
            }
        }

        return $fallback;
    }
}

/**
 * Returns typography classnames depending on whether there are named font sizes/families.
 *
 * @param array $attributes The block attributes.
 * @return string The typography color classnames to be applied to the block elements.
 */
if (! function_exists('blabtabl_get_typography_classes')) {
    function blabtabl_get_typography_classes($attributes)
    {
        $typography_classes    = [];

        if (! empty($attributes['fontSize'])) {
            $typography_classes[] = sprintf('has-%s-font-size', esc_attr($attributes['fontSize']));
        }

        if (! empty($attributes['fontFamily'])) {
            $typography_classes[] = sprintf('has-%s-font-family', esc_attr($attributes['fontFamily']));
        }

        return implode(' ', $typography_classes);
    }
}

/**
 * Returns typography styles to be included in an HTML style tag.
 *
 * @param array $attributes The block attributes.
 * @return string A string of typography CSS declarations.
 */
if (! function_exists('blabtabl_get_typography_styles')) {
    function blabtabl_get_typography_styles($attributes)
    {
        $styles = [];
        $typography = $attributes['style']['typography'] ?? [];

        $properties = [
            'fontSize' => 'font-size',
            'fontFamily' => 'font-family',
            'fontWeight' => 'font-weight',
            'fontStyle' => 'font-style',
            'lineHeight' => 'line-height',
            'letterSpacing' => 'letter-spacing',
            'textTransform' => 'text-transform',
            'textDecoration' => 'text-decoration'
        ];

        foreach ($properties as $attr => $cssProperty) {
            if (!empty($typography[$attr])) {
                $value = $typography[$attr];

                // Special handling for fontSize
                if ($attr === 'fontSize') {
                    $value = wp_get_typography_font_size_value(['size' => $value]);
                }

                $styles[] = "{$cssProperty}: {$value};";
            }
        }

        return implode('', $styles);
    }
}

/**
 * Returns border color classnames depending on whether there are named or custom border colors.
 *
 * @param array $attributes The block attributes.
 * @return string The border color classnames to be applied to the block elements.
 */
if (! function_exists('blabtabl_get_border_color_classes')) {
    function blabtabl_get_border_color_classes($attributes)
    {
        $border_color_classes    = [];
        $has_custom_border_color = ! empty($attributes['style']['border']['color']);
        $has_named_border_color  = ! empty($attributes['borderColor']);

        if ($has_custom_border_color || $has_named_border_color) {
            $border_color_classes[] = 'has-border-color';
        }

        if ($has_named_border_color) {
            $border_color_classes[] = sprintf('has-%s-border-color', esc_attr($attributes['borderColor']));
        }

        return implode(' ', $border_color_classes);
    }
}

/**
 * Build the complete border CSS (width, color, style, radius).
 */
if (! function_exists('blabtabl_get_tabs_border_styles')) {
    function blabtabl_get_tabs_border_styles(array $attributes): string
    {
        $styles = [];

        // Border radius
        $radius = _wp_array_get($attributes, ['style', 'border', 'radius'], null);
        if ($radius) {
            if (is_array($radius)) {
                $corners = array_map(fn($v) => is_numeric($v) ? "{$v}px" : $v, [
                    $radius['topLeft'] ?? 0,
                    $radius['topRight'] ?? 0,
                    $radius['bottomRight'] ?? 0,
                    $radius['bottomLeft'] ?? 0
                ]);
                $styles[] = sprintf('border-radius: %s;', implode(' ', $corners));
            } else {
                $val = is_numeric($radius) ? "{$radius}px" : $radius;
                $styles[] = "border-radius: {$val};";
            }
        }

        // Border properties - check shorthand first, then individual sides
        foreach (['width', 'color', 'style'] as $prop) {
            // Check shorthand property (without side)
            $shorthandValue = _wp_array_get($attributes, ['style', 'border', $prop], '');
            if ($shorthandValue) {
                // Handle color presets for shorthand
                if ($prop === 'color' && str_starts_with($shorthandValue, 'var:preset|color|')) {
                    $shorthandValue = 'var(--wp--preset--color--' . substr($shorthandValue, strrpos($shorthandValue, '|') + 1) . ')';
                }
                // Add px to numeric widths for shorthand
                if ($prop === 'width' && is_numeric($shorthandValue)) {
                    $shorthandValue .= 'px';
                }
                $styles[] = "border-{$prop}: {$shorthandValue};";
            } else {
                // Check individual sides
                foreach (['top', 'right', 'bottom', 'left'] as $side) {
                    $value = _wp_array_get($attributes, ['style', 'border', $side, $prop], '');
                    if ($value) {
                        // Handle color presets
                        if ($prop === 'color' && str_starts_with($value, 'var:preset|color|')) {
                            $value = 'var(--wp--preset--color--' . substr($value, strrpos($value, '|') + 1) . ')';
                        }
                        // Add px to numeric widths
                        if ($prop === 'width' && is_numeric($value)) {
                            $value .= 'px';
                        }
                        $styles[] = "border-{$side}-{$prop}: {$value};";
                    }
                }
            }
        }

        return implode(' ', $styles);
    }
}

/**
 * Generates a set of CSS variable mappings based on provided attributes.
 * The returned array excludes variables with invalid or undefined values.
 *
 * @param array $attributes The attributes used to customize styles.
 * @return array An array with CSS variable definitions.
 */
if (! function_exists('blabtabl_generate_styles')) {
    function blabtabl_generate_styles($attributes = [])
    {
        $styles = blabtabl_get_gap_styles($attributes);

        // Padding
        $padding = $attributes['tabPadding'] ?? [];
        $styles['--bbb-tab-padding'] = sprintf(
            '%s %s %s %s',
            blabtabl_resolve_spacing_size($padding['top'] ?? null, '5px'),
            blabtabl_resolve_spacing_size($padding['right'] ?? null, '15px'),
            blabtabl_resolve_spacing_size($padding['bottom'] ?? null, '5px'),
            blabtabl_resolve_spacing_size($padding['left'] ?? null, '15px')
        );

        // Colors for different states
        $colorDefaults = [
            'default' => ['text' => '#000', 'bg' => '#fff', 'icon' => '#000'],
            'hover'   => ['text' => '#fff', 'bg' => '#000', 'icon' => '#fff'],
            'active'  => ['text' => '#fff', 'bg' => '#000', 'icon' => '#fff']
        ];

        foreach ($colorDefaults as $state => $defaults) {

            // Text color
            $textColor = $attributes['tabTextColor'][$state] ?? null;
            $styles["--bbb-tab-text-{$state}-color"] = blabtabl_resolve_color_value(
                $textColor,
                $defaults['text']
            );

            // Background color
            $backgroundColor = $attributes['tabBackgroundColor'][$state] ?? null;
            $styles["--bbb-tab-background-{$state}-color"] = blabtabl_resolve_color_value(
                $backgroundColor,
                $defaults['bg']
            );

            // Icon color
            $iconColor = $attributes['tabIconColor'][$state] ?? null;
            $styles["--bbb-tab-icon-{$state}-color"] = blabtabl_resolve_color_value(
                $iconColor,
                $defaults['icon']
            );
        }

        // Other styles
        $styles['--bbb-tab-buttons-justify-content'] = $attributes['justification'] ?? 'left';
        $styles['--bbb-tab-icon-size'] = ($attributes['iconSize'] ?? 24) . 'px';

        return $styles;
    }
}

/**
 * Build the style for a Tabs container.
 *
 * @param array $attributes Block attributes.
 * @return string A string of CSS declarations.
 */
if (! function_exists('blabtabl_get_tabs_container_styles')) {
    function blabtabl_get_tabs_container_styles(array $attributes): string
    {
        $styles = [];

        // Border styles
        $styles[] = blabtabl_get_tabs_border_styles($attributes);

        // Background
        $color = $attributes['style']['color'] ?? [];
        if (!empty($color['background'])) {
            $styles[] = "background-color: {$color['background']};";
        }
        if (!empty($color['gradient'])) {
            $styles[] = "background: {$color['gradient']};";
        }

        // Padding
        $padding = $attributes['style']['spacing']['padding'] ?? [];
        $styles[] = sprintf(
            'padding: %s %s %s %s;',
            blabtabl_resolve_spacing_size($padding['top'] ?? null, '0px'),
            blabtabl_resolve_spacing_size($padding['right'] ?? null, '0px'),
            blabtabl_resolve_spacing_size($padding['bottom'] ?? null, '0px'),
            blabtabl_resolve_spacing_size($padding['left'] ?? null, '0px')
        );

        // Margin for horizontal justification
        if (($attributes['orientation'] ?? 'horizontal') === 'horizontal') {
            $margins = [
                'left'    => 'margin: 0 0 auto;',
                'center'  => 'margin: 0 auto;',
                'right'   => 'margin: 0 0 0 auto;',
                'stretch' => 'margin: 0;'
            ];
            $justification = $attributes['justification'] ?? 'left';

            if (isset($margins[$justification])) {
                $styles[] = $margins[$justification];
            }
        }

        // width
        if (($attributes['orientation'] ?? 'horizontal') === 'vertical') {
            $width = $attributes['width'] ?? '50';
            $styles[] = "min-width: {$width}%;";
        }

        return trim(implode(' ', array_filter($styles)));
    }
}

/**
 * Returns color classnames depending on whether there are named or background colors.
 *
 * @param array $attributes The block attributes.
 * @return string The color classnames to be applied to the block elements.
 */
if (! function_exists('blabtabl_get_color_classes')) {
    function blabtabl_get_color_classes($attributes)
    {
        $classes = [];

        // Check if any background is set
        $hasBackground = !empty($attributes['backgroundColor']) ||
            !empty($attributes['style']['color']['background']) ||
            !empty($attributes['gradient']) ||
            !empty($attributes['style']['color']['gradient']);

        if ($hasBackground) {
            $classes[] = 'has-background';
        }

        // Named background color
        if (!empty($attributes['backgroundColor'])) {
            $classes[] = "has-{$attributes['backgroundColor']}-background-color";
        }

        // Named gradient
        if (!empty($attributes['gradient'])) {
            $classes[] = "has-{$attributes['gradient']}-gradient-background";
        }

        return implode(' ', $classes);
    }
}

/**
 * Build the border style for Tab button.
 *
 * @param array $attributes Block attributes.
 * @return string A string of CSS declarations.
 */
if (! function_exists('blabtabl_get_tab_button_border_styles')) {
    function blabtabl_get_tab_button_border_styles(array $attributes): string
    {
        $styles = [];

        // Tab Border styles
        $styles[] = blabtabl_get_tabs_border_styles(['style' => $attributes['tabBorder'] ?? []]);

        return trim(implode(' ', array_filter($styles)));
    }
}

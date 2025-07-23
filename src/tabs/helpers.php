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
 * Generate a single border declaration.
 *
 * @param array       $attributes Block attributes.
 * @param string      $property   'width', 'color' or 'style'.
 * @param string|null $side       null|top|right|bottom|left.
 * @return string    CSS declaration or empty string.
 */
if (! function_exists('apply_tabs_border_style')) {
    function apply_tabs_border_style(array $attributes, string $property, ?string $side = null): string
    {
        // Build the path into the attrs array.
        $path = ['style', 'border', $property];
        if ($side) {
            array_splice($path, 2, 0, $side);
        }

        // Grab the value or bail.
        $value = _wp_array_get($attributes, $path, '');
        if ($value === '' || $value === null) {
            return '';
        }

        // If it's a color preset like "var:preset|color|sky", convert it
        if ('color' === $property && str_starts_with($value, 'var:preset|color|')) {
            $named = substr($value, strrpos($value, '|') + 1);
            $value = sprintf('var(--wp--preset--color--%s)', $named);
        }

        // Determine the CSS property name
        $prop_name = $side
            ? sprintf('border-%s-%s', $side, $property)
            : "border-{$property}";

        return sprintf('%s: %s;', esc_attr($prop_name), esc_attr($value));
    }
}

/**
 * Collect all border declarations for a given property.
 *
 * @param array  $attributes Block attributes.
 * @param string $property   'width', 'color' or 'style'.
 * @return string[] Array of CSS declarations.
 */
if (! function_exists('apply_tabs_border_styles')) {
    function apply_tabs_border_styles(array $attributes, string $property): array
    {
        $declarations = [];

        // check the shorthand + each side
        foreach ([null, 'top', 'right', 'bottom', 'left'] as $side) {
            $decl = apply_tabs_border_style($attributes, $property, $side);
            if ($decl) {
                $declarations[] = $decl;
            }
        }

        return $declarations;
    }
}

/**
 * Build the complete border CSS (width, color, style, radius).
 *
 * @param array $attributes Block attributes.
 * @return string Space‑separated CSS declarations.
 */
if (! function_exists('get_tabs_border_styles')) {
    function get_tabs_border_styles(array $attributes): string
    {
        $styles = [];

        // 1. border-radius shorthand
        $radius = _wp_array_get($attributes, ['style', 'border', 'radius'], null);
        if ($radius !== null && $radius !== '') {
            if (is_array($radius)) {
                // grab each corner (default to 0)
                $tl = $radius['topLeft']     ?? 0;
                $tr = $radius['topRight']    ?? 0;
                $br = $radius['bottomRight'] ?? 0;
                $bl = $radius['bottomLeft']  ?? 0;

                // normalize numeric → px
                foreach (['tl', 'tr', 'br', 'bl'] as $corner) {
                    if (is_numeric($$corner)) {
                        $$corner .= 'px';
                    }
                }

                $styles[] = sprintf(
                    'border-radius: %s %s %s %s;',
                    esc_attr($tl),
                    esc_attr($tr),
                    esc_attr($br),
                    esc_attr($bl)
                );
            } else {
                $val = is_numeric($radius) ? "{$radius}px" : $radius;
                $styles[] = sprintf('border-radius: %s;', esc_attr($val));
            }
        }

        // 2. per‑side color/style (unchanged)
        $styles = array_merge(
            $styles,
            apply_tabs_border_styles($attributes, 'color'),
            apply_tabs_border_styles($attributes, 'style')
        );

        // 3. border-width shorthand
        $wTop    = _wp_array_get($attributes, ['style', 'border', 'top', 'width'], '');
        $wRight  = _wp_array_get($attributes, ['style', 'border', 'right', 'width'], '');
        $wBottom = _wp_array_get($attributes, ['style', 'border', 'bottom', 'width'], '');
        $wLeft   = _wp_array_get($attributes, ['style', 'border', 'left', 'width'], '');

        if ($wTop !== '' || $wRight !== '' || $wBottom !== '' || $wLeft !== '') {
            // normalize numeric → px
            foreach (['wTop', 'wRight', 'wBottom', 'wLeft'] as $w) {
                if (is_numeric($$w)) {
                    $$w .= 'px';
                }
            }

            if ($wTop === $wBottom && $wRight === $wLeft) {
                // can collapse to 1 or 2 values
                if ($wTop === $wRight) {
                    $styles[] = sprintf('border-width: %s;', esc_attr($wTop));
                } else {
                    $styles[] = sprintf(
                        'border-width: %s %s;',
                        esc_attr($wTop),
                        esc_attr($wRight)
                    );
                }
            } else {
                // explicit top | right | bottom | left
                $styles[] = sprintf(
                    'border-width: %s %s %s %s;',
                    esc_attr($wTop),
                    esc_attr($wRight),
                    esc_attr($wBottom),
                    esc_attr($wLeft)
                );
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
if (! function_exists('generateStyles')) {
    function generateStyles($attributes = [])
    {
        $styles = [];

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

        // Padding styles with defaults
        $padding_top = resolveSpacingSizeValue($attributes['tabPadding']['top'] ?? null, '5px');
        $padding_bottom = resolveSpacingSizeValue($attributes['tabPadding']['bottom'] ?? null, '5px');
        $padding_left = resolveSpacingSizeValue($attributes['tabPadding']['left'] ?? null, '15px');
        $padding_right = resolveSpacingSizeValue($attributes['tabPadding']['right'] ?? null, '15px');

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

        $addStyle(
            '--bbb-tab-padding',
            $padding_top . ' ' . $padding_right . ' ' . $padding_bottom . ' ' . $padding_left
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

/**
 * Build the complete border + padding CSS for a Tabs container.
 *
 * @param array $attributes Block attributes.
 * @return string A string of CSS declarations (border + padding).
 */
if (! function_exists('get_tabs_container_styles')) {
    function get_tabs_container_styles(array $attributes): string
    {
        $border_css = get_tabs_border_styles($attributes);

        // Padding shorthand — resolves via resolveSpacingSizeValue():
        $padding = $attributes['style']['spacing']['padding'] ?? [];
        $top    = resolveSpacingSizeValue($padding['top']    ?? null, '0px');
        $right  = resolveSpacingSizeValue($padding['right']  ?? null, '0px');
        $bottom = resolveSpacingSizeValue($padding['bottom'] ?? null, '0px');
        $left   = resolveSpacingSizeValue($padding['left']   ?? null, '0px');

        $padding_css = sprintf(
            'padding: %s %s %s %s;',
            esc_attr($top),
            esc_attr($right),
            esc_attr($bottom),
            esc_attr($left)
        );

        // horizontal-justification via margins:
        $margin_css = '';
        $orientation = $attributes['orientation'] ?? 'horizontal';
        if ('horizontal' === $orientation) {
            switch ($attributes['justification'] ?? 'left') {
                case 'right':
                    $margin_css = 'margin: 0 0 0 auto;';
                    break;
                case 'center':
                    $margin_css = 'margin: 0 auto;';
                    break;
                case 'left':
                default:
                    $margin_css = 'margin: 0 0 auto;';
                    break;
            }
        }

        return trim(implode(' ', array_filter([
            $border_css,
            $padding_css,
            $margin_css,
        ])));
    }
}

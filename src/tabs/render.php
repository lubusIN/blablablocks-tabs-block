<?php

/**
 * Render Tabs Block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @package BlaBlaBlocks Tabs Block
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
            return [
                'id'    => 'tab-' . ($attrs['tabId'] ?? $index),
                'label' => $attrs['tabname'] ?? sprintf(__('Tab %d', 'blablablocks'), $index + 1),
            ];
        }, $inner_blocks, array_keys($inner_blocks));
    }
}

// Extract tabs data.
$tabs = blablablocks_extract_tab_data($block->parsed_block['innerBlocks'] ?? []);

// Determine active tab safely.
$active_tab_index = isset($attributes['activeTab'], $tabs[$attributes['activeTab']]) ? $attributes['activeTab'] : 0;
$active_tab_id = $tabs[$active_tab_index]['id'];

// Prepare data context.
$data_context = [
    'tabs'      => $tabs,
    'activeTab' => $active_tab_index,
    'activeId'  => $active_tab_id,
];

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
 * Generates border styles based on provided attributes.
 *
 * @param array $border The border definition array.
 * @return array An array containing border styles.
 */
if (! function_exists('getBorderStyles')) {
    function getBorderStyles($border = array())
    {
        $styles = array();
        $sides = array('top', 'right', 'bottom', 'left');

        foreach ($sides as $side) {
            $width = $border[$side]['width'] ?? ($border['width'] ?? '0px');
            $style = $border[$side]['style'] ?? ($border['style'] ?? 'solid');
            $color = $border[$side]['color'] ?? ($border['color'] ?? '');

            $styles["--bbb-tab-border-$side"] = "$width $style $color";
        }

        return $styles;
    }
}

/**
 * Generates a border-radius string from either a string or an array.
 *
 * @param mixed $borderRadius The border radius definition.
 * @param mixed $defaultValue The default value.
 * @return string A valid CSS border-radius value.
 */
if (! function_exists('getBorderRadiusStyles')) {
    function getBorderRadiusStyles($borderRadius, $defaultValue = '0px')
    {
        if (is_string($borderRadius)) {
            return $borderRadius;
        }

        // If it's an array, return a four-value shorthand for border-radius
        $topLeft = $borderRadius['topLeft'] ?? $defaultValue;
        $topRight = $borderRadius['topRight'] ?? $defaultValue;
        $bottomRight = $borderRadius['bottomRight'] ?? $defaultValue;
        $bottomLeft = $borderRadius['bottomLeft'] ?? $defaultValue;
        return "$topLeft $topRight $bottomRight $bottomLeft";
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

        // Tab Border Radius
        $addStyle(
            '--bbb-tab-border-radius',
            getBorderRadiusStyles($attributes['tabBorderRadius'] ?? null, '0px')
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

        // Spacing styles with defaults
        $addStyle(
            '--bbb-tab-spacing',
            resolveSpacingSizeValue($attributes['tabSpacing'] ?? null, '10px')
        );

        // Border styles
        $styles = array_merge($styles, getBorderStyles($attributes['tabBorder'] ?? array()));

        // Tab Buttons styles
        $addStyle(
            '--bbb-tab-buttons-justify-content',
            $attributes['justification'] ?? 'left'
        );
        $addStyle(
            '--bbb-tab-buttons-flex-direction',
            $attributes['orientation'] ?? 'column'
        );

        // Tabs styles
        if (($attributes['orientation'] ?? '') === 'column') {
            $addStyle('--bbb-tabs-display', 'flex');
            if (($attributes['verticalPosition'] ?? '') === 'right') {
                $addStyle('--bbb-tabs-flex-direction', 'row-reverse');
            } else {
                $addStyle('--bbb-tabs-flex-direction', 'row');
            }
        } else {
            $addStyle('--bbb-tabs-display', '');
            $addStyle('--bbb-tabs-flex-direction', 'column');
        }

        // Icon Position
        $iconDirection = 'row';
        if (($attributes['iconPosition'] ?? '') === 'top') {
            $iconDirection = 'column';
        } elseif (($attributes['iconPosition'] ?? '') === 'bottom') {
            $iconDirection = 'column-reverse';
        } elseif (($attributes['iconPosition'] ?? '') === 'right') {
            $iconDirection = 'row-reverse';
        }
        $addStyle('--bbb-tab-icon-position', $iconDirection);

        // Icon Size
        $addStyle(
            '--bbb-tab-icon-size',
            isset($attributes['iconSize']) ? "{$attributes['iconSize']}px" : '24px'
        );

        // Auto width
        $addStyle(
            '--bbb-tab-auto-width',
            (($attributes['autoWidth'] ?? false) && ($attributes['orientation'] ?? '') === 'row') ? '1 1 auto' : 'none'
        );

        return $styles;
    }
}

// Generate tabs styles
$tabs_styles = generateStyles($attributes);

// Convert styles array to inline style string
$style_string = '';
foreach ($tabs_styles as $property => $value) {
    $style_string .= "$property:$value;";
}

$wrapper_attributes = get_block_wrapper_attributes(
    [
        'style' => $style_string,
    ]
);

?>
<div <?php echo $wrapper_attributes; ?>
    data-wp-interactive="blablablocks-tabs"
    data-wp-context='<?php echo wp_json_encode($data_context); ?>'
    data-wp-init="callbacks.initTabs">

    <ul class="blablablocks-tabs-buttons" role="tablist">
        <?php foreach ($tabs as $index => $tab) :
            $icon = $block->parsed_block['innerBlocks'][$index]['attrs']['tabIcon'] ?? '';
        ?>
            <li class="blablablock-tab-btn"
                id="<?php echo esc_attr($tab['id']); ?>"
                role="tab"
                aria-controls="<?php echo esc_attr($tab['id']); ?>"
                data-wp-bind--tabindex="state.tabIndex"
                data-wp-bind--aria-selected="state.isActive"
                data-wp-on--click="actions.setActiveTab"
                data-wp-class--is-bbb-active-tab="state.isActive">

                <?php if (!empty($icon)) : ?>
                    <span class="bbb-tab-icon">
                        <?php echo $icon; ?>
                    </span>
                <?php endif; ?>

                <span class="tab-button-text">
                    <?php echo esc_html($tab['label']); ?>
                </span>
            </li>
        <?php endforeach; ?>
    </ul>

    <div class="blablablocks-tabs-content">
        <?php echo $content;  ?>
    </div>
</div>
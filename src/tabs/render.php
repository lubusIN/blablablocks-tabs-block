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


// Extract tabs data.
$all_tabs = blablablocks_extract_tab_data($block->parsed_block['innerBlocks'] ?? []);
$tabs     = array_values(array_filter($all_tabs, fn($tab) => $tab['hasInnerblock']));

// Determine active tab safely.
$active_tab_index = isset($attributes['activeTab'], $tabs[$attributes['activeTab']]) ? $attributes['activeTab'] : 0;
$active_tab_id    = $tabs[$active_tab_index]['id'];

// Prepare data context.
$data_context = [
    'tabs'      => $tabs,
    'activeTab' => $active_tab_index,
    'activeId'  => $active_tab_id,
];

// Generate tabs styles
$tabs_styles = generateStyles($attributes);

// Convert styles array to inline style string
$style_string = '';
foreach ($tabs_styles as $property => $value) {
    $style_string .= "$property:$value;";
}

$wrapper_classes = [
    'blablablocks-tabs',
    'blablablocks-tabs__' . ($attributes['orientation'] ?? 'horizontal'),
    isset($attributes['verticalPosition']) && 'right' == $attributes['verticalPosition'] ? 'blablablocks-tabs__right' : '',
    isset($attributes['justification']) && 'stretch' == $attributes['justification'] && ($attributes['orientation'] ?? 'horizontal') === 'horizontal' ? 'blablablocks-tabs__autoWidth' : '',
    'blablablocks-tabs-icon__' . ($attributes['iconPosition'] ?? 'left'),
];

// Filter out empty classes
$wrapper_classes = array_filter($wrapper_classes);

$wrapper_attributes = get_block_wrapper_attributes(
    [
        'class' => implode(' ', $wrapper_classes),
        'style' => $style_string,
    ]
);

?>
<div <?php echo wp_kses_data($wrapper_attributes); ?>
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
                data-wp-on--keydown="actions.handleOnKeyDown"
                data-wp-class--is-bbb-active-tab="state.isActive">

                <?php if (!empty($icon)) : ?>
                    <span class="bbb-tab-icon">
                        <?php echo $icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
                        ?>
                    </span>
                <?php endif; ?>

                <?php if (!empty($tab['label'])) : ?>
                    <span class="tab-button-text">
                        <?php echo esc_html($tab['label']); ?>
                    </span>
                <?php elseif (empty($icon) && empty($tab['label'])) : ?>
                    <span class="tab-button-text">
                        <?php echo esc_html('Tab ' . ($index + 1)); ?>
                    </span>
                <?php endif; ?>
            </li>
        <?php endforeach; ?>
    </ul>

    <div class="blablablocks-tabs-content">
        <?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
        ?>
    </div>
</div>
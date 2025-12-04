<?php

/**
 * Render Tabs Block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @package        BlaBlaBlocks Tabs Block
 */

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

require plugin_dir_path(dirname(__DIR__)) . '/helpers.php';

// Extract tabs data.
$all_tabs = blabtabl_extract_tab_data($block->parsed_block['innerBlocks'] ?? []);
$tabs     = array_values(array_filter($all_tabs, fn($tab) => $tab['hasInnerblock']));

if (empty($tabs)) {
    return;
}

// Determine active tab safely.
$active_tab_index = isset($attributes['activeTab'], $tabs[$attributes['activeTab']]) ? $attributes['activeTab'] : 0;

// Generate tabs styles
$tabs_styles             = blabtabl_generate_styles($attributes);
$typography_classes      = blabtabl_get_typography_classes($attributes);
$typography_styles       = blabtabl_get_typography_styles($attributes);
$color_classes           = blabtabl_get_color_classes($attributes);
$border_classes          = blabtabl_get_border_color_classes($attributes);
$tabs_container_styles   = blabtabl_get_tabs_container_styles($attributes);
$tab_button_border_style = blabtabl_get_tab_button_border_styles($attributes);

// Build inline styles
$style_string = implode('', array_map(
    fn($prop, $val) => "$prop:$val;",
    array_keys($tabs_styles),
    $tabs_styles
));

// Build wrapper classes
$orientation     = $attributes['orientation'] ?? 'horizontal';
$justification   = $attributes['justification'] ?? 'left';
$wrapper_classes = array_filter([
    'blablablocks-tabs',
    'blablablocks-tab-container',
    "blablablocks-tabs__{$orientation}",
    'blablablocks-tabs__' . ($attributes['verticalPosition'] ?? 'left'),
    ($justification === 'stretch' && $orientation === 'horizontal')
        ? 'blablablocks-tabs__autoWidth' : '',
    'blablablocks-tabs-icon__' . ($attributes['iconPosition'] ?? 'left'),
]);

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', $wrapper_classes),
    'style' => $style_string,
]);

// Data context for interactivity
$data_context = [
    'tabs'                      => $tabs,
    'activeTab'                 => $active_tab_index,
    'activeId'                  => $tabs[$active_tab_index]['id'],
    'tabButtonBorderStyles'     => $tab_button_border_style,
    'borderOnActive'            => !empty($attributes['tabBorder']['onActive']),
];

?>
<div <?php echo wp_kses_data($wrapper_attributes); ?>
    data-wp-interactive="blablablocks-tabs"
	data-wp-context='<?php echo esc_attr(wp_json_encode($data_context)); ?>'
    data-wp-init="callbacks.initTabs"
    data-wp-watch="callbacks.updateTabBorders">

    <ul class="blablablocks-tabs-buttons <?php echo esc_attr(trim($color_classes . ' ' . $border_classes)); ?>"
        role="tablist"
        style="<?php echo esc_attr($tabs_container_styles); ?>">

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
                data-wp-class--is-bbb-active-tab="state.isActive"
                style="<?php echo esc_attr($tab_button_border_style); ?>">

                <?php if ($icon) : ?>
                    <span class="bbb-tab-icon">
                        <?php echo $icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                        ?>
                    </span>
                <?php endif; ?>

                <?php if (!empty($tab['label'])) : ?>
                    <span class="tab-button-text <?php echo esc_attr($typography_classes); ?>"
                        style="<?php echo esc_attr($typography_styles); ?>">
                        <?php echo esc_html($tab['label']); ?>
                    </span>
                <?php elseif (empty($icon)) : ?>
                    <span class="tab-button-text <?php echo esc_attr($typography_classes); ?>"
                        style="<?php echo esc_attr($typography_styles); ?>">
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

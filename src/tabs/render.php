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

require plugin_dir_path(dirname(__DIR__)) . '/src/tabs/helpers.php';

// Extract tabs data.
$all_tabs = blablablocks_extract_tab_data($block->parsed_block['innerBlocks'] ?? []);
$tabs     = array_values(array_filter($all_tabs, fn($tab) => $tab['hasInnerblock']));

if (empty($tabs)) {
    return;
}

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
$typography_classes = bbb_get_typography_classes($attributes);
$typography_styles  = bbb_get_typography_styles($attributes);

// Convert styles array to inline style string
$style_string = '';
foreach ($tabs_styles as $property => $value) {
    $style_string .= "$property:$value;";
}

$wrapper_classes = [
    'blablablocks-tabs',
    'blablablocks-tab-container',
    'blablablocks-tabs__' . ($attributes['orientation'] ?? 'horizontal'),
    'blablablocks-tabs__' . ($attributes['verticalPosition'] ?? 'left'),
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
                    <span class="tab-button-text <?php echo esc_attr($typography_classes); ?>" style="<?php echo esc_attr($typography_styles); ?>">
                        <?php echo esc_html($tab['label']); ?>
                    </span>
                <?php elseif (empty($icon) && empty($tab['label'])) : ?>
                    <span class="tab-button-text <?php echo esc_attr($typography_classes); ?>" style="<?php echo esc_attr($typography_styles); ?>">
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
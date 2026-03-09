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

// Mobile display mode
$mobile_display = $attributes['mobileDisplay'] ?? 'scroll';

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
    "blablablocks-tabs--mobile-{$mobile_display}",
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
    'mobileDisplay'             => $mobile_display,
    'accordionOpenIndex'        => -1,
    'dropdownOpen'              => false,
];

?>
<div <?php echo wp_kses_data($wrapper_attributes); ?>
    data-wp-interactive="blablablocks-tabs"
	data-wp-context='<?php echo esc_attr(wp_json_encode($data_context)); ?>'
    data-wp-init="callbacks.initTabs"
    data-wp-watch="callbacks.updateTabBorders">

    <!-- Standard tab buttons (hidden on mobile for accordion/dropdown modes via CSS) -->
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

    <!-- Dropdown selector (shown on mobile only when mode is dropdown) -->
    <?php if ($mobile_display === 'dropdown') : ?>
        <div class="blablablocks-tabs-dropdown">
            <button class="blablablocks-tabs-dropdown__toggle"
                    data-wp-on--click="actions.toggleDropdown"
                    data-wp-class--is-open="state.isDropdownOpen"
                    aria-haspopup="listbox"
                    data-wp-bind--aria-expanded="state.isDropdownOpen">
                <span class="blablablocks-tabs-dropdown__label"
                      data-wp-text="state.activeTabLabel"></span>
                <svg class="blablablocks-tabs-dropdown__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <ul class="blablablocks-tabs-dropdown__menu" role="listbox"
                data-wp-bind--hidden="!state.isDropdownOpen">
                <?php foreach ($tabs as $index => $tab) : ?>
                    <li class="blablablocks-tabs-dropdown__item"
                        role="option"
                        data-tab-index="<?php echo esc_attr($index); ?>"
                        data-wp-on--click="actions.selectDropdownTab"
                        data-wp-bind--aria-selected="state.isActive"
                        data-wp-class--is-selected="state.isActive"
                        id="<?php echo esc_attr($tab['id']); ?>-dropdown">
                        <?php echo esc_html(!empty($tab['label']) ? $tab['label'] : 'Tab ' . ($index + 1)); ?>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <!-- Accordion layout (shown on mobile only when mode is accordion) -->
    <?php if ($mobile_display === 'accordion') : ?>
        <div class="blablablocks-tabs-accordion">
            <?php foreach ($tabs as $index => $tab) :
                $icon = $block->parsed_block['innerBlocks'][$index]['attrs']['tabIcon'] ?? '';
                $inner_content = '';
                if (isset($block->parsed_block['innerBlocks'][$index])) {
                    $inner_block_data = $block->parsed_block['innerBlocks'][$index];
                    $inner_block_instance = new WP_Block($inner_block_data);
                    $inner_content = $inner_block_instance->render();
                }
            ?>
                <div class="blablablocks-tabs-accordion__item"
                     id="<?php echo esc_attr($tab['id']); ?>-accordion"
                     data-tab-index="<?php echo esc_attr($index); ?>"
                     data-wp-class--is-accordion-open="state.isAccordionItemOpen">
                    <button class="blablablocks-tabs-accordion__header <?php echo esc_attr(trim($color_classes . ' ' . $border_classes)); ?>"
                            data-tab-index="<?php echo esc_attr($index); ?>"
                            data-wp-on--click="actions.toggleAccordion"
                            aria-expanded="false"
                            data-wp-bind--aria-expanded="state.isAccordionItemOpen"
                            style="<?php echo esc_attr($tab_button_border_style); ?>"
                            id="<?php echo esc_attr($tab['id']); ?>">

                        <span class="blablablocks-tabs-accordion__title">
                            <?php if ($icon) : ?>
                                <span class="bbb-tab-icon">
                                    <?php echo $icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                                </span>
                            <?php endif; ?>
                            <span class="tab-button-text <?php echo esc_attr($typography_classes); ?>"
                                  style="<?php echo esc_attr($typography_styles); ?>">
                                <?php echo esc_html(!empty($tab['label']) ? $tab['label'] : 'Tab ' . ($index + 1)); ?>
                            </span>
                        </span>

                        <svg class="blablablocks-tabs-accordion__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <div class="blablablocks-tabs-accordion__content"
                         role="region"
                         data-tab-index="<?php echo esc_attr($index); ?>"
                         data-wp-bind--hidden="!state.isAccordionItemOpen">
                        <?php echo $inner_content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <div class="blablablocks-tabs-content">
        <?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
        ?>
    </div>
</div>

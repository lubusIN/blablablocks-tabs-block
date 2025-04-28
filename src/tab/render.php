<?php

/**
 * Render the tab block.
 *
 * @param array     $attributes Block attributes.
 * @param string    $content Block content.
 * @param WP_Block  $block Block instance.
 *
 * @package         BlaBlaBlocks Tabs Block
 */

$wrapper_attributes = get_block_wrapper_attributes([
    'id' => esc_attr('tab-' . $attributes['tabId']),
    'role' => "tabpanel",
    'tabindex' => "0",
    'data-wp-bind--hidden' => "!state.isActive",
    'aria-labelledby' => esc_attr('tab-' . $attributes['tabId'])
]);
?>
<div <?php echo wp_kses_data($wrapper_attributes); ?>>
    <?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
    ?>
</div>
<?php

/**
 * Plugin Name:       BlaBlaBlocks Tabs Block
 * Description:       Tabs Block is a WordPress plugin built specifically for the Block Editor, allowing you to create responsive tabs effortlessly.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Lubus
 * Author URI:        https://lubus.in
 * License:           MIT
 * License URI:       https://www.gnu.org/licenses/MIT
 * Text Domain:       blablablocks-tabs-block
 *
 * @package 		  BlaBlaBlocks Tabs Block
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Initialize the plugin by registering blocks and styles.
 */
function blabtabl_tabs_block_init()
{
	register_block_type(__DIR__ . '/build/tabs');
	register_block_type(__DIR__ . '/build/tab');

	// Register custom block styles.
	blabtabl_register_styles();
}
add_action('init', 'blabtabl_tabs_block_init');

/**
 * Register custom styles for the Tabs block.
 */
function blabtabl_register_styles()
{
	if (! function_exists('register_block_style')) {
		return;
	}

	$styles = [
		[
			'name'   => 'style-1',
			'label'  => __('Style 1', 'blablablocks-tabs-block'),
		],
		[
			'name'   => 'style-2',
			'label'  => __('Style 2', 'blablablocks-tabs-block'),
		],
	];

	// Loop through and register each style.
	foreach ($styles as $style) {
		register_block_style('blablablocks/tabs', $style);
	}
}

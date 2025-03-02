<?php

/**
 * Plugin Name:       Blablablocks Tabs Block
 * Description:       Tabs Block is a WordPress plugin built specifically for the Block Editor, allowing you to create responsive tabs effortlessly.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Lubus
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blablablocks-tabs-block
 *
 * @package blablablocks-tabs-block
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function bbb_tabs_block_init()
{
	register_block_type(__DIR__ . '/build/tabs');
	register_block_type(__DIR__ . '/build/tab');
}
add_action('init', 'bbb_tabs_block_init');

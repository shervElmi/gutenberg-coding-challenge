<?php
/**
 * Plugin Name:       Country Card Block
 * Description:       Block rendering a card with country information.
 * Requires at least: 5.8
 * Requires PHP:      5.6
 * Version:           1.0.0
 * Author:            XWP
 * Author URI:        https://github.com/xwp
 * Text Domain:       xwp-country-card
 *
 * @package           XWP/Country_Card
 */

namespace XWP\Country_Card;

/**
 * As this is the only PHP file having side effects, we need to provide a
 * safeguard, So we want to make sure this file is only run from within
 * WordPress and cannot be directly called through a web request.
 */
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

use WP_Error;

define( 'COUNTRY_CARD_FILE', __FILE__ );
define( 'COUNTRY_CARD_PATH', plugin_dir_path( COUNTRY_CARD_FILE ) );
define( 'COUNTRY_CARD_MINIMUM_PHP_VERSION', '5.6' );
define( 'COUNTRY_CARD_MINIMUM_WP_VERSION', '5.8' );

/**
 * Setup country card requirements class.
 */
require_once COUNTRY_CARD_PATH . '/includes/Compatibility/Plugin_Requirements.php';

$plugin_requirements = new Plugin_Requirements( new WP_Error() );

$plugin_requirements->set_php_version( COUNTRY_CARD_MINIMUM_PHP_VERSION );
$plugin_requirements->set_wp_version( COUNTRY_CARD_MINIMUM_WP_VERSION );
$plugin_requirements->set_required_files(
	[
		COUNTRY_CARD_PATH . '/build/block.json',
	]
);

$plugin_requirements->run_checks();

/**
 * We must stop further execution, If there is an error and
 * displays an admin notice that show why the plugin is unable to load.
 */
if ( $plugin_requirements->get_wp_error()->errors ) {
	require_once COUNTRY_CARD_PATH . '/includes/Admin/Admin_Notice.php';

	$admin_notice = new Admin_Notice( $plugin_requirements->get_wp_error() );
	$admin_notice->register();

	unset( $admin_notice );

	return;
}

unset( $plugin_requirements );

/**
 * Register the block.
 */
function block_init() {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', __NAMESPACE__ . '\\block_init' );

/**
 * Disable WP emojis.
 */
function disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );

	add_filter( 'wp_resource_hints', __NAMESPACE__ . '\\remove_emoji_dns_prefetch', 10, 2 );
}

add_action( 'init', __NAMESPACE__ . '\\disable_emojis' );

/**
 * Remove emoji CDN hostname from DNS prefetching hints.
 *
 * @param array  $urls          URLs to print for resource hints.
 * @param string $relation_type The relation type the URLs are printed for.
 *
 * @return array Difference between the two arrays.
 */
function remove_emoji_dns_prefetch( $urls, $relation_type ) {
	if ( 'dns-prefetch' === $relation_type ) {
		/** This filter is documented in wp-includes/formatting.php */
		$emoji_svg_url = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' );

		$urls = array_diff( $urls, [ $emoji_svg_url ] );
	}

	return $urls;
}

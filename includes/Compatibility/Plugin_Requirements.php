<?php
/**
 * Class Plugin_Requirements.
 *
 * @package XWP/Country_Card
 * @license GNU General Public License v2.0 or later
 */

namespace XWP\Country_Card;

use WP_Error;

/**
 * Class Plugin_Requirements.
 *
 * @since 1.0.0
 */
class Plugin_Requirements {

	/**
	 * WP_Error object.
	 *
	 * @var WP_Error
	 */
	private $wp_error;

	/**
	 * PHP version.
	 *
	 * @var string
	 */
	private $php_version;

	/**
	 * WordPress version.
	 *
	 * @var string
	 */
	private $wp_version;

	/**
	 * List of required files.
	 *
	 * @var string
	 */
	private $required_files = array();

	/**
	 * Requirements constructor.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_Error $wp_error WP_Error object.
	 */
	public function __construct( WP_Error $wp_error ) {
		$this->wp_error = $wp_error;
	}

	/**
	 * Check minimum PHP version.
	 *
	 * @since 1.0.0
	 *
	 * @return bool
	 */
	public function check_php_version() {
		if ( version_compare( PHP_VERSION, $this->get_php_version(), '<' ) ) {
			$message = esc_html(
				sprintf(
					/* translators: %s: PHP version */
					__( 'Country Card requires PHP %s or higher.', 'xwp-country-card' ),
					$this->get_php_version()
				)
			);
			$this->wp_error->add( 'failed_check_php_version', $message );

			return false;
		}

		return true;
	}

	/**
	 * Check minimum WordPress version.
	 *
	 * @since 1.0.0
	 *
	 * @return bool
	 */
	public function check_wp_version() {
		if ( version_compare( get_bloginfo( 'version' ), $this->get_wp_version(), '<' ) ) {
			$message = esc_html(
				sprintf(
					/* translators: %s: WordPress version */
					__( 'Country Card requires WordPress %s or higher.', 'xwp-country-card' ),
					$this->get_wp_version()
				)
			);
			$this->wp_error->add( 'failed_check_wp_version', $message );

			return false;
		}

		return true;
	}

	/**
	 * Check if required files.
	 *
	 * @since 1.0.0
	 *
	 * @return bool
	 */
	public function check_required_files() {
		$required_files = $this->get_required_files();
		if ( $required_files ) {
			foreach ( $required_files as $required_file ) {
				if ( ! is_readable( $required_file ) ) {
					$message =
						sprintf(
							/* translators: %s: build commands. */
							__( 'You appear to be running an incomplete version of the plugin. Please run %s to finish installation.', 'xwp-country-card' ),
							'<code>composer install &amp;&amp; npm install &amp;&amp; npm run build</code>'
						);
					$this->wp_error->add( 'failed_check_required_files', $message );

					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Run checks in admin.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function run_checks() {
		$this->check_php_version();
		$this->check_wp_version();
		$this->check_required_files();
	}

	/**
	 * Get PHP version.
	 *
	 * @since 1.0.0
	 *
	 * @return string
	 */
	public function get_php_version() {
		return $this->php_version;
	}

	/**
	 * Set PHP version.
	 *
	 * @since 1.0.0
	 *
	 * @param string $php_version  PHP version.
	 *
	 * @return XWP\Country_Card\Plugin_Requirements
	 */
	public function set_php_version( $php_version ) {
		$this->php_version = $php_version;

		return $this;
	}

	/**
	 * Get WordPress version.
	 *
	 * @since 1.0.0
	 *
	 * @return string
	 */
	public function get_wp_version() {
		return $this->wp_version;
	}

	/**
	 * Set WordPress version.
	 *
	 * @since 1.0.0
	 *
	 * @param string $wp_version  WordPress version.
	 *
	 * @return XWP\Country_Card\Plugin_Requirements
	 */
	public function set_wp_version( $wp_version ) {
		$this->wp_version = $wp_version;

		return $this;
	}

	/**
	 * Get required theme name.
	 *
	 * @since 1.0.0
	 *
	 * @return string
	 */
	public function get_required_theme() {
		return $this->required_theme;
	}

	/**
	 * Set required theme name.
	 *
	 * @since 1.0.0
	 *
	 * @param string $required_theme Required theme name.
	 *
	 * @return XWP\Country_Card\Plugin_Requirements
	 */
	public function set_required_theme( $required_theme ) {
		$this->required_theme = $required_theme;

		return $this;
	}

	/**
	 * Get list of required files.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	public function get_required_files() {
		return $this->required_files;
	}

	/**
	 * Set list of required files.
	 *
	 * @since 1.0.0
	 *
	 * @param array $required_files  List of required files.
	 *
	 * @return XWP\Country_Card\Plugin_Requirements
	 */
	public function set_required_files( array $required_files ) {
		$this->required_files = $required_files;

		return $this;
	}

	/**
	 * Get WP_Error object.
	 *
	 * @return WP_Error
	 */
	public function get_wp_error() {
		return $this->wp_error;
	}
}

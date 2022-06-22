<?php
/**
 * Class Admin_Notice.
 *
 * @package XWP/Country_Card
 * @license GNU General Public License v2.0 or later
 */

namespace XWP\Country_Card;

use WP_Error;

/**
 * Class Admin_Notice.
 *
 * @since 1.0.0
 */
class Admin_Notice {

	// WordPress action to trigger the service registration on.
	const REGISTRATION_ACTION = 'admin_notices';

	/**
	 * WP_Error object.
	 *
	 * @var WP_Error
	 */
	private $wp_error;

	/**
	 * Admin Notice constructor.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_Error $wp_error WP_Error object.
	 */
	public function __construct( WP_Error $wp_error ) {
		$this->wp_error = $wp_error;
	}

	/**
	 * Register the plugin with the WordPress system.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register() {
		add_action( static::REGISTRATION_ACTION, array( $this, 'print_notice' ) );
	}

	/**
	 * Print an admin notice.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function print_notice() {
		$wp_error = $this->wp_error;

		?>
		<div class="notice notice-error">
			<p><strong><?php esc_html_e( 'Country Card plugin could not be initialized.', 'xwp-country-card' ); ?></strong></p>
			<ul>
				<?php
				foreach ( array_keys( $wp_error->errors ) as $code ) {
					$message = $wp_error->get_error_message( $code );
					printf( '<li>%s</li>', wp_kses( $message, 'code' ) );
				}
				?>
			</ul>
		</div>
		<?php
	}
}

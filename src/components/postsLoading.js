/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { LoaderContainer } from './';

/**
 * PostsLoading component.
 * Displays a spinner when posts are being fetched.
 *
 * @return {*} JSX markup.
 */
const PostsLoading = () => {
	return (
		<div className="xwp-country-card__loader">
			<LoaderContainer>
				{ __( 'Loading Posts…', 'xwp-country-card' ) }
			</LoaderContainer>
		</div>
	);
};

export default PostsLoading;

/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';

const RelatedPosts = ( { posts } ) => {
	const hasPosts = Boolean( posts?.length );

	const PostsList = () => {
		if ( ! hasPosts ) {
			return null;
		}

		return (
			<ul className="xwp-country-card-related-posts__list">
				{ posts.map( ( { id, title, excerpt, link } ) => (
					<li
						key={ id }
						className="xwp-country-card-related-posts__item"
					>
						<a
							className="xwp-country-card-related-posts__link"
							href={ link }
							data-post-id={ id }
						>
							{ title && (
								<h3 className="xwp-country-card-related-posts__title">
									{ title }
								</h3>
							) }
							{ excerpt && (
								<RawHTML className="xwp-country-card-related-posts__excerpt">
									{ excerpt }
								</RawHTML>
							) }
						</a>
					</li>
				) ) }
			</ul>
		);
	};

	return (
		<div className="xwp-country-card-related-posts">
			<h3 className="xwp-country-card-related-posts__heading">
				{ hasPosts
					? sprintf(
							/* translators: %d: Related posts count. */
							_n(
								'There is %d related post:',
								'There are %d related posts:',
								posts.length,
								'xwp-country-card'
							),
							posts.length
					  )
					: __( 'There are no related posts.', 'xwp-country-card' ) }
			</h3>
			<PostsList />
		</div>
	);
};

RelatedPosts.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape( {
			id: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
			title: PropTypes.string,
			excerpt: PropTypes.string,
			link: PropTypes.string,
		} ).isRequired
	),
};

export default RelatedPosts;

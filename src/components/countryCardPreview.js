/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { continentNames, continents, countries } from '../dataUtils';
import { getEmojiFlag } from '../utils';
import { PostsLoading, RelatedPosts } from './';

function CountryCardPreview( { countryCode, relatedPosts, isFetchingPosts } ) {
	if ( ! countryCode ) {
		return null;
	}

	const emojiFlag = getEmojiFlag( countryCode );

	const CardHeader = () => {
		return (
			<div
				className="xwp-country-card__media"
				data-emoji-flag={ emojiFlag }
			>
				<div className="xwp-country-card__flag">{ emojiFlag }</div>
			</div>
		);
	};

	const CardBody = () => {
		return (
			<h3 className="xwp-country-card__heading">
				{ __( 'Hello from', 'xwp-country-card' ) }{ ' ' }
				<strong>{ countries[ countryCode ] }</strong> (
				<span className="xwp-country-card__country-code">
					{ countryCode }
				</span>
				), { continentNames[ continents[ countryCode ] ] }!
			</h3>
		);
	};

	const CardFooter = () => {
		if ( isFetchingPosts ) {
			return <PostsLoading />;
		}

		return <RelatedPosts posts={ relatedPosts } />;
	};

	return (
		<div className="xwp-country-card">
			<CardHeader />
			<CardBody />
			<CardFooter />
		</div>
	);
}

CountryCardPreview.propTypes = {
	countryCode: PropTypes.string,
	relatedPosts: PropTypes.array,
	isFetchingPosts: PropTypes.bool,
};

export default CountryCardPreview;

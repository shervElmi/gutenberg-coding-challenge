/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { Spinner } from '@wordpress/components';

function LoaderContainer( { children } ) {
	return (
		<div className="xwp-country-card__loader-container">
			{ children }
			<Spinner />
		</div>
	);
}

LoaderContainer.propTypes = {
	children: PropTypes.node,
};

export default LoaderContainer;

/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { CountryCardPreview } from './components';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @param {Object} root0            Properties passed to the function.
 * @param {Object} root0.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
function Save( { attributes } ) {
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<CountryCardPreview { ...attributes } />
		</div>
	);
}

Save.propTypes = {
	attributes: PropTypes.shape( {
		countryCode: PropTypes.string,
		relatedPosts: PropTypes.array,
	} ).isRequired,
};

export default Save;

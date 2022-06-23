/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { edit as editIcon, globe as globeIcon } from '@wordpress/icons';
import { __, _x, sprintf } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from '@wordpress/element';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import {
	ComboboxControl,
	Placeholder,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './sass/editor.scss';
import { countries } from './dataUtils';
import { getEmojiFlag } from './utils';
import { CountryCardPreview } from './components';

/**
 * Edit component.
 *
 * @param {Object}   root0                         Component props.
 * @param {Object}   root0.attributes              Block attributes.
 * @param {Object}   root0.attributes.countryCode  Code of country.
 * @param {Object}   root0.attributes.relatedPosts Posts that include selected country name.
 * @param {Function} root0.setAttributes           Callable function for saving attribute values.
 * @return {*} JSX markup for the editor.
 */
function Edit( { attributes: { countryCode, relatedPosts }, setAttributes } ) {
	const [ isChangeCountryVisible, setIsChangeCountryVisible ] = useState(
		! Boolean( countryCode )
	);

	const currentPostID = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPostId();
	}, [] );

	const firstCountryCode = useRef( countryCode );

	const getRelatedPosts = useCallback(
		( posts ) => {
			if ( ! Array.isArray( posts ) ) {
				return [];
			}

			return posts
				.filter( ( post ) => Number( post.id ) !== currentPostID )
				.map( ( post ) => {
					return {
						id: post.id,
						title: post.title?.rendered ?? '',
						excerpt: post.excerpt?.rendered ?? '',
						link: post.link,
					};
				} );
		},
		[ currentPostID ]
	);

	const { _relatedPosts, isFetchingPosts } = useSelect(
		( select ) => {
			if ( ! countryCode ) {
				return { _relatedPosts: [], isFetchingPosts: false };
			}

			if ( firstCountryCode.current === countryCode ) {
				return { _relatedPosts: relatedPosts, isFetchingPosts: false };
			}

			const { getEntityRecords } = select( 'core' );

			const query = {
				search: countries[ countryCode ],
				orderby: 'date',
				order: 'desc',
				status: 'publish',
			};

			const posts = getEntityRecords( 'postType', 'post', query );
			// The `select( 'core/data' ).isResolving` returns false at the first run loop
			// and we can not have an optimal HTTP request by checking the current countryCode!
			// Since this plugin is a Gutenberg coding challenge, I did not use the `@wordpress/api-fetch`.
			// I prefer the following code to use the `useSelect` hook.
			const isResolving = ! Array.isArray( posts );

			if ( ! isResolving ) {
				firstCountryCode.current = countryCode;
			}

			return {
				_relatedPosts: getRelatedPosts( posts ),
				isFetchingPosts: isResolving,
			};
		},
		[ countryCode, getRelatedPosts, relatedPosts, firstCountryCode ]
	);

	useEffect( () => {
		if ( ! _relatedPosts?.length ) {
			return;
		}

		// I save Related Posts because the coding challenge description said that:
		// "It is okay for the related posts in the card footer to be static when viewed on the frontend."
		setAttributes( {
			relatedPosts: _relatedPosts,
		} );
	}, [ _relatedPosts, setAttributes ] );

	const handleCountryChange = useCallback( () => {
		setIsChangeCountryVisible( ! isChangeCountryVisible );
	}, [ setIsChangeCountryVisible, isChangeCountryVisible ] );

	const onSelectCountry = useCallback(
		( newCountryCode ) => {
			if ( newCountryCode && countryCode !== newCountryCode ) {
				setAttributes( {
					countryCode: newCountryCode,
					relatedPosts: [],
				} );

				setIsChangeCountryVisible( false );
			}
		},
		[ countryCode, setIsChangeCountryVisible, setAttributes ]
	);

	const countryOptions = useMemo(
		() =>
			Object.keys( countries ).map( ( code ) => ( {
				value: code,
				label: sprintf(
					/* translators: 1: Flag of country. 2: Name of country */
					__( '%1$s %2$s — code', 'xwp-country-card' ),
					getEmojiFlag( code ),
					countries[ code ]
				),
			} ) ),
		[]
	);

	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={ _x(
							'Change Country',
							'block control label',
							'xwp-country-card'
						) }
						icon={ editIcon }
						onClick={ handleCountryChange }
						disabled={ ! Boolean( countryCode ) }
					/>
				</ToolbarGroup>
			</BlockControls>

			{ isChangeCountryVisible ? (
				<Placeholder
					icon={ globeIcon }
					label={ _x(
						'XWP Country Card',
						'block placeholder label',
						'xwp-country-card'
					) }
					isColumnLayout={ true }
					instructions={ __(
						'Type in a name of a country you want to display on your site.',
						'xwp-country-card'
					) }
				>
					<ComboboxControl
						label={ _x(
							'Country',
							'block control title',
							'xwp-country-card'
						) }
						hideLabelFromVision
						options={ countryOptions }
						value={ countryCode }
						onChange={ onSelectCountry }
						allowReset={ true }
					/>
				</Placeholder>
			) : (
				<CountryCardPreview
					countryCode={ countryCode }
					relatedPosts={ relatedPosts }
					isFetchingPosts={ isFetchingPosts }
				/>
			) }
		</div>
	);
}

Edit.propTypes = {
	attributes: PropTypes.shape( {
		countryCode: PropTypes.string,
		relatedPosts: PropTypes.arrayOf(
			PropTypes.shape( {
				id: PropTypes.oneOfType( [
					PropTypes.string,
					PropTypes.number,
				] ),
				title: PropTypes.string,
				excerpt: PropTypes.string,
				link: PropTypes.string,
			} ).isRequired
		),
	} ),
	setAttributes: PropTypes.func.isRequired,
};

export default Edit;

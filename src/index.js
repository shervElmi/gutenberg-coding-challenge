/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import metadata from './block.json';
import save from './save';
import edit from './edit';

const { name } = metadata;

registerBlockType( name, {
	save,
	edit,
} );

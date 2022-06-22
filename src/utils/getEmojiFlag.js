/**
 * Get flag emoji for a country code.
 *
 * @param {string} countryCode Country code like US, CH, NL.
 * @return {string} The emoji characters.
 */
function getEmojiFlag( countryCode ) {
	const codePoints = countryCode
		.toUpperCase()
		.split( '' )
		.map( ( char ) => 127397 + char.charCodeAt() );

	return String.fromCodePoint( ...codePoints );
}

export default getEmojiFlag;

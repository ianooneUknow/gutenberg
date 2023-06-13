/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
// import { useSelect, useDispatch } from '@wordpress/data';
// import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { PAGE_CONTENT_BLOCK_TYPES } from './constants';

export default function PageContentFlash( { contentRef } ) {
	usePageContentFlash( contentRef );
	return null;
}

export function usePageContentFlash( contentRef ) {
	// const { __experimentalGetGlobalBlocksByName } =
	// 	useSelect( blockEditorStore );

	// const { flashBlock } = useDispatch( blockEditorStore );

	useEffect( () => {
		const canvas = contentRef.current;
		if ( ! canvas ) {
			return;
		}
		const flashContentBlocks = () => {
			// const clientIds = __experimentalGetGlobalBlocksByName(
			// 	PAGE_CONTENT_BLOCK_TYPES
			// );
			// for ( const clientId of clientIds ) {
			// 	flashBlock( clientId );
			// }
			canvas
				.querySelectorAll(
					PAGE_CONTENT_BLOCK_TYPES.map(
						( blockType ) => `[data-type="${ blockType }"]`
					).join( ',' )
					// '.block-editor-block-list__block:not(.is-editing-disabled)'
				)
				.forEach( ( block ) => {
					const flash = async () => {
						block.classList.add( 'is-highlighted' );
						await new Promise( ( resolve ) =>
							setTimeout( resolve, 150 )
						);
						block.classList.remove( 'is-highlighted' );
					};
					flash();
				} );
		};
		let timeout;
		const handleClick = ( event ) => {
			if (
				event.target.classList.contains( 'is-root-container' ) &&
				event.detail === 1
			) {
				timeout = setTimeout( flashContentBlocks, 300 );
			}
		};
		const handleDblClick = ( event ) => {
			if ( event.target.classList.contains( 'is-root-container' ) ) {
				clearTimeout( timeout );
			}
		};
		canvas.addEventListener( 'click', handleClick );
		canvas.addEventListener( 'dblclick', handleDblClick );
		return () => {
			canvas.removeEventListener( 'click', handleClick );
			canvas.removeEventListener( 'dblclick', handleDblClick );
		};
	}, [ contentRef.current ] );
}

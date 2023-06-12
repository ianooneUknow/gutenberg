/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { useMemo, useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';

/**
 * Returns custom block editor state for navigation entities.
 *
 * Note: Navigation entities require a wrapping Navigation block to provide
 * them with some basic layout and styling. Therefore we create a "ghost" block
 * and provide it will a reference to the navigation entity ID being edited.
 *
 * In this scenario it is the **block** that handles syncing the entity content
 * whereas for other entities this is handled by entity block editor.
 *
 * @param {number} navigationMenuId the navigation menu ID
 * @return {[WPBlock[], Function, Function]} The block array and setters.
 */
export function useNavigationBlockEditor( navigationMenuId ) {
	const noop = () => {};
	const wrappedBlocks = useMemo( () => {
		return [
			createBlock( 'core/navigation', {
				ref: navigationMenuId,
				// As the parent editor is locked with `templateLock`, the template locking
				// must be explicitly "unset" on the block itself to allow the user to modify
				// the block's content.
				templateLock: false,
			} ),
		];
	}, [ navigationMenuId ] );

	return [ wrappedBlocks, noop, noop ];
}

/**
 * Wrapper for Navigation focus mode specific block editor.
 *
 * @param {Object} options
 * @param {string} options.templateType the template type of the current view
 * @param {Array}  options.blocks       the blocks in the editor
 * @param {string} options.canvasMode   the current mode of the canvas
 */
export function useNavigationFocusMode( { templateType, blocks, canvasMode } ) {
	const isNavigationFocusMode = templateType === 'wp_navigation';
	const navigationBlockClientId = blocks[ 0 ]?.clientId;
	const isEditMode = canvasMode === 'edit';

	const { selectBlock, setBlockEditingMode, unsetBlockEditingMode } = unlock(
		useDispatch( blockEditorStore )
	);

	// Auto-select the Navigation block when entering Navigation focus mode.
	useEffect( () => {
		if ( isEditMode && isNavigationFocusMode ) {
			selectBlock( navigationBlockClientId );
		}
	}, [
		navigationBlockClientId,
		isEditMode,
		isNavigationFocusMode,
		selectBlock,
	] );

	// Set block editing mode to contentOnly when entering Navigation focus mode.
	// This ensures that non-content controls on the block will be hidden and thus
	// the user can focus on editing the Navigation Menu content only.
	useEffect( () => {
		if ( isNavigationFocusMode ) {
			setBlockEditingMode( navigationBlockClientId, 'contentOnly' );
		}

		return () => {
			unsetBlockEditingMode( navigationBlockClientId );
		};
	}, [
		navigationBlockClientId,
		isNavigationFocusMode,
		unsetBlockEditingMode,
		setBlockEditingMode,
	] );

	return {
		isNavigationFocusMode,
	};
}

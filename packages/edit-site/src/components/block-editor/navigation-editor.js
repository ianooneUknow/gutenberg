/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../store';
import { unlock } from '../../lock-unlock';

const FOCUSABLE_ENTITIES = [ 'wp_template_part', 'wp_navigation' ];

/**
 * Wrapper for Navigation focus mode specific block editor.
 *
 * @param {Object} options
 * @param {string} options.templateType the template type of the current view
 */
export function useNavigationFocusMode( { templateType } ) {
	const isNavigationFocusMode = templateType === 'wp_navigation';
	const { isEditMode } = useSiteEditorMode();

	const { selectBlock, setBlockEditingMode, unsetBlockEditingMode } = unlock(
		useDispatch( blockEditorStore )
	);

	// Get the blocks directly from the block editor store.
	const { blocks } = useSelect( ( select ) => {
		const { getBlocks } = select( blockEditorStore );
		return {
			blocks: getBlocks(),
		};
	}, [] );

	const navigationBlockClientId = blocks[ 0 ]?.clientId;

	// Auto-select the Navigation block when entering Navigation focus mode.
	useEffect( () => {
		if ( navigationBlockClientId && isEditMode && isNavigationFocusMode ) {
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
		if ( ! navigationBlockClientId ) {
			return;
		}

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
}

function useSiteEditorMode() {
	const { templateType, canvasMode } = useSelect( ( select ) => {
		const { getEditedPostType, getCanvasMode } = unlock(
			select( editSiteStore )
		);

		return {
			templateType: getEditedPostType(),
			canvasMode: getCanvasMode(),
		};
	}, [] );

	return {
		isFocusMode: FOCUSABLE_ENTITIES.includes( templateType ),
		isViewMode: canvasMode === 'view',
		isEditMode: canvasMode === 'edit',
	};
}

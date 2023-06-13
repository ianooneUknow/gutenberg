/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useMemo, useEffect } from '@wordpress/element';
import { useEntityId } from '@wordpress/core-data';
import {
	store as blockEditorStore,
	privateApis as blockEditorPrivateApis,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { unlock } from '../../../lock-unlock';
import useSiteEditorMode from '../use-site-editor-mode';
import useSiteEditorSettings from '../use-site-editor-settings';

const { ExperimentalBlockEditorProvider } = unlock( blockEditorPrivateApis );

const noop = () => {};

/**
 * Block editor component for editing navigation menus.
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
export default function NavigationBlockEditorProvider( { children } ) {
	const settings = useSiteEditorSettings();

	const navigationMenuId = useEntityId( 'postType', 'wp_navigation' );

	const blocks = useMemo( () => {
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

	const { isEditMode } = useSiteEditorMode();

	const { selectBlock, setBlockEditingMode, unsetBlockEditingMode } = unlock(
		useDispatch( blockEditorStore )
	);

	const navigationBlockClientId = blocks && blocks[ 0 ]?.clientId;

	// Auto-select the Navigation block when entering Navigation focus mode.
	useEffect( () => {
		if ( navigationBlockClientId && isEditMode ) {
			selectBlock( navigationBlockClientId );
		}
	}, [ navigationBlockClientId, isEditMode, selectBlock ] );

	// Set block editing mode to contentOnly when entering Navigation focus mode.
	// This ensures that non-content controls on the block will be hidden and thus
	// the user can focus on editing the Navigation Menu content only.
	useEffect( () => {
		if ( ! navigationBlockClientId ) {
			return;
		}

		setBlockEditingMode( navigationBlockClientId, 'contentOnly' );

		return () => {
			unsetBlockEditingMode( navigationBlockClientId );
		};
	}, [
		navigationBlockClientId,
		unsetBlockEditingMode,
		setBlockEditingMode,
	] );

	return (
		<ExperimentalBlockEditorProvider
			settings={ settings }
			value={ blocks }
			onInput={ noop }
			onChange={ noop }
			useSubRegistry={ false }
		>
			{ children }
		</ExperimentalBlockEditorProvider>
	);
}

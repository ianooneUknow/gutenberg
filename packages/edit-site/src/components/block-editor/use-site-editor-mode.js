/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { FOCUSABLE_ENTITIES } from './constants';

export default function useSiteEditorMode() {
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

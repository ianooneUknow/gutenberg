/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { BlockInspector } from '@wordpress/block-editor';

import { ReusableBlocksMenuItems } from '@wordpress/reusable-blocks';

/**
 * Internal dependencies
 */

import TemplatePartConverter from '../template-part-converter';
import { SidebarInspectorFill } from '../sidebar-edit-mode';
import { store as editSiteStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { DisableNonPageContentBlocks } from '../page-content-focus';
import SiteEditorCanvas from './site-editor-canvas';
import getBlockEditorProvider from './get-block-editor-provider';

export default function BlockEditor() {
	const { templateType, hasPageContentFocus } = useSelect( ( select ) => {
		const { getEditedPostType, hasPageContentFocus: _hasPageContentFocus } =
			unlock( select( editSiteStore ) );

		return {
			templateType: getEditedPostType(),
			hasPageContentFocus: _hasPageContentFocus(),
		};
	}, [] );

	// Choose the provider based on the template type currently
	// being edited.
	const BlockEditorProvider = getBlockEditorProvider( templateType );

	return (
		<BlockEditorProvider>
			{ hasPageContentFocus && <DisableNonPageContentBlocks /> }
			<TemplatePartConverter />
			<SidebarInspectorFill>
				<BlockInspector />
			</SidebarInspectorFill>

			<SiteEditorCanvas />

			<ReusableBlocksMenuItems />
		</BlockEditorProvider>
	);
}

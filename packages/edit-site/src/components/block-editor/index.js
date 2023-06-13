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
import DefaultBlockEditor from './default-block-editor';
import NavigationBlockEditor from './navigation-block-editor';
import SiteEditorCanvas from './site-editor-canvas';

export const LAYOUT = {
	type: 'default',
	// At the root level of the site editor, no alignments should be allowed.
	alignments: [],
};

export const FOCUSABLE_ENTITIES = [ 'wp_template_part', 'wp_navigation' ];

export default function BlockEditor() {
	const { templateType, hasPageContentFocus } = useSelect( ( select ) => {
		const { getEditedPostType, hasPageContentFocus: _hasPageContentFocus } =
			unlock( select( editSiteStore ) );

		return {
			templateType: getEditedPostType(),
			hasPageContentFocus: _hasPageContentFocus(),
		};
	}, [] );

	const BlockEditorComponent = getBlockEditorComponent( templateType );

	return (
		<BlockEditorComponent templateType={ templateType }>
			{ hasPageContentFocus && <DisableNonPageContentBlocks /> }
			<TemplatePartConverter />
			<SidebarInspectorFill>
				<BlockInspector />
			</SidebarInspectorFill>

			<SiteEditorCanvas templateType={ templateType } />

			<ReusableBlocksMenuItems />
		</BlockEditorComponent>
	);
}

/**
 * Factory to isolate choosing the appropriate block editor
 * component to handle a given template type/entity.
 *
 * @param {string} templateType the template (entity) type being edited
 * @return {JSX.Element} the block editor component to use.
 */
function getBlockEditorComponent( templateType ) {
	let Component = null;

	switch ( templateType ) {
		case 'wp_navigation':
			Component = NavigationBlockEditor;
			break;
		default:
			Component = DefaultBlockEditor;
			break;
	}

	return Component;
}

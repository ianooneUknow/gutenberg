/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import {
	BlockList,
	BlockInspector,
	BlockTools,
	__unstableUseClipboardHandler as useClipboardHandler,
	__unstableUseTypingObserver as useTypingObserver,
	BlockEditorKeyboardShortcuts,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import {
	useMergeRefs,
	useViewportMatch,
	useResizeObserver,
} from '@wordpress/compose';
import { ReusableBlocksMenuItems } from '@wordpress/reusable-blocks';

/**
 * Internal dependencies
 */

import TemplatePartConverter from '../template-part-converter';
import { SidebarInspectorFill } from '../sidebar-edit-mode';
import { store as editSiteStore } from '../../store';
import BackButton from './back-button';
import ResizableEditor from './resizable-editor';
import EditorCanvas from './editor-canvas';
import { unlock } from '../../lock-unlock';
import EditorCanvasContainer from '../editor-canvas-container';
import {
	DisableNonPageContentBlocks,
	usePageContentFocusNotifications,
} from '../page-content-focus';
import DefaultBlockEditor from './default-block-editor';
import NavigationBlockEditor from './navigation-block-editor';
import useSiteEditorSettings from './use-site-editor-settings';
import useSiteEditorMode from './use-site-editor-mode';

const LAYOUT = {
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

	const settings = useSiteEditorSettings( templateType );

	const BlockEditorComponent = getBlockEditorComponent( templateType );

	return (
		<BlockEditorComponent templateType={ templateType }>
			{ hasPageContentFocus && <DisableNonPageContentBlocks /> }
			<TemplatePartConverter />
			<SidebarInspectorFill>
				<BlockInspector />
			</SidebarInspectorFill>

			<SiteEditorCanvas
				settings={ settings }
				templateType={ templateType }
			/>

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

function SiteEditorCanvas( { templateType } ) {
	const { clearSelectedBlock } = useDispatch( blockEditorStore );
	const { isViewMode, isFocusMode } = useSiteEditorMode();
	const [ resizeObserver, sizes ] = useResizeObserver();

	const settings = useSiteEditorSettings();

	const { hasBlocks } = useSelect( ( select ) => {
		const { getBlocks } = select( blockEditorStore );

		const blocks = getBlocks();

		return {
			hasBlocks: blocks?.length !== 0,
		};
	}, [] );

	const isMobileViewport = useViewportMatch( 'small', '<' );
	const enableResizing =
		isFocusMode &&
		! isViewMode &&
		// Disable resizing in mobile viewport.
		! isMobileViewport;

	const contentRef = useRef();
	const mergedRefs = useMergeRefs( [
		contentRef,
		useClipboardHandler(),
		useTypingObserver(),
		usePageContentFocusNotifications(),
	] );

	const isTemplateTypeNavigation = templateType === 'wp_navigation';

	const showBlockAppender =
		( isTemplateTypeNavigation && isFocusMode && hasBlocks ) || isViewMode
			? false
			: undefined;

	return (
		<EditorCanvasContainer.Slot>
			{ ( [ editorCanvasView ] ) =>
				editorCanvasView ? (
					<div className="edit-site-visual-editor is-focus-mode">
						{ editorCanvasView }
					</div>
				) : (
					<BlockTools
						className={ classnames( 'edit-site-visual-editor', {
							'is-focus-mode': isFocusMode || !! editorCanvasView,
							'is-view-mode': isViewMode,
						} ) }
						__unstableContentRef={ contentRef }
						onClick={ ( event ) => {
							// Clear selected block when clicking on the gray background.
							if ( event.target === event.currentTarget ) {
								clearSelectedBlock();
							}
						} }
					>
						<BlockEditorKeyboardShortcuts.Register />
						<BackButton />
						<ResizableEditor
							enableResizing={ enableResizing }
							height={ sizes.height ?? '100%' }
						>
							<EditorCanvas
								enableResizing={ enableResizing }
								settings={ settings }
								contentRef={ mergedRefs }
								readonly={ isViewMode }
							>
								{ resizeObserver }
								<BlockList
									className={ classnames(
										'edit-site-block-editor__block-list wp-site-blocks',
										{
											'is-navigation-block':
												isTemplateTypeNavigation,
										}
									) }
									__experimentalLayout={ LAYOUT }
									renderAppender={ showBlockAppender }
								/>
							</EditorCanvas>
						</ResizableEditor>
					</BlockTools>
				)
			}
		</EditorCanvasContainer.Slot>
	);
}

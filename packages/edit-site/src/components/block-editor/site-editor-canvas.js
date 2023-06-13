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
/**
 * Internal dependencies
 */
import BackButton from './back-button';
import ResizableEditor from './resizable-editor';
import EditorCanvas from './editor-canvas';
import EditorCanvasContainer from '../editor-canvas-container';
import { usePageContentFocusNotifications } from '../page-content-focus';
import useSiteEditorSettings from './use-site-editor-settings';
import useSiteEditorMode from './use-site-editor-mode';
import { store as editSiteStore } from '../../store';

const LAYOUT = {
	type: 'default',
	// At the root level of the site editor, no alignments should be allowed.
	alignments: [],
};

export default function SiteEditorCanvas() {
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

	const { templateType } = useSelect( ( select ) => {
		const { getEditedPostType } = select( editSiteStore );

		return {
			templateType: getEditedPostType(),
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

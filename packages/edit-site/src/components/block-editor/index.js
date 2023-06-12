/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useMemo, useRef } from '@wordpress/element';
import {
	useEntityBlockEditor,
	useEntityId,
	store as coreStore,
} from '@wordpress/core-data';
import {
	BlockList,
	BlockInspector,
	BlockTools,
	__unstableUseClipboardHandler as useClipboardHandler,
	__unstableUseTypingObserver as useTypingObserver,
	BlockEditorKeyboardShortcuts,
	store as blockEditorStore,
	privateApis as blockEditorPrivateApis,
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
import inserterMediaCategories from './inserter-media-categories';
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
import {
	useNavigationBlockEditor,
	useNavigationFocusMode,
} from './navigation-editor';

const { ExperimentalBlockEditorProvider } = unlock( blockEditorPrivateApis );

const LAYOUT = {
	type: 'default',
	// At the root level of the site editor, no alignments should be allowed.
	alignments: [],
};

const FOCUSABLE_ENTITIES = [ 'wp_template_part', 'wp_navigation' ];

export default function BlockEditor() {
	const { setIsInserterOpened } = useDispatch( editSiteStore );
	const { storedSettings, templateType, canvasMode, hasPageContentFocus } =
		useSelect(
			( select ) => {
				const {
					getSettings,
					getEditedPostType,
					getCanvasMode,
					hasPageContentFocus: _hasPageContentFocus,
				} = unlock( select( editSiteStore ) );

				return {
					storedSettings: getSettings( setIsInserterOpened ),
					templateType: getEditedPostType(),
					canvasMode: getCanvasMode(),
					hasPageContentFocus: _hasPageContentFocus(),
				};
			},
			[ setIsInserterOpened ]
		);

	const { clearSelectedBlock } = useDispatch( blockEditorStore );

	const settingsBlockPatterns =
		storedSettings.__experimentalAdditionalBlockPatterns ?? // WP 6.0
		storedSettings.__experimentalBlockPatterns; // WP 5.9
	const settingsBlockPatternCategories =
		storedSettings.__experimentalAdditionalBlockPatternCategories ?? // WP 6.0
		storedSettings.__experimentalBlockPatternCategories; // WP 5.9

	const { restBlockPatterns, restBlockPatternCategories } = useSelect(
		( select ) => ( {
			restBlockPatterns: select( coreStore ).getBlockPatterns(),
			restBlockPatternCategories:
				select( coreStore ).getBlockPatternCategories(),
		} ),
		[]
	);

	const blockPatterns = useMemo(
		() =>
			[
				...( settingsBlockPatterns || [] ),
				...( restBlockPatterns || [] ),
			]
				.filter(
					( x, index, arr ) =>
						index === arr.findIndex( ( y ) => x.name === y.name )
				)
				.filter( ( { postTypes } ) => {
					return (
						! postTypes ||
						( Array.isArray( postTypes ) &&
							postTypes.includes( templateType ) )
					);
				} ),
		[ settingsBlockPatterns, restBlockPatterns, templateType ]
	);

	const blockPatternCategories = useMemo(
		() =>
			[
				...( settingsBlockPatternCategories || [] ),
				...( restBlockPatternCategories || [] ),
			].filter(
				( x, index, arr ) =>
					index === arr.findIndex( ( y ) => x.name === y.name )
			),
		[ settingsBlockPatternCategories, restBlockPatternCategories ]
	);

	const [ blocks, onInput, onChange ] = useEntitiyTypeBlockEditor(
		'postType',
		templateType
	);

	const { isNavigationFocusMode: isTemplateTypeNavigation } =
		useNavigationFocusMode( {
			templateType,
			blocks,
			canvasMode,
		} );

	const settings = useMemo( () => {
		const {
			__experimentalAdditionalBlockPatterns,
			__experimentalAdditionalBlockPatternCategories,
			...restStoredSettings
		} = storedSettings;

		return {
			...restStoredSettings,
			inserterMediaCategories,
			__experimentalBlockPatterns: blockPatterns,
			__experimentalBlockPatternCategories: blockPatternCategories,
			// Template locking must be explicitly "unset" for non-navigation entities.
			templateLock: isTemplateTypeNavigation ? 'insert' : false,
			template: isTemplateTypeNavigation
				? [ [ 'core/navigation', {}, [] ] ]
				: false,
		};
	}, [
		storedSettings,
		blockPatterns,
		blockPatternCategories,
		isTemplateTypeNavigation,
	] );

	const contentRef = useRef();
	const mergedRefs = useMergeRefs( [
		contentRef,
		useClipboardHandler(),
		useTypingObserver(),
		usePageContentFocusNotifications(),
	] );
	const isMobileViewport = useViewportMatch( 'small', '<' );
	const [ resizeObserver, sizes ] = useResizeObserver();

	const isFocusMode = FOCUSABLE_ENTITIES.includes( templateType );

	const hasBlocks = blocks.length !== 0;
	const enableResizing =
		isFocusMode &&
		canvasMode !== 'view' &&
		// Disable resizing in mobile viewport.
		! isMobileViewport;

	const isViewMode = canvasMode === 'view';

	const showBlockAppender =
		( isTemplateTypeNavigation && isFocusMode && hasBlocks ) || isViewMode
			? false
			: undefined;

	return (
		<ExperimentalBlockEditorProvider
			settings={ settings }
			value={ blocks }
			onInput={ onInput }
			onChange={ onChange }
			useSubRegistry={ false }
		>
			{ hasPageContentFocus && <DisableNonPageContentBlocks /> }
			<TemplatePartConverter />
			<SidebarInspectorFill>
				<BlockInspector />
			</SidebarInspectorFill>
			<EditorCanvasContainer.Slot>
				{ ( [ editorCanvasView ] ) =>
					editorCanvasView ? (
						<div className="edit-site-visual-editor is-focus-mode">
							{ editorCanvasView }
						</div>
					) : (
						<BlockTools
							className={ classnames( 'edit-site-visual-editor', {
								'is-focus-mode':
									isFocusMode || !! editorCanvasView,
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
									readonly={ canvasMode === 'view' }
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
			<ReusableBlocksMenuItems />
		</ExperimentalBlockEditorProvider>
	);
}

/**
 * Returns the appropriate block editor state for a given entity type.
 *
 * @param {string} kind the entity kind
 * @param {string} type the entity type
 * @return {[WPBlock[], Function, Function]} The block array and setters.
 */
function useEntitiyTypeBlockEditor( kind, type ) {
	const entityId = useEntityId( kind, type );

	const entityBlockEditor = useEntityBlockEditor( kind, type, {
		id: entityId,
	} );

	const navigationEditorBlockEditor = useNavigationBlockEditor( entityId );

	if ( type === `wp_navigation` ) {
		return navigationEditorBlockEditor;
	}

	return entityBlockEditor;
}

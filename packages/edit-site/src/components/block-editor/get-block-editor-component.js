/**
 * Internal dependencies
 */
import DefaultBlockEditor from './default-block-editor';
import NavigationBlockEditor from './navigation-block-editor';

/**
 * Factory to isolate choosing the appropriate block editor
 * component to handle a given template type/entity.
 *
 * @param {string} templateType the template (entity) type being edited
 * @return {JSX.Element} the block editor component to use.
 */
export default function getBlockEditorComponent( templateType ) {
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

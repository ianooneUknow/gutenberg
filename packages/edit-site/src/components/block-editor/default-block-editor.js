/**
 * WordPress dependencies
 */
import { useEntityBlockEditor } from '@wordpress/core-data';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import useSiteEditorSettings from './use-site-editor-settings';

const { ExperimentalBlockEditorProvider } = unlock( blockEditorPrivateApis );

export default function DefaultBlockEditor( { children, templateType } ) {
	const settings = useSiteEditorSettings();

	const [ blocks, onInput, onChange ] = useEntityBlockEditor(
		'postType',
		templateType
	);

	return (
		<ExperimentalBlockEditorProvider
			settings={ settings }
			value={ blocks }
			onInput={ onInput }
			onChange={ onChange }
			useSubRegistry={ false }
		>
			{ children }
		</ExperimentalBlockEditorProvider>
	);
}

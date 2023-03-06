/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { InterfaceSkeleton } from '@wordpress/interface';
import { __, sprintf } from '@wordpress/i18n';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { EditorSnackbars } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import useRegisterShortcuts from './use-register-shortcuts';
import Header from './header';
import Table from './table';
import { useLocation } from '../routes';
import useTitle from '../routes/use-title';

export default function List() {
	const {
		params: { postType: templateType },
	} = useLocation();

	useRegisterShortcuts();

	const { previousShortcut, nextShortcut } = useSelect( ( select ) => {
		return {
			previousShortcut: select(
				keyboardShortcutsStore
			).getAllShortcutKeyCombinations( 'core/edit-site/previous-region' ),
			nextShortcut: select(
				keyboardShortcutsStore
			).getAllShortcutKeyCombinations( 'core/edit-site/next-region' ),
		};
	}, [] );

	const postType = useSelect(
		( select ) => select( coreStore ).getPostType( templateType ),
		[ templateType ]
	);

	useTitle( postType?.labels?.name );

	// `postType` could load in asynchronously. Only provide the detailed region labels if
	// the postType has loaded, otherwise `InterfaceSkeleton` will fallback to the defaults.
	const itemsListLabel = postType?.labels?.items_list;
	const detailedRegionLabels = postType
		? {
				header: sprintf(
					// translators: %s - the name of the page, 'Header' as in the header area of that page.
					__( '%s - Header' ),
					itemsListLabel
				),
				body: sprintf(
					// translators: %s - the name of the page, 'Content' as in the content area of that page.
					__( '%s - Content' ),
					itemsListLabel
				),
		  }
		: undefined;

	return (
		<InterfaceSkeleton
			className="edit-site-list"
			labels={ detailedRegionLabels }
			header={ <Header templateType={ templateType } /> }
			notices={ <EditorSnackbars /> }
			content={ <Table templateType={ templateType } /> }
			shortcuts={ {
				previous: previousShortcut,
				next: nextShortcut,
			} }
		/>
	);
}

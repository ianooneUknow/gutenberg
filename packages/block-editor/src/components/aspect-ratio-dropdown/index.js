/**
 * WordPress dependencies
 */
import { check, aspectRatio as aspectRatioIcon } from '@wordpress/icons';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useSetting from '../use-setting';
import { POPOVER_PROPS } from '../image-editor/constants';
import { useImageEditingContext } from '../image-editor/context';

function AspectRatioGroup( {
	aspectRatios,
	isDisabled,
	label,
	onClick,
	value,
} ) {
	return (
		<MenuGroup label={ label }>
			{ aspectRatios.map( ( { name, slug, ratio } ) => (
				<MenuItem
					key={ slug }
					disabled={ isDisabled }
					onClick={ () => {
						onClick( ratio );
					} }
					role="menuitemradio"
					isSelected={ ratio === value }
					icon={ ratio === value ? check : undefined }
				>
					{ name }
				</MenuItem>
			) ) }
		</MenuGroup>
	);
}

function ratioToNumber( str ) {
	// TODO: support two-value aspect ratio?
	// https://css-tricks.com/almanac/properties/a/aspect-ratio/#aa-it-can-take-two-values
	const [ a, b, ...rest ] = str.split( '/' ).map( Number );
	if (
		a <= 0 ||
		b <= 0 ||
		Number.isNaN( a ) ||
		Number.isNaN( b ) ||
		rest.length
	) {
		return NaN;
	}
	return b ? a / b : a;
}

function presetRatioAsNumber( { ratio, ...rest } ) {
	return {
		ratio: ratioToNumber( ratio ),
		...rest,
	};
}

export default function AspectRatioDropdown( { toggleProps } ) {
	const { isInProgress, aspect, setAspect, defaultAspect } =
		useImageEditingContext();

	const defaultRatios = (
		useSetting( 'dimensions.aspectRatios.default' ) || []
	).map( presetRatioAsNumber );
	const themeRatios = (
		useSetting( 'dimensions.aspectRatios.theme' ) || []
	).map( presetRatioAsNumber );
	const showDefaultRatios = useSetting( 'dimensions.defaultAspectRatios' );

	return (
		<DropdownMenu
			icon={ aspectRatioIcon }
			label={ __( 'Aspect Ratio' ) }
			popoverProps={ POPOVER_PROPS }
			toggleProps={ toggleProps }
			className="wp-block-image__aspect-ratio"
		>
			{ ( { onClose } ) => (
				<>
					<AspectRatioGroup
						isDisabled={ isInProgress }
						onClick={ ( newAspect ) => {
							setAspect( newAspect );
							onClose();
						} }
						value={ aspect }
						aspectRatios={ [
							{
								title: __( 'Original' ),
								aspect: defaultAspect,
							},
							...( showDefaultRatios
								? defaultRatios.filter(
										( { ratio } ) => ratio === 1
								  )
								: [] ),
						] }
					/>
					{ themeRatios.length > 0 && (
						<AspectRatioGroup
							label={ __( 'Theme' ) }
							isDisabled={ isInProgress }
							onClick={ ( newAspect ) => {
								setAspect( newAspect );
								onClose();
							} }
							value={ aspect }
							aspectRatios={ themeRatios }
						/>
					) }
					{ showDefaultRatios && (
						<AspectRatioGroup
							label={ __( 'Landscape' ) }
							isDisabled={ isInProgress }
							onClick={ ( newAspect ) => {
								setAspect( newAspect );
								onClose();
							} }
							value={ aspect }
							aspectRatios={ defaultRatios.filter(
								( { ratio } ) => ratio > 1
							) }
						/>
					) }
					{ showDefaultRatios && (
						<AspectRatioGroup
							label={ __( 'Portrait' ) }
							isDisabled={ isInProgress }
							onClick={ ( newAspect ) => {
								setAspect( newAspect );
								onClose();
							} }
							value={ aspect }
							aspectRatios={ defaultRatios.filter(
								( { ratio } ) => ratio < 1
							) }
						/>
					) }
				</>
			) }
		</DropdownMenu>
	);
}

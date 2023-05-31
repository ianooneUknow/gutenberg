<?php
/**
 * Colors block support flag.
 *
 * @package gutenberg
 */

/**
 * Registers the style and colors block attributes for block types that support it.
 *
 * @param WP_Block_Type $block_type Block Type.
 */
function gutenberg_register_colors_support( $block_type ) {
	$color_support = false;
	if ( property_exists( $block_type, 'supports' ) ) {
		$color_support = isset( $block_type->supports['color'] )
			? _wp_array_get( $block_type->supports, array( 'color' ), false )
			: false;
	}
	$has_text_colors_support       = true === $color_support || ( is_array( $color_support ) && ( ! isset( $color_support['text'] ) || $color_support['text'] ) );
	$has_background_colors_support = true === $color_support || ( is_array( $color_support ) && ( ! isset( $color_support['background'] ) || $color_support['background'] ) );
	$has_gradients_support         = isset( $color_support['gradients'] ) && $color_support['gradients'];
	$has_link_colors_support       = isset( $color_support['link'] ) && $color_support['link'];
	$has_color_support             = $has_text_colors_support ||
		$has_background_colors_support ||
		$has_gradients_support ||
		$has_link_colors_support;

	if ( ! $block_type->attributes ) {
		$block_type->attributes = array();
	}

	if ( $has_color_support && ! array_key_exists( 'style', $block_type->attributes ) ) {
		$block_type->attributes['style'] = array(
			'type' => 'object',
		);
	}

	if ( $has_background_colors_support && ! array_key_exists( 'backgroundColor', $block_type->attributes ) ) {
		$block_type->attributes['backgroundColor'] = array(
			'type' => 'string',
		);
	}

	if ( $has_text_colors_support && ! array_key_exists( 'textColor', $block_type->attributes ) ) {
		$block_type->attributes['textColor'] = array(
			'type' => 'string',
		);
	}

	if ( $has_gradients_support && ! array_key_exists( 'gradient', $block_type->attributes ) ) {
		$block_type->attributes['gradient'] = array(
			'type' => 'string',
		);
	}
}


/**
 * Add CSS classes and inline styles for colors to the incoming attributes array.
 * This will be applied to the block markup in the front-end.
 *
 * @param  WP_Block_Type $block_type       Block type.
 * @param  array         $block_attributes Block attributes.
 *
 * @return array Colors CSS classes and inline styles.
 */
function gutenberg_apply_colors_support( $block_type, $block_attributes ) {
	$color_support = isset( $block_type->supports['color'] ) && $block_type->supports['color']
		? _wp_array_get( $block_type->supports, array( 'color' ), false )
		: false;

	if (
		is_array( $color_support ) &&
		wp_should_skip_block_supports_serialization( $block_type, 'color' )
	) {
		return array();
	}

	$has_text_colors_support       = true === $color_support || ( is_array( $color_support ) && ( ! isset( $color_support['text'] ) || $color_support['text'] ) );
	$has_background_colors_support = true === $color_support || ( is_array( $color_support ) && ! isset( $color_support['background'] ) || $color_support['background'] );
	$has_gradients_support         = isset( $color_support['gradients'] ) && $color_support['gradients'];
	$color_block_styles            = array();

	// Text colors.
	// Check support for text colors.
	if ( $has_text_colors_support && ! wp_should_skip_block_supports_serialization( $block_type, 'color', 'text' ) ) {
		$preset_text_color          = array_key_exists( 'textColor', $block_attributes ) ? "var:preset|color|{$block_attributes['textColor']}" : null;
		$custom_text_color          = isset( $block_attributes['style']['color']['text'] )
			? _wp_array_get( $block_attributes, array( 'style', 'color', 'text' ), null )
			: null;
		$color_block_styles['text'] = $preset_text_color ? $preset_text_color : $custom_text_color;
	}

	// Background colors.
	if ( $has_background_colors_support && ! wp_should_skip_block_supports_serialization( $block_type, 'color', 'background' ) ) {
		$preset_background_color          = array_key_exists( 'backgroundColor', $block_attributes ) ? "var:preset|color|{$block_attributes['backgroundColor']}" : null;
		$custom_background_color          = isset( $block_attributes['style']['color']['background'] )
			? _wp_array_get( $block_attributes, array( 'style', 'color', 'background' ), null )
			: null;
		$color_block_styles['background'] = $preset_background_color ? $preset_background_color : $custom_background_color;
	}

	// Gradients.

	if ( $has_gradients_support && ! wp_should_skip_block_supports_serialization( $block_type, 'color', 'gradients' ) ) {
		$preset_gradient_color          = array_key_exists( 'gradient', $block_attributes ) ? "var:preset|gradient|{$block_attributes['gradient']}" : null;
		$custom_gradient_color          = isset( $block_attributes['style']['color']['gradient'] )
			? _wp_array_get( $block_attributes, array( 'style', 'color', 'gradient' ), null )
			: null;
		$color_block_styles['gradient'] = $preset_gradient_color ? $preset_gradient_color : $custom_gradient_color;
	}

	$attributes = array();
	$styles     = gutenberg_style_engine_get_styles( array( 'color' => $color_block_styles ), array( 'convert_vars_to_classnames' => true ) );

	if ( ! empty( $styles['classnames'] ) ) {
		$attributes['class'] = $styles['classnames'];
	}

	if ( ! empty( $styles['css'] ) ) {
		$attributes['style'] = $styles['css'];
	}

	return $attributes;
}

// Register the block support.
WP_Block_Supports::get_instance()->register(
	'colors',
	array(
		'register_attribute' => 'gutenberg_register_colors_support',
		'apply'              => 'gutenberg_apply_colors_support',
	)
);

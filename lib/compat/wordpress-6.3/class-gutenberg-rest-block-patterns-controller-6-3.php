<?php
/**
 * REST API: Gutenberg_REST_Block_Patterns_Controller_6_3 class
 *
 * @package    Gutenberg
 * @subpackage REST_API
 */

/**
 * Core class used to access block patterns via the REST API.
 *
 * @since 6.0.0
 *
 * @see WP_REST_Controller
 */
class Gutenberg_REST_Block_Patterns_Controller_6_3 extends Gutenberg_REST_Block_Patterns_Controller_6_2 {
	/**
	 * Prepare a raw block pattern before it gets output in a REST API response.
	 *
	 * @since 6.3.0
	 *
	 * @param array           $item    Raw pattern as registered, before any changes.
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function prepare_item_for_response( $item, $request ) {
		$response = parent::prepare_item_for_response( $item, $request );
		$data = $response->get_data();

		$blocks = parse_blocks( $data['content'] );
		$data['content'] = gutenberg_serialize_blocks( $blocks ); // Serialize or render?

		return rest_ensure_response( $data );
	}
}

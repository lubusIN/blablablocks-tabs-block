/**
 * Wordpress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { generateStyles } from '../utils/style';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props            Component properties.
 * @param {Object} props.attributes The block's attributes.
 * @return {JSX.Element}            The block's save component.
 */
export default function save( { attributes } ) {
	const { tabs } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'blablablocks-tabs',
		style: generateStyles( attributes ),
	} );
	
	const innerBlocksProps = useInnerBlocksProps.save();

	return (
		<div
			{ ...blockProps }
			data-wp-interactive="blablablocks-tabs"
			data-wp-context={ `{ "tabs": ${ JSON.stringify( tabs ) } }` }
			data-wp-init="callbacks.initTabs"
		>
			<div className="blablablocks-tabs-buttons">
				<template data-wp-each--tab="context.tabs">
					<div
						className="blablablock-tab-btn"
						data-wp-key="context.tab.id"
						data-wp-on--click="actions.setActiveTab"
						data-wp-class--is-bbb-active-tab="state.isActive"
					>
						<span
							className="bbb-tab-icon"
							data-wp-bind--hidden="!context.tab.icon"
							data-wp-watch="callbacks.renderIcon"
						></span>
						<span
							className="tab-button-text"
							data-wp-text="context.tab.label"
						></span>
					</div>
				</template>
			</div>

			<div className="blablablocks-tabs-content">
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}

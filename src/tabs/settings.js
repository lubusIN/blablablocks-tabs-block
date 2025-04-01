/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	__experimentalHStack as HStack, // eslint-disable-line
	__experimentalToggleGroupControl as ToggleGroupControl, // eslint-disable-line
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, // eslint-disable-line
} from '@wordpress/components';
import {
	arrowDown,
	arrowRight,
	justifyBottom,
	justifyCenter,
	justifyLeft,
	justifyRight,
	justifyTop,
} from '@wordpress/icons';

/**
 * Settings component
 *
 * @param {Object}   props               Component props
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 *
 * @return {JSX.Element} Settings panel
 */
function Settings({ attributes, setAttributes }) {
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout', 'blablablocks-tabs-block')}>
					<HStack align={'start'}>
						{attributes.orientation === 'row' && (
							<ToggleGroupControl
								label={__(
									'Justification',
									'blablablocks-tabs-block'
								)}
								value={attributes.justification}
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								onChange={(value) =>
									setAttributes({ justification: value })
								}
							>
								<ToggleGroupControlOptionIcon
									icon={justifyLeft}
									value="left"
									label="Justify items left"
								/>
								<ToggleGroupControlOptionIcon
									icon={justifyCenter}
									value="center"
									label="Justify items center"
								/>
								<ToggleGroupControlOptionIcon
									icon={justifyRight}
									value="right"
									label="Justify items right"
								/>
							</ToggleGroupControl>
						)}
						{attributes.orientation === 'column' && (
							<ToggleGroupControl
								label={__(
									'Position',
									'blablablocks-tabs-block'
								)}
								value={attributes.verticalPosition}
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								onChange={(value) =>
									setAttributes({ verticalPosition: value })
								}
							>
								<ToggleGroupControlOptionIcon
									icon={justifyLeft}
									value="left"
									label="Left"
								/>
								<ToggleGroupControlOptionIcon
									icon={justifyRight}
									value="right"
									label="Right"
								/>
							</ToggleGroupControl>
						)}
						<ToggleGroupControl
							label={__(
								'Orientation',
								'blablablocks-tabs-block'
							)}
							value={attributes.orientation}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							onChange={(value) =>
								setAttributes({ orientation: value })
							}
						>
							<ToggleGroupControlOptionIcon
								icon={arrowRight}
								value="row"
								label="Horizontal"
							/>
							<ToggleGroupControlOptionIcon
								icon={arrowDown}
								value="column"
								label="Vertical"
							/>
						</ToggleGroupControl>
					</HStack>
					<ToggleControl
						checked={attributes.autoWidth}
						label={__(
							'Auto-adjust tab width',
							'blablablocks-tabs-block'
						)}
						onChange={(value) =>
							setAttributes({ autoWidth: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls>
				<PanelBody
					title={__('Icon Settings', 'blablablocks-tabs-block')}
				>
					<ToggleGroupControl
						label={__(
							'Icon Position',
							'blablablocks-tabs-block'
						)}
						value={attributes.iconPosition}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						isBlock
						onChange={(value) =>
							setAttributes({ iconPosition: value })
						}
					>
						<ToggleGroupControlOptionIcon
							icon={justifyTop}
							value="top"
							label="Align top"
						/>
						<ToggleGroupControlOptionIcon
							icon={justifyLeft}
							value="left"
							label="Align left"
						/>
						<ToggleGroupControlOptionIcon
							icon={justifyBottom}
							value="bottom"
							label="Align bottom"
						/>
						<ToggleGroupControlOptionIcon
							icon={justifyRight}
							value="right"
							label="Align right"
						/>
					</ToggleGroupControl>
					<RangeControl
						label={__('Size', 'blablablocks-tabs-block')}
						value={attributes.iconSize}
						initialPosition={attributes.iconSize}
						onChange={(value) =>
							setAttributes({ iconSize: value })
						}
						min={10}
						max={100}
					/>
					<ToggleControl
						checked={attributes.iconFill}
						label={__(
							'Use icon color to fill',
							'blablablocks-tabs-block'
						)}
						help={__(
							'Apply icon color to SVG fill. Disable if needed.',
							'blablablocks-tabs-block'
						)}
						onChange={(value) =>
							setAttributes({ iconFill: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default Settings;

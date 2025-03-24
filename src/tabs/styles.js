/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
    __experimentalSpacingSizesControl as SpacingSizesControl, // eslint-disable-line
    __experimentalBorderRadiusControl as BorderRadiusControl, // eslint-disable-line
} from '@wordpress/block-editor';
import {
    __experimentalHeading as Heading, // eslint-disable-line
    __experimentalVStack as VStack, // eslint-disable-line
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem, // eslint-disable-line
    __experimentalBorderBoxControl as BorderBoxControl, // eslint-disable-line
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ColorControlDropdown } from '../components';

/**
 * Styles component
 *
 * @param {Object}   props               Component props
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 *
 * @return {JSX.Element} Styles panel
 */
function Styles( { attributes, setAttributes } ) {
	return (
		<InspectorControls group="styles">
			<ToolsPanel
				label={ __( 'Tab', 'blablablocks-tabs-block' ) }
				resetAll={ () =>
					setAttributes( {
						tabColor: {
							textColor: {
								default: undefined,
								hover: undefined,
								active: undefined,
							},
							backgroundColor: {
								default: undefined,
								hover: undefined,
								active: undefined,
							},
							iconColor: {
								default: undefined,
								hover: undefined,
								active: undefined,
							},
						},
						tabPadding: undefined,
						tabBorderRadius: undefined,
						tabBorder: undefined,
						tabSpacing: undefined,
					} )
				}
			>
				<ToolsPanelItem
					label={ __( 'Color', 'blablablocks-tabs-block' ) }
					isShownByDefault
					hasValue={ () =>
						!! attributes?.tabColor?.textColor?.default ||
						!! attributes?.tabColor?.textColor?.hover ||
						!! attributes?.tabColor?.textColor?.active ||
						!! attributes?.tabColor?.backgroundColor?.default ||
						!! attributes?.tabColor?.backgroundColor?.hover ||
						!! attributes?.tabColor?.backgroundColor?.active ||
						!! attributes?.tabColor?.iconColor?.default ||
						!! attributes?.tabColor?.iconColor?.hover ||
						!! attributes?.tabColor?.iconColor?.active
					}
					onDeselect={ () =>
						setAttributes( {
							tabColor: {
								textColor: {
									default: undefined,
									hover: undefined,
									active: undefined,
								},
								backgroundColor: {
									default: undefined,
									hover: undefined,
									active: undefined,
								},
								iconColor: {
									default: undefined,
									hover: undefined,
									active: undefined,
								},
							},
						} )
					}
				>
					<VStack spacing={ 0 }>
						<Heading
							lineHeight={ 1 }
							level={ 3 }
							weight={ 500 }
							upperCase
						>
							Color
						</Heading>
						<VStack
							className="tabs_color-support-panel"
							spacing={ 0 }
						>
							<ColorControlDropdown
								label={ __(
									'Text',
									'blablablocks-tabs-block'
								) }
								colorValue={
									attributes?.tabColor?.textColor || {}
								}
								onChangeColor={ ( newColor ) =>
									setAttributes( {
										tabColor: {
											...attributes.tabColor,
											textColor: newColor,
										},
									} )
								}
								hasHover={ true }
								hasActive={ true }
							/>
							<ColorControlDropdown
								label={ __(
									'Background',
									'blablablocks-tabs-block'
								) }
								colorValue={
									attributes?.tabColor?.backgroundColor || {}
								}
								onChangeColor={ ( newColor ) =>
									setAttributes( {
										tabColor: {
											...attributes?.tabColor,
											backgroundColor: newColor,
										},
									} )
								}
								hasHover={ true }
								hasActive={ true }
							/>
							<ColorControlDropdown
								label={ __(
									'Icon',
									'blablablocks-tabs-block'
								) }
								colorValue={
									attributes?.tabColor?.iconColor || {}
								}
								onChangeColor={ ( newColor ) =>
									setAttributes( {
										tabColor: {
											...attributes?.tabColor,
											iconColor: newColor,
										},
									} )
								}
								hasHover={ true }
								hasActive={ true }
							/>
						</VStack>
					</VStack>
				</ToolsPanelItem>
				<ToolsPanelItem
					label={ __( 'Padding', 'blablablocks-tabs-block' ) }
					hasValue={ () => !! attributes.tabPadding }
					onDeselect={ () =>
						setAttributes( { tabPadding: undefined } )
					}
				>
					<SpacingSizesControl
						values={ attributes.tabPadding }
						onChange={ ( value ) =>
							setAttributes( { tabPadding: value } )
						}
						label={ __( 'Padding', 'blablablocks-tabs-block' ) }
						allowReset={ false }
						splitOnAxis={ true }
					/>
				</ToolsPanelItem>
				<ToolsPanelItem
					label={ __( 'Spacing', 'blablablocks-tabs-block' ) }
					className="bbb-tab-spacing"
					hasValue={ () => !! attributes.tabSpacing }
					onDeselect={ () =>
						setAttributes( {
							tabSpacing: undefined,
						} )
					}
				>
					<SpacingSizesControl
						values={ { top: attributes.tabSpacing } }
						onChange={ ( value ) => {
							setAttributes( { tabSpacing: value.top } );
						} }
						label={ __( 'Spacing', 'blablablocks-tabs-block' ) }
						showSideInLabel={ false }
						allowReset={ false }
						sides={ [ 'top' ] }
					/>
				</ToolsPanelItem>
				<ToolsPanelItem
					label={ __( 'Border', 'blablablocks-tabs-block' ) }
					hasValue={ () => !! attributes.tabBorder }
					onDeselect={ () =>
						setAttributes( {
							tabBorder: undefined,
						} )
					}
				>
					<BorderBoxControl
						__next40pxDefaultSize
						label={ __( 'Border', 'blablablocks-tabs-block' ) }
						value={ attributes.tabBorder }
						onChange={ ( value ) =>
							setAttributes( {
								tabBorder: value,
							} )
						}
					/>
				</ToolsPanelItem>
				<ToolsPanelItem
					label={ __( 'Radius', 'blablablocks-tabs-block' ) }
					hasValue={ () => !! attributes.tabBorderRadius }
					onDeselect={ () =>
						setAttributes( {
							tabBorderRadius: undefined,
						} )
					}
				>
					<BorderRadiusControl
						values={ attributes.tabBorderRadius }
						onChange={ ( value ) =>
							setAttributes( {
								tabBorderRadius: value,
							} )
						}
					/>
				</ToolsPanelItem>
			</ToolsPanel>
		</InspectorControls>
	);
}

export default Styles;

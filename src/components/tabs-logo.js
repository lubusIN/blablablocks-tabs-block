/**
 * Wordpress dependencies.
 */
import { SVG, Path, G, Rect } from '@wordpress/components';

/**
 * Tabs logo icon
 */
const TabsLogo = (
    <SVG fill="#000000" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32">
        <G>
            <Rect x="19" y="4" width="5" height="5" />
            <Path d="M26,9h5V7c0-1.7-1.3-3-3-3h-2V9z" />
            <Rect x="12" y="4" width="5" height="5" />
        </G>
        <Path d="M11,11c-0.6,0-1-0.4-1-1V4H4C2.3,4,1,5.3,1,7v18c0,1.7,1.3,3,3,3h24c1.7,0,3-1.3,3-3V11H11z M7,9H4C3.4,9,3,8.6,3,8 s0.4-1,1-1h3c0.6,0,1,0.4,1,1S7.6,9,7,9z" />
    </SVG>
);

export default TabsLogo;

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

const Pricing = {
	name: 'pricing',
	title: __( 'Horizontal Pricing', 'blablablocks-tabs-block' ),
	content: `
                    <!-- wp:group {"metadata":{"name":"Horizontal Pricing"},"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"20px","right":"20px"}}},"layout":{"type":"constrained"}} -->
            <div class="wp-block-group alignwide" style="padding-top:var(--wp--preset--spacing--30);padding-right:20px;padding-bottom:var(--wp--preset--spacing--30);padding-left:20px"><!-- wp:blablablocks/tabs {"justification":"center","tabTextColor":{"hover":{"color":"#fefefe"}},"tabBackgroundColor":{"default":{"color":"#fefefe"},"active":{"color":"#3858e9"},"hover":{"color":"#3858e9"}},"tabBorder":{"border":{"radius":"50px"}},"metadata":{},"align":"wide","style":{"border":{"color":"#ebe6e7","width":"1px","radius":"50px"},"spacing":{"padding":{"left":"8px","right":"8px","top":"8px","bottom":"8px"}},"typography":{"fontSize":"16px","fontStyle":"normal","fontWeight":"500"}}} -->
            <!-- wp:blablablocks/tab {"tabname":"Monthly","tabId":"12986470-6c0e-43f6-9d13-fc986f486bb7"} -->
            <!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"15px"}}}} -->
            <div class="wp-block-columns alignwide"><!-- wp:column {"style":{"border":{"color":"#ebe6e7","width":"1px","radius":"24px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"40px","right":"40px"}}}} -->
            <div class="wp-block-column has-border-color" style="border-color:#ebe6e7;border-width:1px;border-radius:24px;padding-top:40px;padding-right:40px;padding-bottom:40px;padding-left:40px"><!-- wp:heading {"style":{"typography":{"fontSize":"30px","fontStyle":"normal","fontWeight":"400"}}} -->
            <h2 class="wp-block-heading" style="font-size:30px;font-style:normal;font-weight:400"><strong>Basic</strong></h2>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"#4a5565"}}},"color":{"text":"#4a5565"},"typography":{"fontSize":"16px"}}} -->
            <p class="has-text-color has-link-color" style="color:#4a5565;font-size:16px">Ideal for individuals who need to manage up to 5 projects with essential analytics and reliable email support.</p>
            <!-- /wp:paragraph -->

            <!-- wp:group {"style":{"spacing":{"blockGap":"0px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"36px","fontStyle":"normal","fontWeight":"700"}}} -->
            <h3 class="wp-block-heading" style="font-size:36px;font-style:normal;font-weight:700">$19</h3>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"style":{"color":{"text":"#4a5565"},"elements":{"link":{"color":{"text":"#4a5565"}}}}} -->
            <p class="has-text-color has-link-color" style="color:#4a5565"> <sub>/month</sub></p>
            <!-- /wp:paragraph --></div>
            <!-- /wp:group -->

            <!-- wp:buttons -->
            <div class="wp-block-buttons"><!-- wp:button {"width":100,"className":"is-style-fill","style":{"border":{"radius":"6px"},"color":{"background":"#3858e9"},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"padding":{"left":"12px","right":"12px","top":"8px","bottom":"8px"}}},"fontSize":"small"} -->
            <div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-fill"><a class="wp-block-button__link has-background has-small-font-size has-custom-font-size wp-element-button" style="border-radius:6px;background-color:#3858e9;padding-top:8px;padding-right:12px;padding-bottom:8px;padding-left:12px;font-style:normal;font-weight:500">Buy Plan</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons -->

            <!-- wp:list {"className":"is-style-checkmark-list","style":{"spacing":{"margin":{"right":"0px","left":"0px"},"padding":{"right":"0px","left":"15px"}},"color":{"text":"#4a5565"},"elements":{"link":{"color":{"text":"#4a5565"}}},"typography":{"fontSize":"16px"}}} -->
            <ul style="color:#4a5565;margin-right:0px;margin-left:0px;padding-right:0px;padding-left:15px;font-size:16px" class="wp-block-list is-style-checkmark-list has-text-color has-link-color"><!-- wp:list-item -->
            <li>Up to 5 projects</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Basic analytics dashboard</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Email support (response within 48 hrs)</li>
            <!-- /wp:list-item --></ul>
            <!-- /wp:list --></div>
            <!-- /wp:column -->

            <!-- wp:column {"style":{"border":{"color":"#ebe6e7","width":"1px","radius":"24px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"40px","right":"40px"}}}} -->
            <div class="wp-block-column has-border-color" style="border-color:#ebe6e7;border-width:1px;border-radius:24px;padding-top:40px;padding-right:40px;padding-bottom:40px;padding-left:40px"><!-- wp:heading {"style":{"typography":{"fontSize":"30px","fontStyle":"normal","fontWeight":"400"}}} -->
            <h2 class="wp-block-heading" style="font-size:30px;font-style:normal;font-weight:400"><strong>Standard</strong></h2>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"#4a5565"}}},"color":{"text":"#4a5565"},"typography":{"fontSize":"16px"}}} -->
            <p class="has-text-color has-link-color" style="color:#4a5565;font-size:16px">Perfect for small teams seeking advanced reporting, collaboration tools, and faster priority email support. </p>
            <!-- /wp:paragraph -->

            <!-- wp:group {"style":{"spacing":{"blockGap":"0px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"36px","fontStyle":"normal","fontWeight":"700"}}} -->
            <h3 class="wp-block-heading" style="font-size:36px;font-style:normal;font-weight:700">$49</h3>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"style":{"color":{"text":"#4a5565"},"elements":{"link":{"color":{"text":"#4a5565"}}}}} -->
            <p class="has-text-color has-link-color" style="color:#4a5565"> <sub>/month</sub></p>
            <!-- /wp:paragraph --></div>
            <!-- /wp:group -->

            <!-- wp:buttons -->
            <div class="wp-block-buttons"><!-- wp:button {"width":100,"className":"is-style-fill","style":{"border":{"radius":"6px"},"color":{"background":"#3858e9"},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"padding":{"left":"12px","right":"12px","top":"8px","bottom":"8px"}}},"fontSize":"small"} -->
            <div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-fill"><a class="wp-block-button__link has-background has-small-font-size has-custom-font-size wp-element-button" style="border-radius:6px;background-color:#3858e9;padding-top:8px;padding-right:12px;padding-bottom:8px;padding-left:12px;font-style:normal;font-weight:500">Buy Plan</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons -->

            <!-- wp:list {"className":"is-style-checkmark-list","style":{"spacing":{"margin":{"right":"0px","left":"0px"},"padding":{"right":"0px","left":"15px"}},"color":{"text":"#4a5565"},"elements":{"link":{"color":{"text":"#4a5565"}}},"typography":{"fontSize":"16px"}}} -->
            <ul style="color:#4a5565;margin-right:0px;margin-left:0px;padding-right:0px;padding-left:15px;font-size:16px" class="wp-block-list is-style-checkmark-list has-text-color has-link-color"><!-- wp:list-item -->
            <li>Up to 25 projects</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Advanced analytics &amp; reporting</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Priority email support (response within 24 hrs)</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Team collaboration tools</li>
            <!-- /wp:list-item --></ul>
            <!-- /wp:list --></div>
            <!-- /wp:column -->

            <!-- wp:column {"style":{"border":{"color":"#ebe6e7","width":"1px","radius":"24px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"40px","right":"40px"}},"color":{"background":"#3858e9","text":"#fefefe"},"elements":{"link":{"color":{"text":"#fefefe"}}}}} -->
            <div class="wp-block-column has-border-color has-text-color has-background has-link-color" style="border-color:#ebe6e7;border-width:1px;border-radius:24px;color:#fefefe;background-color:#3858e9;padding-top:40px;padding-right:40px;padding-bottom:40px;padding-left:40px"><!-- wp:heading {"style":{"typography":{"fontSize":"30px","fontStyle":"normal","fontWeight":"400"}}} -->
            <h2 class="wp-block-heading" style="font-size:30px;font-style:normal;font-weight:400"><strong>Premium</strong></h2>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"style":{"typography":{"fontSize":"16px"}}} -->
            <p style="font-size:16px">Tailored for enterprises requiring unlimited projects, full analytics, 24/7 support, and a dedicated account manager.</p>
            <!-- /wp:paragraph -->

            <!-- wp:group {"style":{"spacing":{"blockGap":"0px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"36px","fontStyle":"normal","fontWeight":"700"}}} -->
            <h3 class="wp-block-heading" style="font-size:36px;font-style:normal;font-weight:700">$99</h3>
            <!-- /wp:heading -->

            <!-- wp:paragraph -->
            <p> <sub>/month</sub></p>
            <!-- /wp:paragraph --></div>
            <!-- /wp:group -->

            <!-- wp:buttons -->
            <div class="wp-block-buttons"><!-- wp:button {"width":100,"className":"is-style-fill","style":{"border":{"radius":"6px"},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"padding":{"left":"12px","right":"12px","top":"8px","bottom":"8px"}},"color":{"background":"#fefefe","text":"#010101"},"elements":{"link":{"color":{"text":"#010101"}}}},"fontSize":"small"} -->
            <div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-fill"><a class="wp-block-button__link has-text-color has-background has-link-color has-small-font-size has-custom-font-size wp-element-button" style="border-radius:6px;color:#010101;background-color:#fefefe;padding-top:8px;padding-right:12px;padding-bottom:8px;padding-left:12px;font-style:normal;font-weight:500">Buy Plan</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons -->

            <!-- wp:list {"className":"is-style-checkmark-list","style":{"spacing":{"margin":{"right":"0px","left":"0px"},"padding":{"right":"0px","left":"15px"}},"typography":{"fontSize":"16px"}}} -->
            <ul style="margin-right:0px;margin-left:0px;padding-right:0px;padding-left:15px;font-size:16px" class="wp-block-list is-style-checkmark-list"><!-- wp:list-item -->
            <li>Unlimited projects</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Full analytics suite with custom reports</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>24/7 phone &amp; email support</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Dedicated account manager</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Custom integrations &amp; onboarding</li>
            <!-- /wp:list-item --></ul>
            <!-- /wp:list --></div>
            <!-- /wp:column --></div>
            <!-- /wp:columns -->
            <!-- /wp:blablablocks/tab -->

            <!-- wp:blablablocks/tab {"tabname":"Annually","tabId":"cebd78d8-3dd2-4d04-8d8b-0ef66f1a4e7e"} -->
            <!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"15px"}}}} -->
            <div class="wp-block-columns alignwide"><!-- wp:column {"style":{"border":{"color":"#ebe6e7","width":"1px","radius":"24px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"40px","right":"40px"}}}} -->
            <div class="wp-block-column has-border-color" style="border-color:#ebe6e7;border-width:1px;border-radius:24px;padding-top:40px;padding-right:40px;padding-bottom:40px;padding-left:40px"><!-- wp:heading {"style":{"typography":{"fontSize":"30px","fontStyle":"normal","fontWeight":"400"}}} -->
            <h2 class="wp-block-heading" style="font-size:30px;font-style:normal;font-weight:400"><strong>Basic</strong></h2>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"#4a5565"}}},"color":{"text":"#4a5565"},"typography":{"fontSize":"16px"}}} -->
            <p class="has-text-color has-link-color" style="color:#4a5565;font-size:16px">Ideal for individuals who need to manage up to 5 projects with essential analytics and reliable email support.</p>
            <!-- /wp:paragraph -->

            <!-- wp:group {"style":{"spacing":{"blockGap":"0px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"36px","fontStyle":"normal","fontWeight":"700"}}} -->
            <h3 class="wp-block-heading" style="font-size:36px;font-style:normal;font-weight:700">$16</h3>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"style":{"color":{"text":"#4a5565"},"elements":{"link":{"color":{"text":"#4a5565"}}}}} -->
            <p class="has-text-color has-link-color" style="color:#4a5565"><sub> /year</sub></p>
            <!-- /wp:paragraph --></div>
            <!-- /wp:group -->

            <!-- wp:buttons -->
            <div class="wp-block-buttons"><!-- wp:button {"width":100,"className":"is-style-fill","style":{"border":{"radius":"6px"},"color":{"background":"#3858e9"},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"padding":{"left":"12px","right":"12px","top":"8px","bottom":"8px"}}},"fontSize":"small"} -->
            <div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-fill"><a class="wp-block-button__link has-background has-small-font-size has-custom-font-size wp-element-button" style="border-radius:6px;background-color:#3858e9;padding-top:8px;padding-right:12px;padding-bottom:8px;padding-left:12px;font-style:normal;font-weight:500">Buy Plan</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons -->

            <!-- wp:list {"className":"is-style-checkmark-list","style":{"spacing":{"margin":{"right":"0px","left":"0px"},"padding":{"right":"0px","left":"15px"}},"color":{"text":"#4a5565"},"elements":{"link":{"color":{"text":"#4a5565"}}},"typography":{"fontSize":"16px"}}} -->
            <ul style="color:#4a5565;margin-right:0px;margin-left:0px;padding-right:0px;padding-left:15px;font-size:16px" class="wp-block-list is-style-checkmark-list has-text-color has-link-color"><!-- wp:list-item -->
            <li>Up to 5 projects</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Basic analytics dashboard</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Email support (response within 48 hrs)</li>
            <!-- /wp:list-item --></ul>
            <!-- /wp:list --></div>
            <!-- /wp:column -->

            <!-- wp:column {"style":{"border":{"color":"#ebe6e7","width":"1px","radius":"24px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"40px","right":"40px"}}}} -->
            <div class="wp-block-column has-border-color" style="border-color:#ebe6e7;border-width:1px;border-radius:24px;padding-top:40px;padding-right:40px;padding-bottom:40px;padding-left:40px"><!-- wp:heading {"style":{"typography":{"fontSize":"30px","fontStyle":"normal","fontWeight":"400"}}} -->
            <h2 class="wp-block-heading" style="font-size:30px;font-style:normal;font-weight:400"><strong>Standard</strong></h2>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"#4a5565"}}},"color":{"text":"#4a5565"},"typography":{"fontSize":"16px"}}} -->
            <p class="has-text-color has-link-color" style="color:#4a5565;font-size:16px">Perfect for small teams seeking advanced reporting, collaboration tools, and faster priority email support. </p>
            <!-- /wp:paragraph -->

            <!-- wp:group {"style":{"spacing":{"blockGap":"0px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"36px","fontStyle":"normal","fontWeight":"700"}}} -->
            <h3 class="wp-block-heading" style="font-size:36px;font-style:normal;font-weight:700">$40</h3>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"style":{"color":{"text":"#4a5565"},"elements":{"link":{"color":{"text":"#4a5565"}}}}} -->
            <p class="has-text-color has-link-color" style="color:#4a5565"><sub> /year</sub></p>
            <!-- /wp:paragraph --></div>
            <!-- /wp:group -->

            <!-- wp:buttons -->
            <div class="wp-block-buttons"><!-- wp:button {"width":100,"className":"is-style-fill","style":{"border":{"radius":"6px"},"color":{"background":"#3858e9"},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"padding":{"left":"12px","right":"12px","top":"8px","bottom":"8px"}}},"fontSize":"small"} -->
            <div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-fill"><a class="wp-block-button__link has-background has-small-font-size has-custom-font-size wp-element-button" style="border-radius:6px;background-color:#3858e9;padding-top:8px;padding-right:12px;padding-bottom:8px;padding-left:12px;font-style:normal;font-weight:500">Buy Plan</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons -->

            <!-- wp:list {"className":"is-style-checkmark-list","style":{"spacing":{"margin":{"right":"0px","left":"0px"},"padding":{"right":"0px","left":"15px"}},"color":{"text":"#4a5565"},"elements":{"link":{"color":{"text":"#4a5565"}}},"typography":{"fontSize":"16px"}}} -->
            <ul style="color:#4a5565;margin-right:0px;margin-left:0px;padding-right:0px;padding-left:15px;font-size:16px" class="wp-block-list is-style-checkmark-list has-text-color has-link-color"><!-- wp:list-item -->
            <li>Up to 25 projects</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Advanced analytics &amp; reporting</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Priority email support (response within 24 hrs)</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Team collaboration tools</li>
            <!-- /wp:list-item --></ul>
            <!-- /wp:list --></div>
            <!-- /wp:column -->

            <!-- wp:column {"style":{"border":{"color":"#ebe6e7","width":"1px","radius":"24px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"40px","right":"40px"}},"color":{"background":"#3858e9","text":"#fefefe"},"elements":{"link":{"color":{"text":"#fefefe"}}}}} -->
            <div class="wp-block-column has-border-color has-text-color has-background has-link-color" style="border-color:#ebe6e7;border-width:1px;border-radius:24px;color:#fefefe;background-color:#3858e9;padding-top:40px;padding-right:40px;padding-bottom:40px;padding-left:40px"><!-- wp:heading {"style":{"typography":{"fontSize":"30px","fontStyle":"normal","fontWeight":"400"}}} -->
            <h2 class="wp-block-heading" style="font-size:30px;font-style:normal;font-weight:400"><strong>Premium</strong></h2>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"style":{"typography":{"fontSize":"16px"}}} -->
            <p style="font-size:16px">Tailored for enterprises requiring unlimited projects, full analytics, 24/7 support, and a dedicated account manager.</p>
            <!-- /wp:paragraph -->

            <!-- wp:group {"style":{"spacing":{"blockGap":"0px"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"36px","fontStyle":"normal","fontWeight":"700"}}} -->
            <h3 class="wp-block-heading" style="font-size:36px;font-style:normal;font-weight:700">$95</h3>
            <!-- /wp:heading -->

            <!-- wp:paragraph -->
            <p><sub> /year</sub></p>
            <!-- /wp:paragraph --></div>
            <!-- /wp:group -->

            <!-- wp:buttons -->
            <div class="wp-block-buttons"><!-- wp:button {"width":100,"className":"is-style-fill","style":{"border":{"radius":"6px"},"typography":{"fontStyle":"normal","fontWeight":"500"},"spacing":{"padding":{"left":"12px","right":"12px","top":"8px","bottom":"8px"}},"color":{"background":"#fefefe","text":"#010101"},"elements":{"link":{"color":{"text":"#010101"}}}},"fontSize":"small"} -->
            <div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-fill"><a class="wp-block-button__link has-text-color has-background has-link-color has-small-font-size has-custom-font-size wp-element-button" style="border-radius:6px;color:#010101;background-color:#fefefe;padding-top:8px;padding-right:12px;padding-bottom:8px;padding-left:12px;font-style:normal;font-weight:500">Buy Plan</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons -->

            <!-- wp:list {"className":"is-style-checkmark-list","style":{"spacing":{"margin":{"right":"0px","left":"0px"},"padding":{"right":"0px","left":"15px"}},"typography":{"fontSize":"16px"}}} -->
            <ul style="margin-right:0px;margin-left:0px;padding-right:0px;padding-left:15px;font-size:16px" class="wp-block-list is-style-checkmark-list"><!-- wp:list-item -->
            <li>Unlimited projects</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Full analytics suite with custom reports</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>24/7 phone &amp; email support</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Dedicated account manager</li>
            <!-- /wp:list-item -->

            <!-- wp:list-item -->
            <li>Custom integrations &amp; onboarding</li>
            <!-- /wp:list-item --></ul>
            <!-- /wp:list --></div>
            <!-- /wp:column --></div>
            <!-- /wp:columns -->
            <!-- /wp:blablablocks/tab -->
            <!-- /wp:blablablocks/tabs --></div>
            <!-- /wp:group -->`,
};

export default Pricing;

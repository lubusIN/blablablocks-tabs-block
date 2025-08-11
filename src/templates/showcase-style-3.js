/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

/* global BlablablocksTabsData */
const baseImageUrl =
  typeof BlablablocksTabsData !== 'undefined'
    ? BlablablocksTabsData.assetsUrl
    : '';
const showcaseImagePath = `${baseImageUrl}/templates/showcase`;

const ShowcaseStyle3 = {
  name: 'showcase-style-2',
  title: __('Vertical Showcase Style 2', 'blablablocks-tabs-block'),
  content: `
          <!-- wp:group {"metadata":{"name":"Vertical Showcase Style 2"},"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"20px","right":"20px"}}},"layout":{"type":"constrained"}} -->
          <div class="wp-block-group alignwide" style="padding-top:var(--wp--preset--spacing--30);padding-right:20px;padding-bottom:var(--wp--preset--spacing--30);padding-left:20px"><!-- wp:blablablocks/tabs {"width":"25","orientation":"vertical","tabTextColor":{"active":[],"default":{"color":"#030712"},"hover":[]},"tabBackgroundColor":{"active":{"color":"#030712"},"hover":{"color":"#030712"}},"tabIconColor":{"default":[],"hover":[],"active":[]},"tabPadding":{"top":"15px","right":"15px","bottom":"15px","left":"15px"},"metadata":{},"align":"wide","className":"is-style-pointing-tabs","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|20","left":"var:preset|spacing|30"}},"typography":{"fontStyle":"normal","fontWeight":"500"}},"fontSize":"medium"} -->
          <!-- wp:blablablocks/tab {"tabname":"What Is the Block Editor?","tabId":"7a2a7931-41e2-46e8-95f6-58ea9b09e1bd","tabIcon":""} -->
          <!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|50","left":"var:preset|spacing|50"},"padding":{"top":"60px","bottom":"60px","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}},"border":{"radius":"6px"},"color":{"background":"#f2f2f2"}}} -->
          <div class="wp-block-columns alignwide has-background" style="border-radius:6px;background-color:#f2f2f2;padding-top:60px;padding-right:var(--wp--preset--spacing--40);padding-bottom:60px;padding-left:var(--wp--preset--spacing--40)"><!-- wp:column {"verticalAlignment":"center","width":"56%"} -->
          <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:56%"><!-- wp:image {"id":919,"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"7px","color":"#f2f2f2","width":"6px"},"shadow":"var:preset|shadow|sharp"}} -->
          <figure class="wp-block-image size-full has-custom-border"><img src="${showcaseImagePath}/editor.png" alt="" class="has-border-color wp-image-919" style="border-color:#f2f2f2;border-width:6px;border-radius:7px;box-shadow:var(--wp--preset--shadow--sharp)"/></figure>
          <!-- /wp:image --></div>
          <!-- /wp:column -->

          <!-- wp:column {"verticalAlignment":"center","style":{"spacing":{"blockGap":"18px"}}} -->
          <div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"500","fontSize":"45px"}}} -->
          <h2 class="wp-block-heading" style="font-size:45px;font-style:normal;font-weight:500">Editor Intro</h2>
          <!-- /wp:heading -->

          <!-- wp:paragraph {"fontSize":"medium"} -->
          <p class="has-medium-font-size">The Block Editor (Gutenberg) turns every piece of content text, images, embeds into draggable “blocks,” letting you build complex layouts visually without touching code. </p>
          <!-- /wp:paragraph -->

          <!-- wp:buttons {"style":{"spacing":{"margin":{"top":"40px"}}}} -->
          <div class="wp-block-buttons" style="margin-top:40px"><!-- wp:button {"width":100,"style":{"typography":{"fontStyle":"normal","fontWeight":"500"},"border":{"radius":"6px"},"spacing":{"padding":{"left":"17px","right":"17px","top":"12px","bottom":"12px"}}},"fontSize":"medium"} -->
          <div class="wp-block-button has-custom-width wp-block-button__width-100"><a class="wp-block-button__link has-medium-font-size has-custom-font-size wp-element-button" style="border-radius:6px;padding-top:12px;padding-right:17px;padding-bottom:12px;padding-left:17px;font-style:normal;font-weight:500">Learn More</a></div>
          <!-- /wp:button --></div>
          <!-- /wp:buttons --></div>
          <!-- /wp:column --></div>
          <!-- /wp:columns -->
          <!-- /wp:blablablocks/tab -->

            <!-- wp:blablablocks/tab {"tabname":"How Do Block Patterns Work?","tabId":"0faef3f4-f358-4ba0-9aa9-363c0d11df88","tabIcon":""} -->
            <!-- wp:columns {"align":"wide","className":"is-style-default","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|50","left":"var:preset|spacing|50"},"padding":{"top":"60px","bottom":"60px","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}},"color":{"background":"#f2f2f2"},"border":{"radius":"6px"}}} -->
            <div class="wp-block-columns alignwide is-style-default has-background" style="border-radius:6px;background-color:#f2f2f2;padding-top:60px;padding-right:var(--wp--preset--spacing--40);padding-bottom:60px;padding-left:var(--wp--preset--spacing--40)"><!-- wp:column {"verticalAlignment":"center","width":"56%"} -->
            <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:56%"><!-- wp:image {"id":920,"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"7px"},"shadow":"var:preset|shadow|sharp"}} -->
            <figure class="wp-block-image size-full has-custom-border"><img src="${showcaseImagePath}/patterns.png" alt="" class="wp-image-920" style="border-radius:7px;box-shadow:var(--wp--preset--shadow--sharp)"/></figure>
            <!-- /wp:image --></div>
            <!-- /wp:column -->

            <!-- wp:column {"verticalAlignment":"center","style":{"spacing":{"blockGap":"18px"}}} -->
            <div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"500","fontSize":"45px"}}} -->
            <h2 class="wp-block-heading" style="font-size:45px;font-style:normal;font-weight:500">What’s a pattern?</h2>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"fontSize":"medium"} -->
            <p class="has-medium-font-size">A block pattern is a collection of blocks you can insert into your site and customize with your own content. Patterns save you time when composing pages of any kind and are a great way to learn.</p>
            <!-- /wp:paragraph -->

            <!-- wp:buttons {"style":{"spacing":{"margin":{"top":"40px"}}}} -->
            <div class="wp-block-buttons" style="margin-top:40px"><!-- wp:button {"width":100,"style":{"color":{"background":"#090909"},"typography":{"fontStyle":"normal","fontWeight":"500"},"border":{"radius":"6px"},"spacing":{"padding":{"left":"17px","right":"17px","top":"12px","bottom":"12px"}}},"fontSize":"medium"} -->
            <div class="wp-block-button has-custom-width wp-block-button__width-100"><a class="wp-block-button__link has-background has-medium-font-size has-custom-font-size wp-element-button" style="border-radius:6px;background-color:#090909;padding-top:12px;padding-right:17px;padding-bottom:12px;padding-left:17px;font-style:normal;font-weight:500">Learn More</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons --></div>
            <!-- /wp:column --></div>
            <!-- /wp:columns -->
            <!-- /wp:blablablocks/tab -->

            <!-- wp:blablablocks/tab {"tabname":"Why Use the Styles Panel?","tabId":"f04db9ef-1711-4c14-8888-afed5e95beab","tabIcon":""} -->
            <!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|50","left":"var:preset|spacing|50"},"padding":{"top":"60px","bottom":"60px","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}},"color":{"background":"#f2f2f2"},"border":{"radius":"6px"}}} -->
            <div class="wp-block-columns alignwide has-background" style="border-radius:6px;background-color:#f2f2f2;padding-top:60px;padding-right:var(--wp--preset--spacing--40);padding-bottom:60px;padding-left:var(--wp--preset--spacing--40)"><!-- wp:column {"verticalAlignment":"center","width":"56%"} -->
            <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:56%"><!-- wp:image {"id":921,"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"7px"},"shadow":"var:preset|shadow|sharp"}} -->
            <figure class="wp-block-image size-full has-custom-border"><img src="${showcaseImagePath}/styles.png" alt="" class="wp-image-921" style="border-radius:7px;box-shadow:var(--wp--preset--shadow--sharp)"/></figure>
            <!-- /wp:image --></div>
            <!-- /wp:column -->

            <!-- wp:column {"verticalAlignment":"center","style":{"spacing":{"blockGap":"18px"}}} -->
            <div class="wp-block-column is-vertically-aligned-center"><!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"500","fontSize":"45px"}}} -->
            <h2 class="wp-block-heading" style="font-size:45px;font-style:normal;font-weight:500">Styles Panel</h2>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"fontSize":"medium"} -->
            <p class="has-medium-font-size">Tailor your site’s global design in one place—browse preset themes or tweak typography, colors, backgrounds, shadows, and layout—and see your changes update live in the preview.</p>
            <!-- /wp:paragraph -->

            <!-- wp:buttons {"style":{"spacing":{"margin":{"top":"40px"}}}} -->
            <div class="wp-block-buttons" style="margin-top:40px"><!-- wp:button {"width":100,"style":{"typography":{"fontStyle":"normal","fontWeight":"500"},"border":{"radius":"6px"},"spacing":{"padding":{"left":"17px","right":"17px","top":"12px","bottom":"12px"}}},"fontSize":"medium"} -->
            <div class="wp-block-button has-custom-width wp-block-button__width-100"><a class="wp-block-button__link has-medium-font-size has-custom-font-size wp-element-button" style="border-radius:6px;padding-top:12px;padding-right:17px;padding-bottom:12px;padding-left:17px;font-style:normal;font-weight:500">Learn More</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons --></div>
            <!-- /wp:column --></div>
            <!-- /wp:columns -->
            <!-- /wp:blablablocks/tab -->
            <!-- /wp:blablablocks/tabs --></div>
            <!-- /wp:group -->`,
};

export default ShowcaseStyle3;

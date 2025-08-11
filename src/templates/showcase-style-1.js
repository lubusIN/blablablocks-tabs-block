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

const ShowcaseStyle1 = {
    name: 'showcase-style-1',
    title: __('Horizontal Showcase', 'blablablocks-tabs-block'),
    content: `
            <!-- wp:group {"metadata":{"name":"Horizontal Showcase"},"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30","left":"20px","right":"20px"}}},"layout":{"type":"constrained"}} -->
            <div class="wp-block-group alignwide" style="padding-top:var(--wp--preset--spacing--30);padding-right:20px;padding-bottom:var(--wp--preset--spacing--30);padding-left:20px"><!-- wp:blablablocks/tabs {"tabTextColor":{"active":{"color":"#3858e9"},"default":{"color":"#686868","slug":"accent-4"},"hover":{"color":"#3858e9"}},"tabBackgroundColor":{"active":{"color":"#fefefe"},"hover":{"color":"#fefefe"}},"tabIconColor":{"default":{"color":"#696969f5"},"hover":{"color":"#3858e9"},"active":{"color":"#3858e9"}},"tabPadding":{"top":"4px","right":"8px","bottom":"4px","left":"8px"},"tabBorder":{"border":{"bottom":{"color":"#3858e9","width":"2px"}},"onActive":true},"metadata":{},"align":"wide","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|30","left":"var:preset|spacing|30"}},"typography":{"fontStyle":"normal","fontWeight":"500"}},"fontSize":"medium"} -->
            <!-- wp:blablablocks/tab {"tabname":"Editor","tabId":"14e39a11-815c-469b-8744-13bb2a8a56fb","tabIcon":"<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='size-6'> <path stroke-linecap='round' stroke-linejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10' /></svg>"} -->
            <!-- wp:columns {"align":"wide","className":"is-style-default","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|50","left":"var:preset|spacing|50"},"padding":{"top":"60px","bottom":"60px","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}},"color":{"background":"#f2f2f2"},"border":{"radius":"6px"}}} -->
            <div class="wp-block-columns alignwide is-style-default has-background" style="border-radius:6px;background-color:#f2f2f2;padding-top:60px;padding-right:var(--wp--preset--spacing--40);padding-bottom:60px;padding-left:var(--wp--preset--spacing--40)"><!-- wp:column {"verticalAlignment":"center","width":"56%"} -->
            <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:56%"><!-- wp:image {"id":920,"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"7px"},"shadow":"var:preset|shadow|sharp"}} -->
            <figure class="wp-block-image size-full has-custom-border"><img src="${showcaseImagePath}/editor.png" alt="" class="wp-image-920" style="border-radius:7px;box-shadow:var(--wp--preset--shadow--sharp)"/></figure>
            <!-- /wp:image --></div>
            <!-- /wp:column -->

            <!-- wp:column {"verticalAlignment":"center","className":"has-text-color has-link-color","style":{"spacing":{"blockGap":"18px"}}} -->
            <div class="wp-block-column is-vertically-aligned-center has-text-color has-link-color"><!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"500","fontSize":"45px"}}} -->
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

            <!-- wp:blablablocks/tab {"tabname":"Patterns","tabId":"5c5ca267-a5dc-4d2e-9937-ad6a5eb37395","tabIcon":"<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='size-6'>  <path stroke-linecap='round' stroke-linejoin='round' d='M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z' /></svg>"} -->
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
            <div class="wp-block-buttons" style="margin-top:40px"><!-- wp:button {"width":100,"className":"has-custom-width wp-block-button__width-50","style":{"color":{"background":"#090909"},"typography":{"fontStyle":"normal","fontWeight":"500"},"border":{"radius":"6px"},"spacing":{"padding":{"left":"17px","right":"17px","top":"12px","bottom":"12px"}}},"fontSize":"medium"} -->
            <div class="wp-block-button has-custom-width wp-block-button__width-100 wp-block-button__width-50"><a class="wp-block-button__link has-background has-medium-font-size has-custom-font-size wp-element-button" style="border-radius:6px;background-color:#090909;padding-top:12px;padding-right:17px;padding-bottom:12px;padding-left:17px;font-style:normal;font-weight:500">Learn More</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons --></div>
            <!-- /wp:column --></div>
            <!-- /wp:columns -->
            <!-- /wp:blablablocks/tab -->

            <!-- wp:blablablocks/tab {"tabname":"Styles","tabId":"a18c9e7f-a334-427b-8d31-3325b18fd59e","tabIcon":"<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='size-6'><path stroke-linecap='round' stroke-linejoin='round' d='M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z' /></svg>"} -->
            <!-- wp:columns {"align":"wide","className":"is-style-default","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|50","left":"var:preset|spacing|50"},"padding":{"top":"60px","bottom":"60px","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}},"color":{"background":"#f2f2f2"},"border":{"radius":"6px"}}} -->
            <div class="wp-block-columns alignwide is-style-default has-background" style="border-radius:6px;background-color:#f2f2f2;padding-top:60px;padding-right:var(--wp--preset--spacing--40);padding-bottom:60px;padding-left:var(--wp--preset--spacing--40)"><!-- wp:column {"verticalAlignment":"center","width":"56%"} -->
            <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:56%"><!-- wp:image {"id":920,"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"7px"},"shadow":"var:preset|shadow|sharp"}} -->
            <figure class="wp-block-image size-full has-custom-border"><img src="${showcaseImagePath}/styles.png" alt="" class="wp-image-920" style="border-radius:7px;box-shadow:var(--wp--preset--shadow--sharp)"/></figure>
            <!-- /wp:image --></div>
            <!-- /wp:column -->

            <!-- wp:column {"verticalAlignment":"center","className":"has-text-color has-link-color","style":{"spacing":{"blockGap":"18px"}}} -->
            <div class="wp-block-column is-vertically-aligned-center has-text-color has-link-color"><!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"500","fontSize":"45px"}}} -->
            <h2 class="wp-block-heading" style="font-size:45px;font-style:normal;font-weight:500">Styles Panel</h2>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"fontSize":"medium"} -->
            <p class="has-medium-font-size">Tailor your site’s global design in one place—browse preset themes or tweak typography, colors, backgrounds, shadows, and layout—and see your changes update live in the preview.</p>
            <!-- /wp:paragraph -->

            <!-- wp:buttons {"style":{"spacing":{"margin":{"top":"40px"}}}} -->
            <div class="wp-block-buttons" style="margin-top:40px"><!-- wp:button {"width":100,"className":"has-custom-width wp-block-button__width-50","style":{"color":{"background":"#090909"},"typography":{"fontStyle":"normal","fontWeight":"500"},"border":{"radius":"6px"},"spacing":{"padding":{"left":"17px","right":"17px","top":"12px","bottom":"12px"}}},"fontSize":"medium"} -->
            <div class="wp-block-button has-custom-width wp-block-button__width-100 wp-block-button__width-50"><a class="wp-block-button__link has-background has-medium-font-size has-custom-font-size wp-element-button" style="border-radius:6px;background-color:#090909;padding-top:12px;padding-right:17px;padding-bottom:12px;padding-left:17px;font-style:normal;font-weight:500">Learn More</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons --></div>
            <!-- /wp:column --></div>
            <!-- /wp:columns -->
            <!-- /wp:blablablocks/tab -->
            <!-- /wp:blablablocks/tabs --></div>
            <!-- /wp:group -->`,
};

export default ShowcaseStyle1;

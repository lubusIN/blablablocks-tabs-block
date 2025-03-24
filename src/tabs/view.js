/**
 * Wordpress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

// Constants for store name and default values
const STORE_NAME = 'blablablocks-tabs';
const DEFAULT_TAB_ID = '';

const { state } = store( STORE_NAME, {
	state: {
		/**
		 * Returns the ID of the currently active tab.
		 * Falls back to the first tab's ID if no active tab is set.
		 *
		 * @type {string}
		 */
		get activeTab() {
			const context = getContext();
			return context.activeTab || state.defaultTab || DEFAULT_TAB_ID;
		},

		/**
		 * Returns the ID of the default tab.
		 * Falls back to the first tab's ID if no tab is marked as default.
		 *
		 * @type {string}
		 */
		get defaultTab() {
			const context = getContext();
			const defaultTab = context.tabs?.find( ( tab ) => tab.isDefault );
			return defaultTab?.id || context.tabs?.[ 0 ]?.id || DEFAULT_TAB_ID;
		},

		/**
		 * Checks if the current tab (from context) is active.
		 *
		 * @type {boolean}
		 */
		get isActive() {
			const context = getContext();
			return context.tab?.id === state.activeTab;
		},
	},
	actions: {
		/**
		 * Sets the active tab to the current tab's ID.
		 *
		 * @return {void}
		 */
		setActiveTab: () => {
			const context = getContext();
			context.activeTab = context.tab?.id;
		},
	},
	callbacks: {
		/**
		 * Initializes the tabs by setting the default tab as active
		 * if no active tab is already set.
		 *
		 * @return {void}
		 */
		initTabs() {
			const context = getContext();
			const hasTabs = context.tabs?.length > 0;
			const noActiveTab = ! context.activeTab;

			if ( noActiveTab && hasTabs ) {
				context.activeTab = state.defaultTab;
			}
		},

		/**
		 * Renders the icon for the tabs.
		 *
		 * @return {void}
		 */
		renderIcon() {
			const context = getContext();
			const element = getElement();
			// Check if tabs and icon exist
			if ( context.tab && context.tab.icon ) {
				element.ref.innerHTML = context.tab.icon;
			}
		},
	},
} );

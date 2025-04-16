/**
 * Wordpress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

// Constants for store name and default values
const STORE_NAME = 'blablablocks-tabs';

const { state } = store( STORE_NAME, {
	state: {
		/**
		 * Returns the index of the currently active tab.
		 *
		 * @type {number|null}
		 */
		get activeTabIndex() {
			const { attributes } = getElement();
			const tabId = attributes?.id || null;
			if ( ! tabId ) {
				return null;
			}
			const { tabs } = getContext();
			const tabIndex = tabs.findIndex( ( t ) => t.id === tabId );
			return tabIndex;
		},

		/**
		 * Checks if the current tab (from context) is active.
		 *
		 * @type {boolean}
		 */
		get isActive() {
			const { activeTab } = getContext();
			const tabIndex = state.activeTabIndex;
			return activeTab === tabIndex;
		},

		/**
		 * The value of the tabindex attribute.
		 *
		 * @type {false|string}
		 */
		get tabIndex() {
			return state.isActive ? -1 : 0;
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
			const tabIndex = state.activeTabIndex;
			if ( tabIndex !== null ) {
				context.activeTab = state.activeTabIndex;
			}
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
			const tabIndex = context.tabs.findIndex(
				( t ) => t.id === context.activeId
			);
			if ( tabIndex >= 0 ) {
				context.activeTab = tabIndex;
			}
		},
	},
} );

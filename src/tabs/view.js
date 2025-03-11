/**
 * Wordpress dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

// Constants for store name and default values
const STORE_NAME = 'blablablocks-tabs';
const DEFAULT_TAB_ID = '';

const { state, actions } = store(STORE_NAME, {
    state: {
        /**
         * Returns the ID of the currently active tab.
         * Falls back to the first tab's ID if no active tab is set.
         * 
         * @type {string}
         */
        get activeTab() {
            const context = getContext();
            return context.activeTab || context.tabs?.[0]?.id || DEFAULT_TAB_ID;
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
         * @returns {void}
         */
        setActiveTab: () => {
            const context = getContext();
            context.activeTab = context.tab?.id;
        }
    },
    callbacks: {
        /**
         * Initializes the tabs by setting the first tab as active
         * if no active tab is already set.
         * 
         * @returns {void}
         */
        initTabs() {
            const context = getContext();
            const hasTabs = context.tabs?.length > 0;
            const noActiveTab = !context.activeTab;

            if (noActiveTab && hasTabs) {
                context.activeTab = context.tabs[0].id;
            }
        },
    }
});
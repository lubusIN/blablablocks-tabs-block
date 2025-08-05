/**
 * Wordpress dependencies
 */
import { store, getContext, getElement, withSyncEvent } from '@wordpress/interactivity';

// Constants for store name and default values
const STORE_NAME = 'blablablocks-tabs';

/**
 * Helper function to apply CSS string to an element
 * 
 * @param {HTMLElement} element - The element to apply styles to
 * @param {string} cssString - CSS string like "border: 1px solid red; border-radius: 4px;"
 */
const applyCSSString = (element, cssString) => {
	if (!element || !cssString) return;

	// Store existing non-border styles
	const existingStyles = element.style.cssText;

	// Apply the CSS string
	element.style.cssText = existingStyles + cssString;
};

/**
 * Helper function to remove specific styles using the same CSS string
 * 
 * @param {HTMLElement} element - The element to remove styles from
 * @param {string} cssString - CSS string to parse and remove properties from
 */
const removeCSSString = (element, cssString) => {
	if (!element || !cssString) return;

	// Parse the CSS string to get property names and reset them
	cssString.split(';').forEach(rule => {
		const [property] = rule.split(':').map(s => s.trim());
		if (property) {
			// Convert kebab-case to camelCase for JS
			const camelProperty = property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
			element.style[camelProperty] = '';
		}
	});
};

const { state } = store(STORE_NAME, {
	state: {
		/**
		 * Returns the index of the active tab.
		 *
		 * @type {number|null}
		 */
		get activeTabIndex() {
			const { attributes } = getElement();
			const tabId = attributes?.id || null;
			if (!tabId) {
				return null;
			}
			const { tabs } = getContext();
			const tabIndex = tabs.findIndex((t) => t.id === tabId);
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
		 * Handle keyboard navigation on a tab.
		 *
		 * @param {KeyboardEvent} event
		 */
		handleOnKeyDown: withSyncEvent((event) => {
			const context = getContext();
			const tabIndex = state.activeTabIndex;
			if (tabIndex === null) {
				return;
			}

			const { tabs } = context;
			let newIndex = tabIndex;

			switch (event.key) {
				case 'Enter':
				case ' ':
					context.activeTab = tabIndex;
					break;

				case 'ArrowRight':
					newIndex = (tabIndex + 1) % tabs.length;
					context.activeTab = newIndex;
					break;

				case 'ArrowLeft':
					newIndex = (tabIndex - 1 + tabs.length) % tabs.length;
					context.activeTab = newIndex;
					break;

				default:
					return;
			}

			// After updating activeTab, move keyboard focus to the new button.
			requestAnimationFrame(() => {
				const newBtn = document.getElementById(tabs[newIndex].id);
				newBtn?.focus();
			});
		}),

		/**
		 * Sets the active tab to the current tab's ID.
		 *
		 * @return {void}
		 */
		setActiveTab: () => {
			const context = getContext();
			const tabIndex = state.activeTabIndex;
			if (tabIndex !== null) {
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
				(t) => t.id === context.activeId
			);
			if (tabIndex >= 0) {
				context.activeTab = tabIndex;
			}
		},

		/**
		 * Updates tab border styles based on active state and borderOnActive setting
		 * This callback runs whenever the activeTab changes
		 *
		 * @return {void}
		 */
		updateTabBorders() {
			const context = getContext();
			const { tabs, activeTab, tabButtonBorderStyles, borderOnActive } = context;

			// If borderOnActive is disabled, borders are already applied via inline styles
			// So we don't need to do anything - just return early
			if (!borderOnActive) {
				return;
			}

			// Only apply dynamic borders if borderOnActive is enabled and we have styles
			if (!tabButtonBorderStyles) {
				return;
			}

			// Apply styles to all tabs
			tabs.forEach((tab, index) => {
				const tabElement = document.getElementById(tab.id);
				if (!tabElement) return;

				if (index === activeTab) {
					// Apply border styles to active tab
					applyCSSString(tabElement, tabButtonBorderStyles);
				} else {
					// Remove border styles from inactive tabs
					removeCSSString(tabElement, tabButtonBorderStyles);
				}
			});
		},
	},
});

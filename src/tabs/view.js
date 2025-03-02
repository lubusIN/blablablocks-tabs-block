// interactivity.js (Store)
import { store, getContext } from '@wordpress/interactivity';

const { state, actions } = store('blablablocks-tabs', {
    state: {
        get activeTab() {
            const ctx = getContext();
            return ctx.activeTab || (ctx.tabs?.[0]?.id || '');
        },
        get isActive() {
            const ctx = getContext();
            console.log(ctx.tab);
            return ctx.tab?.id === state.activeTab;
        }
    },
    actions: {
        setActiveTab: () => {
            const ctx = getContext();
            ctx.activeTab = ctx.tab?.id;
        }
    },
    callbacks: {
        initTabs: () => {
            const ctx = getContext();
            console.log(ctx);
            console.log(ctx.tabs);
            if (!ctx.activeTab && ctx.tabs?.length > 0) {
                ctx.activeTab = ctx.tabs[0].id;
            }
        }
    }
});
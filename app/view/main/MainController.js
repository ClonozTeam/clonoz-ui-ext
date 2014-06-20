Ext.define('Clonos.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    routes: {
      ':tab': {
            action: 'onNavigate',
            before: 'beforeNavigate'
        },

        ':tab/:subTab': {
            action: 'onNavigate',
            before: 'beforeNavigate'
        }
    },

    /**
     * Check if tab exists before navigate there.
     *
     * @param  {String} tab    XType of the tab.
     * @param  {String} subTab XType of subtype, this parameter is optional.
     * @param  {Object} action Object to controll routing.
     */
 	beforeNavigate: function (tab, subTab, action) {
		// Process option subTab paramerer.
 		if (!Ext.isDefined(action)) {
 			action = subTab;
 			subTab = false;
 		}

 		var mainTab = this.getView().down(tab);
        if (mainTab && (!subTab || mainTab.down('tabpanel').down(subTab))) {
            action.resume();
        } else {
            this.fireEvent('badRoute');
        }
    },

    /**
     * Procees with navigation by activating correct tab.
     *
     * @param  {String} tab    XType of the tab.
     * @param  {String} subTab XType of subtype, this parameter is optional.
     */
    onNavigate: function (tab, subTab) {
        var mainTab = this.getView().setActiveTab(tab) ;
        if (mainTab && subTab) {
        	mainTab.down('tabpanel').setActiveTab(subTab);
        }
    },

    /**
     * Get route for tab based on current state
     *
     * @param  {Ext.tab.Tab} tab Tab to get the route for.
     *
     * @return {String} Route to route.
     */
    getTabRoute: function (tab) {
        var route  = tab.xtype;
        var subTab = tab.down('tabpanel');

        if (subTab) {
            route += '/' + subtab.getActiveTab().xtype;
        }

        return route;
    },

    /**
     * Redirect on tab click.
     *
     * @param  {Ext.tab.Panel} mainView View where the tab was changed.
     * @param  {Ext.tab.Tab}   newTab   New tab selected.
     */
    onTabChange: function (mainView, newTab) {
        this.redirectTo(this.getTabRoute(newTab));
    },

    /**
     * Destroy menu on destroy.
     */
    destroy: function () {
        Ext.destroyMembers(this, 'menu');
        this.callParent();
    },

    /**
     * Simulate tab selection by clicking on menu items (menu for small screens (i.e. mobile devices).
     *
     * @param  {Ext.menu.Menu} menu Menu.
     * @param  {Ext.menu.Item} item Menu item.
     */
    onMenuClick: function (menu, item) {
        this.getView().setActiveTab(menu.items.indexOf(item) + 1); // +1 for invisible first tab
    },

    /**
     * Handle click on tool button to show a menu designed for small screens (i.e. mobile devices).
     *
     * @param  {[Ext.event.Event} e [description]
     */
    onSwitchTool: function (e) {
        var menu = this.menu;

        if (!menu) {
            this.menu = menu = new Ext.menu.Menu(this.getView().assistiveMenu);
        }

        menu.showAt(e.getXY());
    }
});

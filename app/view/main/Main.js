Ext.define('Clonos.view.main.Main', {
    extend: 'Ext.tab.Panel',
    controller: 'main',
    viewModel: 'main',
    alias: 'view.main',

	ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        iconCls: 'clonos-header-icon',
        title: {
            text: 'Clonos',
            textAlign: 'center',
            flex: 0,
            minWidth: 160
        },
        tools: [{
            type: 'gear',
            cls: 'clonos-menu-navigation',
            plugins: 'responsive',
            width: 120,
            margin: '0 0 0 0',
            handler: 'onSwitchTool',
            responsiveConfig: {
                'width < 768 && tall': {
                    visible: true
                },
                'width >= 768': {
                    visible: false
                }
            }
        }]
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    listeners: {
        tabchange: 'onTabChange',
        scope: 'controller'
    },

    defaults: {
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left',
                    flex: 0
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    flex: 1
                },
                'width < 768 && tall': {
                    visible: false
                },
                'width >= 768': {
                    visible: true
                }
            }
        }
    },

    items: [{
        // This page has a hidden tab so we can only get here during initialization. This
        // allows us to avoid rendering an initial activeTab only to change it immediately
        // by routing
        xtype: 'component',
        tabConfig: {
            hidden: true
        }
    },{
        xtype: 'databases',
        title: 'Databases',
        iconCls: 'clonos-databases-icon'
    },{
        xtype: 'sources',
        title: 'Sources',
        iconCls: 'clonos-sources-icon'
    },{
        xtype: 'mocking',
        title: 'Mocking',
        iconCls: 'clonos-mocking-icon'
    },{
        xtype: 'users',
        title: 'Users',
        iconCls: 'clonos-users-icon'
    },{
        xtype: 'settings',
        title: 'Settings',
        iconCls: 'clonos-settings-icon'
    }],

    // This object is a config for the popup menu we present on very small form factors.
    // It is used by our controller (MainController).
    assistiveMenu: {
        baseCls: 'clonos-menu-navigation',
        items: [{
            text: 'Databases',
            height: 50,
            iconCls: 'clonos-databases-icon'
        },{
            text: 'Sources',
            height: 50,
            iconCls: 'clonos-sources-icon'
        },{
            text: 'Mocking',
            height: 50,
            iconCls: 'clonos-mocking-icon'
        },{
            text: 'Users',
            height: 50,
            iconCls: 'clonos-users-icon'
        },{
            text: 'Settings',
            height: 50,
            iconCls: 'clonos-settings-icon'
        }],
        listeners: {
            click: 'onMenuClick'
        }
    }
});

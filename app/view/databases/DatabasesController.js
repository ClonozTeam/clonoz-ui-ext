Ext.define('Clonos.view.databases.DatabasesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.databases',
    requires: ['Clonos.window.Schedule'],

    storeUpdateSuccess: function(store, response, request) {
        Ext.showNotification('success', response.getResultSet().message);
    },

    deleteDatabase: function(view, row, col, item, e, record) {
        if (record) {
            Ext.Msg.show({
                title:'Delete database?',
                message: 'Are you sure you want to delete database <b>' + record.get('name') + ' </b>?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'yes') {
                        view.getStore().remove(record);
                    }
                }
            });
        }
    },

    refreshDatabase: function(view, row, col, item, e, record) {
        if (record) {
            Ext.Msg.show({
                title:'Refresh database?',
                message: 'Are you sure you want to refresh database <b>' + record.get('name') + '</b> ?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'yes') {
                        view.getStore().remove(record);
                    }
                }
            });
        }
    },

    scheduleRefresh: function(view, row, col, item, e, record) {
        Ext.widget('scheduleWindow').show();
    }
});

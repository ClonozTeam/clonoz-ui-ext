Ext.define('Clonos.store.Database', {
    extend: 'Ext.data.Store',
    alias: 'store.database',
    storeId: 'database',

    model: 'Clonos.model.Database',
    autoSync: true,

    listeners: {
        write: 'storeUpdateSuccess'
    },

    proxy: {
        type: 'ajax',
        url: '/databases',
        batchActions: false,
        api: {
            update: '/database/update',
            destroy: '/database/delete',
            create: '/database/create'
        },
        limitParam: undefined,
        pageParam: undefined,
        startParam: undefined,
        noCache: true,
        listeners: {
            exception: function(proxy, request, response) {
                Ext.showNotification('error', Ext.isString(response.error) ? response.error : response.error.statusText);
                Ext.getStore('database').rejectChanges();
            }
        },
        reader: {
            type: 'json',
            autoSave: true,
            successProperty: 'success',
            rootProperty: 'data',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: false,
            rootProperty: 'data'
        }
    }
});

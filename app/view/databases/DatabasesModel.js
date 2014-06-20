Ext.define('Clonos.view.databases.DatabasesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.databases',

    stores: {
        statistics: {
            model: 'Statistic',
			autoLoad: true
        },
        databases: {
            type: 'database',
			autoLoad: true
        }
    }
});

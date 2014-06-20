Ext.define('Clonos.model.Statistic', {
    extend: 'Clonos.model.Base',

    fields: [
    	'statistic',
    	'description'
    ],

    proxy: {
        type: 'ajax',
        url: '/statistics',
        reader: {
            type: 'json',
            rootProperty: 'data',
			messageProperty: 'message'
        }
    }
});

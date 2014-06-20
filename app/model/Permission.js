Ext.define('Clonos.model.Permission', {
    extend: 'Clonos.model.Base',

    fields: [
    	{ name: 'userId', reference: 'User' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'access', type: 'string' }
    ]
});

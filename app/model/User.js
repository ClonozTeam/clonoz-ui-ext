Ext.define('Clonos.model.User', {
    extend: 'Clonos.model.Base',

    fields: [
        { name: 'login', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'lastLogin', type: 'date' },
        { name: 'lastIp', type: 'string' }
    ]
});

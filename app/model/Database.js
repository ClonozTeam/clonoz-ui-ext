Ext.define('Clonos.model.Database', {
    extend: 'Clonos.model.Base',
    idProperty: 'name',
    autoSync: true,
    fields: [
        { name: 'type', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'source', type: 'string' },
        { name: 'refreshing',  type: 'integer' },
        { name: 'refreshtime',  type: 'string' },
        { name: 'note', type: 'string' },
        { name: 'size', type: 'string' },
        { name: 'private', type: 'bool' },
        { name: 'refreshed', type: 'string' }
    ]
});

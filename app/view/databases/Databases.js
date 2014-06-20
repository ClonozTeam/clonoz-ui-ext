
Ext.define('Clonos.view.databases.Databases',{
    extend: 'Ext.panel.Panel',
    requires: ['Clonos.view.databases.DatabasesModel'],
    controller: 'databases',
    viewModel: {
    	type: 'databases'
    },
    alias: 'widget.databases',
	itemId: 'databases',
    cls: 'databases-main',
    layout: 'border',
    minWidth: 600,
    autoScroll: false,


 	items: [{
        xtype: 'component',
        cls: 'databases-tiles',
        height: 96,
        region: 'north',

        tpl: [
            '<div class="databases-meta">',
               '<tpl for=".">',
                    '<span>',
                        '<div>{data.statistic}</div> {data.description}',
                    '</span>',
               '</tpl>',
            '</div>'
        ],

        bind: {
        	data: {
	            bindTo: '{statistics}',
	            deep: true
	        }
        }
    },{
        xtype: 'grid',
        region: 'center',

        itemId: 'databasesGrid',
        bind: '{databases}',
        cls: 'dynamic-databases-grid',
        height: 'auto',
        margin: 15,
        selType: 'rowmodel',
        autoScroll: true,
        noCache: true,
        viewConfig: {
            stripeRows: true
        },
        plugins: [
            Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 1,
                clicksToMoveEditor: 2
            })
        ],
        columns: [
            {
                header: 'Type',
                xtype: 'actioncolumn',
                align: 'center',
                width: 60,
                getClass: function(v, meta, rec) {
                    return 'logo-icon ' + rec.get('type') + '-logo';
                },
                getTip: function(v, meta, rec) {
                    return Ext.String.capitalize(rec.get('type'));
                }
            },
            { header: 'Datbase', flex: 1, dataIndex: 'name', editor: 'textfield' },
            { header: 'Source', flex: 1, dataIndex: 'source' },
            {
                header: 'Private',
                width: 70,
                align: 'center',
                dataIndex: 'private',
                xtype: 'actioncolumn',
                items: [{
                    getClass: function(v, meta, rec) {
                        return v ? 'ui-silk ui-silk-tick' : 'ui-silk ui-silk-cross';
                    },
                    getTip: function(v, meta, rec) {
                        return v ? 'Private database' : 'Shared database';
                    }
                }]
            },
            { header: 'User note', flex: 1, dataIndex: 'note', editor: 'textfield' },
            { header: 'Size', width: 60, dataIndex: 'size' },
            { header: 'Last refresh', width: 120, align: 'center', dataIndex: 'refreshed', xtype: 'datecolumn', format:'d/m/Y H:i'},
            {
                menuDisabled: true,
                sortable: false,
                align: 'center',
                xtype: 'actioncolumn',
                width: 60,
                items: [{
                    getClass: function(v, meta, rec) {
                        return (rec.get('refreshing') == 0) ? 'ui-silk ui-silk-action ui-silk-clock-stop' : 'ui-silk ui-silk-action ui-silk-clock-red';
                    },
                    getTip: function(v, meta, rec) {
                        return (rec.get('refreshing') == 0)  ? 'Scheduled refresh off' : 'Refreshing every ' + rec.get('refreshing') + ' hours.<br />Nech refresh scheduled to: ' + rec.get('refreshtime');
                    },
                    handler: 'scheduleRefresh'
                }, {
                    iconCls: 'ui-silk ui-silk-action ui-silk-arrow-refresh',
                    tooltip: 'Refresh database',
                    handler: 'refreshDatabase'
                },{
                    iconCls: 'ui-silk ui-silk-action ui-silk-delete',
                    tooltip: 'Delete database',
                    handler: 'deleteDatabase'
                }]
            }
        ]
    }]

});

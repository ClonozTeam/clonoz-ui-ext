Ext.define('Clonos.window.Schedule', {
    extend: 'Ext.window.Window',
    alias: 'widget.scheduleWindow',
    title: 'Schedule refresh',
    modal: true,
    draggable: false,
    shadow: false,

    items: [{
        xtype: 'form',
        frame: true,
        width: 320,
        bodyPadding: 10,
        reference: 'scheduleForm',
        url: '/scheduleRefresh',

        items: [{
            xtype: 'timefield',
            name: 'refreshtime',
            allowBlank: true,
            format: 'H:i',
            fieldLabel: 'First refresh',
            enableKeyEvents: true,
            minValue: new Date()
        }, {
            xtype: 'numberfield',
            minValue: 0,
            name: 'refresh',
            allowBlank: false,
            value: 24,
            fieldLabel: 'Refresh period in hours',
            enableKeyEvents: true
        }],

        buttons: [{
            text: 'Schedule'
        },{
            text: 'Cancel'
        }]
    }]
});
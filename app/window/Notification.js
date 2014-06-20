Ext.define('Clonos.window.Notification', {
    extend: 'Ext.window.Toast',
    alias: 'widget.notification',

    statics: {
    	showNotification: function(type, message) {
    		var notification = new Clonos.window.Notification({
    			bodyCls: 'clonos-alert-box clonos-' + type,
    			html: Ext.String.format.apply(this, ['<b>' + type.toUpperCase() + ':</b> ' + message].concat(Array.prototype.slice.call(arguments, 2)))
    		});

    		return notification.show();
    	}
    },

    align: 't',
    header: false,
    minHeight: 25,
    minWidth: 500,
    closable: false,
    slideInDuration: 300
});

Ext.showNotification = Clonos.window.Notification.showNotification;
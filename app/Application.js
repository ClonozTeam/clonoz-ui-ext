/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Clonos.Application', {
    extend: 'Ext.app.Application',
    defaultToken: 'databases',
    name: 'Clonos',
    requires: [
        'Clonos.SimData',
        'Ext.util.LocalStorage',
        'Ext.state.Manager',
        'Clonos.window.Notification',
        'Ext.util.History',
        'Ext.state.LocalStorageProvider'
    ],

    models: [
        'User',
        'Permission',
        'Statistic',
        'Database'
    ],

    views: [
    ],

    controllers: [
        'Root'
    ],

    stores: [
        'Database'
    ],

    launch: function () {
        Clonos.SimData.init();
        Ext.state.Manager.setProvider((Ext.util.LocalStorage.supported) ? Ext.create('Ext.state.LocalStorageProvider') : Ext.create('Ext.state.CookieProvider'));
    }
});
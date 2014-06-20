Ext.define('Clonos.view.login.Login', {
    extend: 'Ext.window.Window',
    requires: ['Clonos.view.login.LoginController'],
    controller: 'login',
    alias: 'widget.login',
    closable: false,
    title: _('Login') + ' - Clonos',
    modal: true,
    y: '20%',
    draggable: false,
    shadow: false,

    items: [{
        xtype: 'form',
        frame: true,
        width: 320,
        bodyPadding: 10,
        reference: "loginForm",
        url: '/login',
        defaultType: 'textfield',


        items: [{
            name: 'login',
            allowBlank: false,
            fieldLabel: _("Username"),
            emptyText: _('username'),
            enableKeyEvents: true,
            listeners: {
                specialKey: "onSpecialKey"
            }
        }, {
            name: 'password',
            allowBlank: false,
            fieldLabel: _('Password'),
            emptyText: _('password'),
            inputType: 'password',
            enableKeyEvents: true,
            listeners: {
                specialKey: "onSpecialKey"
            }
        }],

        buttons: [{
            text: _("Login"),
            listeners: {
                click: "doLogin"
            }
        }]
    }]
});
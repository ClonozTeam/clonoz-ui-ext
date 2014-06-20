Ext.define('Clonos.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    /**
     * On Special key.
     *
     * @param  {Ext.form.field.Field} field Field which fire event.
     * @param  {[type]}               e     Fired event.
     *
     * @return {Void}
     */
    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin()
        }
    },

    /**
     * Do login operation.
     *
     * @return {Void}
     */
    doLogin: function() {
        var form = this.lookupReference('loginForm');

        if (form.isValid()) {
            form.submit({
                url: '/login',
                success: this.onSuccess.bind(this),
                failure: this.onFailure.bind(this),
                scope: this
            });
        }
    },

    /**
     * Run on succesfull login.
     *
     * @param  {Ext.form.Basic}         form   Form which requested call.
     * @param  {Ext.form.action.Action} action Form action with result property as a result.
     *
     * @return {Void}
     */
    onSuccess: function(form, action) {
        if (action.result && action.result.success) {
            Ext.state.Manager.set('user',  action.result.data);
            Ext.showNotification('success', 'User "' + action.result.data.name + '" has been succesfuly logged in.');
            this.getView().destroy();

            this.redirectTo(form.owner.route);
        } else {
            this.onFailure(form, action);
        }
    },

    /**
     * Run on failure authenticate
     *
     * @param  {Ext.form.Basic}         form   Form which requested call.
     * @param  {Ext.form.action.Action} action Form action with result property as a result.
     *
     * @return {Void}
     */
    onFailure: function(form, action) {
        Ext.showNotification('error', action.result ? action.result.message : 'Server does not response.');
    }

});

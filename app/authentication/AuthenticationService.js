Ext.define("Clonos.authentication.AuthenticationService", {

    /**
     * Authenticate user.
     *
     * @param {Object} parameters Parameters object.
     */
    authenticate: function(login, password, callback) {
        this.getStore.User.load({
            params: {
                login: login,
                password: password
            },
            callback: callback,
            synchronous: true,
            scope: this
        });
    }
});
/**
 * The main application controller. This is a good place to handle things like routes.
 */
Ext.define('Clonos.controller.Root', {
    extend: 'Ext.app.Controller',

    routes: {
        '!:path': {
            before: 'beforeNavigate'
        }
    },

    listen: {
        controller: {
            '*': {
                unmatchedroute: 'onUnmatchedRoute',
                badRoute: 'onBadRoute'
            }
        }
    },

    beforeNavigate: function(path, action) {
    	if (Ext.isEmpty(Ext.state.Manager.get('user'))) {
            Ext.widget('login', {
                listener: {
                    destroy: this.redirectTo.bind(this, path)
            }}).show();
    		action.stop();
    	}
    },

    onUnmatchedRoute: function(token) {
        if (token) {
            this.onBadRoute();
        }
    },

    onBadRoute: function () {
        var app = Clonos.app.getApplication();
        this.redirectTo(app.getDefaultToken());
    }
});

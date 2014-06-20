Ext.define("Clonos.SimData", {
    singleton: true,
    requires: ['Ext.ux.ajax.SimManager', 'Ext.ux.ajax.JsonSimlet'],
    databases: [
        { type: 'mysql',    name: 'blog_test',    source: 'blogger', 'private': true,  refreshtime: '15:00', refreshing: 0,  note: 'Testing until Friday', size: '2.5G', refreshed: '2014-05-12 05:25' },
        { type: 'mysql',    name: 'blog_uat',     source: 'blogger', 'private': false, refreshtime: '18:30', refreshing: 1,  note: 'This item will fail to update', size: '2.5G',  refreshed: '2014-05-12 05:25' },
        { type: 'mongo',    name: 'portal_dev',   source: 'portal',  'private': true,  refreshtime: '22:00', refreshing: 5,  note: 'Update of this item will sent HTTP error code 500', size: '23.5G', refreshed: '2014-03-24 05:25' },
        { type: 'mysql',    name: 'eshop_test',   source: 'eshop',   'private': true,  refreshtime: '22:00', refreshing: 0,  note: '', size: '1.6G',  refreshed: '2014-06-16 12:43' },
        { type: 'postgres', name: 'storage_demo', source: 'storage', 'private': false, refreshtime: '22:00', refreshing: 12, note: '', size: '500M',  refreshed: '2014-05-12 05:25' },
        { type: 'mysql',    name: 'eshop_dev',    source: 'eshop',   'private': true,  refreshtime: '21:30', refreshing: 0,  note: '', size: '1.5G',  refreshed: '2014-06-06 15:34' },
        { type: 'mysql',    name: 'eshop_demo',   source: 'eshop',   'private': true,  refreshtime: '22:50', refreshing: 12, note: '', size: '1.2G',  refreshed: '2014-05-12 05:25' },
        { type: 'postgres', name: 'storage_test', source: 'storage', 'private': true,  refreshtime: '23:00', refreshing: 6,  note: '', size: '620M',  refreshed: '2014-02-26 18:35' },
        { type: 'mysql',    name: 'real_test',    source: 'reality', 'private': false, refreshtime: '10:20', refreshing: 4,  note: '', size: '250M',  refreshed: '2014-07-02 16:58' },
        { type: 'mongo',    name: 'portal_test',  source: 'portal',  'private': true,  refreshtime: '07:00', refreshing: 8,  note: 'Do not refresh', size: '2.5G', refreshed: '2014-05-12 12:55' },
        { type: 'mysql',    name: 'reald_dev',    source: 'reality', 'private': true,  refreshtime: '08:00', refreshing: 3,  note: '', size: '335M', refreshed: '2014-12-12 05:25' }
    ],
    users: [
        { login: 'milan', name: 'Milan Ilavsky', email: 'ilavsky.milan@gmail.com', password: 'test' },
        { login: 'jerry', name: 'Jaroslav Cvrcek', email: 'jaroslav.cvrce@gmail.com', password: 'test1' },
        { login: 'peter', name: 'Peter Vesely', email: 'peter.vesely@gmail.com', password: 'test2' }
    ],
    init: function() {
    	Ext.ux.ajax.JsonSimlet.override({
    		doPost: function(ctx) {
    			return this.doGet(ctx);
    		}
    	});

    	Ext.ux.ajax.SimManager.init({
            delay: 300
        }).register({
    		'/login': {
    			type: 'json',
    			data: function(ctx) {
    				var params = Ext.Object.fromQueryString(ctx.xhr.body);
                    var user = Ext.Array.findBy(Clonos.SimData.users, function(item) {
                        return (params.login == item['login'] && params.password == item['password']);
                    })
    				if (user) {
    					return {success: true, data: user};
    				} else {
                        return {success: false, message: 'Invalid login or password', data: {}};
                    }
    			}
    		},
            '/statistics': {
                type: 'json',
                data: function(ctx) {
                    console.log(ctx);
                    return {
                        success: true,
                        data: [{
                            description: 'Campaigns',
                            statistic: 10
                        },{
                            description: 'Opportunities',
                            statistic: '20,560'
                        },{
                            description: 'Closed Won',
                            statistic: '10,000'
                        },{
                            description: 'Total Sales',
                            statistic: '$90,200'
                        },{
                            description: 'Goals Met',
                            statistic: '71%'
                        }]
                    }
                }
            },
            '/databases': {
                type: 'json',
                data: function(ctx) {
                    console.log(ctx);
                    return { success: true, total: Clonos.SimData.databases.length, data: Clonos.SimData.databases };
                }
            },
            '/database/update': {
                type: 'json',
                data: function(ctx) {
                    console.log(ctx);
                    var params = Ext.decode(ctx.xhr.body);
                    var database = Ext.Array.findBy(Clonos.SimData.databases, function(item) {
                        return (params.data.name == item.name);
                    });
                    if (database.note == 'This item will fail to update') {
                        return { success: false, message: 'Update of database "' + params.data.name + '" failed!<br /><code>Some output from linux command</code>' };
                    } else if (database.note == 'Update of this item will sent HTTP error code 500') {
                        this.status = 500;
                        this.statusText = 'HTTP Error 500 Internal server error';
                        return {};
                    } else {
                        return { success: true, message: 'Database "' + params.data.name + '" has been updated!', data: [params]};
                    }
                }
            },
            '/database/delete': {
                type: 'json',
                data: function(ctx) {
                    console.log(ctx);
                    var params = Ext.decode(ctx.xhr.body);
                    if (database.note == 'This item will fail to update') {
                        return { success: false, message: 'Deletion of database "' + params.data.name + '" failed!', data: [] };
                    } else if (database.note == 'Update of this item will sent HTTP error code 500') {
                        this.status = 500;
                        this.statusText = 'HTTP Error 500 Internal server error';
                        return {};
                    } else {
                    return { success: true, message: 'Database "' + params.data.name + '" has been deleted!', data: [] };
                    }
                }
            },
            '/database/refresh': {
                type: 'json',
                data: function(ctx) {
                    console.log(ctx);
                    var params = Ext.decode(ctx.xhr.body);
                    return { success: true, message: 'Database "' + params.data.name + '" has been refreshed!' };
                }
            }
    	});
    }
});
Ext.define('Clonos.dic.DependencyInjection', {
	/**
	 * Cache object;
	 * @type {Object}
	 */
	cache: {},

	/**
	 * Get service.
	 * @param  {(String|Object)} service Service class or name.
	 *
	 * @return {Object}
	 */
	getService: function(service) {
		// If service is class/object get name from it.
		var name = Ext.isString(service) ? service : Ext.getClassName(service);

		// If service is not cached, load it.
		if (!this.cache[name]) {
			// Remove first parameters from call.
			var args = Array.prototype.slice.call(arguments, 1);

			// Create object with arguments array parameters.
			this.cache[name] = Ext.create(name, args);
		}

		// Return service.
		return this.cache[name];
	}

});
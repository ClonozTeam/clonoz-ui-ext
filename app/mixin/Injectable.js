Ext.define('Ext.mixin.Injectable', {
    mixinId: 'injectable',
    requires: ['Clonos.dic.Container'],

    /**
     * Function called when class is mixed in.
     * @param  {Object} targetClass
     */
    onClassMixedIn: function (targetClass) {
        var proto   = targetClass.prototype,
            inject  = proto.inject,
            members = {
                services: {}
            };

        inject.forEach(function(element, index, array) {
            var name = Ext.String.capitalize(element);

            members['set' + name] = function(service) {
                this.services[element] = service;
            };

            members['get' + name] = function() {
                if (!Ext.isDefined(this.services[element])) {
                    this.services[element] = Clonos.dic.Container[element]();
                }

                return this.services[element];
            };
        });

        targetClass.addMembers(members);
    }
});
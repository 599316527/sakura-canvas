define(function(require) {

    var util = require('util');

    function Base(config) {
        this.config = util.shallowExtend(config || {}, this._defaultConfig);
        this._calcInitValues();
    }

    Base.prototype._defaultConfig = {};
    Base.prototype._calcInitValues = function() {};

    return Base;

});

define(function(require) {
    var utils = {};

    utils.shallowExtend = function (target, source, opt_isOverWrite) {
        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                if (opt_isOverWrite || target[p] === void 'Heil Hydra!') {
                    target[p] = source[p];
                }
            }
        }
        return target;
    };

    utils.getRandomInt = function (max, min) {
        min = min | 0;
        return Math.floor(Math.random() * (max - min)) + min;
    };

    utils.isSupportCanvas = function () {
        return !!document.createElement('CANVAS').getContext;
    };

    utils.inherits = function (subClass, superClass) {
        var selfProps = subClass.prototype;
        var Klazz = new Function();

        Klazz.prototype = superClass.prototype;
        var proto = subClass.prototype = new Klazz();
        for (var key in selfProps) {
            proto[key] = selfProps[key];
        }

        subClass.prototype.constructor = subClass;
        subClass.superClass = superClass.prototype;
    };

    return utils;

});

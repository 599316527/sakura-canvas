/**
 * Based on http://www.jshoppers.com/common/js/bgCanvas.js
 */

define(function(require) {

    var util = require('util');
    var Base = require('base');

    function SakuraCanvas(config) {
        if (!util.isSupportCanvas()) {
            throw new Error('The browser doesn\'t support <canvas>.');
        }
        Base.call(this, config);
    }
    util.inherits(SakuraCanvas, Base);

    SakuraCanvas.prototype._defaultConfig = {
        canvasClassName: 'ec-sakura-canvas',
        canvasWidth: 800,
        canvasHeight: 600,
        framerate: 20,
        maxChips: 24,
        shadowColor: '#DE8397',
        shadowBlur: 2
    };

    SakuraCanvas.prototype._calcInitValues = function() {
        this.config.createLimit = this.config.framespan / 2;
        this.config.framespan = 1000 / this.config.framerate;
        this.canvas;
        this.context;
        this.chips = [];
        this.chipsLen = 0;
    };

    SakuraCanvas.prototype.init = function() {
        this._createCanvas();
        this._createChips();
    };

    SakuraCanvas.prototype._createCanvas = function() {
        var canvas = document.createElement('CANVAS');
        canvas.className = this.config.canvasClassName;
        canvas.width = this.config.canvasWidth;
        canvas.height = this.config.canvasHeight;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    };

    SakuraCanvas.prototype._createChips = function() {
        var cfg = this.config;
        var chips = [];
        var chipsLen = 0;
        var startTime = new Date();
        var now, i;
        var Chip = require('chip');

        for (i = 0; i < cfg.maxChips; ++i) {
            chips.push(new Chip(cfg));
            ++chipsLen;

            now = new Date();
            if (now.getTime() - startTime.getTime() > cfg.createLimit) {
                break;
            }
        }

        this.chips = chips;
        this.chipsLen = chipsLen;
    };

    SakuraCanvas.prototype._loop = function() {
        var cfg = this.config;
        var now = new Date();
        var context = this.context;
        var chip, alpha, patel, i;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.shadowBlur = cfg.shadowBlur;
        context.shadowColor = cfg.shadowColor;

        context.save();

        for (i = 0; i < this.chipsLen; ++i) {
            chip = this.chips[i];
            chip.move();

            // draw
            alpha = chip.getAlpha();
            patel = chip.getPetal();

            context.fillStyle = 'rgba(' + chip.color[0] + ',' + chip.color[1]
                        + ',' + chip.color[2] + ',' + alpha + ')';

            //console.log( patel );

            context.beginPath();
            context.moveTo(patel[0][0], patel[0][1]);
            context.quadraticCurveTo(patel[1][0], patel[1][1], patel[1][2], patel[1][3]);
            context.lineTo(patel[2][0], patel[2][1]);
            context.lineTo(patel[3][0], patel[3][1]);
            context.quadraticCurveTo(patel[4][0], patel[4][1], patel[4][2], patel[4][3]);
            context.closePath();
            context.fill();

            if ((new Date()).getTime() - now.getTime() > cfg.createLimit) {
                break;
            }
        }

        context.restore();
    };

    SakuraCanvas.prototype.getCanvas = function() {
        return this.canvas;
    };
    SakuraCanvas.prototype.getCanvasContext = function() {
        return this.context;
    };

    SakuraCanvas.prototype.animate = function() {
        setInterval((function (self) {
            return function () {
                self._loop.call(self);
            };
        })(this), this.config.framespan);
    };

    SakuraCanvas.prototype.setConfig = function (config) {
        var isCanvasSizeChanged = (config.canvasWidth !== undefined && config.canvasWidth !== this.config.canvasWidth)
            || (config.canvasHeight !== undefined && config.canvasHeight !== this.config.canvasHeight);
        SakuraCanvas.superClass.setConfig.call(this, config);
        if (isCanvasSizeChanged) {
            this.canvas.width = this.config.canvasWidth;
            this.canvas.height = this.config.canvasHeight;
        }
        this.chips.forEach(function (chip) {
            chip.setConfig(config);
        });
    };

    return SakuraCanvas;

});

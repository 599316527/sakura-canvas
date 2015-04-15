define(function(require) {

    var util = require('util');
    var Base = require('base');


    function Chip(config) {
        Base.call(this, config);
    }
    util.inherits(Chip, Base);

    Chip.prototype._defaultConfig = {
        canvasWidth: 800,
        canvasHeight: 600,
        maxDepth: 250,
        minDepth: 0,
        baseDepth: 50,
        baseSize: 4.5,
        baseSpeedX: 0.8,
        baseSpeedY: 1.6,
        minAlpha: 0.5,
        maxAlpha: 1,
        chipColor: {
            r: 235,
            g: 178,
            b: 180
        }
    };

    Chip.prototype._calcInitValues = function() {
        var cfg = this.config;
        this.x = util.getRandomInt(cfg.canvasWidth);
        this.y = util.getRandomInt(cfg.canvasHeight);
        this.depth = util.getRandomInt(cfg.maxDepth, cfg.minDepth);
        this.r1 = Math.random() * Math.PI * 2;
        this.r2 = Math.random() * Math.PI * 2;
        this.rp1 = Math.random() * 0.1;
        this.rp2 = Math.random() * 0.1;
        this.color = [
            cfg.chipColor.r + util.getRandomInt(20),
            cfg.chipColor.g + util.getRandomInt(20),
            cfg.chipColor.b + util.getRandomInt(20)
        ];
    };

    /**
     * chip move
     */
    Chip.prototype.move = function() {
        var cfg = this.config;
        this.r1 = (this.r1 + this.rp1 < Math.PI * 2) ? this.r1 + this.rp1 : this.r1 + this.rp1 - Math.PI * 2;
        this.r2 = (this.r2 + this.rp2 < Math.PI * 2) ? this.r2 + this.rp2 : this.r2 + this.rp2 - Math.PI * 2;
        this.x += cfg.baseSpeedX * (1 + this.depth / cfg.baseDepth);
        this.y += cfg.baseSpeedY * (1 + this.depth / cfg.baseDepth) + Math.sin(this.r1) * 2;

        var depth = util.getRandomInt(cfg.maxDepth, cfg.minDepth);
        if (cfg.baseSpeedX > 0) {
            if (this.x > cfg.canvasWidth) {
                this.x = 0;
                this.y = cfg.canvasHeight - this.y;
                this.depth = depth;
            }
        } else {
            if (this.x < 0) {
                this.x = cfg.canvasWidth;
                this.y = cfg.canvasHeight - this.y;
                this.depth = depth;
            }
        }

        if (cfg.baseSpeedY > 0) {
            if (this.y > cfg.canvasHeight) {
                this.x = cfg.canvasWidth - this.x;
                this.y = 0;
                this.depth = depth;
            }
        } else {
            if (this.y < 0) {
                this.x = cfg.canvasWidth - this.x;
                this.y = cfg.canvasHeight;
                this.depth = depth;
            }
        }
    };

    /**
     * alpha
     */
    Chip.prototype.getAlpha = function() {
        var cfg = this.config;
        return cfg.minAlpha + (cfg.maxAlpha - cfg.minAlpha) * (this.depth / cfg.baseDepth);
    };

    /**
     * petal
     */
    Chip.prototype.getPetal = function() {
        var cfg = this.config;
        var size = cfg.baseSize * (1 + this.depth / cfg.baseDepth);

        var s1 = Math.sin(this.r1) * size;
        var s2 = Math.sin(this.r2) * size;
        var c1 = Math.cos(this.r1) * size;
        var c2 = Math.cos(this.r2) * size;
        var petal_depth = 0.9;

        return [
            [this.x, this.y],
            [this.x + c1, this.y + s1, this.x + c1 + s2 / 2, this.y + s1 + c2 / 2],
            [this.x + (c1 + s2) * 0.75 * petal_depth, this.y + (c2 + s1) * 0.75 * petal_depth],
            [this.x + s2 + c1 / 2, this.y + c2 + s1 / 2],
            [this.x + s2, this.y + c2, this.x, this.y]
        ];

        /*
        var s1 = Math.sin( this.r1 ) * size;
        var s2 = Math.sin( this.r2 ) * size;
        var c1 = Math.cos( this.r1 ) * size;
        var c2 = Math.cos( this.r2 ) * size;

        return [
            [ this.x, this.y ],
            [ this.x + c1, this.y + s1 ],
            [ this.x + c1 + s2, this.y + s1 + c2 ],
            [ this.x + s2, this.y + c2 ]
        ];
        */
    };

    return Chip;

});

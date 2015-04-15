Sakura Canvas
====================

[DEMO](https://rawgit.com/599316527/sakura-canvas/master/demo/index.html)

## Usage

```JavaScript
var sakura = new SakuraCanvas({OPTIONS_HERE});
sakura.init();                                  // make <canvas> & petals
container.appendChild(sakura.getCanvas());      // insert canvas into document
sakura.animate();                               // start animation
```

## Options

```JavaScript
{
    canvasClassName: 'ec-sakura-canvas',    // canvas classname
    canvasWidth: 800,                       // canvas width
    canvasHeight: 600,                      // canvas height
    framerate: 20,                          // animation frame rate
    maxChips: 24,                           // maximum number of petals
    shadowColor: '#DE8397',                 // shadow color
    shadowBlur: 2,                          // shadow blur

    maxDepth: 250,                          // maximum depth of field
    minDepth: 0,                            // minimum depth of field
    baseDepth: 50,                          // base depth of field
    baseSize: 4.5,                          // base size of petals
    baseSpeedX: 0.8,                        // base horizontal speed of petals
    baseSpeedY: 1.6,                        // base vertical speed of petals
    minAlpha: 0.5,                          // minimum opacity (aka. alpha channel)
    maxAlpha: 1,                            // maximum opacity
    chipColor: {r: 235, g: 178, b: 180}     // petals' color (rgb, [0, 255])
}
```



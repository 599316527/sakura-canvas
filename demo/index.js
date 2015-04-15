
var devHostRegExp = /^((\d{2,3}\.){3}\d{2,3}|localhost)$/i;
require.config({
    baseUrl: devHostRegExp.test(location.host) ? '../src' : '../dest'
});


require(['sakura-canvas'], function (SakuraCanvas) {

    var container = document.getElementById('js-canvas-container');
    var options = {
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerHeight
    };
    var sakura, canvas;
    try {
        // Error will be throw when instantiation if the browser doesn't support <canvas>
        sakura = new SakuraCanvas(options);
        sakura.init();
        container.appendChild(sakura.getCanvas());
        sakura.animate();
    } catch (ex) {
        container.innerHTML = '<p class="ec-text-error">' + ex.message + '</p>';
    }

    if (!sakura) return ;


    // handle window resize
    var resizeTimer;
    var resizeTimeout = 500;
    var updateCanvasSize = function () {
        sakura.setConfig({
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight
        });
    };
    var resizeHandler = function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateCanvasSize, resizeTimeout);
    };
    window.addEventListener('resize', resizeHandler, false);

});


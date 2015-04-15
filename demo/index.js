
require.config({
    // baseUrl: '../src'
    baseUrl: '../dest'
});


require(['sakura-canvas'], function (SakuraCanvas) {

    var container = document.getElementById('js-canvas-container');
    var options = {
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerHeight
    };
    var sakura, canvas;
    try {
        sakura = new SakuraCanvas(options);
        sakura.init();
        container.appendChild(sakura.getCanvas());
        sakura.animate();
    } catch (ex) {
        container.innerHTML = '<p class="ec-text-error">' + ex.message + '</p>';
    }

});


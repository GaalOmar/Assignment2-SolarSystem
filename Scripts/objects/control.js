/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control() {
            this.rotation = false;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.zoomOut = function () {
            this.rotation = false;
            camera.position.set(-200, 200, 200);
            camera.lookAt(scene.position);
        };
        Control.prototype.zoomIn = function () {
            this.rotation = false;
            camera.position.set(-50, 50, 50);
            camera.lookAt(scene.position);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map
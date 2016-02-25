/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(zoomIn, zoomCenter, zoomOut, followEarth) {
            this.zoomIn = zoomIn;
            this.zoomCenter = zoomCenter;
            this.zoomOut = zoomOut;
            this.followEarth = followEarth;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map
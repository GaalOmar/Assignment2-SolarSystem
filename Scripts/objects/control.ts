/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        rotation:Boolean;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor() {
            this.rotation = false;
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       public zoomOut() : void {
            this.rotation = false;
            camera.position.set(-200,200,200);
            camera.lookAt(scene.position);
        }
        
        public zoomIn() : void {
            this.rotation = false;
            camera.position.set(-50,50,50);
            camera.lookAt(scene.position);
        }
    }
}

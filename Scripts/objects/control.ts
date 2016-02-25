/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public zoomIn:number;
        public zoomCenter:number;
        public zoomOut:number;
        public followEarth:number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(zoomIn:number,zoomCenter:number,zoomOut:number, followEarth:number) {

           this.zoomIn = zoomIn;
           this.zoomCenter = zoomCenter;
           this.zoomOut = zoomOut;
           this.followEarth = followEarth;
           
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       
    }
}

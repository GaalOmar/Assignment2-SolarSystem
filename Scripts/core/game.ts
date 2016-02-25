/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;


//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var cubeGeometry: CubeGeometry;
var sphereGeomtry: SphereGeometry;
var cubeMaterial: LambertMaterial;

//Making my planets
var sun: gameObject;

var moon: Mesh;
var mars: Mesh;
var jupitor: Mesh;
var earth: Mesh;
var saturn: Mesh;
var venus: Mesh;

//Pivots
var moonPivot: THREE.Object3D;
var marsPivot: THREE.Object3D;
var jupitorPivot: THREE.Object3D;
var earthPivot: THREE.Object3D;
var saturnPivot: THREE.Object3D;
var venusPivot: THREE.Object3D;


function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
   
    //Add a sun to the Scene
    sun = new gameObject(
        new SphereGeometry(6, 32, 32),
        new LambertMaterial({ color: 0xFFFF00 }),
        0, 0, 0);

    scene.add(sun);
    console.log("Added Cube Primitive to scene...");
  
  var sunLight = new THREE.PointLight( 0xffffff, 2, 100 );
    sun.add(sunLight);
    
    //Add planets
     earth = new THREE.Mesh(
    new THREE.SphereGeometry(2, 40, 40), new LambertMaterial({color: 0x00b300}));
    earth.castShadow = true;
    earth.receiveShadow = true;
    earth.position.set(0,0,50);
    earthPivot = new THREE.Object3D();
    sun.add(earthPivot);
    earthPivot.add(earth);
    
   moon = new THREE.Mesh(
    new THREE.SphereGeometry(1, 40, 40), new LambertMaterial({color: 0x000000}));
    moon.castShadow = true;
    moon.receiveShadow = true;
    moon.position.set(0,0,7);
    moonPivot = new THREE.Object3D();
    moonPivot.position = moon.position; 
    earth.add(moonPivot);
    moonPivot.add(moon);
    
    mars = new THREE.Mesh(
    new THREE.SphereGeometry(4, 15, 15), new LambertMaterial({color: 0x0000ff}));
    mars.castShadow = true;
    mars.receiveShadow = true;
    mars.position.set(0,-20,50);
    marsPivot = new THREE.Object3D();
    sun.add(marsPivot);
    marsPivot.add(mars);
    
    saturn = new THREE.Mesh(
    new THREE.SphereGeometry(1, 40, 40), new LambertMaterial({color: 0xffff1a}));
    saturn.castShadow = true;
    saturn.receiveShadow = true;
    saturn.position.set(4,0,20);
    saturnPivot = new THREE.Object3D();
    sun.add(saturnPivot);
    saturnPivot.add(saturn);
    
    venus = new THREE.Mesh(
    new THREE.SphereGeometry(3, 40, 40), new LambertMaterial({color: 0xff3300}));
    venus.castShadow = true;
    venus.receiveShadow = true;
    venus.position.set(40,8,20);
    venusPivot = new THREE.Object3D();
    sun.add(venusPivot);
    venusPivot.add(venus);
    
    jupitor = new THREE.Mesh(
    new THREE.SphereGeometry(5, 20, 20), new LambertMaterial({color: 0x1affb2}));
    jupitor.castShadow = true;
    jupitor.receiveShadow = true;
    jupitor.position.set(80,-40,40);
    jupitorPivot = new THREE.Object3D();
    sun.add(jupitorPivot);
    jupitorPivot.add(jupitor);
    
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-15, 10, 15);
   // spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // add controls
    gui = new GUI();
    control = new Control(200,110,800,0);
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
   
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
 
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'zoomIn',-200, 200);
    gui.add(controlObject, 'zoomCenter', -110, 110);
	gui.add(controlObject, 'zoomOut', -800,800);
    gui.add(controlObject, "followEarth", true);
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();

    //Rotating the planets
    earthPivot.rotation.y += 0.003;
    earth.rotation.y += 0.0003;
    
    moonPivot.rotation.y += 0.05;
   
    venusPivot.rotation.y += 0.06;
    
    marsPivot.rotation.y += 0.07;
 
    jupitorPivot.rotation.y += 0.03;

    saturnPivot.rotation.y += 0.01;
    
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x3d3d29, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight,  0.1, 1000);
    camera.position.x = -110;
    camera.position.y = 110;
    camera.position.z = 110;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}

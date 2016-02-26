/// <reference path="_reference.ts"/>
// MAIN GAME FILE
/*
Name: Ga-alo Omar 300175123
    Source File Name: Advanced Graphics- Solar System
    Last Modified by: Ga-alo Omar
    Date last Modified: Feb 25, 2016
    Program description: Creating a solar system
    Revision History:
    Commit 1: Created the visual code file, Initial Commit
    Commit 2: Added planet and a sun
    Commit 3: Added GUI Controls
    Commit 4: Changed the background
    Commit 5: Added Texture
    Commit 6: Final Commit
   
*/
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var cubeGeometry;
var sphereGeomtry;
var cubeMaterial;
//Making my planets
var sun;
var moon;
var mars;
var jupiter;
var earth;
var saturn;
var venus;
//Pivots
var moonPivot;
var marsPivot;
var jupiterPivot;
var earthPivot;
var saturnPivot;
var venusPivot;
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
    sun = new gameObject(new SphereGeometry(6, 32, 32), new LambertMaterial({ map: THREE.ImageUtils.loadTexture('Images/sun.jpg') }), 0, 0, 0);
    scene.add(sun);
    console.log("Added Cube Primitive to scene...");
    //Makes the sun emit a bright light
    var sunlight = new PointLight(0xFFFFFF, 8, 60);
    sun.add(sunlight);
    //Add planets
    earth = new Mesh(new SphereGeometry(2, 40, 40), new LambertMaterial({ map: THREE.ImageUtils.loadTexture('Images/earth.jpg') }));
    earth.castShadow = true;
    earth.receiveShadow = true;
    earth.position.set(0, 0, 50);
    earthPivot = new Object3D();
    sun.add(earthPivot);
    earthPivot.add(earth);
    moon = new Mesh(new SphereGeometry(1, 40, 40), new LambertMaterial({ map: THREE.ImageUtils.loadTexture('Images/moon.jpg') }));
    moon.castShadow = true;
    moon.receiveShadow = true;
    moon.position.set(0, 0, 7);
    moonPivot = new Object3D();
    moonPivot.position = moon.position;
    earth.add(moonPivot);
    moonPivot.add(moon);
    mars = new Mesh(new SphereGeometry(4, 15, 15), new LambertMaterial({ map: THREE.ImageUtils.loadTexture('Images/mars.jpg') }));
    mars.castShadow = true;
    mars.receiveShadow = true;
    mars.position.set(0, -20, 50);
    marsPivot = new Object3D();
    sun.add(marsPivot);
    marsPivot.add(mars);
    saturn = new Mesh(new SphereGeometry(1, 40, 40), new LambertMaterial({ map: THREE.ImageUtils.loadTexture('Images/saturn.jpg') }));
    saturn.castShadow = true;
    saturn.receiveShadow = true;
    saturn.position.set(4, 0, 15);
    saturnPivot = new Object3D();
    sun.add(saturnPivot);
    saturnPivot.add(saturn);
    venus = new Mesh(new SphereGeometry(3, 40, 40), new LambertMaterial({ map: THREE.ImageUtils.loadTexture('Images/venus.jpg') }));
    venus.castShadow = true;
    venus.receiveShadow = true;
    venus.position.set(40, 8, 20);
    venusPivot = new Object3D();
    sun.add(venusPivot);
    venusPivot.add(venus);
    jupiter = new Mesh(new SphereGeometry(5, 20, 20), new LambertMaterial({ map: THREE.ImageUtils.loadTexture('Images/jupiter.jpg') }));
    jupiter.castShadow = true;
    jupiter.receiveShadow = true;
    jupiter.position.set(80, -40, 40);
    jupiterPivot = new Object3D();
    sun.add(jupiterPivot);
    jupiterPivot.add(jupiter);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(0, 20, 90);
    // spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control();
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'zoomIn');
    gui.add(controlObject, 'zoomOut');
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
function gameLoop() {
    stats.update();
    //Adding speed to my pivots  
    venusPivot.rotation.y += 0.04;
    marsPivot.rotation.y += 0.03;
    jupiterPivot.rotation.y += 0.02;
    saturnPivot.rotation.y += 0.01;
    earthPivot.rotation.y += 0.003;
    earth.rotation.y += 0.003;
    moonPivot.rotation.y += 0.05;
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x1a1a1a, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -110;
    camera.position.y = 70;
    camera.position.z = 90;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map
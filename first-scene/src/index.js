import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from "lil-gui";


//CREATE SCENE
const scene = new THREE.Scene();
scene.backgroundColor = 0xf2f2f2
scene.fog = new THREE.Fog(0xffffff, 0.0025, 50)

//SETUP A CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.z = 8
camera.position.y = 0

//SETUP RENDERER AND ATTCH TO CANVAS
const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.VSMShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf2f2f2)
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x666666))
const dirLight = new THREE.DirectionalLight(0xaaaaaa)
dirLight.position.set(5, 12, 8)
dirLight.castShadow = true

// create a cube and torus knot and add them to the scene
const cubeGeometry = new THREE.BoxGeometry(2,2,2);
const cubeMaterial = new THREE.MeshPhongMaterial({
    color:
        0x0000FF
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -1;
cube.castShadow = true;
scene.add(cube);


const stats = Stats()
document.body.appendChild(stats.dom)

const orbitControls = new OrbitControls(camera, renderer.domElement)

const velocity = 0.0001;

const gui = new GUI();
const props = {
    cubeSpeed: 0.01,
};
gui.add(props, 'cubeSpeed', -0.2, 0.2, 0.01)

function animate() {

    cube.rotation.x += velocity;
    cube.rotation.y += velocity;
    cube.rotation.z += velocity;

    requestAnimationFrame(animate);
    orbitControls.update();
    stats.update();
    renderer.render(scene, camera);
}
animate();
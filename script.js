
// import './style.css'
// import * as THREE from "../node_modules/three/build/three.module.js"
// import * as gsap from '../node_modules/gsap/index.js'
// import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
// import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import * as THREE from 'three'
import * as gsap from 'gsap'


import {OrbitControls} from "/Users/pavan/Documents/VSCode/starter/node_modules/three/examples/jsm/controls/OrbitControls.js"

// NEW CURSOR ------------------------------------------------------------------------------------
const bigBall = document.querySelector('.cursor__ball--big');
const smallBall = document.querySelector('.cursor__ball--small');
const hoverables = document.querySelectorAll('.hoverlines');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < hoverables.length; i++) {
  hoverables[i].addEventListener('mouseenter', onMouseHover);
  hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursors
function onMouseMove(e) {
  gsap.gsap.to(bigBall, .6, {x: e.pageX - 15,y: e.pageY - 15});
  gsap.gsap.to(smallBall, .1, {x: e.pageX - 5,y: e.pageY - 7});
}

// // Hover an element
function onMouseHover() {gsap.gsap.to(bigBall, .3, {scale: 2.5});}

function onMouseHoverOut() {gsap.gsap.to(bigBall, .3, {scale: 1})}
// -----------------------------------------------------------------------------------------------

// show time on screen
const timeDiv = document.getElementById('time');
const dateDiv = document.getElementById('date');

function myDateFunction() {
  const now = new Date()
  var nowStr = now.toLocaleString() 
  nowStr = nowStr.split(",")
  const dtime = nowStr[1].toLowerCase()
  const ddate = nowStr[0].toLowerCase()
  timeDiv.innerHTML = dtime;
  dateDiv.innerHTML = ddate;
 
}
setInterval(myDateFunction, 1000);

const locDiv = document.getElementById('loc');
locDiv.innerHTML = locDiv.innerHTML.toLowerCase();
console.log(locDiv.innerHTML)


const scene = new THREE.Scene()


const geometry = new THREE.DodecahedronGeometry(18,8)

// points geometry 
const material = new THREE.PointsMaterial({
    size: 0.1,
    transparent: false,
    color: 0xA2D2FF
})


const torus = new THREE.Points(geometry,material)

const mesh = new THREE.Mesh()
torus.position.x = 0
torus.position.y = 0
scene.add(torus)   


// const loader = new GLTFLoader();
// loader.load( 'scene.gltf', 
// function ( gltf ) {
//     gltf.scene.traverse( function ( child ) {
//         if ( child.isMesh ) {
//             child.geometry.center(); // center here
//         }
//     });
//     gltf.scene.scale.set(100,100,100) // scale here
//     scene.add( gltf.scene );
// }, (xhr) => xhr, ( err ) => console.error( e ));


// const spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.position.set( 100, 1000, 100 );

// spotLight.castShadow = true;

// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;

// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;

// scene.add( spotLight );

// point light 
// const particleLight = new THREE.Mesh(
//   new THREE.SphereGeometry( 4, 8, 8 ),
//   new THREE.MeshBasicMaterial( { color: 0xffffff } )
// );
// particleLight.add( new THREE.PointLight( 0xffffff, 1 ) );
// scene.add( particleLight );


// LIGHTS

// const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
// hemiLight.color.setHSL( 0.6, 1, 0.6 );
// hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
// hemiLight.position.set( 0, 50, 0 );
// scene.add( hemiLight );

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.setZ(40);
camera.position.setX(-3)  ;
camera.position.setY(0);



var renderer = new THREE.WebGLRenderer({ alpha: true});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement);



function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.0005;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.008;

  renderer.render(scene, camera);



}

animate();

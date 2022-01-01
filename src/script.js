import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'

// // Debug
// const gui = new dat.GUI()

// show time on screen
const dateDiv = document.getElementById('time');

function myDateFunction() {
  const now = new Date()
  const nowStr = now.toUTCString() 
  dateDiv.innerHTML = nowStr;
}
setInterval(myDateFunction, 1000);


const canvas = document.querySelector('canvas.webgl')




const scene = new THREE.Scene()


const geometry = new THREE.TorusKnotGeometry(15, 4, 200, 20,4,);



const material = new THREE.MeshBasicMaterial({color: 0xF0BB62, wireframe: true})



const torus = new THREE.Mesh(geometry,material)
scene.add(torus)



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
camera.position.setZ(45);
camera.position.setX(-25);
camera.position.setY(0);


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
  
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
  
  
    // controls.update();
  
    renderer.render(scene, camera);
  }
  
  animate();

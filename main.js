import * as THREE from "three" //609.9k(gzipped: 153.1k)
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//Scene
const scene = new THREE.Scene()

//Create our shape
/* const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: '#00FF83'
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh) */

const loader = new GLTFLoader();
loader.load('./models/cansat.glb', function (gltf) {
  scene.add(gltf.scene);
}, undefined, function (error) {
  console.error(error);
});

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Add light
const light = new THREE.PointLight(0xffffff, 50, 100)
light.position.set(0, 10, 80)
scene.add(light)

//Add camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 60
scene.add(camera)

//Rendering scene
const canvas = document.getElementById('webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5
//controls.target = new THREE.Vector3(2, 2, 0)

//Resize
window.addEventListener('resize', () => {
  //Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()
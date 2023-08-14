import './style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// *-----------Lights----------------
const directionLight = new THREE.DirectionalLight(0xffffff, 2.8);
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
directionLight.position.z = 2;
scene.add(ambientLight, directionLight);

const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(70, aspect.width / aspect.height);
camera.position.z = 2;
camera.position.y = 1;
scene.add(camera);

const gltfLoader = new GLTFLoader();

const dracoloader = new DRACOLoader();
dracoloader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoloader);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 'blue' });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

let animationMixer = null;

gltfLoader.load('models/tenzenAnimated.glb', (glb) => {
  animationMixer = new THREE.AnimationMixer(glb.scene);
  const clipAction = animationMixer.clipAction(glb.animations[9]);
  clipAction.play();
  glb.scene.scale.set(0.5, 0.5, 0.5);
  scene.add(glb.scene);
  console.log(glb);
});

window.addEventListener('resize', () => {
  //update size
  (aspect.width = window.innerWidth), (aspect.height = window.innerHeight);

  //camera aspect ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);
renderer.physicallyCorrectLights = true;

const orbitControls = new OrbitControls(scene, canvas);

const clock = new THREE.Clock();
let previousTime = 0;

function animate() {
  const elapsedTime = clock.getElapsedTime();
  const frameTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  if (animationMixer) {
    animationMixer.update(frameTime);
  }

  orbitControls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();

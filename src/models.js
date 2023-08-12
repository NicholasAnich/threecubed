import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as dat from 'dat.gui';

//Scene
const scene = new THREE.Scene();

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.8);
directionalLight.position.z = 2;
scene.add(ambientLight, directionalLight);

//Debugging
// const gui = new dat.GUI();

// OBJLoader
// const objloader = new OBJLoader();

// Loading Model
// objloader.load('models/suzan.obj', (object) => {
//   // object.position.y = 1;
//   // object.children[0].position.z = -3
//   object.children[0].material = new THREE.MeshBasicMaterial({ color: 'teal' });
//   scene.add(object);
// });

// GLTFLoader
const gltfLoader = new GLTFLoader();

// DRACOLoader
const dracoloader = new DRACOLoader();
dracoloader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoloader);

// FBXLoader
const fbxloader = new FBXLoader();

// let animationMixer = null;
// fbxloader.load('models/Run.fbx', (fbx) => {
//   animationMixer = new THREE.AnimationMixer(fbx);
//   const clipAction = animationMixer.clipAction(fbx.animations[0]);
//   clipAction.play();
//   fbx.scale.set(0.01, 0.01, 0.01);
//   scene.add(fbx);
//   console.log(fbx);
// });

// Loading GLTF Model
let animationMixer = null;

// gltfLoader.load('models/animatedCube.glb', (glb) => {
//   animationMixer = new THREE.AnimationMixer(glb.scene);
//   const clipAction = animationMixer.clipAction(glb.animations[0]);
//   clipAction.play();
//   glb.scene.scale.set(0.5, 0.5, 0.5);
//   scene.add(glb.scene);
//   console.log(glb);
// });

gltfLoader.load('models/newModelglb.glb', (glb) => {
  animationMixer = new THREE.AnimationMixer(glb.scene);
  scene.add(glb.scene);
  const clipAction = animationMixer.clipAction(glb.animations[3]);
  glb.scene.position.x = 2.5;
  glb.scene.position.y = -0.8;
  // clipAction.play();
  console.log(glb);
});

//Resizing
window.addEventListener('resize', () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(45, aspect.width / aspect.height);
camera.position.z = 3;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.physicallyCorrectLights = true;
//! renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#808080', 0.5);
renderer.setSize(aspect.width, aspect.height);
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();
let previousTime = 0;

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime(); //0.002 + 0.002 = 0.004
  const frameTime = elapsedTime - previousTime; //0.004 - 0.002 = 0.002
  previousTime = elapsedTime; // previousTime = 0.002

  //Update AnimationMixer
  if (animationMixer) {
    animationMixer.update(frameTime);
  }

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();

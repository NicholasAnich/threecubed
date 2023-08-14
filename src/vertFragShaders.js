import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import vShader from './shaders/vertex.glsl';
import fShader from './shaders/fragment.glsl';

// SCENE
const scene = new THREE.Scene();

const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// CAMERA
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3;
scene.add(camera);

// OBJECT
const geometry = new THREE.PlaneBufferGeometry(1, 1);
const material = new THREE.RawShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// RENDERER
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

// RESIZE WINDOW
window.addEventListener('resize', () => {
  // Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  // New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  // New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ORBIT CONTROLS
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// Clock
const clock = new THREE.Clock();
let previousTime = 0;

function animate() {
  const elapsedTime = clock.getElapsedTime();

  //   cube.rotation.x = elapsedTime * 0.25;
  //   cube.rotation.y = elapsedTime * 0.25;

  orbitControls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}
animate();

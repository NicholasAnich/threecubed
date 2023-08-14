import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import vShader from './shaders/vertex.glsl';
import fShader from './shaders/fragment.glsl';

// SCENE
const scene = new THREE.Scene();

// Datui
const gui = new dat.GUI();

// cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / window.innerWidth;
  cursor.y = e.clientY / window.innerHeight;
});

const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// CAMERA
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3;
scene.add(camera);

// OBJECT
const geometry = new THREE.PlaneBufferGeometry(1, 1, 64, 64);
console.log(geometry);
const material = new THREE.RawShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
  side: THREE.DoubleSide,
  uniforms: {
    u_amplitude: { value: 20.0 },
    u_time: { value: 0 },
    u_color: { value: new THREE.Color('teal') },
    u_timecolor: { value: 0 },
    u_cursorcolor: { value: new THREE.Vector2(cursor.x, cursor.y) },
  },
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const amount = geometry.attributes.position.count;
const newAttributeArray = new Float32Array(amount);
for (let i = 0; i < amount; i++) {
  newAttributeArray[i] = Math.random();
}
geometry.setAttribute(
  'a_modulus',
  new THREE.BufferAttribute(newAttributeArray, 1)
);

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

  //Update u_time
  material.uniforms.u_time.value = elapsedTime;
  material.uniforms.u_timecolor.value = elapsedTime;
  material.uniforms.u_cursorcolor.value.x = cursor.x;
  material.uniforms.u_cursorcolor.value.y = cursor.y;

  orbitControls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}
animate();

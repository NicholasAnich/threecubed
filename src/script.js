import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

//Scene Mesh Camera Renderer
const scene = new THREE.Scene();

// Debugging
const gui = new dat.GUI();

//1) Range

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.set(0, 2, 2);
// scene.add(ambientLight, pointLight);

// const ambientLight = new THREE.AmbientLight('#ffffff', 1);
// scene.add(ambientLight);
// gui
//   .add(ambientLight, 'intensity')
//   .min(0)
//   .max(1)
//   .step(0.1)
//   .name('Intensity One');

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// scene.add(directionalLight);
// directionalLight.position.set(0, 2, 0);
// gui
//   .add(directionalLight, 'intensity')
//   .min(0)
//   .max(1)
//   .step(0.01)
//   .name('Intensity Two');
// gui.add(directionalLight.position, 'x').min(-3).max(3).step(0.01).name('X Dir');
// gui.add(directionalLight.position, 'y').min(-3).max(3).step(0.01).name('Y Dir');

// DirectionalLightHelper;
// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight
// );
// scene.add(directionalLightHelper);

//HemisphereLight
// const hemisphereLight = new THREE.HemisphereLight('magenta', 'blue', 0);
// scene.add(hemisphereLight);
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
// scene.add(hemisphereLightHelper);

//4 ) Point Light
// const pointLight = new THREE.PointLight('red', 1, 50);
// scene.add(pointLight);
// pointLight.position.set(0, 2, 0);
// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);
// gui.add(pointLight.position, 'x').min(-3).max(3).step(0.1).name('X Point');
// gui.add(pointLight.position, 'y').min(-3).max(3).step(0.1).name('Y Point');
// gui.add(pointLight.position, 'z').min(-3).max(3).step(0.1).name('Z Point');
// gui
//   .add(pointLight, 'intensity')
//   .min(-5)
//   .max(5)
//   .step(0.1)
//   .name('Point Intensity');

//5 ) Direct Area Light
const rectAreaLight = new THREE.RectAreaLight('#5D3FD3', 3, 2, 2);
rectAreaLight.position.z = 0.5;
scene.add(rectAreaLight);
gui.add(rectAreaLight, 'width').min(1).max(5).step(0.1).name('width');
gui.add(rectAreaLight, 'height').min(1).max(5).step(0.1).name('height');

//LoadingManger
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log('start');
};
loadingManager.onLoad = () => {
  console.log('Loading . . .');
};
loadingManager.onProgress = () => {
  console.log('Progress');
};
loadingManager.onError = () => {
  console.log('Error!');
};
//texture Loader
// const textureLoader = new THREE.TextureLoader(loadingManager);

// const colorTexture = textureLoader.load('/texture/color.jpg');
// const otherTextureLoader = new THREE.TextureLoader(loadingManager);
// const otherColorTexture = otherTextureLoader.load('/texture/Normal.jpg');
// const matcaptTexture = textureLoader.load('/texture/mat2.png');
// const bumpTexture = textureLoader.load('/texture/bump.jpg');
// const displacementTexture = textureLoader.load('/texture/displacementMap.jpg');

//Cube texture Loader
// const cubeTextureLoader = new THREE.CubeTextureLoader();
// const envTexture = cubeTextureLoader.load([
//   '/texture/env/px.png',
//   '/texture/env/nx.png',
//   '/texture/env/py.png',
//   '/texture/env/ny.png',
//   '/texture/env/pz.png',
//   '/texture/env/nz.png',
// ]);

// scene.background = envTexture;

//Mesh / Objects
// CUBE
// const geometry1 = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5, 2, 2, 2);
// const material1 = new THREE.MeshBasicMaterial({
//   color: 'green',
//   wireframe: true,
// });
// const cubeGreen = new THREE.Mesh(geometry1, material1);
// cubeGreen.position.set(0, 0, 1);

// CUBE PURPLE
// const materialColor = {
//   color: 0xffffff,
// };
// const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// const material2 = new THREE.MeshStandardMaterial({ color: 'purple' });
// const cubePurple = new THREE.Mesh(geometry2, material2);
// cubePurple.position.set(1, 0, 1);

// 1) RANGE GUI
// gui.add(cubePurple.position, 'x').min(-3).max(3).step(0.1).name('x cubePurple');
// 2) BOOLEAN
// gui.add(material2, 'wireframe');
// 3) COLOR
// gui.addColor(materialColor, 'color').onChange(() => {
//   material2.color.set(materialColor.color);
// });

// const geometry3 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// const material3 = new THREE.MeshBasicMaterial({ color: 'yellow' });
// material3.color = new THREE.Color(0xf36886);
// const cubeYellow = new THREE.Mesh(geometry3, material3);
// cubeYellow.position.set(-1, 0, 1);

// const geometry4 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// const material4 = new THREE.MeshBasicMaterial({ color: 'magenta' });
// const cubePink = new THREE.Mesh(geometry4, material4);
// cubePink.position.set(-1, 1, 1);

// MATCAP
const geometry5 = new THREE.PlaneGeometry(10, 10, 64, 64);
const material5 = new THREE.MeshStandardMaterial();
// const material5 = new THREE.MeshMatcapMaterial();
// material5.matcap = matcaptTexture;
// material5.shininess = 200;
// material5.specular = new THREE.Color('red');
// material5.metalness = 0.35;
// material5.roughness = 0.2;

const cubeBlue = new THREE.Mesh(geometry5, material5);
cubeBlue.position.set(0, 0, 0);

// const geometry6 = new THREE.SphereBufferGeometry(0.5, 32, 32);
// const material6 = new THREE.MeshStandardMaterial();
// const cubeWhite = new THREE.Mesh(geometry6, material6);
// cubeWhite.position.set(1, 1, 1);
// material6.metalness = 0.9;
// material6.roughness = 0.1;
// material6.envMap = envTexture;
// material6.map = colorTexture;
// material6.displacementMap = displacementTexture;
// material6.bumpMap = bumpTexture;

//Triangle
// const triangleGeometry = new THREE.PlaneBufferGeometry(1, 1);
// const verticesArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
// const positionsAttribute = new THREE.BufferAttribute(verticesArray, 3);
// geometry1.setAttribute('position', positionsAttribute);

//SPHERE
// const sphereGeo = new THREE.SphereGeometry(0.5, 32, 16);
// const sphereMaterial = new THREE.MeshBasicMaterial({
//   map: colorTexture,
// });
// const sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
// sphere.position.set(0, -1, 1);
// const wireframe = new THREE.WireFrameGeometry(sphereGeo);
// scene.add(cube, sphere);

scene.add(
  // cubePurple,
  // cubePink,
  cubeBlue
  // cubeWhite
  // cubeYellow,
  // cubeGreen,
  // sphere
);

// Mouse Listener
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = event.clientY / window.innerHeight - 0.5;
  // console.log(cursor.x, cursor.y);
});

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 9;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height); //Renderer size

const orbitControls = new OrbitControls(camera, canvas);
// orbitControls.autoRotate = true;
// orbitControls.autoRotateSpeed = 6;
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.01;

//Resizing
window.addEventListener('resize', () => {
  // New Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //new AspectRatio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //new RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Clock Class
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  orbitControls.update();
  //LookAt
  // cubeGreen.lookAt(new THREE.Vector3(-cursor.x, cursor.y));

  // sphere.rotation.y = elapsedTime * 0.125;
  // sphere.rotation.x = elapsedTime * 0.125;
  // sphere.position.x = Math.sin(elapsedTime * 0.25);
  // sphere.position.y = Math.cos(elapsedTime * 0.25);

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();

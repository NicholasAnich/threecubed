import * as THREE from 'three';
import gsap from 'gsap';
//Scene Mesh Camera Renderer
const scene = new THREE.Scene();
//Mesh / Objects
// CUBE
const geometry1 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material1 = new THREE.MeshBasicMaterial({ color: 'green' });
const cubeGreen = new THREE.Mesh(geometry1, material1);
cubeGreen.position.set(0, 0, 1);

const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material2 = new THREE.MeshBasicMaterial({ color: 'purple' });
const cubePurple = new THREE.Mesh(geometry2, material2);
cubePurple.position.set(1, 0, 1);

const geometry3 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material3 = new THREE.MeshBasicMaterial({ color: 'yellow' });
const cubeYellow = new THREE.Mesh(geometry3, material3);
cubeYellow.position.set(-1, 0, 1);

const geometry4 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material4 = new THREE.MeshBasicMaterial({ color: 'pink' });
const cubePink = new THREE.Mesh(geometry4, material4);
cubePink.position.set(-1, 1, 1);

const geometry5 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material5 = new THREE.MeshBasicMaterial({ color: 'blue' });
const cubeBlue = new THREE.Mesh(geometry5, material5);
cubeBlue.position.set(0, 1, 1);

const geometry6 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material6 = new THREE.MeshBasicMaterial({ color: 'white' });
const cubeWhite = new THREE.Mesh(geometry6, material6);
cubeWhite.position.set(1, 1, 1);

//SPHERE
const sphereGeo = new THREE.SphereGeometry(0.5, 32, 16);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
const sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
sphere.position.set(1, 0, 1);
// const wireframe = new THREE.WireFrameGeometry(sphereGeo);
// scene.add(cube, sphere);

scene.add(cubePurple, cubePink, cubeBlue, cubeWhite, cubeYellow, cubeGreen);

// Mouse Listener
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = event.clientY / window.innerHeight - 0.5;
  console.log(cursor.x, cursor.y);
});

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 5;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height); //Renderer size

// Clock Class
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  //LookAt
  cubeGreen.lookAt(new THREE.Vector3(cursor.x, -cursor.y));

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();

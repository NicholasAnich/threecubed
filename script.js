//Scene Mesh Camera Renderer
const scene = new THREE.Scene();

//Mesh / Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'purple' });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

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

  cube.rotation.y = elapsedTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();

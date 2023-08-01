const three = THREE;
// Scene Mesh Camera Renderer

//Scene
const scene = new three.Scene();

//Mesh
const geometry = new three.BoxGeometry(1, 1, 1);
const material = new three.MeshBasicMaterial({ color: 'purple' });
const mesh = new three.Mesh(geometry, material);

scene.add(mesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new three.PerspectiveCamera(75, aspect.width / aspect.height); //near value is 1, and far value is 2000
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.draw'); //select the canvas element
const renderer = new three.WebGLRenderer({ canvas }); //add the WebGLRenderer
renderer.setSize(aspect.width, aspect.height); //Renderer size
renderer.render(scene, camera); //display what the camera in the scene captured

// import * as THREE from 'three';
// import { orbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
// set size of renderer
const w = window.innerWidth;
const h = window.innerHeight;
renderer.setSize(w, h);
// append renderer to body
document.body.appendChild(renderer.domElement);
// create a camera
const fov = 90; // field of view
const aspect = w / h; // aspect ratio
const near = 0.1; // near clipping plane
const far = 10; // far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // Create a perspective camera
// scooch back camera
camera.position.z = 2;
// create a scene
const scene = new THREE.Scene();

// add orbit controls to the camera
// const controls = new orbitControls(camera, renderer.domElement);


// Create an icosahedron geometry and a mesh with a standard material
const geometry = new THREE.IcosahedronGeometry(1,2); // Create an geometry
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff, // Set the color of the material
    flatShading: true, // Use flat shading for a more geometric look
    });
const mesh = new THREE.Mesh(geometry, material); // Create a mesh with the geometry and material
scene.add(mesh); // Add the mesh to the scene

const wireMat = new THREE.MeshBasicMaterial({
    color: 0x00ff00, // Set the color of the wireframe
    wireframe: true, // Enable wireframe mode
    transparent: true, // Allow transparency
    opacity: 0.5 // Set the opacity of the wireframe
});
const wireframe = new THREE.Mesh(geometry, wireMat); // Create a wireframe mesh
wireframe.scale.setScalar(1.005);
mesh.add(wireframe); // Add the wireframe mesh to the scene

// Add lighting to the scene
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Ambient light for general illumination
// scene.add(ambientLight); // Add ambient light to the scene

const hemisphereLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500, .5); // Hemisphere light for soft shadows
scene.add(hemisphereLight); // Add hemisphere light to the scene

// animate the mesh
function animate() {
    requestAnimationFrame(animate);
    console.log("Animating..."); // Log to console to indicate animation is running
    mesh.rotation.x += 0.001; // Rotate the mesh around the x-axis
    mesh.rotation.y += 0.001; // Rotate the mesh around the y-axis
    renderer.render(scene, camera);
}
animate(); // Start the animation loop

// always gotta render the scene
renderer.render(scene, camera);
// Handle window resizing
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h); // Update the renderer size
  camera.aspect = w / h; // Update the camera aspect ratio
  camera.updateProjectionMatrix(); // Update the camera projection matrix
});

// No imports needed here if you load from <script> tags in HTML
// import local starfield file

// set up renderer
const container = document.getElementById('box-container');
const canvas = document.getElementById('dice-canvas');
const w = container.clientWidth;
const h = container.clientHeight;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(w, h);

const aspect = w / h;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.z = 5; // Scooched back a bit more

// create a scene
const scene = new THREE.Scene();

// --- ADD ORBIT CONTROLS ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Makes the controls feel smoother
controls.dampingFactor = .005; // Adjusts the damping effect
controls.enableZoom = true; // Allows zooming in and out


const earthGroup = new THREE.Group(); // Create a group for the earth mesh
earthGroup.rotation.z = -23.4 * (Math.PI / 180); // Tilt the earth by 23.4 degrees
scene.add(earthGroup); // Add the group to the scene
// Create earth instead 
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16); // Create geometry
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff, // White color
    map: new THREE.TextureLoader().load("./earthmap1k.jpg"), // Load a texture for the material
});
const mesh = new THREE.Mesh(geometry, material);
earthGroup.add(mesh);
const hemisphereLight = new THREE.HemisphereLight(0x000000, 0xffffff, 1); // White light for better visibility
scene.add(hemisphereLight);

// animate the mesh
function animate() {
    requestAnimationFrame(animate);

    // YOU MUST UPDATE THE CONTROLS IN THE ANIMATION LOOP
    controls.update();

    // The mesh rotation is removed so the user has full control
    // // mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.001;

    renderer.render(scene, camera);
}
animate(); // Start the animation loop

// Handle window resizing
window.addEventListener('resize', () => {
  const w = container.clientWidth;
  const h = container.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});



// No imports needed here if you load from <script> tags in HTML

// set up renderer
const canvas = document.querySelector('#dice-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
const w = window.innerWidth;
const h = window.innerHeight;
renderer.setSize(w, h);


// create a camera
const fov = 75; // 90 is very wide, 75 is more standard
const aspect = w / h;
const near = 0.1;
const far = 100; // Increased far plane for more room to zoom out
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5; // Scooched back a bit more

// create a scene
const scene = new THREE.Scene();

// --- ADD ORBIT CONTROLS ---
// Note: It's THREE.OrbitControls, with capital letters
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Makes the controls feel smoother
controls.dampingFactor = .005; // Adjusts the damping effect
controls.enableZoom = true; // Allows zooming in and out

// Create an icosahedron geometry and a mesh with a standard material
// const geometry = new THREE.IcosahedronGeometry(1, 1); // Detail of 0 is a true icosahedron
// const material = new THREE.MeshStandardMaterial({
//     color: 0xffffff,
//     flatShading: true,
// });
// Create a torus knot geometry instead 
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 16); // More segments for smoother appearance
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff, // White color
    flatShading: true, // Flat shading for a more geometric look
    metalness: 0.5, // Slightly metallic
    roughness: 0.5, // Slightly rough surface
    emissive: 0x000000, // No emissive color
    emissiveIntensity: 0.1, // Low intensity for subtle glow
    side: THREE.DoubleSide, // Render both sides of the geometry
    transparent: true, // Allow transparency
    depthWrite: true, // Enable depth writing
    depthTest: true, // Enable depth testing
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// make mesh darker
const wireMat = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
    transparent: true, // Allow transparency
    opacity: 0.5, // Set the opacity of the wireframe

});
const wireframe = new THREE.Mesh(geometry, wireMat);
wireframe.scale.setScalar(1.001); // Slightly smaller scale for wireframe
mesh.add(wireframe);

// Add lighting to the scene
const hemisphereLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500, 1); // Increased intensity
scene.add(hemisphereLight);

// animate the mesh
function animate() {
    requestAnimationFrame(animate);

    // YOU MUST UPDATE THE CONTROLS IN THE ANIMATION LOOP
    controls.update();

    // The mesh rotation is removed so the user has full control
    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.001;

    renderer.render(scene, camera);
}
animate(); // Start the animation loop

// Handle window resizing
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

// The extra render call here is not needed since animate() handles it
// renderer.render(scene, camera);

// THE STRAY BRACKET "}" HAS BEEN REMOVED FROM THE END OF THE FILE
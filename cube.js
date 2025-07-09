// main.js

// 1. Scene Setup
const scene = new THREE.Scene(); // Create a new scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Perspective camera with a wider field of view
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('dice-canvas') }); // Use the canvas element with id 'dice-canvas'
renderer.setSize(window.innerWidth, window.innerHeight);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Add basic lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(2, 5, 5);
scene.add(directionalLight);


// 2. Create Dice Materials
const textureLoader = new THREE.TextureLoader();
const materials = [
    new THREE.MeshStandardMaterial({ map: textureLoader.load('face1.png') }), // right face
    new THREE.MeshStandardMaterial({ map: textureLoader.load('face6.png') }), // left face
    new THREE.MeshStandardMaterial({ map: textureLoader.load('face2.png') }), // top face
    new THREE.MeshStandardMaterial({ map: textureLoader.load('face5.png') }), // bottom face
    new THREE.MeshStandardMaterial({ map: textureLoader.load('face3.png') }), // front face
    new THREE.MeshStandardMaterial({ map: textureLoader.load('face4.png') }), // back face
];

// 3. Create Dice Mesh
const geometry = new THREE.BoxGeometry(2, 2, 2);
const dice = new THREE.Mesh(geometry, materials);
scene.add(dice);

camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
// Map results to the target rotation
const rotationMap = {
    1: { x: 0, y: 0 },
    2: { x: -Math.PI / 2, y: 0 },
    3: { x: 0, y: Math.PI / 2 },
    4: { x: 0, y: -Math.PI / 2 },
    5: { x: Math.PI / 2, y: 0 },
    6: { x: Math.PI, y: 0 }
};
// Roll animation + logic
function rollDice() {
    // Generate a random result
    const result = Math.floor(Math.random() * 6) + 1;
    const targetRotation = rotationMap[result];
    
    // Add a random spin for visual effect before settling
    const randomSpin = {
        x: (Math.random() * 2 + 2) * Math.PI, // 2-4 full spins
        y: (Math.random() * 2 + 2) * Math.PI,
    };
    
    // Use GSAP to animate the rotation
    gsap.to(dice.rotation, {
        x: targetRotation.x + randomSpin.x,
        y: targetRotation.y + randomSpin.y,
        duration: 2, // Animation duration in seconds
        ease: "power2.out", // Easing function for a natural feel
    });
    
    console.log(`You rolled a ${result}!`);
}

// Event listener for mouse click to roll the dice
document.getElementById('dice-canvas').addEventListener('click', (event) => {
    // Get mouse position in normalized device coordinates (-1 to +1)       
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // Update the raycaster with the mouse position
    raycaster.setFromCamera(mouse, camera);
    // Check if the dice is clicked
    const intersects = raycaster.intersectObject(dice);
    if (intersects.length > 0) {
        // If the dice is clicked, roll it
        rollDice();
    }
});
// create logic to make the dice face the camera
function updateDiceOrientation() {
    dice.lookAt(camera.position);
}   
// Handle window resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});


animate();
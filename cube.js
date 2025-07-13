// 1. Scene Setup
const scene = new THREE.Scene(); // Create a new scene
scene.background = new THREE.Color(0x333333); // Gray background for visibility
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
console.log('Camera created');
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('dice-canvas'), antialias: true }); // Use the canvas element with id 'dice-canvas'
renderer.setSize(window.innerWidth, window.innerHeight);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// Set up lighting for better texture visibility
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);  // Brighter ambient
scene.add(ambientLight);

// Front light
const frontLight = new THREE.DirectionalLight(0xffffff, 1.0);
frontLight.position.set(0, 0, 10);
scene.add(frontLight);

// Top light
const topLight = new THREE.DirectionalLight(0xffffff, 0.8);
topLight.position.set(0, 10, 0);
scene.add(topLight);

// Left and Right lights
const leftLight = new THREE.DirectionalLight(0xffffff, 0.6);
leftLight.position.set(-10, 0, 0);
scene.add(leftLight);

const rightLight = new THREE.DirectionalLight(0xffffff, 0.6);
rightLight.position.set(10, 0, 0);
scene.add(rightLight);
// set camera position
camera.position.z = 10;

// 2. Create Dice Types
const textureLoader = new THREE.TextureLoader();
const DICE_TYPES = {
    d6: {
        geometry: () => new THREE.BoxGeometry(2, 2, 2),
        faces: 6,
        materials: () => [
            new THREE.MeshStandardMaterial({ map: textureLoader.load('./Textures/Cube/face1.png') }), // right
            new THREE.MeshStandardMaterial({ map: textureLoader.load('./Textures/Cube/face6.png') }), // left
            new THREE.MeshStandardMaterial({ map: textureLoader.load('./Textures/Cube/face2.png') }), // top
            new THREE.MeshStandardMaterial({ map: textureLoader.load('./Textures/Cube/face5.png') }), // bottom
            new THREE.MeshStandardMaterial({ map: textureLoader.load('./Textures/Cube/face3.png') }), // front
            new THREE.MeshStandardMaterial({ map: textureLoader.load('./Textures/Cube/face4.png') }), // back
        ],
        rotationMap: {
            1: { x: 0, y: 0, z: 0 },
            2: { x: -Math.PI / 2, y: 0, z: 0 },
            3: { x: 0, y: Math.PI / 2, z: 0 },
            4: { x: 0, y: -Math.PI / 2, z: 0 },
            5: { x: Math.PI / 2, y: 0, z: 0 },
            6: { x: Math.PI, y: 0, z: 0 }
        }
    },    d12: {
        geometry: () => new THREE.DodecahedronGeometry(3),
        faces: 12,
        materials: () => {
            // Create materials for all 12 faces with distinct colors
            return [
                new THREE.MeshStandardMaterial({ color: 0xff0000, side: THREE.DoubleSide }), // red
                new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide }), // green
                new THREE.MeshStandardMaterial({ color: 0x0000ff, side: THREE.DoubleSide }), // blue
                new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide }), // yellow
                new THREE.MeshStandardMaterial({ color: 0xff00ff, side: THREE.DoubleSide }), // magenta
                new THREE.MeshStandardMaterial({ color: 0x00ffff, side: THREE.DoubleSide }), // cyan
                new THREE.MeshStandardMaterial({ color: 0xff8000, side: THREE.DoubleSide }), // orange
                new THREE.MeshStandardMaterial({ color: 0x8000ff, side: THREE.DoubleSide }), // purple
                new THREE.MeshStandardMaterial({ color: 0x00ff80, side: THREE.DoubleSide }), // lime
                new THREE.MeshStandardMaterial({ color: 0xff0080, side: THREE.DoubleSide }), // pink
                new THREE.MeshStandardMaterial({ color: 0x80ff00, side: THREE.DoubleSide }), // chartreuse
                new THREE.MeshStandardMaterial({ color: 0x0080ff, side: THREE.DoubleSide }), // light blue
            ];
        },
        rotationMap: {
            1:  { x: 0, y: 0, z: 0 },
            2:  { x: Math.PI/3, y: 0, z: 0 },
            3:  { x: 2*Math.PI/3, y: 0, z: 0 },
            4:  { x: Math.PI, y: 0, z: 0 },
            5:  { x: 4*Math.PI/3, y: 0, z: 0 },
            6:  { x: 5*Math.PI/3, y: 0, z: 0 },
            7:  { x: 0, y: Math.PI/2, z: 0 },
            8:  { x: 0, y: Math.PI, z: 0 },
            9:  { x: 0, y: -Math.PI/2, z: 0 },
            10: { x: Math.PI/3, y: Math.PI/2, z: 0 },
            11: { x: -Math.PI/3, y: Math.PI/2, z: 0 },
            12: { x: 0, y: 0, z: Math.PI/2 }
        }
    }
};

let currentDiceType = 'd6';
let dice = null;

// 3. Create Initial Dice
const geometry = DICE_TYPES.d6.geometry();
const materials = DICE_TYPES.d6.materials();
dice = new THREE.Mesh(geometry, materials);
scene.add(dice);



// Animation loop
function animate() {
    requestAnimationFrame(animate);
    if (dice) {
        dice.rotation.x += 0.005;
        dice.rotation.y += 0.005;
    }
    renderer.render(scene, camera);
}
// Roll animation + logic
function rollDice() {
    const diceConfig = DICE_TYPES[currentDiceType];
    const result = Math.floor(Math.random() * diceConfig.faces) + 1;
    
    // Add a random spin for visual effect before settling
    const randomSpin = {
        x: (Math.random() * 2 + 2) * Math.PI, // 2-4 full spins
        y: (Math.random() * 2 + 2) * Math.PI,
        z: currentDiceType === 'd12' ? (Math.random() * 2 + 2) * Math.PI : 0
    };
    
    let targetRotation = diceConfig.rotationMap[result];
    
    // Use GSAP to animate the rotation
    gsap.to(dice.rotation, {
        x: targetRotation.x + randomSpin.x,
        y: targetRotation.y + randomSpin.y,
        z: targetRotation.z + randomSpin.z,
        duration: 2,
        ease: "power2.out",
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

// Create UI for dice type selection
function createDiceControls() {
    const controls = document.createElement('div');
    controls.style.position = 'absolute';
    controls.style.top = '20px';
    controls.style.left = '20px';
    controls.style.zIndex = '1000';

    const select = document.createElement('select');
    select.innerHTML = `
        <option value="d6">D6 (Six-sided)</option>
        <option value="d12">D12 (Twelve-sided)</option>
    `;
    select.addEventListener('change', (e) => {
        currentDiceType = e.target.value;
        changeDiceType(currentDiceType);
    });

    controls.appendChild(select);
    document.body.appendChild(controls);
}

// Function to change dice type
function changeDiceType(type) {
    console.log(`Changing dice type to ${type}...`);
    
    if (dice) {
        scene.remove(dice);
        console.log('Removed old dice');
    }

    const diceConfig = DICE_TYPES[type];
    console.log('Got dice config:', type);
    
    const geometry = diceConfig.geometry();
    console.log('Created geometry');
    
    const materials = diceConfig.materials();
    console.log('Created materials:', Array.isArray(materials) ? materials.length : 'single');
    
    dice = new THREE.Mesh(geometry, materials);
    console.log('Created new mesh');
    
    // Set initial position
    dice.position.set(0, 0, 0);
    
    // Add to scene
    scene.add(dice);
    console.log(`Created new ${type} dice`);
    
    // Adjust camera position
    camera.position.set(0, 0, type === 'd12' ? 20 : 10);
    camera.lookAt(0, 0, 0);
    console.log(`Camera positioned at z=${camera.position.z}`);
}

// Initialize the controls
createDiceControls();

animate();
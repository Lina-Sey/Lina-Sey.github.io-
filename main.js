import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// General Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); 


// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setX(0);
camera.position.setY(-3);
camera.position.setZ(28);

const cameraParams = {
  posX: camera.position.x,
  posY: camera.position.y,
  posZ: camera.position.z
};

const cameraStartPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);


// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webgl"),
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


// Fog 
scene.fog = new THREE.Fog(0xffffff, 20, 80);
const fogParams = {
  fogColor: '#ffffff',
  fogNear: 2,
  fogFar: 60
};


// Window Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


// Light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointLight, ambientLight);


// Helper
const gridHelper = new THREE.GridHelper(200, 50);
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);


// Controls
const controls = new OrbitControls(camera, renderer.domElement);


// GUI Parameter
const waveParams = {
  waveHeight: 0.8,
  waveSpeed: 0.0002,
  waveFrequency: 0.28,
  particleSize: 0.028,
  particleScale: 0.4,
  lightIntensity: 1,
  backgroundColor: '#ffffff',
  particleColor: '#000000'
};


// Particles 
const rows = 100;
const cols = 100;
const spacing = 0.6;
const particles = [];

const sphereGeometry = new THREE.SphereGeometry(waveParams.particleSize, 16, 16);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: waveParams.particleColor });

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(
      i * spacing - (rows * spacing) / 2,  
      1,                                    
      j * spacing - (cols * spacing) / 2   
    );
    scene.add(sphere);
    particles.push(sphere);
  }
}


// Particles Waves
function animateWave(time) {
  const angleOffset = Math.PI / 11;

  for (let i = 0; i < particles.length; i++) {
    const sphere = particles[i];
    const x = sphere.position.x;
    const z = sphere.position.z;

    sphere.position.y = -5 
      + Math.sin(x * waveParams.waveFrequency + time * waveParams.waveSpeed * 2 + angleOffset) * waveParams.waveHeight * 1.5
      + Math.cos(z * waveParams.waveFrequency + time * waveParams.waveSpeed * 2 + angleOffset) * waveParams.waveHeight * 1.5;

    sphere.scale.setScalar(
      waveParams.particleScale * (
        (Math.sin((x + time * 0.002) * 0.3 + angleOffset) + 2) * 0.6 
        + (Math.sin((z + time * 0.002) * 0.5 + angleOffset) + 1) * 0.6
      )
    );
  }

  // Dynamische Farbänderung
  const grayValue = Math.max(0.0, Math.sin(time * 0.0005) * 0.2);
  sphereMaterial.color.setHSL(0, 0, grayValue);
}


// Cursor
const cursor = {}
cursor.x = 0
cursor.y = 0


// Clock
const clock = new THREE.Clock()


const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()
  animateWave(performance.now());
  const parallaxX = cursor.x * 0.5;
  const parallaxY = - cursor.y * 0.5;
  camera.position.x = cameraStartPosition.x + parallaxX;
  camera.position.y = cameraStartPosition.y + parallaxY
  // controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()

// Mouse Move
window.addEventListener('mousemove', (event) =>
{
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = event.clientY / sizes.height - 0.5
})


// Scroll
function updateBackground() {
  const scrollY = window.scrollY;
  const maxScroll = window.innerHeight;  

  const scrollFactor = Math.min(scrollY / (0.9 * maxScroll), 1); 

  const newFogNear = THREE.MathUtils.lerp(2, 0, scrollFactor);
  const newFogFar = THREE.MathUtils.lerp(60, 0, scrollFactor);
  
  scene.fog.near = newFogNear;
  scene.fog.far = newFogFar;
}

window.addEventListener("scroll", updateBackground)

// Window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha:true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 2;

const controls = new OrbitControls(camera, renderer.domElement);

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 5); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
directionalLight.position.set(5, 10, 7.5); 
scene.add(directionalLight);

//TEXTURES
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/src/26.png'); 

//GLB LOADER 
let model
let mesh

const loader = new GLTFLoader();

loader.load(
    '/src/evenstarlogo.glb', 
    (gltf) => {
        model = gltf.scene; 
        model.position.set(0, 0, 0);
        model.scale.set(2,2,2)

        model.traverse((child) => {
          if (child.isMesh) {
              child.material = new THREE.MeshMatcapMaterial({
                  matcap: matcapTexture,
              });
              mesh = child; 
          }
        });

        scene.add(model); 

        startMatcapRotationAnimation();
    },
    undefined,
    (error) => {
        console.error('GLB yüklenirken bir hata oluştu:', error);
    }
);

//animation
function startMatcapRotationAnimation() {
  console.log(matcapTexture);
  
  if (model) {
      gsap.to(mesh.material.matcap, {
          rotation: 360, 
          duration: 20,        
          repeat: -1,          
          yoyo: false,        
          ease: 'none'         
      });
  }
}

//tick
function animate() {
  requestAnimationFrame(animate);
  console.log(mesh.material.matcap.rotation);
  
  renderer.render(scene, camera);
}
animate();
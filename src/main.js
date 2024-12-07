// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// // Sahne, kamera ve renderer oluştur
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({alpha:true});

// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// camera.position.z = 2;

// const controls = new OrbitControls(camera, renderer.domElement);

// //ışık
// // Ambient Light: Genel bir ortam ışığı, her yeri eşit aydınlatır
// const ambientLight = new THREE.AmbientLight(0xffffff, 5); // Renk ve parlaklık (0.5)
// scene.add(ambientLight);

// // Directional Light: Belirli bir yönden gelen ışık, gölgeler oluşturur
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Renk ve parlaklık (1.0)
// directionalLight.position.set(5, 10, 7.5); // Işığın pozisyonu
// scene.add(directionalLight);

// //TEXTURES
// const textureLoader = new THREE.TextureLoader();
// const matcapTexture = textureLoader.load('/src/26.png'); // Buraya MatCap dokusunun yolunu ekleyin


// //GLB LOADER 
// let model
// let mesh

// const loader = new GLTFLoader();

// loader.load(
//     '/src/evenstarlogo.glb', // Yüklemek istediğiniz .glb dosyasının yolu
//     (gltf) => {
//         model = gltf.scene; // Model sahnesi
//         model.position.set(0, 0, 0); // Modelin pozisyonunu ayarla
//         model.scale.set(2,2,2)

//         // Modelin her bir Mesh'ine MatCap materyali uygula
//         model.traverse((child) => {
//           if (child.isMesh) {
//               child.material = new THREE.MeshMatcapMaterial({
//                   matcap: matcapTexture,
//               });
//               mesh = child; // Mesh'e erişiyoruz
//           }
//         });

//         scene.add(model); // Modeli sahneye ekle

//         // Model tamamen yüklendiği için animasyonu başlatabiliriz
//         startModelRotationAnimation();
//     },
//     undefined, // Yükleme ilerlemesini takip etmek isterseniz buraya bir callback ekleyebilirsiniz
//     (error) => {
//         console.error('GLB yüklenirken bir hata oluştu:', error);
//     }
// );

// // // Modeli döndürmek için GSAP ile animasyon ekleyelim
// // function startModelRotationAnimation() {
// //   if (model) {
// //       // GSAP ile modelin dönüş animasyonunu başlat
// //       gsap.to(mesh.rotation, {
// //           y: Math.PI * 2, // 360 derece döndürme (2 * Math.PI)
// //           duration: 20,          // 20 saniyelik süre
// //           repeat: -1,            // Sonsuz döngü
// //           yoyo: false,           // Yoyo etkisi istemiyoruz
// //           ease: 'none'           // Sabit hızla dönüş
// //       });
// //   }
// // }



// // Modeli döndürmek için GSAP ile animasyon ekleyelim
// function startModelRotationAnimation() {
//   //console.log(mesh.material.matcap);
//   console.log(matcapTexture);
  
//   if (model) {
//       //GSAP ile modelin dönüş animasyonunu başlat
//       gsap.to(mesh.material.matcap, {
//           rotation: 360, // 360 derece döndürme (2 * Math.PI)
//           duration: 20,          // 20 saniyelik süre
//           repeat: -1,            // Sonsuz döngü
//           yoyo: false,           // Yoyo etkisi istemiyoruz
//           ease: 'none'           // Sabit hızla dönüş
//       });
//   }
// }


// // Animasyon döngüsü
// function animate() {
//   requestAnimationFrame(animate);
//   console.log(mesh.material.matcap.rotation);
  
//   renderer.render(scene, camera);
// }
// animate();


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
const ambientLight = new THREE.AmbientLight(0xffffff, 5); // Renk ve parlaklık (0.5)
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
    '/src/evenstarlogo.glb', // Yüklemek istediğiniz .glb dosyasının yolu
    (gltf) => {
        model = gltf.scene; // Model sahnesi
        model.position.set(0, 0, 0); // Modelin pozisyonunu ayarla
        model.scale.set(2,2,2)

        // Modelin her bir Mesh'ine MatCap materyali uygula
        model.traverse((child) => {
          if (child.isMesh) {
              child.material = new THREE.MeshMatcapMaterial({
                  matcap: matcapTexture,
              });
              mesh = child; 
          }
        });

        scene.add(model); 

        startModelRotationAnimation();
    },
    undefined,
    (error) => {
        console.error('GLB yüklenirken bir hata oluştu:', error);
    }
);

//animation
function startModelRotationAnimation() {
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
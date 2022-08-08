import './style.css'
import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'), 
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshNormalMaterial({color: 0xd939f9});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
//scene.add(lightHelper, gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
    const geometry = new THREE.SphereGeometry(0.2, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xfffb80})
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star);

}

Array(300).fill().forEach(addStar);

const bgTexture = new THREE.TextureLoader().load('space2.png');
scene.background = bgTexture;



//Photo

const meTexture = new THREE.TextureLoader().load('me.jpeg');

const me = new THREE.Mesh(
    new THREE.BoxGeometry(4,4,4),
    new THREE.MeshBasicMaterial({map: meTexture})
);

scene.add(me);


//Mercury

const mercuryTexture = new THREE.TextureLoader().load('nearth.jpg');
const mercuryNormalMap = new THREE.TextureLoader().load('normal.jpg');

const mercury = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: mercuryTexture,
        normalMap: mercuryNormalMap,
    })
);
 scene.add(mercury);

 mercury.position.z = 30;
 mercury.position.setX(-10);

 me.position.z = -5;
 me.position.x = 2


 //Scroll Animation

function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    mercury.rotation.x += 0.05;
    mercury.rotation.y += 0.075;
    mercury.rotation.z += 0.05;

    //me.rotation.y += 0.01;
    //me.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;

}

document.body.onscroll = moveCamera;
moveCamera();




function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    mercury.rotation.x += 0.01;

    me.rotation.x += 0.001;
    me.rotation.y += 0.002;
    me.rotation.z += 0.002;


   // controls.update()

    renderer.render(scene, camera);
};


animate();




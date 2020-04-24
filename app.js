//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;
let controls;
let dragControls;
let objects = [];
let isZoomedIn = false;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 35; //200;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1; //50;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-8, 3, 25); //(0, 0, 40);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(10, 10, 30); //(50, 50, 100);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //add controls

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  dragControls = new THREE.DragControls(objects, camera, renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./house/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    house.rotation.z = 0.9;
    objects.push(house);
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);

  house.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

function onDoubleClick(e) {
  console.log("yes");
  if (!isZoomedIn) {
    house.scale.x += 1;
    house.scale.y += 1;
    isZoomedIn = !isZoomedIn;
    console.log("yes");
  } else {
    house.scale.x -= 1;
    house.scale.y -= 1;
    isZoomedIn = !isZoomedIn;
    console.log("no");
  }
}

function onkeyDown(e) {
  e = e || window.event;

  if (e.keyCode == "38") {
    house.rotation.x += 1;
  } else if (e.keyCode == "40") {
    house.rotation.x += 1;
  } else if (e.keyCode == "37") {
    house.rotation.y += 1;
  } else if (e.keyCode == "39") {
    house.rotation.y += 1;
  }
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
window.addEventListener("keydown", onkeyDown);
window.addEventListener("dblclick", onDoubleClick);

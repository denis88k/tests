var camera, scene, renderer,
   geometry, material, mesh;

init();
animate();

function init() {
   stats = new Stats();
   stats.setMode(0);

   clock = new THREE.Clock();

   renderer = new THREE.WebGLRenderer({ alpha: true });
   renderer.setClearColor(0xFF0000, 0);
   renderer.setSize(window.innerWidth, window.innerHeight);

   scene = new THREE.Scene();

   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
   camera.position.z = 1000;
   scene.add(camera);
   material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, wireframe: true });
   mesh = new THREE.Mesh(material);
   cubeSineDriver = 0;

   THREE.ImageUtils.crossOrigin = '';

   light = new THREE.DirectionalLight(0xFFFFFF, 1);
   light.position.set(0, 0, 100);
   scene.add(light);

   smokeTexture = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
   smokeMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: smokeTexture, transparent: true });
   smokeGeo = new THREE.PlaneGeometry(300, 300);
   smokeParticles = [];


   for (p = 0; p < 150; p++) {
      var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
      particle.position.set(Math.random() * 500 - 250, Math.random() * 300 - 250, Math.random() * 1000 - 100);
      particle.rotation.z = Math.random() * 360;
      scene.add(particle);
      smokeParticles.push(particle);
   }
   document.body.appendChild(renderer.domElement);
}

function animate() {
   stats.begin();
   delta = clock.getDelta();
   requestAnimationFrame(animate);
   evolveSmoke();
   render();
   stats.end();
}

function evolveSmoke() {
   var sp = smokeParticles.length;
   while (sp--) {
      smokeParticles[sp].rotation.z += (delta * 0.15);
   }
}

function render() {
   mesh.rotation.x += 0.005;
   mesh.rotation.y += 0.01;
   cubeSineDriver += .01;
   mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 200);
   renderer.render(scene, camera);
}
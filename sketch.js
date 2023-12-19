const replicateProxy = "https://replicate-api-proxy.glitch.me";
let a = 0;
let canvas;
let pg;
let camera3D, scene, renderer, cube;
let p5s = [];
let in_front_of_you;
let input_image_field;
let words = ["positive", "negative", "awesome", "bad", "good"];


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  let lang = navigator.language || "en-US";
  let speechRec = new p5.SpeechRec(lang, gotSpeech);
  speechRec.start();

  function gotSpeech() {
    if (speechRec.resultValue) {
      createP(speechRec.resultString);
      input_image_field.value(speechRec.resultString);
    }
    console.log(speechRec);
  }
  waveColor = color(0, 50, 120, 100);
  waveColor2 = color(0, 100, 150, 100);
  waveColor3 = color(0, 200, 250, 100);
  noiseDetail(2, 0.2);

  waveColorArr = [
    waveColor,
    waveColor,
    waveColor2,
    waveColor2,
    waveColor3,
    waveColor3,
  ];

  let input_image_field = createInput("Vent Out");
  input_image_field.size(600);
  
 // let camera3D, scene, renderer;

// const replicateProxy = "https://replicate-api-proxy.glitch.me"
// let images = [];
// let in_front_of_you;
// let distanceFromCamera = -800;

// init3D();

// var input_image_field = document.createElement("input");
// input_image_field.type = "text";
// input_image_field.id = "input_image_prompt";
// input_image_field.value = "Nice picture of a dog";
// input_image_field.size = 100;
// document.getElementById("webInterfaceContainer").append(input_image_field);
// input_image_field.addEventListener("keyup", function (event) {
//     if (event.key === "Enter") {
//         askForPicture(input_image_field);
//     }
// });


// // function init3D() {
// //     scene = new THREE.Scene();
// //     camera3D = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// //     renderer = new THREE.WebGLRenderer();
// //     renderer.setSize(window.innerWidth, window.innerHeight);
// //     document.getElementById("ThreeJSContainer").append(renderer.domElement);

// //     //just a place holder the follows the camera and marks location to drop incoming  pictures
// //     //tiny little dot (could be invisible) 
// //     var geometryFront = new THREE.BoxGeometry(1, 1, 1);
// //     var materialFront = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// //     in_front_of_you = new THREE.Mesh(geometryFront, materialFront);
// //     in_front_of_you.position.set(0, 0, distanceFromCamera); //set it in front of the camera
// //     camera3D.add(in_front_of_you); // then add in front of the camera (not scene) so it follow it



// //     let bgGeometry = new THREE.SphereGeometry(950, 60, 40);
// //     // let bgGeometery = new THREE.CylinderGeometry(725, 725, 1000, 10, 10, true)
// //     bgGeometry.scale(-1, 1, 1);
// //     // has to be power of 2 like (4096 x 2048) or(8192x4096).  i think it goes upside down because texture is not right size
// //     let panotexture = new THREE.TextureLoader().load("./itp.jpg");
// //     // var material = new THREE.MeshBasicMaterial({ map: panotexture, transparent: true,   alphaTest: 0.02,opacity: 0.3});
// //     let backMaterial = new THREE.MeshBasicMaterial({ map: panotexture });
// //     let back = new THREE.Mesh(bgGeometry, backMaterial);
// //     scene.add(back);


// //     moveCameraWithMouse();

// //     camera3D.position.z = 5;
// //     animate();
// // }

// // function placeImage(img) {
// //     var texture = new THREE.Texture(img);
// //     console.log(img, texture);
// //     var material = new THREE.MeshBasicMaterial({ map: texture, transparent: false });
// //     var geo = new THREE.PlaneGeometry(512, 512);
// //     var mesh = new THREE.Mesh(geo, material);

// //     const posInWorld = new THREE.Vector3();
// //     //remember we attached a tiny to the  front of the camera in init, now we are asking for its position

// //     in_front_of_you.position.set(0, 0, distanceFromCamera);  //base the the z position on camera field of view
// //     in_front_of_you.getWorldPosition(posInWorld);
// //     mesh.position.x = posInWorld.x;
// //     mesh.position.y = posInWorld.y;
// //     mesh.position.z = posInWorld.z;
// //     console.log(posInWorld);
// //     mesh.lookAt(0, 0, 0);
// //     //mesh.scale.set(10,10, 10);
// //     scene.add(mesh);
// //     images.push({ "object": mesh, "texture": texture });
// // }


// // async function askForPicture(inputField) {
// //     prompt = inputField.value;
// //     inputField.value = "Waiting for reply for:" + prompt;


//     let data = {
//         "version": "c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316",
//         input: {
//             "prompt": prompt,
//             "width": 1024,
//             "height": 512,
//         },
//     };
//     console.log("Asking for Picture Info From Replicate via Proxy", data);
//     let options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     };
//     const url = replicateProxy + "/create_n_get/"
//     console.log("url", url, "options", options);
//     const picture_info = await fetch(url, options);
//     //console.log("picture_response", picture_info);
//     const proxy_said = await picture_info.json();

//     if (proxy_said.output.length == 0) {
//         alert("Something went wrong, try it again");
//     } else {
//         inputField.value = prompt;
//         //Loading of the home test image - img1
//         var incomingImage = new Image();
//         incomingImage.crossOrigin = "anonymous";
//         incomingImage.onload = function () {
//             placeImage(incomingImage);
//         };
//         incomingImage.src = proxy_said.output[0];
//     }
// }

// function animate() {
//     requestAnimationFrame(animate);
//     for (var i = 0; i < images.length; i++) {
//         images[i].texture.needsUpdate = true;
//     }
//     renderer.render(scene, camera3D);
// }

// /////MOUSE STUFF

// var onMouseDownMouseX = 0, onMouseDownMouseY = 0;
// var onPointerDownPointerX = 0, onPointerDownPointerY = 0;
// var lon = -90, onMouseDownLon = 0;
// var lat = 0, onMouseDownLat = 0;
// var isUserInteracting = false;


// function moveCameraWithMouse() {
//     document.addEventListener('keydown', onDocumentKeyDown, false);
//     document.addEventListener('mousedown', onDocumentMouseDown, false);
//     document.addEventListener('mousemove', onDocumentMouseMove, false);
//     document.addEventListener('mouseup', onDocumentMouseUp, false);
//     document.addEventListener('wheel', onDocumentMouseWheel, false);
//     window.addEventListener('resize', onWindowResize, false);
//     camera3D.target = new THREE.Vector3(0, 0, 0);
// }

// function onDocumentKeyDown(event) {
//     //if (event.key == " ") {
//     //in case you want to track key presses
//     //}
// }

// function onDocumentMouseDown(event) {
//     onPointerDownPointerX = event.clientX;
//     onPointerDownPointerY = event.clientY;
//     onPointerDownLon = lon;
//     onPointerDownLat = lat;
//     isUserInteracting = true;
// }

// function onDocumentMouseMove(event) {
//     if (isUserInteracting) {
//         lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
//         lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
//         computeCameraOrientation();
//     }
// }

// function onDocumentMouseUp(event) {
//     isUserInteracting = false;
// }

// function onDocumentMouseWheel(event) {
//     camera3D.fov += event.deltaY * 0.05;
//     camera3D.updateProjectionMatrix();
// }

// // function computeCameraOrientation() {
// //     lat = Math.max(- 30, Math.min(30, lat));  //restrict movement
// //     let phi = THREE.Math.degToRad(90 - lat);  //restrict movement
// //     let theta = THREE.Math.degToRad(lon);
// //     camera3D.target.x = 100 * Math.sin(phi) * Math.cos(theta);
// //     camera3D.target.y = 100 * Math.cos(phi);
// //     camera3D.target.z = 100 * Math.sin(phi) * Math.sin(theta);
// //     camera3D.lookAt(camera3D.target);
// // }


// function onWindowResize() {
//     camera3D.aspect = window.innerWidth / window.innerHeight;
//     camera3D.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     console.log('Resized');
// }

  input_image_field.id("input_image_prompt");
  input_image_field.parent("image_container");
  //add a button to ask for picture
  let button1 = createButton("Reveal");
  button1.parent("image_container");
  button1.mousePressed(() => {
    askForPicture(input_image_field.value());
  });

  // let input_field = createInput("Why should learn to use a machine learning API?");
  //input_field.id("input_prompt");
  // input_field.size(600);
  //input_field.parent("text_container");
  //add a button to ask for words
  //let button2 = createButton("Ask");
  //button2.parent("text_container");
  //button2.mousePressed(() => {
  //    askForWords(input_field.value());
  // });
  //    noStroke();

  //   for ( let i=0; i<=5; i++ ) {
  //     beginShape();
  //     fill(waveColorArr[i]);
  // 		let b = 0;

  //     for (let x = 0; x <= width+100; x += 50) {
  //       let y = map(noise(b, a-0.5*i), 0, 1, height/10*(i+1), height - height/10 + height/10*i);
  //       vertex(x, y);
  //       b += 0.08;
  //     }

  //     vertex(width, height);
  //     vertex(0, height);
  //     endShape(CLOSE);
  //   }

  //   a += 0.01 + 0.5/10000.0;
  // }

  // function windowResized(){
  //   resizeCanvas(window.innerWidth, window.innerHeight);

  //init3D();
//}
  
   console.log("Original words array:", words);
  
  // Call a function to remove negative words
  removeNegativeWords();
  
  // Print the modified array
  console.log("Words array after removing negative words:", words);
}

function removeNegativeWords() {
  for (let i = words.length - 1; i >= 0; i--) {
    let word = words[i];
    
    // Check if the word is negative and remove it
    if (isNegative(word)) {
      words.splice(i, 1);
    }
  }
}

function isNegative(word) {
  // Define a list of negative words (you can customize this list)
  let negativeWords = ["negative", "bad", "wrong", "unpleasant"];
  
  // Check if the given word is in the negative words list
  return negativeWords.includes(word);
}

async function askForPicture(p_prompt) {
  //For loop of negative words here 
  const imageDiv = select("#resulting_image");
  imageDiv.html("Waiting for reply from Replicate's Stable Diffusion API...");
  let data = {
    version: "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
    input: {
      prompt: p_prompt,
      width: 512,
      height: 512,
    },
  };
  console.log("Asking for Picture Info From Replicate via Proxy", data);
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const url = replicateProxy + "/create_n_get/";
  console.log("url", url, "options", options);
  const picture_info = await fetch(url, options);
  //console.log("picture_response", picture_info);
  const proxy_said = await picture_info.json();

  if (proxy_said.output.length == 0) {
    imageDiv.html("Something went wrong, try it again");
  } else {
    imageDiv.html("");
    loadImage(proxy_said.output[0], (img) => {
      image(img, 0, 0, width, height);
    });
  }
}

function draw() {
  //background(loadImage);
  //    pg.noStroke();
  //    for ( let i=0; i<=5; i++ ) {
  //      beginShape();
  //      fill(waveColorArr[i]);
  //  		let b = 0;
  //      for (let x = 0; x <= width+100; x += 50) {
  //        let y = map(noise(b, a-0.5*i), 0, 1, height/10*(i+1), height - height/10 + height/10*i);
  //        vertex(x, y);
  //       b += 0.08;
  //      }
  //      vertex(width, height);
  //      vertex(0, height);
  //      endShape(CLOSE);
  //    }
  //    a += 0.01 + 0.5/10000.0;
  //  }
  //  function windowResized(){
  //    resizeCanvas(window.innerWidth, window.innerHeight);
}




const particleSystemSketch = function (p) {
  particles = [];
  let partical_system_p5_canvas;
  p.setup = function () {
    partical_system_p5_canvas = p.createCanvas(512, 512);
    partical_system_p5_canvas.style("display", "none"); // hide this because I want to use in three.js
    console.log("setup particle system");
  };

  p.getP5Canvas = function () {
    return partical_system_p5_canvas.elt;
  };
  p.draw = function () {
    p.clear();

    for (let i = 0; i < 5; i++) {
      let p = new Particle();
      particles.push(p);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].finished()) {
        // remove this particle
        particles.splice(i, 1);
      }
    }
  };
  class Particle {
    constructor() {
      this.x = 300;
      this.y = 380;
      this.vx = p.random(-1, 1);
      this.vy = p.random(-5, -1);
      this.alpha = 255;
    }

    finished() {
      return this.alpha < 0;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 5;
    }

    show() {
      p.noStroke();
      //stroke(255);
      p.fill(255, 0, 255, this.alpha);
      p.ellipse(this.x, this.y, 16);
    }
  }
};

function init3D() {
  scene = new THREE.Scene();
  camera3D = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  console.log(renderer.domElement);

  let bgGeometery = new THREE.SphereGeometry(1000, 60, 40);
  // let bgGeometery = new THREE.CylinderGeometry(725, 725, 1000, 10, 10, true)
  bgGeometery.scale(-1, 1, 1);
  // has to be power of 2 like (4096 x 2048) or(8192x4096).  i think it goes upside down because texture is not right size
  //let panotexture = new THREE.TextureLoader().load("Underwater.mp4");
   let panotexture = new THREE.TextureLoader().load("underw.jpeg");
  // var material = new THREE.MeshBasicMaterial({ map: panotexture, transparent: true,   alphaTest: 0.02,opacity: 0.3});
  let backMaterial = new THREE.MeshBasicMaterial({ map: panotexture });

  let back = new THREE.Mesh(bgGeometery, backMaterial);
  scene.add(back);

  //tiny little dot (could be invisible) for placing things in front of you
  var geometryFront = new THREE.BoxGeometry(1, 1, 1);
  var materialFront = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  in_front_of_you = new THREE.Mesh(geometryFront, materialFront);
  camera3D.add(in_front_of_you); // then add in front of the camera so it follow it
  in_front_of_you.position.set(0, 0, -600);

  //convenience function for getting coordinates

  moveCameraWithMouse();

  camera3D.position.z = 0;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  for (var i = 0; i < p5s.length; i++) {
    p5s[i].texture.needsUpdate = true;
  }
  renderer.render(scene, camera3D);
}

function createP5Instance(which) {
  let sketchInstance = new p5(which); //this name is in your sketch

  let geo = new THREE.PlaneGeometry(512, 512);
  let p5Texture = new THREE.Texture(sketchInstance.getP5Canvas()); // pull the canvas out of the p5 sketch
  let mat = new THREE.MeshBasicMaterial({
    map: p5Texture,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
  });

  let plane = new THREE.Mesh(geo, mat);
  scene.add(plane);

  const posInWorld = new THREE.Vector3();
  //remember we attached a tiny to the  front of the camera in init, now we are asking for its position

  in_front_of_you.position.set(0, 0, -(700 - camera3D.fov * 5)); //base the the z position on camera field of view
  in_front_of_you.getWorldPosition(posInWorld);
  plane.position.x = posInWorld.x;
  plane.position.y = posInWorld.y;
  plane.position.z = posInWorld.z;
  console.log(posInWorld);
  plane.lookAt(0, 0, 0);
  p5s.push({
    object: plane,
    texture: p5Texture,
    p5SketchInstance: sketchInstance,
  });

  console.log("textured a plane");
  //plane.scale.set(1, 1, 1);
}

function onDocumentKeyDown(event) {
  console.log(event.key);
  if (event.key == " ") {
    createP5Instance(particleSystemSketch);
  }
}

var onMouseDownMouseX = 0,
  onMouseDownMouseY = 0;
var onPointerDownPointerX = 0,
  onPointerDownPointerY = 0;
var lon = -90,
  onMouseDownLon = 0;
var lat = 0,
  onMouseDownLat = 0;
var isUserInteracting = false;

function moveCameraWithMouse() {
  document.addEventListener("keydown", onDocumentKeyDown, false);
  document.addEventListener("mousedown", onDocumentMouseDown, false);
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("mouseup", onDocumentMouseUp, false);
  document.addEventListener("wheel", onDocumentMouseWheel, false);
  window.addEventListener("resize", onWindowResize, false);
  camera3D.target = new THREE.Vector3(0, 0, 0);
}

function onDocumentMouseDown(event) {
  onPointerDownPointerX = event.clientX;
  onPointerDownPointerY = event.clientY;
  onPointerDownLon = lon;
  onPointerDownLat = lat;
  isUserInteracting = true;
}

function onDocumentMouseMove(event) {
  if (isUserInteracting) {
    lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
    lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
    computeCameraOrientation();
  }
}

function onDocumentMouseUp(event) {
  isUserInteracting = false;
}

function onDocumentMouseWheel(event) {
  camera3D.fov += event.deltaY * 0.05;
  camera3D.updateProjectionMatrix();
}

function computeCameraOrientation() {
  lat = Math.max(-30, Math.min(30, lat)); //restrict movement
  let phi = THREE.Math.degToRad(90 - lat); //restrict movement
  let theta = THREE.Math.degToRad(lon);
  camera3D.target.x = 100 * Math.sin(phi) * Math.cos(theta);
  camera3D.target.y = 100 * Math.cos(phi);
  camera3D.target.z = 100 * Math.sin(phi) * Math.sin(theta);
  camera3D.lookAt(camera3D.target);
}

function onWindowResize() {
  camera3D.aspect = window.innerWidth / window.innerHeight;
  camera3D.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  console.log("Resized");
}


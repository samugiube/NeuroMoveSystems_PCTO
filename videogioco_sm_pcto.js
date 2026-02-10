let player;
let pista;

let schemaAttuale;
  //-2: start
  //-1: tutorial
  //0: pausa
  //1: gioco
  //2: gameOver
let oldSchema;

let start_image;
let pause_image;
let tutorial_image;
let game_over;

let x_sx = 431;
let x_dx = 1048;
let y_so = 226;
let y_st = 429;

let x_sx_pausa_riprendi = 483;
let x_dx_pausa_riprendi = 941;
let y_so_pausa_riprendi = 282;
let y_st_pausa_riprendi = 356;

let x_sx_pausa_esci = 483;
let x_dx_pausa_esci = 941;
let y_so_pausa_esci = 378;
let y_st_pausa_esci = 453;

let video;
let bodyPose;
let poses = [];
let connections;

function preload(){
    bodyPose = ml5.bodyPose();    // Load the bodyPose model
    player = loadImage('./img/sciatore.png');
    pista = loadImage('./img/pista_sci.png');
    start_image = loadImage('./img/start_image.png');
    pause_image = loadImage('./img/pause.jpg');
    tutorial_image = loadImage('./img/tutorial.png');
    game_over = loadImage('./img/game_over.jpg');
}

function setup(){
    createCanvas(start_image.width, start_image.height);
    frameRate(50);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    bodyPose.detectStart(video, gotPoses);  // Start detecting poses in the webcam video
    connections = bodyPose.getSkeleton();   // Get the skeleton connection information

    schemaAttuale = -2;
    oldSchema = schemaAttuale;
}

function draw() {
  if(schemaAttuale == -2)
    image(start_image, 0, 0);
  else if (schemaAttuale == -1){
    background(tutorial_image);
  } else if(schemaAttuale == 0){
    background(pause_image);
  } else if(schemaAttuale == 1){
    background(pista);
    image(player, 300, 350)
  } else if(schemaAttuale == 2){
    background(game_over);
  }

  let camW = 250;
  let camH = 200;
  let offX = width - camW - 10;
  let offY = height - camH - 10;

  image(video, offX, offY, camW, camH);

  // Draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        let ax = offX + (pointA.x / video.width) * camW;
        let ay = offY + (pointA.y / video.height) * camH;
        let bx = offX + (pointB.x / video.width) * camW;
        let by = offY + (pointB.y / video.height) * camH;
        line(ax, ay, bx, by);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        let x = offX + (keypoint.x / video.width) * camW;
        let y = offY + (keypoint.y / video.height) * camH;
        circle(x, y, 10);
      }
    }
  }
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  poses = results;          // Save the output to the poses variable
}

function musica(){

}

function stopAllMusic(){

}

function mouseClicked() {
  if(schemaAttuale == -2){
    if(mouseX >= x_sx && mouseX <= x_dx && mouseY >= y_so && mouseY <= y_st){
      schemaAttuale = -1;
      setTimeout(() => {
        schemaAttuale = 1;
      }, 7000);
    }
  } else if(schemaAttuale == 2){
      if(mouseX > x_sx_pausa_riprendi && mouseX < x_dx_pausa_riprendi && mouseY > y_so_pausa_riprendi && mouseY < y_st_pausa_riprendi){
        schemaAttuale = 1;
      }
      if(mouseX > x_sx_pausa_esci && mouseX < x_dx_pausa_esci && mouseY > y_so_pausa_esci && mouseY < y_st_pausa_esci){
        schemaAttuale = -2;
      }
    }
}

function keyPressed(){

}

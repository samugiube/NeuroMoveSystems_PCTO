let player;
let pista;

let schemaAttuale;
let oldSchema;

let start_image;
let pause_image;
let tutorial_image;
let game_over;

let video;
let bodyPose;
let poses = [];
let connections;

function preload(){
    bodyPose = ml5.bodyPose();    // Load the bodyPose model
    //player = loadImage();
    //pista = loadImage();
    //schemaAttuale = loadImage();
    //oldSchema = loadImage();
    start_image = loadImage('./img/image (2).jpg');
    //pause_image = loadImage();
    //tutorial_image = loadImage();
    //game_over = loadImage();
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
  image(start_image, 0, 0);

  let camW = 250;
  let camH = 200;
  let offX = width - camW;
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

}

function keyPressed(){

}

let microBit

let schema; 
let ultimoSchema
const SCHEMI = Object.freeze({
    accoppia: -3,
    tutorial: -2,
    home: -1,
    scelta: 0,
    gioco: 1,
    gameover: 2,
    pausa: 3,
})

let playerImgSx; 
let playerImgDx;
let playerWidth; 
let playerHeight;
let xInizio; 
let yInizio;

let vite = 3; 
let viteMax = 3; 
let cuoreImg;
let forzaDx; 
let forzaSx;

let pistaImg; 
let pistaOffsetY = 0; 
let pistaSpeed = 6;

let bandImg; 
let bandWidth = 360; 
let bandHeight = 90;
const bandierine = []; 
let maxBand = 5;
let punteggio

let startImg; 
let pausaImg; 
let gameOverImg; 
let tutorialImg; 
let sceltaImg

let tutPrimoFrame

function preload() {
    playerImgDx = loadImage("./img/sciatore.png")
    playerImgSx = loadImage("./img/sciatore_sx.png")
    playerWidth = 120; playerHeight = playerImgDx.height * (playerWidth / playerImgDx.width)
    cuoreImg = loadImage("./img/cuore.png")
    coppaImg = loadImage("./img/coppa.jpeg")

    pistaImg = loadImage("./img/prova.png")
    bandImg = loadImage("./img/bandierina.png")

    startImg = loadImage("./img/start_image.png")
    pausaImg = loadImage("./img/pause.jpg")
    gameOverImg = loadImage("./img/game_over.jpg")
    tutorialImg = loadImage("./img/tutorial.png")
    sceltaImg = loadImage("./img/scelta_og.png")

    punteggio = 0
    puntVittoria = 10
}

function setup() {
    createCanvas(startImg.width, startImg.height)
    frameRate(50)
    background(startImg)
    schema = SCHEMI.accoppia

    coppaX = null; 
    coppaY = null

    xInizio = startImg.width/2 - playerImgDx.width/2
    yInizio = startImg.height - playerImgDx.height/2

    player = new Player(playerImgDx, playerImgSx, xInizio, yInizio)
    microBit = new uBitWebBluetooth();

    textSize(32); 
    textAlign(LEFT)
}

function draw() {
    if (schema == SCHEMI.tutorial) {
        background(tutorialImg)
        if (frameCount >= tutPrimoFrame + 250)
            schema = SCHEMI.gioco
    }else if (schema == SCHEMI.home)
        background(startImg)
    else if (schema == SCHEMI.scelta)
        background(sceltaImg)
    else if (schema == SCHEMI.gioco) {
        background(pistaImg)
        pistaScorre()
        disegnaBandiere()
        disegnaVite()
        controllaDribbling()
        image(player.imgShow, player.x, player.y, playerWidth, playerHeight)
        text(punteggio, 12, 40)
        let forzaX = microBit.getAccelerometer().x
        if (forzaX > forzaSx) 
            player.muoviSx()
        else if (forzaX < forzaDx) 
            player.muoviDx(startImg)
    } else if (schema == SCHEMI.gameover) 
        background(gameOverImg)
    else if (schema == SCHEMI.pausa)
        background(pausaImg)

    if (punteggio >= 100)
        image(coppaImg, width - coppaImg.width - 40, 100)
}

function keyPressed() {
    if (keyCode == ESCAPE) {
        if (schema == SCHEMI.gioco)
            schema = SCHEMI.pausa
        else if (schema == SCHEMI.pausa)
            schema = SCHEMI.gioco
    }
}

function mouseClicked() {
    if (schema == SCHEMI.accoppia) {
        microBit.searchDevice()
        schema = SCHEMI.home
    } else if (schema == SCHEMI.home) {
        if (mouseX >= 460 && mouseX <= 1010 && mouseY >= 225 && mouseY <= 430)
            schema = SCHEMI.scelta
    } else if (schema == SCHEMI.scelta) {
        console.log(mouseX, mouseY)
        if (mouseY >= 375 && mouseY <= 530) {
            if (mouseX >= 140 && mouseX <= 650) {
                forzaDx = -600; forzaSx = 600
                schema = SCHEMI.tutorial
            } else if (mouseX >= 830 && mouseX <= 1340) {
                forzaDx = -300; forzaSx = 300
                schema = SCHEMI.tutorial
            }
            tutPrimoFrame = frameCount
        }
    } else if (schema == SCHEMI.gameover) {
        if (mouseX >= 510 && mouseX <= 939) {
            vite = viteMax
            bandierine.splice(0, 5)
            player.x = xInizio
            if (mouseY >= 279 && mouseY <= 354)
                schema = SCHEMI.gioco
            else if (mouseY >= 377 && mouseY <= 452)
                schema = SCHEMI.home
        }
    } else if (schema == SCHEMI.pausa) {
        if (mouseX >= 510 && mouseX <= 939) {
            if (mouseY >= 279 && mouseY <= 354)
                schema = SCHEMI.gioco
            else if (mouseY >= 377 && mouseY <= 452) {
                schema = SCHEMI.home
                vite = viteMax
                bandierine.splice(0, 5)
                player.x = xInizio
            }
        }
    }
}

function pistaScorre() {
    pistaOffsetY += pistaSpeed;
    if (pistaOffsetY >= height) 
        pistaOffsetY = 0;
    image(pistaImg, 0, pistaOffsetY - height, width, height);    
    image(pistaImg, 0, pistaOffsetY, width, height);
}

function spawnaBandiera() {
    let minPistaX = 200; 
    let maxPistaX = 1100 - bandWidth;
    let x = random(minPistaX, maxPistaX)
    if (bandierine.length == 1) {
        while (Math.abs(x - bandierine[0].x) < 250) { 
            x = random(minPistaX, maxPistaX) 
        }
    } else if (bandierine.length == 2) {
        while (Math.abs(x - bandierine[1].x) < 250) { 
            x = random(minPistaX, maxPistaX) 
        }
    }    
    bandierine.push(new Bandiera(x, 0));
}

function disegnaBandiere() {
    for (let k = bandierine.length - 1; k >= 0; k--) {
        let b = bandierine[k]
        b.y += pistaSpeed
        image(bandImg, b.x, b.y, bandWidth, bandHeight)
        if (b.y > height + 50)
            bandierine.splice(k, 1) 
    }
    if (bandierine.length < maxBand && frameCount % 50 == 0) 
        spawnaBandiera()
}

function disegnaVite() {
    for (let k = 0; k < vite; k++) {
        let x = width - 10 - ((k+1) * (cuoreImg.width + 5))
        let y = 10
        image(cuoreImg, x, y)
    }
}

function controllaDribbling() {
    for (let k = bandierine.length - 1; k >= 0; k--) {
        let b = bandierine[k];
        if (!b.check && b.y > player.y) {
            b.check = true;
            let passato = true
            punteggio++
            if (punteggio % 5 == 0) 
                pistaSpeed++
            if (player.x < b.x || player.x + playerWidth > b.x + bandWidth) 
                passato = false
            if (!passato) {
                vite--; 
                punteggio--;
                if (vite <= 0) {
                    schema = SCHEMI.gameover
                    punteggio = 0
                    pistaSpeed = 6
                }
            }
        }
    }
}
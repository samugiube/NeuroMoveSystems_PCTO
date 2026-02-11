let x1;
let x2;
let y1;
let y2;

class Player{                                    //non può avere lo stesso nome del file
    constructor(imgIniziale, x, y){              //gli oggetti vengono creati nel setup
        this.spostamento = 20;
        this.img = imgIniziale;
        this.x = x;
        this.y = y;
        this.groundY = y;
        this.velocita_y = 0;
        this.gravity = 10;
        this.salto = 80;
        this.ground = true;
    }

    jump() {
        if (this.ground) { 
            this.ground = false;
            this.velocita_y = - this.salto;
        }
    }

    discesa() {
        if (!this.ground) {
            this.velocita_y += this.gravity;
            this.y += this.velocita_y;
            if (this.id == 0)
                this.x = this.x + 25;
            else
                this.x = this.x - 25;
            if (this.y >= this.groundY) {
                this.y = this.groundY;
                this.velocita_y = 0;
                this.ground = true;
            }
        }
    }
    
    morto(guerriero1, guerriero2){
        //dist restituisce la distanza in pixels di due coppie di punti
        //per trovare il centro lat d = dist(x, y, x, y)
        //punto centrale: (x + (this.guerriero.width/2)), (y + (this.guerriero.height/2))
        //if d <= (img.width/2 + img2.width/2)
        //il controllo sulla distanza va fatto sempre, quindi nel draw
        // trova i centri dei due personaggi

        x1 = guerriero1.x + guerriero1.img.width / 2;
        y1 = guerriero1.y + guerriero1.img.height / 2;
        x2 = guerriero2.x + guerriero2.img.width / 2;
        y2 = guerriero2.y + guerriero2.img.height / 2;

        let d = dist(x1, y1, x2, y2);

        if(d <= (guerriero1.img.width/2 + guerriero2.img.width/2))
            return true;
        else
            return false;
    }
}
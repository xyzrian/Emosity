import Phaser from 'phaser'

var windowWidth = 480;
var windowHeight = 270;

export default class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload ()
    {
        const loadingMessage = this.add.text(windowWidth/2, windowHeight/2, 'LOADING.....');
        // var progressBar = this.add.graphics();
        // var progressBox = this.add.graphics();
        // progressBox.fillStyle(0x222222, 0.8);
        // progressBox.fillRect()

        // this.load.on('progress', function(value) {
            
        // });

        this.load.on('complete', function(file) {
            loadingMessage.destroy();
        });

        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('ground', 'src/assets/ground.png');
        this.load.spritesheet('player', 'src/assets/player1spritesheet.png', { frameWidth: 80, frameHeight: 80 }); 
        this.load.image('cloud1', 'src/assets/cloud1.png');
        this.load.image('cloud2', 'src/assets/cloud2.png');
        this.load.image('cloud3', 'src/assets/cloud3.png');
    }
      
    create ()
    {
        const loadingScreen = this.add.text(windowWidth/2, windowHeight/2, 'THE GAME HAS LOADED. CLICK TO CONTINUE.');

        this.input.on('pointerdown', function() {
            this.scene.start('Game');
        }, this);
    }

}

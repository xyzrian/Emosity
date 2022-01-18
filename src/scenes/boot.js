import Phaser from 'phaser'

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

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

        this.load.image('logo', 'src/assets/logo.png');
        this.load.image('dude', 'src/assets/dude.png');
        this.load.image('platform', 'src/assets/platform.png');
        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('star', 'src/assets/star.png');
    }
      
    create ()
    {
        const loadingScreen = this.add.text(windowWidth/2, windowHeight/2, 'THE GAME HAS LOADED. CLICK TO CONTINUE.');

        this.input.on('pointerdown', function() {
            this.scene.start('Game');
        }, this);
    }

}

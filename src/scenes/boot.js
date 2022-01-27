import Phaser from 'phaser'

var windowWidth = 480;
var windowHeight = 270;

export default class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload ()
    {
        const loadingMessage = this.add.text(windowWidth/2, windowHeight/2, 'LOADING.....').setOrigin(0.5, 0.5);
        // var progressBar = this.add.graphics();
        // var progressBox = this.add.graphics();
        // progressBox.fillStyle(0x222222, 0.8);
        // progressBox.fillRect()

        // this.load.on('progress', function(value) {
            
        // });

        this.load.on('complete', function(file) {
            loadingMessage.destroy();
        });

        // this.load.bitmapFont('minecraftRegular', 'src/assets/MinecraftRegular.png', 'src/assets/MinecraftRegular.xml');
        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('ground', 'src/assets/ground.png');
        this.load.spritesheet('player', 'src/assets/additionalframetest.png', { frameWidth: 54, frameHeight: 76 }); 
        this.load.image('cloudsLarge', 'src/assets/cloudsLarge.png');
        this.load.image('cloudsMedium', 'src/assets/cloudsMedium.png');
        this.load.image('cloudsSmall', 'src/assets/cloudsSmall.png');
    }
      
    create ()
    {
        // const loadingScreen = this.add.bitmapText(windowWidth/2, windowHeight/2, 'minecraftRegular', 'THE GAME HAS LOADED. CLICK TO CONTINUE.').setOrigin(0.5, 0.5);
        const loadingScreen = this.add.text(windowWidth/2, windowHeight/2, 'THE GAME HAS LOADED. CLICK TO CONTINUE.').setOrigin(0.5, 0.5);

        this.input.on('pointerdown', function() {
            this.scene.start('Game');
        }, this);
    }

}

import Phaser from 'phaser'

var windowWidth = 480;
var windowHeight = 270;

export default class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'Boot',
            pack: {
                files: [{
                    key: 'loading',
                    type: 'spritesheet',
                    url: 'src/assets/loading.png',
                    frameConfig: {
                        frameWidth: 84, 
                        frameHeight: 12
                    }
                }, 
                {
                    type: 'image',
                    key: 'logo',
                    url: 'src/assets/logo.png'
                }]
            }
        });
    }

    preload ()
    {
        const loadingMessage = this.add.sprite(windowWidth/2, windowHeight/2, 'loading');
        this.anims.create({
            key: 'loading',
            frames: this.anims.generateFrameNumbers('loading'),
            frameRate: 5,
            repeat: -1,
        });

        loadingMessage.anims.play('loading', true);

        this.load.on('complete', function(file) {
            loadingMessage.destroy();
        });

        this.load.spritesheet('player', 'src/assets/player1.png', { frameWidth: 42, frameHeight: 76 }); 
        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('cloudsLarge', 'src/assets/cloudsLarge.png');
        this.load.image('cloudsMedium', 'src/assets/cloudsMedium.png');
        this.load.image('cloudsSmall', 'src/assets/cloudsSmall.png');
        this.load.image('logo', 'src/assets/logo.png' )

        this.load.tilemapTiledJSON('map', 'src/assets/testmap.json');
        this.load.image('tiles', 'src/assets/grasstileset.png');


        for (var i = 0; i < 500; i++) {
			this.load.image('testloading'+i, 'src/assets/star.png');
		};
    }
      
    create ()
    {
        this.add.sprite(windowWidth/2, windowHeight/2, 'sky');
        var emosity = this.add.sprite(windowWidth/2, windowHeight/2, 'logo');

        this.tweens.add({
            targets: emosity,
            alpha: { from: 0.1, to: 1},
            duration: 1500,
        });

        this.input.on('pointerdown', function() {
            this.scene.start('Game');
        }, this);
    }
}

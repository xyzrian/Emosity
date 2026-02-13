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
                    url: 'assets/loading.png',
                    frameConfig: {
                        frameWidth: 84, 
                        frameHeight: 12
                    }
                }, 
                {
                    type: 'image',
                    key: 'logo',
                    url: 'assets/logo.png'
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

        this.load.spritesheet('player', 'assets/player1.png', { frameWidth: 42, frameHeight: 76 }); 
        this.load.image('playerIntro', 'assets/playerIntro.png');
        this.load.image('blackBg', 'assets/blackBg.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('cloudsLarge', 'assets/cloudsLarge.png');
        this.load.image('cloudsMedium', 'assets/cloudsMedium.png');
        this.load.image('cloudsSmall', 'assets/cloudsSmall.png');
        this.load.image('logo', 'assets/logo.png' )
        this.load.image('house', 'assets/house.png');

        this.load.tilemapTiledJSON('map', 'assets/mapv1_67.json');
        this.load.tilemapTiledJSON('house','assets/house.json');
        this.load.image('houseBackground', 'assets/houseBackground.png');
        this.load.image('interior', 'assets/interior2.png');
        this.load.spritesheet('doors', 'assets/doors.png', { frameWidth: 33, frameHeight: 61, startFrame: 0, endFrame: 1 });
        this.load.image('guitar', 'assets/guitar.png');
        this.load.image('bed', 'assets/bed.png');
        this.load.image('paintings', 'assets/paintings.png');

        this.load.image('grasstiles', 'assets/grasstileset.png');
        this.load.spritesheet('records', 'assets/records.png', { frameWidth: 19, frameHeight: 12, startFrame: 0, endFrame: 10});
        this.load.spritesheet('decor', 'assets/decor.png', { frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.image('walls', 'assets/wall.png');
        this.load.image('ladders', 'assets/ladder.png');

        this.load.image('inventoryIcon', 'assets/inventoryIcon.png');
        this.load.spritesheet('buttons', 'assets/buttons.png', { frameWidth: 25, frameHeight: 25, startFrame: 0, endFrame: 1});

        this.load.atlas('musicNotes', 'assets/musicNotes.png', 'assets/musicNotes.json');
        this.load.atlas('deathParticles', 'assets/deathParticles.png', 'assets/deathParticles.json');

        this.load.image('respawnButton', 'assets/respawnButton.png');

        this.load.spritesheet('enemies', 'assets/enemy.png', { frameWidth: 27, frameHeight: 30, startFrame: 0, endFrame: 1 });

        this.load.audio('blackMusic', ['assets/LateAtNight.mp3']);
        this.load.audio('redMusic', ['assets/ElevatorMusic.mp3']);
        this.load.audio('yellowMusic', ['assets/ForestWalk.mp3']);
        this.load.audio('blueMusic', ['assets/marimbamagic.mp3']);
        this.load.audio('mixedbluetealMusic', ['assets/LateAtNight.mp3']);
        this.load.audio('mixedbluepinkMusic', ['assets/MelodyOfNature.mp3']);
        this.load.audio('brokenMusic', ['assets/Clown.mp3']);
        this.load.audio('orangeMusic', ['assets/GoodFellow.mp3']);
        this.load.audio('greenMusic', ['assets/GoodFellow.mp3']);
        this.load.audio('mixedtealpurpleMusic', ['assets/MELODICMETALCORE.mp3']);

        this.load.bitmapFont('minogram_6x10', 'assets/minogram_6x10.png', 'assets/minogram_6x10.xml');
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

        this.input.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Intro');
            })
        }, this);

        this.input.on('pointerdown', () => {
            this.scene.start('Intro');
        }, this);
    }
}

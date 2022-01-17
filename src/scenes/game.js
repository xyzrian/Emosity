import Phaser from 'phaser'

var scaleRatio = window.devicePixelRatio / 3;
var ground;

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload ()
    {
        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('ground', 'src/assets/ground.png');
        // this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 }); player spritesheet
        this.load.image('player1', 'src/assets/player1.png');
        this.load.image('cloud1', 'src/assets/cloud1.png');
        this.load.image('cloud2', 'src/assets/cloud2.png');
        this.load.image('cloud3', 'src/assets/cloud3.png');
    }
      
    create ()
    {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.add.image()
        
        // ground = this.physics.add.staticGroup();
        // ground.create(60, 300, 'ground').scaleRatio();
    }
}

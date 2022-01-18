import Phaser from 'phaser'

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
// var scaleRatio = window.devicePixelRatio / 3;
var ground;

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload ()
    {
        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('ground', 'src/assets/ground.png');
        this.load.spritesheet('player1spritesheet', 'src/games/firstgame/assets/player1spritesheet.png', { frameWidth: 80, frameHeight: 80 }); 
        this.load.image('player1', 'src/assets/player1.png');
        this.load.image('cloud1', 'src/assets/cloud1.png');
        this.load.image('cloud2', 'src/assets/cloud2.png');
        this.load.image('cloud3', 'src/assets/cloud3.png');
    }
      
    create ()
    {
        this.add.image(windowWidth/2, windowHeight/2, 'sky').setDisplaySize(windowWidth, windowHeight);
        // this.add.image()
        
        ground = this.physics.add.staticGroup();
        ground.create(0, windowHeight, 'ground'); // fix this !!!!!!!!!!!
        this.scale.on('resize', resize, this);
    }

    resize (gameSize, baseSize, displaySize, resolution)
    {
        var width = gameSize.width;
        var height = gameSize.height;

        this.cameras.resize(width, height);

        sky.setSize(width, height);
        // this.logo.setPosition(width / 2, height / 2);
    }
}

import Phaser from 'phaser'

var scaleRatio = window.devicePixelRatio / 3;
var ground;

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload ()
    {
        this.load.image('sky', 'src/assets/ground.png');
        this.load.image('ground', 'src/assets/ground.png');
    }
      
    create ()
    {
        this.add.image(400, 300, 'sky');
        
        // ground = this.physics.add.staticGroup();
        // ground.create(60, 300, 'ground').scaleRatio();
    }
}
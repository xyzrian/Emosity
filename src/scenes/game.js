import Phaser from 'phaser'
import Player from './player.js'

var windowWidth = 480;
var windowHeight = 270;
var gameWidth = 1568;
var gameHeight = 320;
// var cursors;
var space;
var esc;
var player;
var map;
var tileset;
var platforms;
var cloudsSmall;
var cloudsMedium;
var cloudsLarge;

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload ()
    {

    }
      
    create ()
    {
        //World bounds
        this.physics.world.setBounds(0, 0, gameWidth, gameHeight, true, false, false, true);  // left/right/top/bottom

        //Sky & clouds
        this.add.tileSprite(0, gameHeight, gameWidth, gameHeight,'sky').setOrigin(0, 1);
        cloudsSmall = this.add.tileSprite(0, gameHeight, gameWidth, gameHeight, "cloudsSmall").setOrigin(0, 1);
        cloudsMedium = this.add.tileSprite(0, gameHeight, gameWidth, gameHeight, "cloudsMedium").setOrigin(0, 1);
        cloudsLarge = this.add.tileSprite(0, gameHeight, gameWidth, gameHeight, "cloudsLarge").setOrigin(0, 1);
        
        //Tileset platforms
        map = this.make.tilemap({key: 'map'}); //JSON import name
        tileset = map.addTilesetImage('grasstileset', 'tiles'); //Tiled tileset name, png import name
        platforms = map.createLayer("platforms", tileset, 0, 0); //Tiled layer name
        // platforms = map.createLayer("platforms", tileset, 0, windowHeight).setOrigin(0, 1); //Tiled layer name
        // platforms.setOrigin(1, 1).setPosition(0, windowHeight);
        platforms.setCollisionBetween(1, 25); //start and stop tiles

        //Player instantiation
        player = this.physics.add.existing(new Player(this, 20, gameHeight-120, 'player'));
        player.setBodySize(player.width*0.5, player.height*0.9);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);  

        //Camera instantiation
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight);
        this.cameras.main.startFollow(player);

        // cursors = this.input.keyboard.createCursorKeys();
        // esc = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        // space = this.input.keyboard.addKey(Phaser.Keyboard.SPACE);

    }

    update ()
    {
        //Cloud animation
        cloudsSmall.tilePositionX += 0.25;
        cloudsMedium.tilePositionX += 0.2;
        cloudsLarge.tilePositionX += 0.1;
    }
}


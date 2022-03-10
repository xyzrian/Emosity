import Phaser from 'phaser'
import Player from './player.js'

var windowWidth = 480;
var windowHeight = 270;
var gameWidth = 32*32;
var gameHeight = 13*32;
// var cursors;
var space;
var esc;
var player;
var map;
var grasstileset;
var platforms;
var decorGroup;
var recordGroup;
var cloudsSmall;
var cloudsMedium;
var cloudsLarge;

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload ()
    {
        this.gameWidth = this.sys.game.canvas.width
        this.gameHeight = this.sys.game.canvas.height
    }
      
    create ()
    {
        // var { gameWidth, gameHeight } = this.sys.game.canvas;
        //World bounds
        this.physics.world.setBounds(0, 0, gameWidth, gameHeight, true, false, false, true);  // left/right/top/bottom

        //Sky & clouds
        this.add.tileSprite(0, gameHeight, gameWidth, gameHeight,'sky').setOrigin(0, 1);
        cloudsSmall = this.add.tileSprite(0, gameHeight, gameWidth, gameHeight, "cloudsSmall").setOrigin(0, 1);
        cloudsMedium = this.add.tileSprite(0, gameHeight, gameWidth, gameHeight, "cloudsMedium").setOrigin(0, 1);
        cloudsLarge = this.add.tileSprite(0, gameHeight, gameWidth, gameHeight, "cloudsLarge").setOrigin(0, 1);
        
        //Tiled map
        map = this.make.tilemap({key: 'map'}); //JSON import name
        
        grasstileset = map.addTilesetImage('grasstileset', 'grasstiles'); //Tiled tileset name, png import name
        // recordstileset = map.addTilesetImage('records', 'records');
        
        platforms = map.createLayer('platforms', grasstileset); //Tiled layer name
        // this.platforms.resizeWorld();
        
        recordGroup = this.physics.add.group(); //was staticgroup before
        recordGroup = map.createFromObjects('records', { key: 'yellowrecord' }); //placeholder texture
        // recordGroup = map.createFromObjects('records', { gid: 26, key: 'redrecord' });
        // recordGroup = map.createFromObjects('records', { gid: 21, key: 'yellowrecord' });

        recordGroup.forEach(object => {
            console.log(object.getData(0));
            if(object.getData(0).value == 'yellow')
            {
                object.setTexture('records', 0);
            }
            else if(object.getData(0).value == 'blue')
            {
                object.setTexture('records', 1);
            }
            else if(object.getData(0).value == 'red')
            {
                object.setTexture('records', 2);
            }
        })

        // recordGroup.refresh();

        decorGroup = map.createFromObjects('decor', { key: 'decor' });

        decorGroup.forEach(object => {
            // console.log(object.get.values.gid);
            
            if(object.getData(0).value == 'tall')
            {
                object.setTexture('decor', 0);
            }
            else if(object.getData(0).value == 'short')
            {
                object.setTexture('decor', 1);
            }
            else if(object.getData(0).value == 'blue')
            {
                object.setTexture('decor', 2);
            }
        })

        platforms.setCollisionByExclusion([-1]); 

        //Player instantiation
        player = this.physics.add.existing(new Player(this, 20, gameHeight-120, 'player'));
        player.setBodySize(player.width*0.5, player.height*0.9);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);  

        this.physics.add.overlap(player, recordGroup, this.collectRecord, null, this);

        //Camera instantiation
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight);
        this.cameras.main.startFollow(player);

        // cursors = this.input.keyboard.createCursorKeys();
        // esc = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        // space = this.input.keyboard.addKey(Phaser.Keyboard.SPACE);

    }

    update ()
    {
        // this.physics.add.overlap(player, recordGroup, this.collectRecord, null, this);
        //Cloud animation
        cloudsSmall.tilePositionX += 0.15;
        cloudsMedium.tilePositionX += 0.1;
        cloudsLarge.tilePositionX += 0.05;
    }

    collectRecord(player, record) 
    {
        console.log('hi');
        // record.destroy(record.x, record.y);
        // record.disableBody(true, true);
        // record.setActive(false).setVisible(false);
    }
}


import Phaser from 'phaser'
import Player from './player.js'
import { uiWidgets, Viewport, Column } from 'phaser-ui-tools'

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
var records;
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
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        }); 
    }
      
    create ()
    {
        // this.plugins.installScenePlugin('phaser-ui-tools', uiWidgets, null, true);
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
        // platforms.resizeWorld(); this shit is undefined
        
        recordGroup = this.physics.add.staticGroup(); 
        records = map.createFromObjects('records', { key: 'defaultrecord' }); //placeholder texture
        records.forEach(object => {
            console.log(object.getData(0).name);
            if(object.getData(0).value == 'red')
            {
                object.setTexture('records', 1);
            }
            else if(object.getData(0).value == 'yellow')
            {
                object.setTexture('records', 2);
            }
            else if(object.getData(0).value == 'blue')
            {
                object.setTexture('records', 3);
            }
            else if(object.getData(0).value == 'mixedblueteal')
            {
                object.setTexture('records', 4);
            }
            else if(object.getData(0).value == 'mixedbluepink')
            {
                object.setTexture('records', 5);
            }

            recordGroup.add(object);
        })

        decorGroup = map.createFromObjects('decor', { key: 'decor' });
        decorGroup.forEach(object => {
            if(object.getData(0).name == 'grass')
            {
                if(object.getData(0).value == 'tall')
                {
                    object.setTexture('decor', 0);
                }
                else if(object.getData(0).value == 'short')
                {
                    object.setTexture('decor', 1);
                }
            }

            else if(object.getData(0).name == 'flower')
            {
                if(object.getData(0).value == 'blue')
                {
                    object.setTexture('decor', 2);
                }
                else if(object.getData(0).value == 'pink')
                {
                    object.setTexture('decor', 3);
                }
                else if(object.getData(0).value == 'yellow')
                {
                    object.setTexture('decor', 4);
                }
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

        // var panel = this.rexUI.add.scrollablePanel(config);

        this.scene.launch('Inventory');


    }

    update ()
    {
        //Cloud animation
        cloudsSmall.tilePositionX += 0.15;
        cloudsMedium.tilePositionX += 0.1;
        cloudsLarge.tilePositionX += 0.05;
    }

    collectRecord(player, record) 
    {
        record.setActive(false).setVisible(false);
    }
}


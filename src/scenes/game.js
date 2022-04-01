import Phaser from 'phaser'
import Player from './player.js'

var windowWidth = 480;
var windowHeight = 270;
var gameWidth = 32*32;
var gameHeight = 13*32;

// var cursors;
var space;
var esc;

var inventoryIcon;
var inventoryFlag = false;
var gridWidth = 300;
var gridHeight = 200;
var gridCellWidth = 75;
var gridCellHeight = 100;
var currentCol = 0;
var currentGrid = 0;
var topLeft = [];
var bottomLeft = [];
var buttons;

var player;
var map;
var grasstileset;

var platforms;
var decor;
var records;
var recordGroup;
var collected; 

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
        records = map.createFromObjects('records', { key: 'records' }); //placeholder texture
        records.forEach(object => {
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

        decor = map.createFromObjects('decor', { key: 'decor' });
        decor.forEach(object => {
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

        inventoryIcon = this.add.sprite(windowWidth-20, 20, 'star').setInteractive().setScrollFactor(0, 0);
        collected = this.physics.add.staticGroup();
        collected.scaleXY(2);

        buttons = this.add.group();

        var inventory = this.add.grid(windowWidth/2, windowHeight/2, gridWidth, gridHeight, gridCellWidth, gridCellHeight, 0x4B4B4B)
                                .setAltFillStyle(0x656565)
                                // .setOutlineStyle(0x000000)
                                .setActive(false)
                                .setVisible(false)
                                .setScrollFactor(0, 0);
        
        inventory.getTopLeft(topLeft);
        inventory.getBottomLeft(bottomLeft);

        inventoryIcon.on('pointerdown', function () {
            if(inventoryFlag == false)
            {
                inventory.setActive(true).setVisible(true);
                collected.setActive(true).setVisible(true);
                buttons.setActive(true).setVisible(true);
                inventoryFlag = true;
            }
            else
            {
                inventory.setActive(false).setVisible(false);
                collected.setActive(false).setVisible(false);
                buttons.setActive(true).setVisible(false);
                inventoryFlag = false;
            }
        }, this);

        //Vinyl songs
        // var blue = this.sound.add('blue', { loop: false });
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
        collected.add(record);
        recordGroup.remove(record);
        
        record.setActive(false).setVisible(false).setScrollFactor(0, 0).setScale(2).setDepth(1);

        var blue;
        var button = this.add.sprite(0, 0, 'buttons', 1).setActive(false).setVisible(false).setInteractive().setScrollFactor(0, 0);
        buttons.add(button);
        button.setDataEnabled();
        button.data.set('vinyl', record.getData(0).value);
        button.data.set('playing', false);
        button.on('pointerdown', function () {
            if(button.getData('playing') == false)
            {
                buttons.children.each(function(button) {
                    button.setTexture('buttons', 1);
                });
                button.setTexture('buttons', 0);
                button.setData('playing', true);
                blue = this.sound.add('blue', { loop: false });
                blue.play();
            }
            else if(button.getData('playing') == true)
            {
                button.setTexture('buttons', 1);
                button.setData('playing', false);
                blue.stop();
            }
        }, this);

        //reset currentCol when reaching new row
        if(currentGrid == 4)
        {
            currentCol = 0;
        }

        if(currentGrid <= 3)
        {
            record.setPosition(topLeft['x']+(gridCellWidth/2)+(gridCellWidth*currentCol), topLeft['y']+(gridCellHeight/3), 1); // z = depth of 1 
            button.setPosition(topLeft['x']+(gridCellWidth/2)+(gridCellWidth*currentCol), topLeft['y']+(gridCellHeight*2/3), 1);
        }
        else
        {
            record.setPosition(bottomLeft['x']+(gridCellWidth/2)+(gridCellWidth*currentCol), bottomLeft['y']-(gridCellHeight*2/3), 1);
            button.setPosition(bottomLeft['x']+(gridCellWidth/2)+(gridCellWidth*currentCol), bottomLeft['y']-(gridCellHeight/3), 1);
        }

        currentCol++;
        currentGrid++;
    }


}



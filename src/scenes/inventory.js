import Phaser from 'phaser'
import Player from './player'

var windowWidth = 480;
var windowHeight = 270;
var inventoryFlag = false;

var gridWidth = 300;
var gridHeight = 200;
var gridCellWidth = 75;
var gridCellHeight = 100;

var currentY = gridHeight;

var recordGroup;

export default class Inventory extends Phaser.Scene {
    constructor() {
        super('Inventory');
    }

    // init (data)
    // {
    //     console.log('init', data);
    //     this.recordGroup = data.records;
    // }

    preload ()
    {

    }

    create ()

    {
        // var inventoryIcon = this.add.sprite(windowWidth-20, 20, 'star').setInteractive();

        var inventory = this.add.grid(windowWidth/2, windowHeight/2, gridWidth, gridHeight, gridCellWidth, gridCellHeight, 0x4B4B4B).setAltFillStyle(0x656565).setOutlineStyle().setActive(false).setVisible(false);



        // for (var y = 0; y < gridHeight; y++)
        // {
        //     console.log(y);
        //     var block1 = this.add.rectangle(gridSize * 2, (currentY - 1) * gridSize, gridSize - 1, gridSize - 1, 0x655B59).setOrigin(0);
        //     var block2 = this.add.rectangle(gridSize * 3, (currentY - 1) * gridSize, gridSize - 1, gridSize - 1, 0x655B59).setOrigin(0);
        //     var block3 = this.add.rectangle(gridSize * 4, (currentY - 1) * gridSize, gridSize - 1, gridSize - 1, 0x655B59).setOrigin(0);
            
        //     for (var y = 0; y < gridHeight; y++)
        //     {
        //         grid.push([ 0, 0, 0, 0, 0, 0, 0 ]);
        //     }
        // }

        inventoryIcon.on('pointerdown', function () {
            if(inventoryFlag == false)
            {
                inventory.setActive(true).setVisible(true);
                inventoryFlag = true;
            }
            else
            {
                inventory.setActive(false).setVisible(false);
                inventoryFlag = false;
            }
        }, this)

    }

    update ()
    {

    }
}
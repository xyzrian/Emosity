import Phaser from 'phaser'
import Player from './player'

var windowWidth = 480;
var windowHeight = 270;
var inventoryFlag = false;

var gridWidth = 300;
var gridHeight = 200;

export default class Game extends Phaser.Scene {
    constructor() {
        super('Inventory');
    }

    preload ()
    {

    }

    create ()

    {
        var inventoryIcon = this.add.sprite(windowWidth-20, 20, 'star').setInteractive();

        var inventory = this.add.grid(windowWidth/2, windowHeight/2, gridWidth, gridHeight, 50, 50, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle().setActive(false).setVisible(false);

        var grid = [];

        for (var y = 0; y < gridHeight; y++)
        {
            grid.push([0, 0, 0, 0, 0, 0])
        }

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
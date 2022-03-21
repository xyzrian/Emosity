import Phaser from 'phaser'
import Boot from './scenes/boot'
import Game from './scenes/game'
import Inventory from './scenes/inventory'

// const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
// const DEFAULT_HEIGHT = 270 // any height you want
// const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT

const config = {
    title: "Emosity",
    version: "0.0.1",
    type: Phaser.AUTO,
    pixelArt: true,
    width: 480,
    height: 270,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "phaser-game"
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:450 },
            debug: false
        }
    },
    scene: [Boot, Game, Inventory]
};

const game = new Phaser.Game(config);

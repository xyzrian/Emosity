import Phaser from 'phaser'
import Boot from './scenes/boot'
import Game from './scenes/game'

const config = {
    title: "Emosity",
    version: "0.0.1",
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "phaser-game",
        width: 480,
        height: 270,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:450 },
            debug: false
        }
    },
    scene: [Boot, Game]
};

const game = new Phaser.Game(config);

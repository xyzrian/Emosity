import Phaser from 'phaser'
import Boot from './scenes/boot'
import Game from './scenes/game'

// var scaleRatio = window.devicePixelRatio / 3; //load in assets, scale with myAsset.scale.setTo(scaleRatio, scaleRatio);

const config = {
    title: "Emosity",
    version: "0.0.1",
    type: Phaser.AUTO,
    pixelArt: true,
    // width: window.innerWidth * window.devicePixelRatio,
    // height: window.innerHeight * window.devicePixelRatio,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "phaser-game",
        width: 480,
        height: 270,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:400 },
            debug: false
        }
    },
    scene: [Boot, Game]
};

const game = new Phaser.Game(config);

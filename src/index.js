import Phaser from 'phaser'
import Boot from './scenes/boot'
import Intro from './scenes/intro'
import Game from './scenes/game'
import HouseInterior from './scenes/HouseInterior.js';
import Outro from './scenes/outro'

const config = {
    title: "Emosity",
    version: "0.0.1",
    type: Phaser.AUTO,
    // pixelArt: true,
    width: 480,
    height: 270,
    // resolution: window.devicePixelRatio || 1,
    // antialias: false,
    render: {
        pixelArt: true,
        antialias: true,
        antialiasGL: true,
        roundPixels: true
    },
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
    scene: [Boot, Intro, Game, HouseInterior, Outro]
};

const game = new Phaser.Game(config);

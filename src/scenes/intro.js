import Phaser from 'phaser'

var windowWidth = 480;
var windowHeight = 270;

var text;

var textX = 190;
var textY = 60;

export default class Intro extends Phaser.Scene {
    constructor() {
        super('Intro');
    }

    preload() {
        this.load.bitmapFont('minogram_6x10', 'assets/minogram_6x10.png', 'assets/minogram_6x10.xml');
        
    }

    create ()
    {
        this.add.sprite(0, 0, 'blackBg').setOrigin(0, 0);
        var player = this.add.sprite(0, 0, 'playerIntro').setOrigin(0, 0);

        this.tweens.add({
            targets: player,
            alpha: { from: 0.1, to: 1},
            duration: 2000,
        });

        var script = [
            "I HAVEN\'T SLEPT IN DAYS",
            "NO MUSIC... NO SLEEP",
            "THESE MONSTERS...",
            "THEY TOOK THE ONLY THING",
            "THAT MATTERS TO ME",
            "PLEASE...",
            "HELP ME GET MY VINYL BACK!"
        ]

        this.load.bitmapFont('minogram_6x10', 'assets/minogram_6x10.png', 'assets/minogram_6x10.xml');
        text = this.add.bitmapText(textX, textY, 'minogram_6x10', '', 16);
        
        this.displayText(script);

        this.input.on('pointerdown', () => {
            this.scene.start('Game');
        }, this);
    }

    update ()
    {
        
    }

    displayText (message)
    {
        const length = message.length;
        let i = 0;
        this.time.addEvent({
            callback: () => {
                text.text += '\n' + message[i];
                textY + 20;
                i++;
            },
            repeat: length-1,
            delay: 1500
        })
    }
}
import Phaser from 'phaser'

var windowWidth = 480;
var windowHeight = 270;
// var scaleRatio = window.devicePixelRatio / 3;
var cursors;
var space;
var esc;
var player;
var ground;

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload ()
    {
        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('ground', 'src/assets/ground.png');
        this.load.spritesheet('player', 'src/assets/player1spritesheet.png', { frameWidth: 80, frameHeight: 80 }); 
        this.load.image('cloud1', 'src/assets/cloud1.png');
        this.load.image('cloud2', 'src/assets/cloud2.png');
        this.load.image('cloud3', 'src/assets/cloud3.png');
    }
      
    create ()
    {
        this.add.image(windowWidth/2, windowHeight/2, 'sky').setDisplaySize(windowWidth, windowHeight);
        
        ground = this.physics.add.staticGroup();
        ground.create(windowWidth, windowHeight, 'ground').setOrigin(1, 1).setPosition(windowWidth, windowHeight).refreshBody(); 
        
        player = this.physics.add.sprite(80, 80, 'player');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, ground);

        cursors = this.input.keyboard.createCursorKeys();
        // esc = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        // space = this.input.keyboard.addKey(Phaser.Keyboard.SPACE);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start: 2, end: 3}),
            frameRate: 10,
            repeat: -1
        });
    }

    update ()
    {
        if(cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if(cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
            player.anims.play(false);
        }

        if(cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-150);
        }

        this.physics.add.collider(player, ground);
    }
}

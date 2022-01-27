import Phaser from 'phaser'

var windowWidth = 480;
var windowHeight = 270;
// var scaleRatio = window.devicePixelRatio / 3;
var cursors;
var space;
var esc;
var player;
var ground;
var cloudsSmall;
var cloudsMedium;
var cloudsLarge;

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload ()
    {

    }
      
    create ()
    {
        this.add.image(windowWidth/2, windowHeight/2, 'sky').setDisplaySize(windowWidth, windowHeight);
        cloudsSmall = this.add.tileSprite(240, 135, 480, 270, "cloudsSmall");
        cloudsMedium = this.add.tileSprite(240, 135, 480, 270, "cloudsMedium");
        cloudsLarge = this.add.tileSprite(240, 135, 480, 270, "cloudsLarge");
        
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
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 2}),
            frameRate: 7,
            repeat: -1,
            yoyo: true
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start: 4, end: 5}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'default',
            frames: [{key: 'player', frame: 3}],
            frameRate: 10
        });

    }

    update ()
    {
        cloudsSmall.tilePositionX += 0.25;
        cloudsMedium.tilePositionX += 0.2;
        cloudsLarge.tilePositionX += 0.1;

        if(cursors.left.isDown)
        {
            player.setVelocityX(-120);
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
            player.anims.play('default', true);
        }

        if(cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-150);
        }

        this.physics.add.collider(player, ground);
    }
}


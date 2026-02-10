import Phaser from 'phaser';
import Player from './player.js';

var interiorWidth = 29*32;
var interiorHeight = 19*32;



export default class HouseInterior extends Phaser.Scene {
    constructor() {
        super('HouseInterior');
    }

    create(data) {

        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        
        // RESET CAMERA FADE
        this.cameras.main.fadeIn(300, 0, 0, 0);
        
        //World bounds
        this.physics.world.setBounds(0, 0, interiorWidth, interiorHeight, true, false, false, true);  // left/right/top/bottom
        this.add.tileSprite(0, interiorHeight, interiorWidth, interiorHeight,'sky').setOrigin(0, 1);

        const map = this.make.tilemap({ key: 'houseInterior' });

        const tileset = map.addTilesetImage('interior1','interior1');
        const doorTiles = map.addTilesetImage('doors', 'doors');
        const bedTiles = map.addTilesetImage('bed', 'bed');
        const guitarTiles = map.addTilesetImage('guitar', 'guitar');


        const platforms = map.createLayer('platforms', tileset);
        this.ladders = map.createLayer('ladders', tileset);
        platforms.setCollisionByExclusion([-1]);
        // ladders.setCollisionByExclusion([-1]); // detect overlap

        // platforms.setCollisionByProperty({ collides: true });

    

    

        const spawnLayer = map.getObjectLayer('spawns');
        const spawn = spawnLayer.objects.find(o => o.name === 'playerSpawn');

        this.player = this.physics.add.existing(
            new Player(this, spawn.x, spawn.y, 'player')
        );

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);

        // Camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(
            0, 0,
            map.widthInPixels,
            map.heightInPixels
        );

        const decor = map.createFromObjects('decor', [
            { gid: bedTiles.firstgid, key: 'bed' },
            { gid: guitarTiles.firstgid, key: 'guitar' },
            // { gid: doorTiles.firstgid, key: 'doors' },
        ]);


        const doorObjects = map.createFromObjects('doors', { key: 'doors' });

        doorObjects.forEach(obj => {
            this.physics.add.existing(obj, true);

            if (obj.getData('locked') == true) {
                obj.setTexture('doors', 1);
                obj.setData('locked', true);
            }
            else if(obj.getData('locked') == false) {
                obj.setTexture('doors', 0);
                obj.setData('locked', false);
            }
    
            this.physics.add.overlap(this.player, obj, () => {
                if (!Phaser.Input.Keyboard.JustDown(spaceKey)) return;

                if (obj.getData('locked')) {
                    console.log("Door is locked");
                    return;
                }

                this.scene.start('Game');
            });
        });

        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.isClimbing = false;

        // this.physics.add.overlap(this.player, this.ladders, () => {
        //     this.isClimbing = true;
        // });

        
    }

    update() {
        const player = this.player;
        const cursors = this.cursors;

        // Get tile directly under player's center
        const tile = this.ladders.getTileAtWorldXY(
            player.x,
            player.y + player.height / 2
        );

        const onLadder = tile !== null;

        // ENTER ladder state
        if (onLadder && (cursors.up.isDown || cursors.down.isDown)) {
            this.isClimbing = true;
        }

        // EXIT ladder state
        if (!onLadder) {
            this.isClimbing = false;
            player.body.setAllowGravity(true);
        }

        // CLIMBING LOGIC
        if (this.isClimbing) {
            player.body.setAllowGravity(false);

            // allow passing upward through platform
            player.body.checkCollision.up = false;
            player.body.checkCollision.down = false;

            player.setVelocityX(0);

            if (cursors.up.isDown) player.setVelocityY(-100);
            else if (cursors.down.isDown) player.setVelocityY(100);
            else player.setVelocityY(0);
        }
        else {
            player.body.setAllowGravity(true);

            // restore normal collision
            player.body.checkCollision.up = true;
            player.body.checkCollision.down = true;
        }

    }

}

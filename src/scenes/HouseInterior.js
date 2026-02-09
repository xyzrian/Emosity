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
        const ladders = map.createLayer('ladders', tileset);
        platforms.setCollisionByExclusion([-1]);
        ladders.setCollisionByExclusion([-1]); // detect overlap
    

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

        this.physics.add.overlap(this.player, this.ladders, () => {
            this.isClimbing = true;
            console.log("overlapping ladder");
        });

        
    }

    update() {
        // Check if player is overlapping ladder
        this.isClimbing = this.physics.overlap(this.player, this.ladders);


        if (this.isClimbing) {
            this.player.body.allowGravity = false;
            this.player.setVelocityY(0);

            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-120);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(120);
            }
        } else {
            this.player.body.allowGravity = true;
        }

        // Add your horizontal movement from Player here if needed
        this.player.update(this.cursors);

        // Reset climbing each frame
        // this.isClimbing = false;
    }
}

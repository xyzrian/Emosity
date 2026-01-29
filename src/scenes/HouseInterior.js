import Phaser from 'phaser';
import Player from './player.js';

var interiorWidth = 29*32;
var interiorHeight = 19*32;
// var playerX = 200;
// var playerY = interiorHeight-120;


export default class HouseInterior extends Phaser.Scene {
    constructor() {
        super('HouseInterior');
    }

    create(data) {

        
        // RESET CAMERA FADE
        this.cameras.main.fadeIn(300, 0, 0, 0);
        
        //World bounds
        this.physics.world.setBounds(0, 0, interiorWidth, interiorHeight, true, false, false, true);  // left/right/top/bottom
        this.add.tileSprite(0, interiorHeight, interiorWidth, interiorHeight,'sky').setOrigin(0, 1);

        const map = this.make.tilemap({ key: 'houseInterior' });

        const tileset = map.addTilesetImage(
            'interiorTiles',
            'interiorTiles'
        );

        const platforms = map.createLayer('platforms', tileset);
        platforms.setCollisionByExclusion([-1]);

        const spawnLayer = map.getObjectLayer('spawns');
        const spawn = spawnLayer.objects.find(o => o.name === 'playerSpawn');

        const player = this.physics.add.existing(
            new Player(this, spawn.x, spawn.y, 'player')
        );


        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);

        // Camera
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(
            0, 0,
            map.widthInPixels,
            map.heightInPixels
        );


        // // Exit door
        // const exits = map.getObjectLayer('interactions');
        // exits.objects.forEach(obj => {
        //     if (obj.name === 'exitHouse') {
        //         const exit = this.physics.add
        //             .staticSprite(obj.x, obj.y, null)
        //             .setSize(obj.width, obj.height)
        //             .setOrigin(0, 1)
        //             .setVisible(false);

        //         this.physics.add.overlap(player, exit, () => {
        //             if (
        //                 Phaser.Input.Keyboard.JustDown(
        //                     this.input.keyboard.addKey('SPACE')
        //                 )
        //             ) {
        //                 this.scene.start('Game');
        //             }
        //         });
        //     }
        // });
    }
}

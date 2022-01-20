import Phaser from '../lib/Phaser.js';

export default class Game extends Phaser.Scene{

    /** @type {Phaser.Physics.Arcade.Sprite} */
    drum; drumHitRed; drumHitBlue; drumHitBoth;

    constructor(){
        super('game');
    }

    init(){

    }

    preload(){
        //load assets
        this.load.image('note-half-blue', './src/assets/notes/Note-half-blue.png');
        this.load.image('note-full-blue', './src/assets/notes/Note-full-blue.png');
        this.load.image('hote-half-red', './src/assets/notes/Note-half-red.png');
        this.load.image('hote-full-red', './src/assets/notes/Note-full-red.png');
        this.load.image('drum', './src/assets/drums/Drum-blue-red.png');
        this.load.image('drum-hit-blue', './src/assets/drums/Drum-hit-blue.png');
        this.load.image('drum-hit-red', './src/assets/drums/Drum-hit-red.png');
        this.load.image('drum-hit-both', './src/assets/drums/Drum-hit-both.png');
        //load sounds
        this.load.audio('drum-snare-loud', './src/assets/sounds/drum-hit.mp3');
        this.load.audio('drum-snare', './src/assets/sounds/drum-snare.mp3');

        //load input
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create(){
        //player object
        this.drum = this.physics.add.sprite(400, 300, 'drum');

        this.drumSnareLoud = this.sound.add('drum-snare-loud');
        this.drumSnare = this.sound.add('drum-snare');
    }

    update(t, dt){
        //movement
        if(this.cursors.down.isDown){
            this.drum.setVelocityY(300);
        }else if(this.cursors.up.isDown){
            this.drum.setVelocityY(-300);
        }else{
            this.drum.setVelocityY(0);
        }
        //sound
        this.input.keyboard.on('keydown_SPACE', () => {
            this.drumSnareLoud.play();
        });
        this.input.keyboard.on('keydown_F', () => {
            this.drumSnare.play();
        });
        this.input.keyboard.on('keydown_V', () => {
            this.drumSnare.play();
        });



    }
   
}
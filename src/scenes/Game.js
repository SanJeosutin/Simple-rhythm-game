import Phaser from '../lib/Phaser.js';
import Note from '../game/Note.js';

export default class Game extends Phaser.Scene{

    /** @type {Phaser.Physics.Arcade.Sprite} */
    drum; drumHitRed; drumHitBlue; drumHitBoth;

    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    notes;

    /** @type{Phaser.GameObjects.Text} */
    scoreText;

    constructor(){
        super('game');
    }

    init(){
        this.score = 0;
    }

    preload(){
        //load assets
        this.load.image('note-half-blue', './src/assets/Notes/Note-half-blue.png');
        this.load.image('note-full-blue', './src/assets/Notes/Note-full-blue.png');
        this.load.image('hote-half-red', './src/assets/Notes/Note-half-red.png');
        this.load.image('hote-full-red', './src/assets/Notes/Note-full-red.png');
        this.load.image('drum', './src/assets/Drums/Drum-blue-red.png');

        //load sounds
        this.load.audio('drum-snare-loud', './src/assets/Sounds/drum-hit.mp3');
        this.load.audio('drum-snare', './src/assets/Sounds/drum-snare.mp3');

        //load input
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create(){
        //player object
        this.drum = this.physics.add.sprite(400, 500, 'drum');
        //sound objects
        this.drumSnareLoud = this.sound.add('drum-snare-loud');
        this.drumSnare = this.sound.add('drum-snare');

        this.notes = this.physics.add.staticGroup();

        for(let i = 0; i < 2; i++){
            const x = Phaser.Math.Between(50, 100);
            const y = Phaser.Math.Between(100, 500);

            /** @type {Phaser.Physics.Arcade.Sprite} */
            this.note = this.notes.create(x, y, 'note-half-blue');
        }

        //add note to group
        this.notes = this.physics.add.group({
            classType: Note
        });

        this.physics.add.overlap(
            this.drum,
            this.notes,
            this.handleHitNote,
            undefined,
            this
        );

        //score
        const style = {
            color: '#fff',
            fontSize: '24px'
        };

        this.scoreText = this.add.text(16, 16, 'Score: 0', style)
            .setScrollFactor(0)
            .setOrigin(0, 0);
    }

    update(t, dt){
        //movement
        if(this.cursors.down.isDown){
            this.drum.setVelocityY(300);
        }else if(this.cursors.up.isDown){
            this.drum.setVelocityY(-300);
        
//!remove when done debugging
        }else if(this.cursors.left.isDown){
            this.drum.setVelocityX(-300);
        }else if(this.cursors.right.isDown){
            this.drum.setVelocityX(300);
//!remove when done debugging
        }else{
            this.drum.setVelocityY(0);
//!remove when done debugging            
            this.drum.setVelocityX(0);
//!remove when done debugging
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
        //reset game
        this.input.keyboard.on('keydown_R', () => {
            this.scene.start('game');
        });

        //this.moveNote(this.note, 2);
        console.log("SCORE: " + this.score);
    }

    moveNote(note, speed){
        note.x += speed;
    }

    /** @param {Phaser.GameObjects.Sprite} sprite */
    spawnNote(sprite){
        /** @param {Phaser.Physics.Arcade.sprite} */
        this.note = this.notes.get(sprite.x, sprite.y, 'note-half-blue');

        note.setActive(true);
        note.setVisible(true);

        this.add.existing(note);
        note.body.setSize(note.width, note.height);

        this.physics.world.enable(note);

        return note;
    }

    /**
     * @param {Phaser.Physics.Arcade.sprite} drum 
     * @param {Note} note 
     */
    handleHitNote(drum, note){
        this.notes.killAndHide(note);
        note.body.enable = false;
        

        this.score += 100;

        const val = `Score: ${this.score}`;
        this.scoreText.text = val;
    }
}
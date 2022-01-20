import Phaser from "../lib/Phaser.js";

export default class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOver');
    }

    create(){
        const width = 800;
        const height = 600;
        this.add.text(
            width / 2,
            height / 2,
            'Game Over. \nPress Spacebar to try again.', {
                fontSize: '32px',
            }
        ).setOrigin(0.5);
        
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('game');
        });
    }
}
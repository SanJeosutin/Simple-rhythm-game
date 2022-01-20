import Phaser from "../lib/Phaser.js";

export default class Note extends Phaser.Physics.Arcade.Sprite{
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */

    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
    }
}
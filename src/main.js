import Phaser from "./lib/Phaser.js";
import Game from "./scenes/Game.js";

export default new Phaser.Game({
    parent: "parent",
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Game],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
});
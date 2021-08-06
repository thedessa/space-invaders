class StartScreen extends Phaser.Scene {

    constructor() {
        super('StartScreen');
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('logo', 'assets/logo.png');
    }

    create() {

        this.starfield = this.add.tileSprite(400, 300, config.width, config.height, "starfield");
        this.logo = this.add.image(400, 300, "logo");

        var gameOver = this.add.text(350, 550, 'start game');
        gameOver.setInteractive().on('pointerdown', function () {
            // when clicking game over text, change the scene
            this.scene.scene.start('GameOverScreen');
        });
    }

    update() {
        // move the starfield to the left
        this.starfield.tilePositionX += 2;
    }
}

class GameOverScreen extends Phaser.Scene {

    constructor() {
        super('GameOverScreen');
    }

    preload() {
    }

    create() {
        this.add.text(350, 300, 'game over');
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO, // render mode
    parent: "game", // div id
    width: 800,
    height: 600,
    scene: [StartScreen, GameOverScreen],
    physics: {
        default: 'arcade'
    }
};

var spaceInvaders = new Phaser.Game(config);

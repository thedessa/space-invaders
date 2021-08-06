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
            // when clicking "start game" text, change the scene
            this.scene.scene.start('GameScreen');
        });
    }

    update() {
        // move the starfield to the left
        this.starfield.tilePositionX += 2;
    }
}

var cursor;
var player;
var aliens;

class GameScreen extends Phaser.Scene {

    constructor() {
        super('GameScreen');
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.spritesheet('player', 'assets/spaceship.png', {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.image('alien', 'assets/alien.png');
    }

    create() {
        this.starfield = this.add.tileSprite(400, 300, config.width, config.height, "starfield");

        cursor = this.input.keyboard.createCursorKeys();
        player = this.physics.add.sprite(380, 500, "player")
        player.body.collideWorldBounds = true;

        aliens = this.add.group();
        for (var y = 2; y < 6; y++) {
            for (var x = 3; x < 13; x++) {
                var alien = aliens.create(x * 50, y * 50, 'alien');
            }
        }
    }

    update() {
        // move the starfield to the left
        this.starfield.tilePositionX += 2;

        if (cursor.left.isDown) {
            player.setVelocityX(-200)
        } else if (cursor.right.isDown) {
            player.setVelocityX(200)
        } else {
            player.setVelocityX(0)
        }
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
    scene: [StartScreen, GameScreen, GameOverScreen],
    physics: {
        default: 'arcade'
    }
};

var spaceInvaders = new Phaser.Game(config);

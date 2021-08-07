class StartScreen extends Phaser.Scene {

    constructor() {
        super('StartScreen');
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('logo', 'assets/logo.png');
    }

    create() {

        starfield = this.add.tileSprite(400, 300, config.width, config.height, "starfield");
        this.add.image(400, 300, "logo");

        let gameOver = this.add.text(350, 550, 'start game');
        gameOver.setInteractive().on('pointerdown', function () {
            // when clicking "start game" text, change the scene
            this.scene.scene.start('GameScreen');
        });
    }

    update() {
        // move the starfield to the left
        starfield.tilePositionX += 2;
    }
}

class GameScreen extends Phaser.Scene {

    constructor() {
        super('GameScreen');
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('player', 'assets/spaceship.png');
        this.load.image('alien', 'assets/alien.png');
        this.load.image('alien-green', 'assets/alien-green.png');
        this.load.image("bullet", "assets/bullet.png");
        this.load.image("enemyBulletRight", "assets/enemy-bullet-right.png");
        this.load.image("enemyBulletLeft", "assets/enemy-bullet-left.png");
    }

    create() {

        // add starfield
        starfield = this.add.tileSprite(400, 300, config.width, config.height, "starfield");

        // add cursor to track player actions
        cursor = this.input.keyboard.createCursorKeys();

        // add player (spaceship) to scene
        player = this.physics.add.sprite(380, 500, "player")
        player.body.collideWorldBounds = true;

        aliens = this.physics.add.group();
        for (let y = 2; y < 6; y++) {
            for (let x = 3; x < 13; x++) {
                let alienType = x % 2 == 0 ? 'alien' : 'alien-green';
                aliens.create(x * 50, y * 50, alienType);
            }
        }

        scoreText = this.add.text(10, 10, score + playerScore);

        playerBullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 100
        });

        enemyBulletsRightDirection = this.physics.add.group({
            defaultKey: 'enemyBulletRight',
            maxSize: 1000
        });

        enemyBulletsLeftDirection = this.physics.add.group({
            defaultKey: 'enemyBulletLeft',
            maxSize: 1000
        });

        this.physics.add.overlap(
            aliens,
            playerBullets,
            function (alien, bullet) {
                if (alien.active && bullet.active) {
                    playerScore += 10;
                    scoreText.text = score + playerScore;
                }

                alien.destroy();
                bullet.destroy();
            });
    }

    update() {
        // move the starfield to the left
        starfield.tilePositionX += 2;

        // player can move to the left and to the right
        if (cursor.left.isDown) {
            player.setVelocityX(-200)
        } else if (cursor.right.isDown) {
            player.setVelocityX(200)
        } else {
            player.setVelocityX(0)
        }

        // player can move the ship with mouse
        this.input.on('pointermove', (pointer) => {
            player.x = pointer.x;
        });

        // when clicking, shoot
        this.input.on('pointerdown', this.playerShoot, this);

        // 2% chance of shooting an enemy bullet
        if (Phaser.Math.Between(1, 100) > 98) {
            this.enemiesShoot();
        }

        // "reborn" player bullets
        playerBullets.children.each(function (b) {
            if (b.active) {
                if (b.y < 0) {
                    b.setActive(false);
                }
            }
        }.bind(this));
    }

    playerShoot() {
        let bullet = playerBullets.get(player.x, player.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = -400;
        }
    }

    enemiesShoot() {
        let xAxis = Phaser.Math.Between(0, 800);
        let enemyBullets = enemyBulletsLeftDirection;
        if (xAxis <= 400) {
            enemyBullets = enemyBulletsRightDirection;
        }

        let enemyBullet = enemyBullets.get(Phaser.Math.Between(200, 600), 0);
        if (enemyBullet) {
            enemyBullet.setActive(true);
            enemyBullet.setVisible(true);

            if (xAxis <= 400) {
                enemyBullet.setVelocity(Phaser.Math.Between(50, 100), Phaser.Math.Between(200, 300));
            } else {
                enemyBullet.setVelocity(Phaser.Math.Between(-100, -50), Phaser.Math.Between(200, 300));
            }
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

let config = {
    type: Phaser.AUTO, // render mode
    parent: "game", // div id
    width: 800,
    height: 600,
    scene: [StartScreen, GameScreen, GameOverScreen],
    physics: {
        default: 'arcade'
    }
};

let spaceInvaders = new Phaser.Game(config);

const score = 'Score : ';
let starfield;
let cursor;
let player;
let aliens;
let playerBullets;
let scoreText;
let playerScore = 0;
let enemyBulletsRightDirection;
let enemyBulletsLeftDirection;
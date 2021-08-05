var config = {
    type: Phaser.AUTO, // render mode
    parent: "game", // div id
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var spaceInvaders = new Phaser.Game(config);

function preload() {
    this.load.image('starfield', 'assets/starfield.png');
}

// create scenes, characters, text
function create() {
    this.starfield = this.add.tileSprite(400, 300, config.width, config.height, "starfield");
}

function update() {
    this.starfield.tilePositionX += 2;
}

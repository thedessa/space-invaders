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
    // load images and audio
    this.load.image('starfield', 'assets/starfield.png');
}


function create() {
    this.add.image(400, 300, 'starfield');
    // create scenes, characters, text
}


function update() {
    // update game elements
}

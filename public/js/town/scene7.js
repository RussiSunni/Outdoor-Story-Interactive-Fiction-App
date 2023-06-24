export default class Scene7 extends Phaser.Scene {
    constructor() {
        super('Scene7');
        this.textNum = 0;
        this.bgNum = 0;
    }
    preload() {
        //load our images or sounds 
        this.load.image("checkout", "assets/Backgrounds/Town/hiking-shop-checkout.jpg");
    }

    // data is for carrying across the music variable.
    create(data) {
        // BG 1 --------------------------------------------
        this.background = this.add.image(0, 0, "checkout")
            .setOrigin(.0, 0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        this.textBg = this.add.rectangle(0, this.sys.canvas.height - this.sys.canvas.height / 4, this.sys.canvas.width, this.sys.canvas.height / 4, '#000000', 0.7).setOrigin(0);
        this.narrative = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 4, 'Enjoy your hike.', { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);


    }
}
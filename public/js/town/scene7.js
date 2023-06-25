export default class Scene7 extends Phaser.Scene {
    constructor() {
        super('Scene7');
        this.textNum = 0;
        this.bgNum = 0;
    }
    preload() {
        //load our images or sounds 
        this.load.image("checkout", "assets/Backgrounds/Town/hiking-shop-checkout.jpg");
        this.load.image("driving", "assets/Backgrounds/Town/driving.jpg");
        this.load.image("trail-beginning", "assets/Backgrounds/Town/trail-beginning.jpg");
        this.load.image("trail", "assets/Backgrounds/Town/trail.jpg");
        this.load.image("gramps", "assets/Characters/gramps.png");
    }

    // data is for carrying across the music variable.
    create(data) {
        // BG 1 --------------------------------------------
        this.background = this.add.image(0, 0, "checkout")
            .setOrigin(.0, 0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        // Gramps.
        this.grampsSprite = this.add.sprite(0, 0, 'gramps').setOrigin(0.5)
        this.grampsSprite.displayWidth = this.sys.canvas.width / 1.1
        this.grampsSprite.displayHeight = this.sys.canvas.height
        this.grampsSprite.setPosition(this.sys.canvas.width / 1.5, this.sys.canvas.height / 1.1);
        this.grampsSprite.alpha = 0

        this.textBg = this.add.rectangle(0, this.sys.canvas.height - this.sys.canvas.height / 4, this.sys.canvas.width, this.sys.canvas.height / 4, '#000000', 0.7).setOrigin(0);
        this.narrative = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 4, 'Enjoy your hike.', { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);

        this.charNameText = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 4, '', { fontStyle: 'bold', fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);
        this.charDialogue = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 5, '', { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);

        this.input.on('pointerdown',
            function () {
                if (this.bgNum == 0) {
                    this.background.setTexture('driving')
                    this.narrative.setText("Soon enough, the big day came. Emily and her father, Grandpa, Zack, and you all drove to the wilderness.",)
                    this.bgNum = 1;
                }
                else if (this.bgNum == 1) {
                    if (this.textNum == 0) {
                        this.grampsSprite.alpha = 1
                        this.narrative.setText('')
                        this.background.setTexture('trail-beginning')
                        this.charNameText.setText('Gramps')
                        this.charDialogue.setText('Finally here!')

                        this.textNum = 1
                    }
                    else if (this.textNum == 1) {
                        this.charDialogue.setText('Now you guys follow close and dont get lost.')
                        this.bgNum = 2;

                        this.textNum = 2
                    }
                }
                else if (this.bgNum == 2) {
                    if (this.textNum == 2) {
                        this.grampsSprite.alpha = 0
                        this.background.setTexture('trail')
                        this.charNameText.setText('Emily')
                        this.charDialogue.setText('Uh guys, I need to tie my shoelaces.')

                        this.textNum = 3
                    }
                    else if (this.textNum == 3) {
                        this.charNameText.setText('Zack')
                        this.charDialogue.setText("No problem Emily, we'll wait with you.")
                    }
                }
            }, this)
    }
}
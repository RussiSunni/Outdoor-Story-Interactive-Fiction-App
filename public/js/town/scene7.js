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
        this.load.image("trail-1", "assets/Backgrounds/Town/trail-1.jpg");
        this.load.image("trail-2", "assets/Backgrounds/Town/trail-2.jpg");
        this.load.image("gramps", "assets/Characters/gramps.png");
        this.load.image("trail-split", "assets/Backgrounds/Town/trail-split.jpg");

        // Loading screen.
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });
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
                        this.background.setTexture('trail-1')
                        this.charNameText.setText('Emily')
                        this.charDialogue.setText('Uh guys, I need to tie my shoelaces.')

                        this.textNum = 3
                    }
                    else if (this.textNum == 3) {
                        this.charNameText.setText('Zack')
                        this.charDialogue.setText("No problem Emily, we'll wait with you.")

                        this.textNum = 4
                    }
                    else if (this.textNum == 4) {
                        this.charNameText.setText('Emily')
                        this.charDialogue.setText("Shouldn't ask Gramps to wait up for us?")

                        this.textNum = 5
                    }
                    else if (this.textNum == 5) {
                        this.charNameText.setText('Zack')
                        this.charDialogue.setText("Nah, the trail is simple, we'll catch up easily.")

                        this.bgNum = 3;
                        this.textNum = 6
                    }
                }
                else if (this.bgNum == 3) {
                    if (this.textNum == 6) {
                        this.background.setTexture('trail-split')

                        this.charNameText.setText('Emily')
                        this.charDialogue.setText("Ah shoot, the trail splits.")

                        this.textNum = 7
                    }
                    else if (this.textNum == 7) {
                        this.charNameText.setText('Zack')
                        this.charDialogue.setText("Let's take the left way, it looks right to me.")

                        this.bgNum = 4;
                        this.textNum = 8
                    }
                }
                else if (this.bgNum == 4) {
                    if (this.textNum == 8) {
                        this.background.setTexture('trail-2')
                        this.charNameText.setText('Zack')
                        this.charDialogue.setText("Gramps must be just ahead, over that rise.")

                        this.textNum = 9
                    }
                    else if (this.textNum == 9) {
                        this.charNameText.setText('Emily')
                        this.charDialogue.setText("We better hurry to catch him, it's getting dark.")

                        this.bgNum = 5;
                        this.textNum = 10
                    }
                }
                else if (this.bgNum == 5) {
                    if (this.textNum == 10) {
                        this.background.setTexture('trail-split')

                        this.charNameText.setText('Emily')
                        this.charDialogue.setText("Ah shoot, the trail splits again!")
                        this.textNum = 11
                    }
                    else if (this.textNum == 11) {
                        this.charNameText.setText('Zack')
                        this.charDialogue.setText("And its almost completely dark.")
                        this.textNum = 12
                    }
                    else if (this.textNum == 12) {
                        this.charDialogue.setText("Whoa!")
                        this.textNum = 13
                    }
                    else if (this.textNum == 13) {
                        this.charNameText.setText('Emily')
                        this.charDialogue.setText("Hey Zack, are you ok?")
                        this.textNum = 14
                    }
                    else if (this.textNum == 14) {
                        this.charDialogue.setText("I think we should stop for the night. We're tired and its dark. Someone is going to get hurt.")
                        this.textNum = 15
                    }
                }
            }, this)
    }
}
export default class Scene4 extends Phaser.Scene {
    constructor() {
        super('Scene4');
        this.narrativeNum = 0;
        this.bgNum = 0;
    }
    preload() {
        //load our images or sounds 
        this.load.image("park-entrance", "assets/Backgrounds/Town/park-entrance.png");
        this.load.image("park", "assets/Backgrounds/Town/park.png");
        this.load.image("emily", "assets/Characters/emily.png");
        this.load.image("zack", "assets/Characters/zack.png");
    }

    create() {
        // BG 1 --------------------------------------------
        this.background = this.add.image(0, 0, "park-entrance")
            .setOrigin(.0, 0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        this.textBg = this.add.rectangle(0, this.sys.canvas.height - this.sys.canvas.height / 4, this.sys.canvas.width, this.sys.canvas.height / 4, '#000000', 0.5).setOrigin(0);
        this.narrative = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 4, 'Nice day.', { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);

        this.bgNum = 2;

        this.input.on('pointerdown',
            function () {
                // Park scene.
                if (this.bgNum == 2) {
                    if (this.narrativeNum == 0) {
                        this.background.setTexture('park');
                        this.narrative.setText('')

                        this.emilySprite = this.add.sprite(0, 0, 'emily').setOrigin(0.5)
                        this.emilySprite.displayWidth = this.sys.canvas.width / 1.6
                        this.emilySprite.displayHeight = this.sys.canvas.height
                        this.emilySprite.setPosition(this.sys.canvas.width / 1.3, this.sys.canvas.height / 1.1);

                        // Add Zack, but hide him.
                        this.zackSprite = this.add.sprite(0, 0, 'zack').setOrigin(0.5)
                        this.zackSprite.displayWidth = this.sys.canvas.width / 1.6
                        this.zackSprite.displayHeight = this.sys.canvas.height
                        this.zackSprite.setPosition(this.sys.canvas.width / 8, this.sys.canvas.height / 1.1);
                        this.zackSprite.alpha = 0

                        this.textBg = this.add.rectangle(0, this.sys.canvas.height - this.sys.canvas.height / 4, this.sys.canvas.width, this.sys.canvas.height / 4, '#000000', 0.5).setOrigin(0);
                        this.charNameText = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 4, 'Emily', { fontStyle: 'bold', fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);
                        this.narrative = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 5, 'Hi!', { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);

                        this.narrativeNum = 1;
                    }
                    else if (this.narrativeNum == 1) {
                        // Greeting Emily.
                        this.narrativeNum = 2;

                        let speechOption1Graphic = this.add.graphics();
                        speechOption1Graphic.fillStyle(0x000000, 0.5);
                        speechOption1Graphic.fillRoundedRect(0, 0, 200, 80, 16);
                        this.speechOption1Text = this.add.text(20, 15, "Hi Emily!", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } });
                        this.speechOption1Container = this.add.container(this.sys.canvas.width / 2 - 100, this.sys.canvas.height / 2, [speechOption1Graphic, this.speechOption1Text]);
                        this.speechOption1Container.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 80), Phaser.Geom.Rectangle.Contains);
                        this.speechOption1Container.on('pointerdown', function () {
                            // Show Zack.                         
                            this.narrativeNum = 3;
                            this.speechOption1Container.alpha = 0;
                            this.charNameText.setText('Zack')
                            this.narrative.setText('Hey!')
                            this.zackSprite.alpha = 1
                        }, this);
                    }
                    else if (this.narrativeNum == 3) {
                        this.narrativeNum = 4
                    }
                    else if (this.narrativeNum == 4) {
                        this.speechOption1Container.alpha = 1;
                        this.speechOption1Text.setText('Hi Zack!')
                        this.speechOption1Container.on('pointerdown', function () {
                            this.narrativeNum = 5
                            this.speechOption1Container.alpha = 0;
                            this.narrative.setText('Where are going?')
                        }, this);
                    }
                    else if (this.narrativeNum == 5) {
                        this.narrativeNum = 6
                    }
                    else if (this.narrativeNum == 6) {
                        this.narrativeNum = 7
                        let speechOption2Graphic = this.add.graphics();
                        speechOption2Graphic.fillStyle(0x000000, 0.5);
                        speechOption2Graphic.fillRoundedRect(0, 0, 400, 80, 16);
                        this.speechOption2Text = this.add.text(20, 15, "The outdoors shop.", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } });
                        this.speechOption2Container = this.add.container(this.sys.canvas.width / 2 - 200, this.sys.canvas.height / 2, [speechOption2Graphic, this.speechOption2Text]);
                        this.speechOption2Container.setInteractive(new Phaser.Geom.Rectangle(0, 0, 400, 80), Phaser.Geom.Rectangle.Contains);
                        this.speechOption2Container.on('pointerdown', function () {
                            // Show Zack.                         
                            this.narrativeNum = 8;
                            this.speechOption2Container.alpha = 0;
                            this.charNameText.setText('Emily')
                            this.narrative.setText("Great! We'll come with.")
                        }, this);
                    }
                    else if (this.narrativeNum == 8) {
                        this.narrativeNum = 9
                    }
                    else if (this.narrativeNum == 9) {
                        this.scene.start("Scene5");
                    }
                }
            }, this
        );
    }
}
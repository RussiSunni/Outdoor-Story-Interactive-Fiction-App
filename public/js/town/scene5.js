export default class Scene5 extends Phaser.Scene {
    constructor() {
        super('Scene5');
        this.textNum = 0;
        this.bgNum = 0;
        this.moneyAmount;
        this.hasBoughtExpensiveBoots;
        this.hasBoughtCheapBoots;
        this.hasBoughtAnorak;
        this.textBg2
        this.narrative2
    }
    preload() {
        //load our images or sounds 
        this.load.image("hiking-shop-exterior", "assets/Backgrounds/Town/hiking-shop-exterior.jpg");
        this.load.image("boot-advert", "assets/Backgrounds/Town/boot-advert.jpg");
        this.load.image("hiking-shop-interior", "assets/Backgrounds/Town/hiking-shop-interior.jpg");
        this.load.image("cheap-boots", "assets/Images/cheap-boots.png");
        this.load.image("expensive-boots", "assets/Images/expensive-boots.png");
        this.load.image("cheap-boots", "assets/Images/cheap-boots.png");
        this.load.image("anorak", "assets/Images/anorak.png");

        this.load.audio('music3', '/assets/Audio/Music/shopTrack.mp3')
    }

    create() {
        // Music -----
        this.music = this.sound.add('music3', {
            volume: 0.2,
            loop: false
        })
        this.music.play()

        this.background = this.add.image(0, 0, "hiking-shop-exterior")
            .setOrigin(.0, 0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        this.textBg = this.add.rectangle(0, this.sys.canvas.height - this.sys.canvas.height / 4, this.sys.canvas.width, this.sys.canvas.height / 4, '#000000', 0.7).setOrigin(0);
        this.narrative = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 4, 'Here it is, the outdoor equipment store.', { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);

        this.charNameText = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 4, '', { fontStyle: 'bold', fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);
        this.charDialogue = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 5, '', { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);


        this.input.on('pointerdown',
            function () {
                if (this.bgNum == 0) {
                    if (this.textNum == 0) {
                        this.background.setTexture('boot-advert')
                        this.textNum = 1;

                        this.narrative.setText('')
                        this.charNameText.setText('Zack')
                        this.charDialogue.setText('Wow, they have the latest Zoran boots!')
                    }
                    else if (this.textNum == 1) {
                        this.charNameText.setText('Emily')
                        this.charDialogue.setText('Oh my word, those are soooo cool!')
                        this.textNum = 2;
                    }
                    else if (this.textNum == 2) {
                        this.charDialogue.setText('They cost $200. How much do you have?')
                        this.textNum = 3;
                    }
                    else if (this.textNum == 3) {
                        this.textNum = 4;
                        let speechOption1Graphic = this.add.graphics();
                        speechOption1Graphic.fillStyle(0x000000, 0.5);
                        speechOption1Graphic.fillRoundedRect(0, 0, 200, 80, 16);
                        this.speechOption1Text = this.add.text(20, 15, "$200", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } });
                        this.speechOption1Container = this.add.container(this.sys.canvas.width / 2 - 100, this.sys.canvas.height / 2, [speechOption1Graphic, this.speechOption1Text]);
                        this.speechOption1Container.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 80), Phaser.Geom.Rectangle.Contains);
                        this.speechOption1Container.on('pointerdown', function () {
                            this.textNum = 5;
                            this.speechOption1Container.alpha = 0
                            this.charNameText.setText('Zack')
                            this.charDialogue.setText("I guess you could just risk it and not get a jacket. Just hope it doesn't rain or get cold.")
                        }, this);
                    }
                    else if (this.textNum == 5) {
                        this.bgNum = 1;
                    }
                }
                // Hiking shop interior.
                else if (this.bgNum == 1) {
                    this.background.setTexture('hiking-shop-interior')
                    this.charNameText.setText('')
                    this.charDialogue.setText("")
                    this.textBg.alpha = 0

                    //    this.moneyBg = this.add.rectangle(this.sys.canvas.width - (this.sys.canvas.width / 6), 0, this.sys.canvas.width / 6, this.sys.canvas.height / 16, 0X00FF00, 1).setOrigin(0);
                    //  this.moneyAmount = this.add.text(this.sys.canvas.width - (this.sys.canvas.width / 6), 0, '$200', { fontFamily: 'Arial', fill: '#000000', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);
                    this.textBg2 = this.add.rectangle(0, this.sys.canvas.height - this.sys.canvas.height / 10, this.sys.canvas.width, this.sys.canvas.height / 4, '#000000', 0.7).setOrigin(0);
                    this.textBg2.alpha = 0
                    this.narrative = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 10, '', { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);

                    let yesGraphic = this.add.graphics();
                    yesGraphic.fillStyle(0x000000, 0.5);
                    yesGraphic.fillRoundedRect(0, 0, 100, 80, 16);
                    this.yesText = this.add.text(20, 15, "Yes", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0);
                    this.yesContainer = this.add.container(0, 0, [yesGraphic, this.yesText]);
                    this.yesContainer.alpha = 0

                    let expensiveBootsNoGraphic = this.add.graphics();
                    expensiveBootsNoGraphic.fillStyle(0x000000, 0.5);
                    expensiveBootsNoGraphic.fillRoundedRect(0, 0, 100, 80, 16);
                    this.expensiveBootsNoText = this.add.text(20, 15, "No", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0);
                    this.expensiveBootsNoContainer = this.add.container(120, 0, [expensiveBootsNoGraphic, this.expensiveBootsNoText]);

                    this.expensiveBoots = this.add.sprite(0, 0, "expensive-boots").setOrigin(0.5)
                    this.expensiveBoots.displayWidth = this.sys.canvas.width / 4.5
                    this.expensiveBoots.displayHeight = this.sys.canvas.height / 8.5
                    this.expensiveBoots.setPosition(this.sys.canvas.width / 1.4, this.sys.canvas.height / 1.2)
                    this.expensiveBoots.setInteractive();
                    this.expensiveBoots.on("pointerdown", this.onExpensiveBootsButtonDown, this);

                    this.cheapBoots = this.add.sprite(0, 0, "cheap-boots").setOrigin(0.5)
                    this.cheapBoots.displayWidth = this.sys.canvas.width / 6
                    this.cheapBoots.displayHeight = this.sys.canvas.height / 12
                    this.cheapBoots.setPosition(this.sys.canvas.width / 1.8, this.sys.canvas.height / 1.3)
                    this.cheapBoots.setInteractive();
                    this.cheapBoots.on("pointerdown", this.onCheapBootsButtonDown, this);

                    this.anorak = this.add.sprite(0, 0, "anorak").setOrigin(0.5)
                    this.anorak.displayWidth = this.sys.canvas.width / 4
                    this.anorak.displayHeight = this.sys.canvas.height / 5.5
                    this.anorak.setPosition(this.sys.canvas.width / 1.5, this.sys.canvas.height / 1.6)
                    this.anorak.setInteractive();
                    this.anorak.on("pointerdown", this.onAnorakButtonDown, this);

                }

            }, this)
    }


    onExpensiveBootsButtonDown() {
        this.textBg2.alpha = 1
        this.narrative.setText('Buy Zoran boots for $200?')

        this.yesContainer.alpha = 1
        this.yesContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        this.yesContainer.on('pointerdown', function () {
            this.hasBoughtExpensiveBoots = true;
            this.narrative.setText("Ok, $0 left.");
        }, this);

        let expensiveBootsNoGraphic = this.add.graphics();
        expensiveBootsNoGraphic.fillStyle(0x000000, 0.5);
        expensiveBootsNoGraphic.fillRoundedRect(0, 0, 100, 80, 16);
        this.expensiveBootsNoText = this.add.text(20, 15, "No", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0);
        this.expensiveBootsNoContainer = this.add.container(120, 0, [expensiveBootsNoGraphic, this.expensiveBootsNoText]);
        this.expensiveBootsNoContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        this.expensiveBootsNoContainer.on('pointerdown', function () {
            this.expensiveBootsNoContainer.destroy()
            this.expensiveBootsYesContainer.destroy()
            this.textBg2.destroy()
            this.narrative.setText('')
        }, this);
    }

    onCheapBootsButtonDown() {
        this.textBg2.alpha = 1
        this.narrative.setText('Buy second hand boots for $100?')

        let cheapBootsYesGraphic = this.add.graphics();
        cheapBootsYesGraphic.fillStyle(0x000000, 0.5);
        cheapBootsYesGraphic.fillRoundedRect(0, 0, 100, 80, 16);
        this.cheapBootsYesText = this.add.text(20, 15, "Yes", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0);
        this.cheapBootsYesContainer = this.add.container(0, 0, [cheapBootsYesGraphic, this.cheapBootsYesText]);
        this.cheapBootsYesContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        this.cheapBootsYesContainer.on('pointerdown', function () {
            this.hasBoughtCheapBoots = true;
            if (this.hasBoughtAnorak == true)
                this.narrative.setText("$0 left.")
            else
                this.narrative.setText("$100 left.")

            this.cheapBootsNoContainer.destroy()
            this.cheapBootsYesContainer.destroy()
        }, this);

        let cheapBootsNoGraphic = this.add.graphics();
        cheapBootsNoGraphic.fillStyle(0x000000, 0.5);
        cheapBootsNoGraphic.fillRoundedRect(0, 0, 100, 80, 16);
        this.cheapBootsNoText = this.add.text(20, 15, "No", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0);
        this.cheapBootsNoContainer = this.add.container(120, 0, [cheapBootsNoGraphic, this.cheapBootsNoText]);
        this.cheapBootsNoContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        this.cheapBootsNoContainer.on('pointerdown', function () {
            this.cheapBootsNoContainer.destroy()
            this.cheapBootsYesContainer.destroy()
            this.textBg2.destroy()
            this.narrative.setText('')
        }, this);
    }

    onAnorakButtonDown() {
        this.textBg2.alpha = 1
        this.narrative.setText('Buy anorak for $100?')

        let anorakYesGraphic = this.add.graphics();
        anorakYesGraphic.fillStyle(0x000000, 0.5);
        anorakYesGraphic.fillRoundedRect(0, 0, 100, 80, 16);
        this.anorakYesText = this.add.text(20, 15, "Yes", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0);
        this.anorakYesContainer = this.add.container(0, 0, [anorakYesGraphic, this.anorakYesText]);
        this.anorakYesContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        this.anorakYesContainer.on('pointerdown', function () {
            this.hasBoughtAnorak = true;

            this.cheapBootsNoContainer.destroy()
            this.cheapBootsYesContainer.destroy()

            if (this.hasBoughtCheapBoots == true)
                this.narrative.setText("$0 left.")
            else
                this.narrative.setText("$100 left.")
        }, this);

        let anorakNoGraphic = this.add.graphics();
        anorakNoGraphic.fillStyle(0x000000, 0.5);
        anorakNoGraphic.fillRoundedRect(0, 0, 100, 80, 16);
        this.anorakNoText = this.add.text(20, 15, "No", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0);
        this.anorakNoContainer = this.add.container(120, 0, [anorakNoGraphic, this.anorakNoText]);
        this.anorakNoContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);
        this.anorakNoContainer.on('pointerdown', function () {
            this.anorakNoContainer.destroy()
            this.anorakYesContainer.destroy()
            this.textBg2.destroy()
            this.narrative.setText('')
        }, this);

    }
}
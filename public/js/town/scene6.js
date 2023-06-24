export default class Scene5 extends Phaser.Scene {
    constructor() {
        super('Scene6');
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
        this.load.image("hiking-shop-interior", "assets/Backgrounds/Town/hiking-shop-interior.jpg");
        this.load.image("cheap-boots", "assets/Images/cheap-boots.png");
        this.load.image("expensive-boots", "assets/Images/expensive-boots.png");
        this.load.image("cheap-boots", "assets/Images/cheap-boots.png");
        this.load.image("anorak", "assets/Images/anorak.png");

        this.load.audio('music3', '/assets/Audio/Music/shopTrack.mp3')
    }

    create() {
        this.background = this.add.image(0, 0, "hiking-shop-interior")
            .setOrigin(.0, 0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        this.textBg = this.add.rectangle(0, this.sys.canvas.height - this.sys.canvas.height / 10, this.sys.canvas.width, this.sys.canvas.height / 4, '#000000', 0.7).setOrigin(0);
        this.textBg.alpha = 0
        this.narrative = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 10, '', { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);

        let yesGraphic = this.add.graphics();
        yesGraphic.fillStyle(0x000000, 0.5);
        yesGraphic.fillRoundedRect(0, 0, 100, 80, 16);
        this.yesText = this.add.text(20, 15, "Buy", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0);
        this.yesContainer = this.add.container(0, 0, [yesGraphic, this.yesText]);
        this.yesContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 80), Phaser.Geom.Rectangle.Contains);

        let noGraphic = this.add.graphics();
        noGraphic.fillStyle(0x000000, 0.5);
        noGraphic.fillRoundedRect(0, 0, 200, 80, 16);
        this.noText = this.add.text(20, 15, "Don't buy", { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0);
        this.noContainer = this.add.container(120, 0, [noGraphic, this.noText]);
        this.noContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 80), Phaser.Geom.Rectangle.Contains);
        this.noContainer.on('pointerdown', function () {
            this.textBg.alpha = 0
            this.narrative.setText('')
        }, this);

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


    onExpensiveBootsButtonDown() {
        this.textBg.alpha = 1
        this.narrative.setText('Zoran boots for $200?')

        this.yesContainer.on('pointerdown', function () {
            this.hasBoughtExpensiveBoots = true;
            this.narrative.setText("Ok, $0 left.");
        }, this);
    }

    onCheapBootsButtonDown() {
        this.textBg.alpha = 1
        this.narrative.setText('Buy second hand boots for $100?')

        this.yesContainer.on('pointerdown', function () {
            this.hasBoughtCheapBoots = true;
            if (this.hasBoughtAnorak == true)
                this.narrative.setText("$0 left.")
            else
                this.narrative.setText("$100 left.")
        }, this);
    }

    onAnorakButtonDown() {
        this.textBg.alpha = 1
        this.narrative.setText('Buy anorak for $100?')

        this.yesContainer.on('pointerdown', function () {
            this.hasBoughtAnorak = true;

            this.cheapBootsNoContainer.destroy()
            this.cheapBootsYesContainer.destroy()

            if (this.hasBoughtCheapBoots == true)
                this.narrative.setText("$0 left.")
            else
                this.narrative.setText("$100 left.")
        }, this);
    }
}
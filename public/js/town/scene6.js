export default class Scene6 extends Phaser.Scene {
    constructor() {
        super('Scene6');
        this.money = 200
    }
    preload() {
        //load our images or sounds         
        this.load.image("hiking-shop-interior", "assets/Backgrounds/Town/hiking-shop-interior.jpg");
        this.load.image("cheap-boots", "assets/Images/cheap-boots.png");
        this.load.image("expensive-boots", "assets/Images/expensive-boots.png");
        this.load.image("cheap-boots", "assets/Images/cheap-boots.png");
        this.load.image("anorak", "assets/Images/anorak.png");

        this.load.audio('music3', '/assets/Audio/Music/shopTrack.mp3')
        this.load.audio('choice', '/assets/Audio/SFX/choice.mp3')

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

    create() {
        this.choice = this.sound.add("choice", { loop: false });

        this.background = this.add.image(0, 0, "hiking-shop-interior")
            .setOrigin(.0, 0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        this.textBg = this.add.rectangle(0, this.sys.canvas.height - this.sys.canvas.height / 10, this.sys.canvas.width, this.sys.canvas.height / 4, '#000000', 0.7).setOrigin(0);
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

        var i = 0
        this.input.on('pointerdown',
            function () {
                if (this.money <= 0) {
                    i++
                    if (i == 1)
                        this.scene.start("Scene7");
                }
            }, this)
    }

    onExpensiveBootsButtonDown() {
        this.yesContainer.setInteractive()
        if (this.money == 200) {
            this.narrative.setText('Zoran boots for $200?')
            this.yesContainer.on('pointerdown', function () {
                this.narrative.setText('')
                this.money = 0;
                this.yesContainer.disableInteractive()
                this.expensiveBoots.alpha = 0
                this.expensiveBoots.disableInteractive()
                this.choice.play()
                this.saveChoice(2, "Expensive Boots");
            }, this);
        }
        else {
            this.narrative.setText("You can't afford that.")
        }
    }

    onCheapBootsButtonDown() {
        this.yesContainer.setInteractive()
        this.narrative.setText('Buy second hand boots for $100?')
        this.yesContainer.on('pointerdown', function () {
            this.money = this.money - 100;
            this.cheapBoots.disableInteractive()
            this.cheapBoots.alpha = 0
            this.narrative.setText('')
            this.yesContainer.disableInteractive()
            this.choice.play()
        }, this);
    }

    onAnorakButtonDown() {
        this.yesContainer.setInteractive()
        this.narrative.setText('Buy anorak for $100?')
        this.yesContainer.on('pointerdown', function () {
            this.money = this.money - 100;
            this.anorak.disableInteractive()
            this.anorak.alpha = 0
            this.narrative.setText('')
            this.yesContainer.disableInteractive()
            this.choice.play()
            this.saveChoice(2, "Good Value");
        }, this);
    }

    saveChoice(choiceId, choice) {
        fetch('/api/save-choice', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ choiceId: choiceId, choice: choice })
        });
    };
}
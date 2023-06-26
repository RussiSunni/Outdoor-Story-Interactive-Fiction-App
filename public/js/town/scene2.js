export default class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2');
        this.textNum = 0;
        this.bgNum = 0;
        this.isFoodChosen = false;
        this.clicks = 0;
    }
    preload() {
        //load our images or sounds 
        this.load.image("fridge", "assets/Backgrounds/Town/fridge.jpg");
        this.load.image("donuts", "assets/Images/donuts.png");
        this.load.image("sandwich", "assets/Images/sandwich.png");

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

    // data is for carrying across the music variable.
    create(data) {
        this.choice = this.sound.add("choice", { loop: false });

        // BG 1 --------------------------------------------
        this.background = this.add.image(0, 0, "fridge")
            .setOrigin(.0, 0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        this.input.on('pointerdown',
            function () {
                if (this.isFoodChosen) {
                    this.clicks++;
                    if (this.clicks == 2) {
                        this.scene.start("Scene3", { music: data.music });
                    }
                }
            }, this);

        this.donuts = this.add.sprite(0, 0, 'donuts').setOrigin(0.5)
        this.donuts.displayWidth = this.sys.canvas.width / 5
        this.donuts.displayHeight = this.sys.canvas.height / 10
        this.donuts.setPosition(this.sys.canvas.width / 3.5, this.sys.canvas.height / 1.7)

        this.donuts.setInteractive();
        this.donuts.on("pointerdown", this.onDonutsButtonDown, this);

        this.sandwich = this.add.sprite(0, 0, 'sandwich').setOrigin(0.5)
        this.sandwich.displayWidth = this.sys.canvas.width / 6
        this.sandwich.displayHeight = this.sys.canvas.height / 12
        this.sandwich.setPosition(this.sys.canvas.width / 4.7, this.sys.canvas.height / 1.3)

        this.sandwich.setInteractive();
        this.sandwich.on("pointerdown", this.onSandwichButtonDown, this);
    }

    onDonutsButtonDown() {
        this.textBg = this.add.rectangle(0, this.sys.canvas.height - this.sys.canvas.height / 4, this.sys.canvas.width, this.sys.canvas.height / 4, '#000000', 0.7).setOrigin(0);
        this.narrative = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 4, 'You choose the donuts.', { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);
        this.donuts.setAlpha(0)
        this.isFoodChosen = true

        this.choice.play()
        this.saveChoice(1, "Donuts");
    }

    onSandwichButtonDown() {
        this.textBg = this.add.rectangle(0, this.sys.canvas.height - this.sys.canvas.height / 4, this.sys.canvas.width, this.sys.canvas.height / 4, '#000000', 0.7).setOrigin(0);
        this.narrative = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 4, 'You choose the sandwich.', { fontFamily: 'Arial', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);
        this.sandwich.setAlpha(0)
        this.isFoodChosen = true

        this.choice.play()
        this.saveChoice(1, "Sandwich");
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
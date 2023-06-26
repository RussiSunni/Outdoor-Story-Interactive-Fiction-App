export default class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1');
        this.textNum = 0;
        this.bgNum = 0;
    }
    preload() {
        //load our images or sounds 
        this.load.image("apartment", "assets/Backgrounds/Town/apartment-2.jpg");
        this.load.image("elevator", "assets/Backgrounds/Town/elevator.jpg");
        this.load.image("hallway", "assets/Backgrounds/Town/hallway.jpg");
        this.load.image("photo", "assets/Backgrounds/Town/photo-closeup.jpg");
        this.load.image("kitchen", "assets/Backgrounds/Town/kitchen.jpg");
        this.load.image("cash", "assets/Backgrounds/Town/cash.jpg");

        this.load.audio('music1', '/assets/Audio/Music/introTrack.mp3')

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
        // Music -----
        this.music = this.sound.add('music1', {
            volume: 0.2,
            loop: false
        })
        this.music.play()

        // BG 1 --------------------------------------------
        this.background = this.add.image(0, 0, "apartment")
            .setOrigin(.0, 0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        this.textBg = this.add.rectangle(0, this.sys.canvas.height - this.sys.canvas.height / 4, this.sys.canvas.width, this.sys.canvas.height / 4, '#000000', 0.7).setOrigin(0);
        this.narrative = this.add.text(0, this.sys.canvas.height - this.sys.canvas.height / 4, 'Our home.', { fontFamily: 'Open Sans', fill: '#ffffff', fontSize: 40, wordWrap: { width: this.sys.canvas.width - 15, useAdvancedWrap: true } }).setOrigin(0, 0);

        this.textNum = 2;

        this.input.on('pointerdown',
            function () {
                if (this.textNum == 2) {
                    this.narrative.setText('The big and bustling city.')
                    this.textNum = 3;
                    this.bgNum = 2;
                }
                else if (this.bgNum == 2) {
                    // BG 2 --------------------------------------------
                    this.background.setTexture('elevator');
                    this.narrative.setText('Another boring day. Nothing ever happens here.')
                    this.textNum = 4;
                    this.bgNum = 3;
                }
                else if (this.bgNum == 3) {
                    this.background.setTexture('hallway');
                    if (this.textNum == 4) {
                        this.narrative.setText("I wonder if Grandma's home.")
                        this.textNum = 5;
                    }
                    else if (this.textNum == 5) {
                        this.narrative.setText("Hmm, seems like the place is empty.")
                        this.textNum = 6;
                        this.bgNum = 4;
                    }
                }
                else if (this.bgNum == 4) {
                    this.background.setTexture('photo');
                    if (this.textNum == 6) {
                        this.narrative.setText("I wish I could go to wild places, like Grandpa used to.")
                        this.textNum = 7;
                    }
                    else if (this.textNum == 7) {
                        this.narrative.setText("No school, homework. No one telling me what to do.")
                        this.textNum = 8;
                    }
                    else if (this.textNum == 8) {
                        this.narrative.setText("What an exciting life. Nothing ever happens in my life...")
                        this.textNum = 8;
                        this.bgNum = 5;
                    }
                }
                else if (this.bgNum == 5) {
                    this.background.setTexture('kitchen');
                    this.bgNum = 6;
                    this.narrative.setText("I'm hungry. I'll have...")
                }
                else if (this.bgNum == 6) {
                    this.scene.start('Scene2', { music: this.music });
                }
            }, this
        );
    }
}
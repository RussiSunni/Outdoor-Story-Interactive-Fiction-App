/* global monogatari */

// Define the messages used in the game.
monogatari.action('message').messages({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	}
});

// Define the notifications used in the game
// monogatari.action ('notification').notifications ({
// 	'Welcome': {
// 		title: 'Welcome',
// 		body: 'This is the Monogatari VN Engine',
// 		icon: ''
// 	}
// });

// Define the Particles JS Configurations used in the game
monogatari.action('particles').particles({

});

// Define the canvas objects used in the game
monogatari.action('canvas').objects({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration('credits', {

});


// Define the images that will be available on your game's image gallery
monogatari.assets('gallery', {

});

// Define the music used in the game.
monogatari.assets('music', {

});

// Define the voice files used in the game.
monogatari.assets('voices', {

});

// Define the sounds used in the game.
monogatari.assets('sounds', {

});

// Define the videos used in the game.
monogatari.assets('videos', {

});

// Define the images used in the game.
monogatari.assets('images', {
	'note': 'handwritten-note.png'
});

// Define the backgrounds for each scene.
monogatari.assets('scenes', {
	'house': 'house-2.png',
	'kitchen': 'kitchen-1.png',
	'bedroom': 'bedroom-4.png',
	'shop-exterior': 'restaurant-8.png',
	'shop-interior': 'shop-interior.jpg',
	'forest': 'forest.jpg'
});


// Define the Characters
monogatari.characters({
	'player': {
		color: '#ffff00',
		directory: 'sam',
		sprites: {
			//angry: 'normal.png',
			happy: 'happy.png',
			//	normal: 'normal.png',
			//	sad: 'sad.png',
			//	surprised: 'surprised.png'
		}
	},
	'grandma': {
		color: '#ffff00',
		directory: 'grandma',
		sprites: {
			//angry: 'normal.png',
			//happy: 'happy.png',
			normal: 'normal.png',
			//	sad: 'sad.png',
			//	surprised: 'surprised.png'
		}
	},
	'clerk': {
		color: '#ffff00',
		directory: 'clerk',
		sprites: {
			//angry: 'normal.png',
			//happy: 'happy.png',
			normal: 'normal.png',
			//	sad: 'sad.png',
			//	surprised: 'surprised.png'
		}
	}
});

monogatari.script({
	// The game starts here.
	'Start': [
		'show scene house with fadeIn',
		"player My house.",
		"player I wonder if Grandma's home.",
		'show scene kitchen with fadeIn',
		//'show character grandma normal at right with fadeIn',
		"player Hmm, seems like the house is empty.",
		"player Oh look, it looks like Grandma left me a note, with some money.",
		'show image note with fadeIn',
		"player It says that must go to the shop to get myself gear for the upcoming school hike.",
		'jump Shop1'],
	'Shop1': [
		'show scene shop-exterior with fadeIn',
		"player Here it is, the outdoor equipment store.",
		'show scene shop-interior with fadeIn',
		'show character clerk normal at right with fadeIn',
		'clerk Hi there {{player.name}}',
		'clerk What can I get for you?',
		{
			'Choice': {
				'BrandName': {
					'Text': 'Ask about expensive brands.',
					'Do': 'jump BrandName'
				},
				'GoodValue': {
					'Text': 'Ask about good value products.',
					'Do': 'jump Shop2',
					'Save': function () {
						this.storage({
							player: {
								equipment: 'GoodValue'
							}
						});
						return true;
					},
				},
			},
		}],
	'BrandName': [
		'player If I buy the cool brand name clothes, I wont have enough money to get everything.',
		{
			'Choice': {
				'BrandName': {
					'Text': "It's ok, I want those brand names.",
					'Save': function () {
						this.storage({
							player: {
								equipment: 'BrandName'
							}
						});
						return true;
					},
					'Do': 'jump Shop2',
				},
				'ChangeMind': {
					'Text': 'Ask about good value products.',
					'Do': 'jump Shop2',
					'Save': function () {
						this.storage({
							player: {
								equipment: 'GoodValue'
							}
						});
						return true;
					},
				},
			}
		}
	],
	'Shop2': [
		'clerk Ok, here is your {{player.equipment}}'
	]









});
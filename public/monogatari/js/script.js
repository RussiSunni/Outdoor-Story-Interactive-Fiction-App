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
	'note': 'handwritten-note.png',
	'butterfly': 'butterfly.png'
});

// Define the backgrounds for each scene.
monogatari.assets('scenes', {
	'apartment': 'apartment-1.png',
	'elevator': 'elevator-2.png',
	'house': 'house-2.png',
	'hallway': 'hallway-1.png',
	'library': 'library-3.png',
	'kitchen': 'kitchen-1.png',
	'bedroom': 'bedroom-4.png',
	'shop-exterior': 'restaurant-8.png',
	'shop-interior': 'shop-interior.jpg',
	'school': 'school-1.png',
	'forest-mist': 'forest-mist-1.png',
	'forest-path': 'forest-path-1.png',
	'deep-forest': 'deep-forest-1.png'
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
		name: 'Grandma',
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
		name: 'Clerk',
		color: '#ffff00',
		directory: 'clerk',
		sprites: {
			//angry: 'normal.png',
			//happy: 'happy.png',
			normal: 'normal.png',
			//	sad: 'sad.png',
			//	surprised: 'surprised.png'
		}
	},
	'tony': {
		name: 'Tony',
		color: '#ffff00',
		directory: 'tony',
		sprites: {
			//angry: 'normal.png',
			happy: 'happy.png',
			//normal: 'normal.png',
			//	sad: 'sad.png',
			//	surprised: 'surprised.png'
		}
	},
	'sam': {
		name: 'Sam',
		color: '#ffff00',
		directory: 'sam',
		sprites: {
			//angry: 'normal.png',
			happy: 'happy.png',
			//normal: 'normal.png',
			//	sad: 'sad.png',
			//	surprised: 'surprised.png'
		}
	},
	'zack': {
		name: 'Zack',
		color: '#ffff00',
		directory: 'zack',
		sprites: {
			//angry: 'normal.png',
			happy: 'happy-facing-right.png',
			//normal: 'normal.png',
			//	sad: 'sad.png',
			//	surprised: 'surprised.png'
		}
	}
});

monogatari.script({
	// The game starts here.
	'Start': [
		'show scene apartment with fadeIn',
		"Our home.",
		"The big and bustling city.",
		'show scene elevator with fadeIn',
		"I wish I could go to wild places, like Grandpa used to.",
		'show scene hallway with fadeIn',
		"I wonder if Grandma's here.",
		"Hmm, seems like the place is empty.",
		'show scene library with fadeIn',
		'I always like to looks at the photos of Grandpa hiking and camping',
		'What an exciting life. Nothing ever happens in my life...',
		'show scene kitchen with fadeIn',
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
					"onChosen": function () {
						monogatari.storage().player.equipment = "Expensive Brand";
					},
					'Do': 'jump Shop2',
				},
				'GoodValue': {
					'Text': 'Ask about good value products.',
					"onChosen": function () {
						monogatari.storage().player.equipment = "Good Value"
					},
					'Do': 'jump Shop2',
				},
			},
		}],
	// 'BrandName': [
	// 	'player If I buy the cool brand name clothes, I wont have enough money to get everything.',
	// 	{
	// 		'Choice': {
	// 			'BrandName': {
	// 				'Text': "It's ok, I want those brand names.",
	// 				"onChosen": function () { test() },
	// 				'Do': 'jump Shop2',
	// 				'Save':
	// 					monogatari.storage().player.equipment = "Brand Name",
	// 			},
	// 			'ChangeMind': {
	// 				'Text': 'Ask about good value products.',
	// 				'Do': 'jump Shop2',
	// 				// 'Save':
	// 				// 	monogatari.storage().player.equipment = "Good Value"
	// 			},
	// 		}
	// 	}
	// ],
	'Shop2': [
		'clerk Ok, here is your gear. Hope you have a good trip.',
		'jump School'
	],
	'School': [
		'show scene school with fadeIn',
		"We're supposed to meet at school before going to the campsite.",
		'show character sam happy at right with fadeIn',
		"Hi Sam!",
		"Sam knows everything about insects. She is like an encyclopedia.",
		'hide character sam with fadeOut',
		'show character zack happy at left with fadeIn',
		"And there's Zack. He's one of the school's best athletes.",
		'jump Trail1'
	],
	'Trail1': [
		'show scene forest-mist with fadeIn',
		'I AM JUST SKIPPING FORWARD HERE, TO THE FOREST PART.',
		'show image butterfly with fadeIn',
		// 'show character sam happy at right with fadeIn',
		// 'show character zack happy at left with fadeIn',
		"sam Wow, it's gotten so misty.",
		'zack Hey guys, check that butterfly!',
		"zack It's huge.",
		"sam is that a birdwing butterfly?",
		"zack How should I know.",
		"sam wow, it looks like a Queen Alexandra's birdwing.",
		"zack lets follow it.",
		"sam yeah, I've never seen one for real before.",
		"uh guys, that means we will leave the path.",
		"We could get lost in the deep forest.",
		{
			'Choice': {
				'LeavePath': {
					'Text': "Ok, let's follow it. This is a once in a lifetime chance.",
					'Do': 'jump DeepForest1',
				},
				'StayOnPath': {
					'Text': 'Guys, we said we would stay on the path. You know what XYZ said about getting lost.',
					'Do': 'jump Trail2',
				},
			},
		},
	],
	'Trail2': [
		'show scene forest-path with fadeIn',
		'show character sam happy at right with fadeIn',
		'show character zack happy at left with fadeIn',
		"zack aww, you're no fun at all.",
		"sam guys, wait up, I need to tie my shoelace."
	],
	'DeepForest1': [
		'show scene deep-forest with fadeIn',
		'show character sam happy at right with fadeIn',
		'show character zack happy at left with fadeIn',
	],

});

function test() {
	console.log("test123")
	fetch('/test', {
		method: 'POST',
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		},
	});
};


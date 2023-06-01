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
	'menuTrack': 'menuTrack.mp3',
	'intro': 'introTrack.mp3',
	'park': 'parkTrack.mp3',
	'shop': 'shopTrack.mp3'
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
	'apartment': 'apartment-2.png',
	'elevator': 'elevator-2.png',
	'house': 'house-2.png',
	'hallway': 'hallway.png',
	'photo-closeup': 'photo-closeup.png',
	'library': 'library-3.png',
	'kitchen': 'kitchen.png',
	'cash': 'cash.png',
	'bedroom': 'bedroom-4.png',
	'park-entrance': 'park-entrance.png',
	'park': 'park.png',
	'shop-exterior': 'hiking-shop-exterior.png',
	'boot-advert': 'boot-advert.png',
	'shop-interior': 'hiking-shop.png',
	'driving': 'driving.png',
	'school': 'school-1.png',
	'trail-beginning': 'trail-beginning.png',
	'trail-2': 'trail-2.png',
	'trail-split': 'trail-split.jpg',
	'forest-mist': 'forest-mist-1.png',
	'forest-path-1': 'forest-path-1.png',
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
	'grandpa': {
		name: 'Grandpa',
		color: '#ffff00',
		directory: 'grandpa',
		sprites: {
			//angry: 'normal.png',
			happy: 'happy.png',
			//normal: 'normal.png',
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
	'emily': {
		name: 'Emily',
		color: '#ffff00',
		directory: 'emily',
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
			happy: 'happy.png',
			//normal: 'normal.png',
			//	sad: 'sad.png',
			//	surprised: 'surprised.png'
		}
	}
});

monogatari.script({
	// The game starts here.
	'Start': [
		'play music intro with fade 1',
		'show scene apartment with fadeIn',
		"Our home.",
		"The big and bustling city.",
		'show scene elevator with fadeIn',
		"Another boring day. Nothing ever happens here.",
		'show scene hallway with fadeIn',
		"I wonder if Grandma's home.",
		"Hmm, seems like the place is empty.",
		'show scene photo-closeup with fadeIn',
		"I wish I could go to wild places, like Grandpa used to.",
		"No school, homework. No one telling me what to do.",
		'What an exciting life. Nothing ever happens in my life...',
		'show scene kitchen with fadeIn',
		"I'm hungry. I'll have...",
		{
			'Choice': {
				'HealthyFood': {
					'Text': 'donuts',
					"onChosen": function () {
						monogatari.storage().first_meal = "Donuts";
						SaveChoice(1, "Donuts");
					},
					'Do': 'Yum'
				},
				'UnHealthyFood': {
					'Text': 'a sandwhich',
					"onChosen": function () {
						monogatari.storage().first_meal = "Sandwich"
						SaveChoice(1, "Sandwich");
					},
					'Do': 'Yum'
				},
			},
		},
		'show scene cash with fadeIn',
		"player Oh look, Grandma left me some money to get myself gear for the upcoming hike with Grandpa.",
		"player I'm so excited. Finally, a real adventure.",
		"I'm going to go get the stuff right now.",
		"I'll cut across the park.",
		'stop music intro with fade 1',
		'jump Park'],
	'Park': [
		'play music park with fade 1',
		'show scene park-entrance with fadeIn',
		'Nice day',
		'show scene park with fadeIn',
		'show character emily happy at right with fadeIn',
		"emily Hi {{player.name}}!",
		"Hi Emily!",
		"Emily knows everything about insects. She is like an encyclopedia.",
		'hide character emily with fadeOut',
		'show character zack happy at left with fadeIn',
		"zack Hey {{player.name}}.",
		"And there's Zack. He knows a lot about camping.",
		"player What are you guys doing in the park?",
		'hide character zack with fadeOut',
		'show character emily happy at right',
		"emily We're getting some practice in for our big hike.",
		"player Ok, I'm also excited about it.",
		"player Maybe you guys could help me pick some gear, I'm on my way to the outdoor equipment store.",
		"emily Sure. My dad's pretty experienced with hiking, so I know a few things.",
		'stop music park with fade 1',
		'jump Shop1'
	],
	'Shop1': [
		'play music shop with fade 1',
		'show scene shop-exterior with fadeIn',
		{
			'Conditional': {
				'Condition': function () {
					return this.storage('first_meal') == 'Donuts';
				},
				'True': 'I feel so tired. Wish I had eaten something better than just donuts.',
				'False': 'Ok, thanks.'
			}
		},
		"player Here it is, the outdoor equipment store.",
		'show scene boot-advert with fadeIn',
		"player Whoa, check out those boots. If I get them, everyone will think I am so cool.",
		"emily If you get those boots, you won't be able to afford anything else.",
		"player Yeah, I'd have to rely on what I have already.",
		'show scene shop-interior with fadeIn',
		'clerk Hi there {{player.name}}',
		'clerk What can I get for you?',
		{
			'Choice': {
				'BrandName': {
					'Text': "I'd like a pair of those boots in the window please.",
					"onChosen": function () {
						monogatari.storage().equipment = "Expensive Boots";
						SaveChoice(2, "Expensive Boots");
					},
					'Do': 'clerk Ok, here is your gear. Hope you have a good trip.',
				},
				'GoodValue': {
					'Text': 'I need some relatively cheap boots, a rain jacket, and a thermal top, please.',
					"onChosen": function () {
						monogatari.storage().equipment = "Good Value"
						SaveChoice(2, "Good Value");
					},
					'Do': 'clerk Ok, here is your gear. Hope you have a good trip.',
				},
			},
		},
		{
			'Conditional': {
				'Condition': function () {
					return this.storage('equipment') == 'Expensive Boots';
				},
				'True': "emily Cool boots, but I don't know what you are going to do if it rains or is cold up there.",
				'False': "emily Those boots are pretty dorky, but at least you're covered if it rains or gets cold up there."
			}
		},
		'stop music shop with fade 1',
		'jump Driving'],
	'Driving': [
		'show scene driving with fadeIn',
		"Soon enough, the big day came. Emily and her father, Grandpa, Zack, and you all drove to the wilderness.",
		'jump TrailBeginning'
	],
	'TrailBeginning': [
		'show scene trail-beginning with fadeIn',
		'show character grandpa happy at right with fadeIn',
		'grandpa Finally here!',
		'grandpa Now you guys follow close and dont get lost',
		'show scene trail-2 with fadeIn',
		'emily Uh guys, I need to tie my shoelaces.',
		"zack No problem Emily, we'll wait with you.",
		// * Could be a choice here.
		"emily Shouldn't ask Gramps to wait up for us?",
		"zack Nah, the trail is simple, we'll catch up easily.",
		'jump TrailSplit'
	],
	'TrailSplit': [
		'show scene trail-split with fadeIn',
		'emily Ah shoot, the trail splits.',
		'zack I wonder which way Gramps went.',
		// * Could be a choice/branch here.
		"zack Let's take the left way, it looks right to me.",
		'show scene forest-path-1 with fadeIn',
		'zack Gramps must be just ahead, over that rise.',
		"emily We better hurry to catch him, it's getting dark.",
		'show scene trail-split with fadeIn',
		'show character emily happy at right with fadeIn',
		'emily Ah shoot, the trail splits again!',
		'show character zack happy at left with fadeIn',
		'zack And its almost completely dark.',
		'zack Whoa!',
		'emily Hey Zack, are you ok?',
		"emily I think we should stop for the night. We're tired and its dark. Someone is going to get hurt",
		'jump DeepForest1'
	],
	// 'Trail1': [
	// 	"We could get lost in the deep forest.",
	// 	{
	// 		'Choice': {
	// 			'LeavePath': {
	// 				'Text': "Ok, let's follow it. This is a once in a lifetime chance.",
	// 				'Do': 'jump DeepForest1',
	// 			},
	// 			'StayOnPath': {
	// 				'Text': 'Guys, we said we would stay on the path. You know what XYZ said about getting lost.',
	// 				'Do': 'jump Trail2',
	// 			},
	// 		},
	// 	},
	// ],

	// ],
	'DeepForest1': [
		'show scene deep-forest with fadeIn',
		'zack woah, I think we are lost guys',
		'emily yeah, but this place is beautiful',


		// possibly a choice here as to what to do.
		// decide to camp.
		// happy to be away from school.
	],

});

function SaveChoice(choiceId, choice) {
	fetch('/api/save-choice', {
		method: 'POST',
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify({ choiceId: choiceId, choice: choice })
	});
};


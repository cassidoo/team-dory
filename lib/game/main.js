ig.module('game.main').requires('impact.game', 'impact.font', 'impact.entity', 
//'plugins.box2d.game',
'game.levels.testsetup', 'game.levels.level1', 'game.levels.store', 'game.levels.title',
// 'plugins.box2d.entity',
'game.entities.player', 'game.entities.button').defines(function()
{
	MyGame = ig.Game.extend(
	{
		//gravity: 0,

		// Load a font
		font : new ig.Font('media/04b03.font.png'),

		init : function()
		{
			// Initialize your game here; bind keys etc.
			// Bind keys
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.MOUSE1, 'click');
			//Load Level
			this.loadLevel(LevelTitle);

			if (ig.ua.mobile)
			{
				// controls are different on a mobile device
				ig.input.bindTouch('#buttonLeft', 'left');
				ig.input.bindTouch('#buttonRight', 'right');
				ig.input.bindTouch('#buttonUp', 'up');
				ig.input.bindTouch('#buttonDown', 'down');
				//alert('control setup');
			}
			else
			{
				//initiate background music
				/*var play_music = true;
				 var music = ig.music;
				 music.add("media/music/backgroundMusic.ogg");
				 music.volume = 0.0;
				 music.play();*/
			}
		},

		update : function()
		{
			// Update all entities and backgroundMaps
			// move left or right
			this.parent();

			// Add your own, additional update code here
		},

		draw : function()
		{
			// Draw all entities and backgroundMaps
			this.parent();

			// Add your own drawing code here
			/*var x = ig.system.width/2,
			 y = ig.system.height/2;

			 this.font.draw( 'It Works, Cassidy!', x, y, ig.Font.ALIGN.CENTER );*/
		}
	});

	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2

	ig.main('#canvas', MyGame, 60, 800, 576, 1);

});

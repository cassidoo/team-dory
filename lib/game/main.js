ig.module('game.main')
.requires('impact.game', 
'impact.font',
 'plugins.box2d.game', 
 'game.levels.testsetup', 
 'game.levels.level1',
  'plugins.box2d.entity',
  'game.entities.player')
  .defines(function()
{
	MyGame = ig.Box2DGame.extend(
	{
		gravity: 100,
		
		// Load a font
		font : new ig.Font('media/04b03.font.png'),

		init : function()
		{
			// Initialize your game here; bind keys etc.
			// Bind keys
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.X, 'fly');
			//Load Level
			this.loadLevel(LevelLevel1);
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
	ig.main('#canvas', MyGame, 60, 320, 240, 2);

});

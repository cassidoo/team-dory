ig.module('game.entities.player').requires('plugins.box2d.entity').defines(function()
{
	EntityPlayer = ig.Box2DEntity.extend(
	{
		size :
		{
			x : 16,
			y : 24
		},
		name : 'player',
		animSheet : new ig.AnimationSheet('media/player.png', 16, 24),
		type : ig.Entity.TYPE.A,
		init : function(x, y, settings)
		{
			this.parent(x, y, settings);
			this.addAnim('idle', 1, [0]);
			this.addAnim('fly', 0.07, [1, 2]);
		},
		update : function()
		{
			// move left or right
			if (ig.input.state('left'))
			{
				this.body.ApplyForce(new b2.Vec2(-20, 0), this.body.GetPosition());
				this.flip = true;
			}
			else if (ig.input.state('right'))
			{
				this.body.ApplyForce(new b2.Vec2(20, 0), this.body.GetPosition());
				this.flip = false;
			}
			// jetpack
			if (ig.input.state('fly'))
			{
				this.body.ApplyForce(new b2.Vec2(0, -60), this.body.GetPosition());
				this.currentAnim = this.anims.fly;
			}
			else
			{
				this.currentAnim = this.anims.idle;
			}
			this.currentAnim.flip.x = this.flip;
			this.parent();
		}
	});
}); 
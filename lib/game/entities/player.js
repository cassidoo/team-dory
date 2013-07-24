/*ig.module('game.entities.player').requires('plugins.box2d.entity').defines(function()
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
}); */
ig.module(
    'game.entities.player'
    )
    .requires(
    'impact.entity'
    )
    .defines(function() {
 
        EntityPlayer = ig.Entity.extend({
 
        type: ig.Entity.TYPE.A, // Player friendly group
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.ACTIVE,
 
        // These are our own properties. They are not defined in the base
        // ig.Entity class. We just use them internally for the Player
        tileSize: 32,
        flip: false,
        health: 1,
	money: 100,
        targetY: 0,
        targetX: 0,
        direction: null,
        speed: 80,
	name : 'player',
	// Define properties here so we can use tile size var
	size: {x: 32, y: 32},
        animSheet: new ig.AnimationSheet('media/charset.png', 32, 32),
	 
 
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            // Add the animations
            this.addAnim('idle', 1, [0]);
	    this.currentAnim = this.anims.idle;
            this.correctPosition();
 
        },
        /**
         * This makes sure the player is always correctly centered in a tile.
         */
        correctPosition: function () {
            xMod = this.pos.x.round() % 32;
            yMod = this.pos.y.round() % 32;
            this.pos.x = this.pos.x.round() - xMod;
            this.pos.y = this.pos.y.round() - yMod;
        },
 
        /**
         * Update Function
         */
        update: function() {
            if (this.vel.x == 0 && this.vel.y == 0) {
 
                // If X and Y velocity is at 0 the player isn't moving
                if (ig.input.state('up')) {
                    this.vel.y = -this.speed;
                    this.vel.x = 0;
                    this.targetY = this.pos.y.round() - this.tileSize;
                    this.direction = "up";
                }
 
                else if (ig.input.state('down')) {
                    this.vel.y = this.speed;
                    this.vel.x = 0;
                    this.targetY = this.pos.y.round() + this.tileSize;
                    this.direction = "down";
                }
 
                if (ig.input.state('left')) {
                    this.vel.x = -this.speed;
                    this.vel.y = 0;
                    this.targetX = this.pos.x.round() - this.tileSize;
                    this.direction = "left";
                }
                else if (ig.input.state('right')) {
                    this.vel.x = this.speed;
                    this.vel.y = 0;
                    this.targetX = this.pos.x.round() + this.tileSize;
                    this.direction = "right";
                }
            }
            else {
 
                // Test to see if we have reached the targetX or targetY and reset teh velocity.
 
                if (this.direction == "up" && this.pos.y.round() <= this.targetY) {
                    this.vel.y = 0;
                }
                else if (this.direction == "down" && this.pos.y.round() >= this.targetY) {
                    this.vel.y = 0;
                }
                else if (this.direction == "left" && this.pos.x.round() <= this.targetX) {
                    this.vel.x = 0;
                }
                else if (this.direction == "right" && this.pos.x.round() >= this.targetX) {
                        this.vel.x = 0;
                }
 
                // Make sure that X & Y positions are always on whole numbers
                this.pos.x = this.pos.x.round();
                this.pos.y = this.pos.y.round();
            }
 
            this.parent();
 
 
        },
 
        handleMovementTrace: function (res) {
            if (res.collision.x || res.collision.y) {
                // This entity collided on either the x or y axis,
                // the collision pos is res.pos.x, res.pos.y.
                // Do whatever you want here.
                ig.log("Collision with wall");
                // reset Y position
                this.vel.x = 0;
                this.vel.y = 0;
                this.correctPosition();
            }
            this.parent(res);
        }
    });
 
});
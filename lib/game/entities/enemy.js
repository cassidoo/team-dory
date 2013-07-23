ig.module(
  'game.entities.enemy'
)
.requires(
  'plugins.box2d.entity'
)
.defines(function(){

    EntityEnemy = ig.Box2DEntity.extend({
        size: {x: 16, y:24},
        name: 'enemy',
        health: 100,
        type: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet( 'media/enemy.png', 16, 24 ),
        
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        cooldowncounter: 0,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            // Add the animations
            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'fly', 0.07, [1,2] );
            },
        update: function(){
            var players = ig.game.getEntitiesByType('EntityPlayer');
            var player  = players[0];
            // both distance on x axis and y axis are calculated
            var distanceX = this.pos.x - player.pos.x;
            var sign     = Math.abs(distanceX)/distanceX;
            var distanceY = this.pos.y - player.pos.y;   
            //try to move without flying, fly if necessary
            if (Math.abs(distanceX) < 110){      
                var fY = distanceY > 0 ? -50: 0; 
                this.body.ApplyForce( new b2.Vec2(sign * -20,fY), this.body.GetPosition() );
                if(distanceY >= 0){this.currentAnim = this.anims.fly;}
                else{this.currentAnim = this.anims.idle;}
            }    
            this.body.SetXForm(this.body.GetPosition(), 0);
            if (distanceX > 0){this.currentAnim.flip.x = true;}
            else{this.currentAnim.flip.x = false;}
            this.cooldowncounter ++;
            this.parent();  
            },  
        check: function(other){
            if (this.cooldowncounter > 60){
                other.receiveDamage(10,this);
                this.cooldowncounter = 0;
            }
        },
        kill: function(){
            ig.game.increaseScore(100);
            this.parent();
        }
    })
});
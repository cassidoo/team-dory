ig.module(
  'game.entities.boss'
)
.requires(
   'game.entities.enemy'
)
.defines(function(){
  EntityBoss = EntityEnemy.extend({
    name: 'boss',
    size: {x: 32, y:48},
    health: 200,
    animSheet: new ig.AnimationSheet( 'media/Boss.png', 32, 48 ) ,
    
    update: function(){   
        var players = ig.game.getEntitiesByType('EntityPlayer');
        var player  = players[0];
        // both distance on x axis and y axis are calculated
        var distanceX = this.pos.x - player.pos.x;
        var sign     = Math.abs(distanceX)/distanceX;
        var distanceY = this.pos.y - player.pos.y;   
        //try to move without flying, fly if necessary      
        if (Math.abs(distanceX) < 1000 && Math.abs(distanceX) > 100){      
            var fY = distanceY > 0 ? -350: 0; 
            this.body.ApplyForce( new b2.Vec2(sign * -50,fY), this.body.GetPosition() ); 
            if(distanceX>0){this.flip = true;}
            else {this.flip = false;}         
            if (Math.random() > 0.9){
                var x = this.pos.x + (this.flip ? -6 : 6 );
                var y = this.pos.y + 6;
                ig.game.spawnEntity( EntityBossbullet, x, y, {flip:this.flip} );
            }
            if(distanceY >= 0){this.currentAnim = this.anims.fly;}
            else{this.currentAnim = this.anims.idle;}
        }
        else if (Math.abs(distanceX) <= 100){
             if(Math.random() > 0.9){
                var x = this.pos.x + (this.flip ? -6 : 6 );
                var y = this.pos.y + 6;
                ig.game.spawnEntity( EntityBossbullet, x, y, {flip:this.flip} );
            }
        }
        this.body.SetXForm(this.body.GetPosition(), 0);
        if (distanceX > 0){this.currentAnim.flip.x = true;}
        else{this.currentAnim.flip.x = false;}
        this.cooldowncounter ++;
        this.parent();   
    }
  });
});
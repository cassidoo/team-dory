ig.module(
  'game.entities.bomb'
)
.requires(
  'plugins.box2d.entity'
)
.defines(function(){
   EntityBomb = ig.Box2DEntity.extend({
      size: {x: 24, y: 10}, 
      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.B,  
      animSheet: new ig.AnimationSheet( 'media/bomb.png', 24, 10 ),
      lifespan: 100,
      init: function( x, y, settings ) {
         this.parent( x, y, settings );   
         // Add the animations
         this.addAnim( 'idle', 1, [0] );
         this.currentAnim = this.anims.idle;
         this.currentAnim.flip.x = settings.flip;
      },
      explosion: function(minblastzone,maxblastzone,blastdamage,blastforcex,blastforcey){
         var EnemyList= ig.copy(ig.game.entities);
         var i = 0;
         //check every entity
         while(typeof EnemyList[i] != 'undefined'){
            Enemy = EnemyList[i];
            //calculate distance to entity
            distance = Math.sqrt((this.pos.x - Enemy.pos.x)*(this.pos.x - Enemy.pos.x) + 
                      (this.pos.y - Enemy.pos.y)*(this.pos.y - Enemy.pos.y));
            //adjust blastdirection depending on entity position
            if(this.pos.x - Enemy.pos.x < 0){adjustedblastforcex = blastforcex}
            else{adjustedblastforcex = - blastforcex}
            if(this.pos.y - Enemy.pos.y < 0){adjustedblastforcey = blastforcey}
            else{adjustedblastforcey = - blastforcey}
            //if within blastzone: blow up the target
            if(minblastzone < distance && distance < maxblastzone){
               Enemy.body.ApplyImpulse(new b2.Vec2(adjustedblastforcex,adjustedblastforcey),this.body.GetPosition());
               Enemy.receiveDamage(blastdamage,this);}
               i++;
            }    
     },
     update: function(){
         //projectiles disappear after 100 frames  
         this.lifespan -= 1;
         if(this.lifespan < 0){
            this.explosion(0,40,90,200,100);
            this.explosion(40,200,20,100,50);
            this.kill();
         } 
         this.parent();
     },
     check: function(other){
         other.receiveDamage(30);
         this.explosion(0,40,70,200,100);
         this.explosion(40,200,20,100,50);
         this.kill();
     }
   });
});
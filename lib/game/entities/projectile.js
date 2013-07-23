ig.module(
  'game.entities.projectile'
)
.requires(
  'plugins.box2d.entity'
)
.defines(function(){
  EntityProjectile = ig.Box2DEntity.extend({
    size: {x: 8, y: 4},
    lifetime:60,
    name: 'projectile',
    checkAgainst: ig.Entity.TYPE.B, 
    animSheet: new ig.AnimationSheet( 'media/projectile.png', 8, 4 ),  
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1, [0] );
      this.currentAnim.flip.x = settings.flip;   
      var velocity = (settings.flip ? -10 : 10);
      this.body.ApplyImpulse( new b2.Vec2(velocity,0), this.body.GetPosition() );
    },
    update: function(){
      this.lifetime -=1;
      if(this.lifetime < 0){this.kill();}
      this.parent();   
    },
    check: function(other){
      other.receiveDamage(10);
      this.kill();
    }
  });
});
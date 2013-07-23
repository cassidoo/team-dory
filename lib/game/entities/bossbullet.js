ig.module(
  'game.entities.bossbullet'
)
.requires(
   'game.entities.projectile'
)
.defines(function(){
  EntityBossbullet = EntityProjectile.extend({
    name: 'bossbullet',
    checkAgainst: ig.Entity.TYPE.A, 
    animSheet: new ig.AnimationSheet( 'media/bossbullet.png', 8, 4 ) 
  });
});
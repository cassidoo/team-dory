// A Button Entity for Impact.js
 
ig.module( 'game.entities.button' )
.requires(
  'impact.entity'
)
.defines(function() {
 
  EntityButton = ig.Entity.extend({
    size: { x: 398, y: 46 },
    
    text: [],
    textPos: { x: 5, y: 5 },
    textAlign: ig.Font.ALIGN.LEFT,
    
    font: null,
    animSheet: new ig.AnimationSheet( 'media/button1.png', 398, 46 ),
    
    state: 'idle',
    
    _oldPressed: false,
    _startedIn: false,
    _actionName: 'click',
    
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      
      this.addAnim( 'idle', 1, [0] );
      this.addAnim( 'active', 1, [0] );
      this.addAnim( 'deactive', 1, [0] );
 
      if ( this.text.length > 0 && this.font === null ) {
        if ( ig.game.buttonFont !== null ) this.font = ig.game.buttonFont;
        else console.error( 'If you want to display text, you should provide a font for the button.' );
      }
    },
    
    update: function() {
      if ( this.state !== 'hidden' ) {
        var _clicked = ig.input.state( this._actionName );
        
        if ( !this._oldPressed && _clicked && this._inButton() ) {
          this._startedIn = true;
        }
        
        if ( this._startedIn && this.state !== 'deactive' && this._inButton() ) {
          if ( _clicked && !this._oldPressed ) { // down
            this.setState( 'active' );
            this.pressedDown();
          }
          else if ( _clicked ) { // pressed
            this.setState( 'active' );
            this.pressed();
          }
          else if ( this._oldPressed ) { // up
            this.setState( 'idle' );
            this.pressedUp();
          }
        }
        else if ( this.state === 'active' ) {
          this.setState( 'idle' );
        }
 
        if ( this._oldPressed && !_clicked ) {
          this._startedIn = false;
        }
 
        this._oldPressed = _clicked;
      }
    },
    
    draw: function() {
      if ( this.state !== 'hidden' ) {
        this.parent();
 
        if ( this.font !== null ) {
					for ( var i = 0; i < this.text.length; i++ ) {
	          this.font.draw( 
	            this.text[i], 
	            this.pos.x + this.textPos.x - ig.game.screen.x, 
	            this.pos.y + ((this.font.height + 2) * i) + this.textPos.y - ig.game.screen.y, 
	            this.textAlign
	          );
	        }
				}
      }
    },
    
    setState: function( s ) {
      this.state = s;
      
      if ( this.state !== 'hidden' ) {
        this.currentAnim = this.anims[ this.state ];
      }
    },
    
    pressedDown: function() {},
    pressed: function() {},
    pressedUp: function() {
      this.setState( 'hidden' );
      ig.game.loadLevelDeferred(LevelStore);  
    },
    
    _inButton: function() {
      return ig.input.mouse.x + ig.game.screen.x > this.pos.x && 
             ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x &&
             ig.input.mouse.y + ig.game.screen.y > this.pos.y && 
             ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
    }
  });
 
});
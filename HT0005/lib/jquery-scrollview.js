(function($){
  var _setup
  
  ,   _swipe_start
  ,   _swipe_continue
  ,   _swipe_end
  ,   _tap
  
  ,   _snap_back
  ,   _snap_offset
  
  ;
  
  var $active_view
  ;
  
  
  /*** Setup
  ***/
  _setup = function(options){
    options = (options || {});
    options = $.extend({ direction: 'both' }, options);
    
    this._scroll_view_state =
    { options: options
    };
    
    $(this)
      .gesture_tap(_tap)
      .gesture_swipe_start(_swipe_start)
      .gesture_swipe_continue(_swipe_continue)
      .gesture_swipe_end(_swipe_end);
    
    $(this)
      .children()
      .wrapAll('<div/>');
      
    var wrapper = $(this).children().first();
    
    this._scroll_view_state.wrapper = wrapper;
  };
  
  
  /*** Swipe Start
  ***/
  _swipe_start = function(e){
    var _state
    ;
    
    _state = this._scroll_view_state;
    
    _state.speedX  = 0;
    _state.speedY  = 0;
    _state.offsetX = $(this).scrollLeft();
    _state.offsetY = $(this).scrollTop();
    
    $(this).stop(true);
  };
  
  
  /*** Swipe Continue
  ***/
  _swipe_continue = function(e){
    var _state
    ;
    
    _state = this._scroll_view_state;
    
    _state.offsetX -= e.deltaX;
    _state.offsetY -= e.deltaY;
    
    _state.speedX  = (_state.speedX + e.speedX) / 2.0;
    _state.speedY  = (_state.speedY + e.speedY) / 2.0;
    
    $(this).scrollLeft(_state.offsetX);
    $(this).scrollTop(_state.offsetY);
  };
  
  
  /*** Swipe End
  ***/
  _swipe_end = function(e){
    var _state
    ,   _projected_x
    ,   _projected_y
    ;
    
    _state = this._scroll_view_state;
    
    if (_state.options.direction == 'x') {
      _projected_x = (1500 * _state.speedX * 0.75);
      _projected_y = 0;
    } else if (_state.options.direction == 'y') {
      _projected_x = 0;
      _projected_y = (1500 * _state.speedY * 0.75);
    } else {
      _projected_x = (1500 * _state.speedX * 0.75);
      _projected_y = (1500 * _state.speedY * 0.75);
    }
    
    $(this).scrollTo(
      { left: _state.offsetX - _projected_x
      , top:  _state.offsetY - _projected_y
      },
      { axis:     'xy'
      , duration: 1500
      , easing:   "easeOutQuint"
      , onAfter:  _snap_back
      });
  };
  
  
  /*** Tap
  ***/
  _tap = function(){
    setTimeout(function(){ $(this).stop(true, true); }, 0);
  };
  
  
  /*** Snap Back
  ***/
  _snap_back = function(){
    var ctx
    ,   $this
    ,   $last
    ,   _state
    ;
    
    _state = this._scroll_view_state;
    $this  = $(this);
    
    ctx = {};
    
    ctx.offset =
      [ $this.scrollLeft()
      , $this.scrollTop()
      ];
    
    ctx.offset[0];
    ctx.offset[1];
    
    ctx.content_size  = [ 
      _state.wrapper.outerWidth()
    , _state.wrapper.outerHeight()
    ];
    
    ctx.clipping_size =
      [ $this.innerWidth()
      , $this.innerHeight()
      ];
    
    if (!_state.options.snap_offset) {
      _state.options.snap_offset = _snap_offset;
    }
    
    _state.options.snap_offset.call(ctx);
    
    if (_state.options.snap_back_animation) {
      
      _state.options.snap_back_animation.call(ctx);
      
    } else {
      
      $(this).scrollTo(
      { 
        left: ctx.offset[0]
      , top:  ctx.offset[1]
      }
      ,
      { 
        axis:     'xy'
      , duration: 500
      , easing:   "easeOutQuint"
      });
      
    }
  };
  
  
  /*** Snap Offset
  ***/
  _snap_offset = function(){
    
    if (this.offset[0] < 0) {
      this.offset[0] = 0;
    }
    
    if (this.offset[1] < 0) {
      this.offset[1] = 0;
    }
    
    if (this.content_size[0] > this.clipping_size[0]) {
      if ((this.content_size[0] - (this.offset[0] + this.clipping_size[0])) < 0) {
        this.offset[0] = (this.content_size[0] - this.clipping_size[0]);
      }
    }
    
    if (this.content_size[1] > this.clipping_size[1]) {
      if ((this.content_size[1] - (this.offset[1] + this.clipping_size[1])) < 0) {
        this.offset[1] = (this.content_size[1] - this.clipping_size[1]);
      }
    }
    
  };
  
  
  /*** jQuery plugin method
  ***/
  $.fn.scrollView = function(options){
    return this.each(function(){ _setup.call(this, options); });
  };
  
}(jQuery));
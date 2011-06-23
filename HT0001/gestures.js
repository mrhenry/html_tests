(function($){
  var _mouse_down
  ,   _mouse_up
  ,   _mouse_move
  ,   _click
  ;
  
  var _tap
  ,   _swipe_start
  ,   _swipe_continue
  ,   _swipe_end
  ;
  
  var $mouse
  ,   $last_mouse
  ,   $default_mouse
  ;
  
  $default_mouse =
  { down:           false
  , moved:          false
  , swiping:        false
  , downSince:      null
  , eventStartedIn: null
  };
  
  $mouse = $.extend({}, $default_mouse);
  
  _mouse_down = function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    
    $mouse = $.extend({}, $default_mouse);
    $mouse.down           = true;
    $mouse.downSince      = e.timeStamp;
    $mouse.eventStartedIn = e.target;
  };
  
  _mouse_up = function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    
    if ($mouse.moved){
      _swipe_end(e);
    } else {
      _tap(e);
    }
    
    $last_mouse = $mouse;
    $mouse = $.extend({}, $default_mouse);
  };
  
  _mouse_move = function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    
    if ($mouse.down){
      $mouse.moved = true;
      
      if ($mouse.swiping) {
        _swipe_continue(e);
      } else {
        $mouse.swiping = true;
        _swipe_start(e);
      }
    }
  };
  
  _click = function(e){
    if ($last_mouse.moved || $last_mouse.eventStartedIn.localName != 'a') {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  };
  
  _tap = function(e){
    if (e.target != $mouse.eventStartedIn) {
      return;
    }
    
    $($mouse.eventStartedIn).trigger(
    { type:"gesture_tap"
    });
  };
  
  _swipe_start = function(e){
    $mouse.screenX       = e.screenX;
    $mouse.screenY       = e.screenY;
    $mouse.speedX        = 0;
    $mouse.speedY        = 0;
    $mouse.lastTimeStamp = e.timeStamp;
    
    $($mouse.eventStartedIn).trigger(
    { type: "gesture_swipe_start"
    , over: e.target
    });
  };
  
  _swipe_continue = function(e){
    var _s
    ;
    
    _s =
    { type:   "gesture_swipe_continue"
    , over:   e.target
    , deltaT: e.timeStamp - $mouse.lastTimeStamp
    , deltaX: e.screenX   - $mouse.screenX
    , deltaY: e.screenY   - $mouse.screenY
    };
    
    _s.speedX = _s.deltaX / _s.deltaT;
    _s.speedY = _s.deltaY / _s.deltaT;
    
    if (Math.abs(_s.deltaX) > Math.abs(_s.deltaY)) {
      _s.direction = (_s.deltaX > 0 ? 'right' : 'left');
    } else {
      _s.direction = (_s.deltaY > 0 ? 'down' : 'up');
    }
    
    $($mouse.eventStartedIn).trigger(_s);
    
    $mouse.screenX = e.screenX;
    $mouse.screenY = e.screenY;
  };
  
  _swipe_end = function(e){
    $($mouse.eventStartedIn).trigger(
    { type: "gesture_swipe_end"
    , over: e.target
    });
  };
  
  $.fn.gesture_tap = function(clb){
    return this.bind('gesture_tap', clb);
  };
  
  $.fn.gesture_swipe_start = function(clb){
    return this.bind('gesture_swipe_start', clb);
  };
  
  $.fn.gesture_swipe_continue = function(clb){
    return this.bind('gesture_swipe_continue', clb);
  };
  
  $.fn.gesture_swipe_end = function(clb){
    return this.bind('gesture_swipe_end', clb);
  };
  
  $(function(){
    
    $(document)
      .mousedown(_mouse_down)
      .mousemove(_mouse_move)
      .mouseup(_mouse_up);
    
    $('a')
      .bind('click', _click);
    
  });
  
}(jQuery));

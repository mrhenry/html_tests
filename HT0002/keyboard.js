(function($){

  var $layouts
  ,   $default_options
  ;

  var _build_keyboard
  ,   _tap_key
  ,   _swipe_start
  ,   _swipe_continue
  ,   _swipe_end
  ;
  
  $default_options = 
  { 'layout'         : 'azerty'
  , 'capture_return' : true
  };
  
  _tap_key = function(e){
    var target
    ,   keyboard
    ,   key
    ;
    
    target   = $(e.over || this);
    keyboard = target.closest('.kb-container');
    
    if (target.hasClass('kb-key')) {
      key   = target.data('key');
      shift = keyboard.hasClass('kb-shift-down');
      
      switch (key) {
        
      case 'shift':
        keyboard
          .addClass('kb-shift-down');
        break;
        
      case 'delete':
        keyboard.trigger(
          { type: "keyboard_delete"
          });
        break;
        
      case 'return':
        if (keyboard[0].kb_options.capture_return) {
          keyboard.trigger(
            { type: "keyboard_return"
            });
          break;
        } else {
          key = "\n";
        }
          
      case 'space':
        if (key == 'space')
          key = ' ';
        
      default:
        keyboard.trigger(
          { type: "keyboard_key_press"
          , key:  (shift ? key.toUpperCase() : key)
          });
        break;
      
      }
      
      if (shift) {
        keyboard
          .removeClass('kb-shift-down');
      }
    }
  };
  
  _swipe_start = function(e){
    var target
    ;
    
    target = $(e.over);
    
    target
      .closest('.kb-container')
      .find('.kb-key-down')
      .removeClass('kb-key-down');
      
    if (target.hasClass('kb-key')) {
      target.addClass('kb-key-down');
    }
  };
  
  _swipe_continue = function(e){
    var target
    ;
    
    target = $(e.over);
    
    target
      .closest('.kb-container')
      .find('.kb-key-down')
      .removeClass('kb-key-down');
    
    if (target.hasClass('kb-key')) {
      target.addClass('kb-key-down');
    }
  };
  
  _swipe_end = function(e){
    var target
    ;
    
    target = $(e.over);
    
    target
      .closest('.kb-container')
      .find('.kb-key-down')
      .removeClass('kb-key-down');
    
    _tap_key.call(e.over, e);
  };
  
  _build_keyboard = function(options){
    options = $.extend($.extend({}, $default_options), options);
    
    var keyboard
    ,   alpha_pad
    ,   numer_pad
    ,   row
    ,   key
    ,   row_div
    ,   key_div
    ,   i
    ,   j
    ;
    
    keyboard = $('<div/>')
      .addClass("kb-layout-"+options.layout)
      .addClass("kb-container")
      ;
    
    keyboard[0].kb_options = options;
    
    alpha_pad = $('<div/>')
      .addClass("kb-alpha-pad")
      .appendTo(keyboard)
      ;
    
    numer_pad = $('<div/>')
      .addClass("kb-numer-pad")
      .appendTo(keyboard)
      ;
    
    for (i in $layouts[options.layout]) {
      row = $layouts[options.layout][i];
      row_div = $('<div/>')
        .addClass("kb-row-idx-"+i)
        .addClass("kb-row")
        .appendTo(alpha_pad)
        ;
      
      for (j in row) {
        key = row[j];
        key_div = $('<div/>')
          .addClass("kb-key-idx-"+i)
          .addClass("kb-key-name-"+key)
          .addClass("kb-key")
          .data('key', key)
          .text(key.toUpperCase())
          .appendTo(row_div)
          .gesture_tap(_tap_key)
          ;
      }
    }
    
    for (i in $layouts['_numeric_pad']) {
      row = $layouts['_numeric_pad'][i];
      row_div = $('<div/>')
        .addClass("kb-row-idx-"+i)
        .addClass("kb-row")
        .appendTo(numer_pad)
        ;
      
      for (j in row) {
        key = row[j];
        key_div = $('<div/>')
          .addClass("kb-key-idx-"+i)
          .addClass("kb-key-name-"+key)
          .addClass("kb-key")
          .data('key', key)
          .text(key)
          .appendTo(row_div)
          .gesture_tap(_tap_key)
          ;
      }
    }
    
    keyboard
      .gesture_swipe_start(_swipe_start)
      .gesture_swipe_continue(_swipe_continue)
      .gesture_swipe_end(_swipe_end)
      ;
    
    return keyboard;
  };
  
  $.keyboard = function(options){
    return _build_keyboard(options);
  };
  
  $.fn.keyboard_key_press = function(clb){
    return this.bind('keyboard_key_press', clb);
  };
  
  $.fn.keyboard_return = function(clb){
    return this.bind('keyboard_return', clb);
  };
  
  $.fn.keyboard_delete = function(clb){
    return this.bind('keyboard_delete', clb);
  };
  
  $layouts   = {};
  
  $layouts.azerty =
  [ ['a','z','e','r','t','y','u','i','o','p']
  , ['q','s','d','f','g','h','j','k','l','m']
  , ['w','x','c','v','b','n', 'delete']
  , ['shift', 'space', 'return']
  ];
  
  $layouts.qwerty =
  [ ['q','w','e','r','t','y','u','i','o','p']
  , ['a','s','d','f','g','h','j','k','l']
  , ['z','x','c','v','b','n','m', 'delete']
  , ['shift', 'space', 'return']
  ];
  
  $layouts._numeric_pad =
  [ ['7','8','9']
  , ['4','5','6']
  , ['1','2','3']
  , [    '0'    ]
  ];
  
}(jQuery));

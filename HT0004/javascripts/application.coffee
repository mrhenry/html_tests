# Compile using -> 'coffee -wc javascripts/application.coffee'
#

kaleidoscope = {
  $cntnr : undefined
  $canvas : undefined
  $context : undefined
  
  current_offset : undefined
  
  initialize : () ->
    this.$cntnr = $('#kaleidoscope')
    
    $(document).bind('mousemove', (e) ->
      offset_x = $(window).width() / 2 - e.pageX
      offset_y = $(window).height() / 2 - e.pageY
      
      kaleidoscope.current_offset = { x: offset_x, y: offset_y }
      $(window).trigger('resize')
    )
  
  window_resize : () ->
    kaleidoscope.$canvas[0].width = $(window).width()
    kaleidoscope.$canvas[0].height = $(window).height()
    
    kaleidoscope.draw(kaleidoscope.current_offset.x, kaleidoscope.current_offset.y)
    # kaleidoscope.draw(undefined, undefined)
  
  new_canvas : () ->
    this.$cntnr.append('<canvas width="' + $(window).width() + '" height="' + $(window).height() + '"></canvas>')
    
    this.$canvas = this.$cntnr.find('canvas:first')
    this.$context = this.$canvas[0].getContext('2d')
    
    $(document).trigger('mousemove')
    # $(window).trigger('resize')
  
  draw_slice: (flip, c, rb, canv_width, canv_height, normal_0, slice) ->
    R_360DEG = 360 * (Math.PI / 180)
    
    c.save()
    c.beginPath()
    slice()
    c.clip()
    
    rb = R_360DEG - rb
    
    c.translate(
      (canv_width  / 2.0) - (Math.cos(rb) * (normal_0.img_w / 2)),
      (canv_height / 2.0) - (Math.sin(rb) * (normal_0.img_w / 2)))
      
    c.rotate(rb)
    
    if flip
      c.scale(-1, -1)
    else
      c.scale(1, -1)
    
    c.closePath()
    c.fill()
    c.stroke()
    c.restore()
  
  draw : (offset_x, offset_y) ->
    canv_width = kaleidoscope.$canvas[0].width
    canv_height = kaleidoscope.$canvas[0].height
    
    c = this.$context
    
    offset_x ||= 0
    offset_y ||= 0
    
    # Blocks
    img = document.getElementById('cnvs_1')
    pattern = c.createPattern(img, 'repeat')
    c.strokeStyle = 'rgba(0, 0, 0, 0.4)'
    c.fillStyle = pattern
    
    center_x = canv_width / 2
    center_y = canv_height / 2
    
    normal_0 =
      img_w     : img.width
      img_h     : img.height
    
    R_90DEG = 90 * (Math.PI / 180)
    R_360DEG = 360 * (Math.PI / 180)
    slice_count = 8
    rs = R_360DEG / slice_count
    p = if canv_width > canv_height then canv_width else canv_height
    # p = canv_height * 0.45
    p = p * 1.5
    flipper = false
    
    for i in [0...slice_count]
      a_x = (p * Math.sin(i * rs)) + center_x - offset_x
      a_y = (p * Math.cos(i * rs)) + center_y - offset_y
      
      b_x = (p * Math.sin((i + 1) * rs)) + center_x - offset_x
      b_y = (p * Math.cos((i + 1) * rs)) + center_y - offset_y
      
      
      d_x = (a_x + b_x) / 2
      d_y = (a_y + b_y) / 2
      
      c_x = (canv_width / 2)
      c_y = (canv_height / 2)
      
      e_x = (canv_width / 2)
      e_y = canv_height
      
      d_a = Math.sqrt( Math.pow(d_x - c_x, 2) + Math.pow(d_y - c_y, 2) )
      d_b = Math.sqrt( Math.pow(e_x - c_x, 2) + Math.pow(e_y - c_y, 2) )
      d_c = Math.sqrt( Math.pow(d_x - e_x, 2) + Math.pow(d_y - e_y, 2) )
      
      
      r_a = 2 * Math.atan( Math.sqrt( ( Math.pow(d_c, 2) - Math.pow(d_b - d_a, 2) ) / ( Math.pow(d_b + d_a, 2) - Math.pow(d_c, 2)) ))
      
      if d_x < center_x
        r_a = R_360DEG - r_a
      
      rb = r_a
      
      this.draw_slice flipper, c, rb, canv_width, canv_height, normal_0, () ->
        c.moveTo(canv_width / 2, canv_height / 2)
        c.lineTo(a_x, a_y)
        c.lineTo(b_x, b_y)
        c.lineTo(canv_width / 2, canv_height / 2)
      
      flipper = !flipper
      
      # c.save()
      # c.beginPath()
      # c.strokeStyle = "#f00";
      # c.moveTo(canv_width / 2, canv_height / 2)
      # c.lineTo(d_x, d_y)
      # c.closePath()
      # c.stroke()
      # c.restore()
      # 
      # c.save()
      # c.beginPath()
      # c.strokeStyle = "#00f";
      # c.moveTo(canv_width / 2, canv_height / 2)
      # c.lineTo(a_x, a_y)
      # c.closePath()
      # c.stroke()
      # c.restore()
      # 
      # rb_x = (p) * Math.sin(rb) + (canv_width / 2)
      # rb_y = (p) * Math.cos(rb) + (canv_height / 2)
      # c.save()
      # c.beginPath()
      # c.strokeStyle = "#0f0";
      # c.moveTo(canv_width / 2, canv_height / 2)
      # c.lineTo(rb_x, rb_y)
      # c.closePath()
      # c.stroke()
      # c.restore()
}




dom_init = () ->
  $(window).bind('load', window_init)
  kaleidoscope.initialize()




window_init = () ->
  $(window).bind('resize', kaleidoscope.window_resize)
  kaleidoscope.new_canvas()




$(dom_init)
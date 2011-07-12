# Compile using -> 'coffee -wc js/application.coffee'
#

kaleidoscope = {
  $cntnr : undefined
  $canvas : undefined
  $context : undefined
  
  current_offset : undefined
  
  initialize : () ->
    this.$cntnr = $('#kaleidoscope')
    
    # $(document).bind('mousemove', (e) ->
    #   offset_x = $(window).width() / 2 - e.pageX
    #   offset_y = $(window).height() / 2 - e.pageY
    #   
    #   kaleidoscope.current_offset = { x: offset_x, y: offset_y }
    #   $(window).trigger('resize')
    # )
  
  window_resize : () ->
    kaleidoscope.$canvas[0].width = $(window).width()
    kaleidoscope.$canvas[0].height = $(window).height()
    
    # kaleidoscope.draw(kaleidoscope.current_offset.x, kaleidoscope.current_offset.y)
    kaleidoscope.draw(undefined, undefined)
  
  new_canvas : () ->
    this.$cntnr.append('<canvas width="' + $(window).width() + '" height="' + $(window).height() + '"></canvas>')
    
    this.$canvas = this.$cntnr.find('canvas:first')
    this.$context = this.$canvas[0].getContext('2d')
    
    # $(document).trigger('mousemove')
    $(window).trigger('resize')
  
  draw_slice: (flip, c, rb, canv_width, canv_height, normal_0, slice) ->
    R_90DEG = 1.57079633
    
    c.save()
    c.beginPath()
    slice()
    c.clip()
    
    ra = Math.atan((normal_0.img_w / 2.0) / normal_0.img_h)
    rc = (R_90DEG - rb - ra)
    
    ec = Math.sqrt(((normal_0.img_w / 2.0) * (normal_0.img_w / 2.0)) + (normal_0.img_h * normal_0.img_h))
    
    dx = ec * Math.cos(rc)
    dy = ec * Math.sin(rc)
    
    c.translate(
      canv_width  / 2.0 + dx,
      canv_height / 2.0 - dy)
      
    c.rotate(rb)  

    if flip
      c.scale(-1, 1)
    
    c.closePath()
    c.fill()
    c.restore()
  
  draw : (offset_x, offset_y) ->
    canv_width = kaleidoscope.$canvas[0].width
    canv_height = kaleidoscope.$canvas[0].height
    
    c = this.$context
    
    offset_x ||= 0
    offset_y ||= 0
    
    # Background
    c.beginPath()
    c.fillStyle = '#ffffff'
    c.fillRect(0, 0, canv_width, canv_height)
    c.closePath()
    
    c.fillStyle = '#fff000'
    
    # Blocks
    img = document.getElementById('cnvs_1')
    pattern = c.createPattern(img, 'repeat')
    c.fillStyle = pattern
    
    
    normal_0 =
      img_w     : img.width
      img_h     : img.height
    
    
    R_90DEG = 1.57079633
    
    # Left
    rb = Math.atan((canv_width / 4) / (canv_height / 2))
    this.draw_slice false, c, rb, canv_width, canv_height, normal_0, () ->
      c.moveTo(canv_width + 1, 0)
      c.lineTo(canv_width / 2 - 1, 0)
      c.lineTo(canv_width / 2 - 1, canv_height / 2 + 1)
      c.lineTo(canv_width + 1, 0)
    
    rb = R_90DEG - Math.atan((canv_height / 4) / (canv_width / 2))
    this.draw_slice true, c, rb, canv_width, canv_height, normal_0, () ->
      c.moveTo(canv_width, -1)
      c.lineTo(canv_width / 2 - 2, canv_height / 2 + 1)
      c.lineTo(canv_width, canv_height / 2 + 1)
      c.lineTo(canv_width, -1)
    
    rb = R_90DEG + Math.atan((canv_height / 4) / (canv_width / 2))
    this.draw_slice false, c, rb, canv_width, canv_height, normal_0, () ->
      c.moveTo(canv_width / 2 - 2, canv_height / 2 - 1)
      c.lineTo(canv_width, canv_height / 2 - 1)
      c.lineTo(canv_width, canv_height + 1)
      c.lineTo(canv_width / 2 - 2, canv_height / 2 - 1)
    
    rb = (R_90DEG * 2) - Math.atan((canv_width / 4) / (canv_height / 2))
    this.draw_slice true, c, rb, canv_width, canv_height, normal_0, () ->
      c.moveTo(canv_width / 2 - 1, canv_height / 2 - 1)
      c.lineTo(canv_width + 1, canv_height)
      c.lineTo(canv_width / 2 - 1, canv_height)
      c.lineTo(canv_width / 2 - 1, canv_height / 2 - 1)
    
    # Right
    rb = (R_90DEG * 2) + Math.atan((canv_width / 4) / (canv_height / 2))
    this.draw_slice false, c, rb, canv_width, canv_height, normal_0, () ->
      c.moveTo(canv_width / 2 + 1, canv_height / 2 - 1)
      c.lineTo(canv_width / 2 + 1, canv_height)
      c.lineTo(-1, canv_height)
      c.lineTo(canv_width / 2 + 1, canv_height / 2 - 1)
    
    rb = (R_90DEG * 3) - Math.atan((canv_height / 4) / (canv_width / 2))
    this.draw_slice true, c, rb, canv_width, canv_height, normal_0, () ->
      c.moveTo(canv_width / 2 + 2, canv_height / 2 - 1)
      c.lineTo(0, canv_height + 1)
      c.lineTo(0, canv_height / 2 - 1)
      c.lineTo(canv_width / 2 + 2, canv_height / 2 - 1)
    
    rb = (R_90DEG * 3) + Math.atan((canv_height / 4) / (canv_width / 2))
    this.draw_slice false, c, rb, canv_width, canv_height, normal_0, () ->
      c.moveTo(canv_width / 2 + 2, canv_height / 2 + 1)
      c.lineTo(0, canv_height / 2 + 1)
      c.lineTo(0, -1)
      c.lineTo(canv_width / 2 + 2, canv_height / 2 + 1)
    
    rb = (R_90DEG * 4) - Math.atan((canv_width / 4) / (canv_height / 2))
    this.draw_slice true, c, rb, canv_width, canv_height, normal_0, () ->
      c.moveTo(canv_width / 2 + 1, canv_height / 2 + 1)
      c.lineTo(-1, 0)
      c.lineTo(canv_width / 2 + 1, 0)
      c.lineTo(canv_width / 2 + 1, canv_height / 2 + 1)
    
    # # Lines
    # c.strokeStyle = '#111'
    # 
    # c.save()
    # c.beginPath()
    # 
    # c.moveTo(canv_width / 2, canv_height / 2)
    # c.lineTo(0, 0)
    # 
    # c.moveTo(canv_width / 2, canv_height / 2)
    # c.lineTo(canv_width / 2, 0)
    # 
    # c.moveTo(canv_width / 2, canv_height / 2)
    # c.lineTo(canv_width, 0)
    # 
    # c.moveTo(canv_width / 2, canv_height / 2)
    # c.lineTo(canv_width, canv_height / 2)
    # 
    # c.moveTo(canv_width / 2, canv_height / 2)
    # c.lineTo(canv_width, canv_height)
    # 
    # c.moveTo(canv_width / 2, canv_height / 2)
    # c.lineTo(canv_width / 2, canv_height)
    # 
    # c.moveTo(canv_width / 2, canv_height / 2)
    # c.lineTo(0, canv_height)
    # 
    # c.moveTo(canv_width / 2, canv_height / 2)
    # c.lineTo(0, canv_height / 2)
    # 
    # # Extra Lines
    # c.moveTo(canv_width / 2, canv_height / 2)
    # c.lineTo(0, canv_height / 4)
    # 
    # c.moveTo(canv_width / 2, canv_height / 2)
    # c.lineTo(canv_width, canv_height / 4)
    # 
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
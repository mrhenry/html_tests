(function() {
  var dom_init, kaleidoscope, window_init;
  kaleidoscope = {
    $cntnr: void 0,
    $canvas: void 0,
    $context: void 0,
    current_offset: void 0,
    initialize: function() {
      return this.$cntnr = $('#kaleidoscope');
    },
    window_resize: function() {
      kaleidoscope.$canvas[0].width = $(window).width();
      kaleidoscope.$canvas[0].height = $(window).height();
      return kaleidoscope.draw(void 0, void 0);
    },
    new_canvas: function() {
      this.$cntnr.append('<canvas width="' + $(window).width() + '" height="' + $(window).height() + '"></canvas>');
      this.$canvas = this.$cntnr.find('canvas:first');
      this.$context = this.$canvas[0].getContext('2d');
      return $(window).trigger('resize');
    },
    draw_slice: function(flip, c, rb, canv_width, canv_height, normal_0, slice) {
      var R_90DEG, dx, dy, ec, ra, rc;
      R_90DEG = 1.57079633;
      c.save();
      c.beginPath();
      slice();
      c.clip();
      ra = Math.atan((normal_0.img_w / 2.0) / normal_0.img_h);
      rc = R_90DEG - rb - ra;
      ec = Math.sqrt(((normal_0.img_w / 2.0) * (normal_0.img_w / 2.0)) + (normal_0.img_h * normal_0.img_h));
      dx = ec * Math.cos(rc);
      dy = ec * Math.sin(rc);
      c.translate(canv_width / 2.0 + dx, canv_height / 2.0 - dy);
      c.rotate(rb);
      if (flip) {
        c.scale(-1, 1);
      }
      c.closePath();
      c.fill();
      return c.restore();
    },
    draw: function(offset_x, offset_y) {
      var R_90DEG, c, canv_height, canv_width, img, normal_0, pattern, rb;
      canv_width = kaleidoscope.$canvas[0].width;
      canv_height = kaleidoscope.$canvas[0].height;
      c = this.$context;
      offset_x || (offset_x = 0);
      offset_y || (offset_y = 0);
      c.beginPath();
      c.fillStyle = '#ffffff';
      c.fillRect(0, 0, canv_width, canv_height);
      c.closePath();
      c.fillStyle = '#fff000';
      img = document.getElementById('cnvs_1');
      pattern = c.createPattern(img, 'repeat');
      c.fillStyle = pattern;
      normal_0 = {
        img_w: img.width,
        img_h: img.height
      };
      R_90DEG = 1.57079633;
      rb = Math.atan((canv_width / 4) / (canv_height / 2));
      this.draw_slice(false, c, rb, canv_width, canv_height, normal_0, function() {
        c.moveTo(canv_width + 1, 0);
        c.lineTo(canv_width / 2 - 1, 0);
        c.lineTo(canv_width / 2 - 1, canv_height / 2 + 1);
        return c.lineTo(canv_width + 1, 0);
      });
      rb = R_90DEG - Math.atan((canv_height / 4) / (canv_width / 2));
      this.draw_slice(true, c, rb, canv_width, canv_height, normal_0, function() {
        c.moveTo(canv_width, -1);
        c.lineTo(canv_width / 2 - 2, canv_height / 2 + 1);
        c.lineTo(canv_width, canv_height / 2 + 1);
        return c.lineTo(canv_width, -1);
      });
      rb = R_90DEG + Math.atan((canv_height / 4) / (canv_width / 2));
      this.draw_slice(false, c, rb, canv_width, canv_height, normal_0, function() {
        c.moveTo(canv_width / 2 - 2, canv_height / 2 - 1);
        c.lineTo(canv_width, canv_height / 2 - 1);
        c.lineTo(canv_width, canv_height + 1);
        return c.lineTo(canv_width / 2 - 2, canv_height / 2 - 1);
      });
      rb = (R_90DEG * 2) - Math.atan((canv_width / 4) / (canv_height / 2));
      this.draw_slice(true, c, rb, canv_width, canv_height, normal_0, function() {
        c.moveTo(canv_width / 2 - 1, canv_height / 2 - 1);
        c.lineTo(canv_width + 1, canv_height);
        c.lineTo(canv_width / 2 - 1, canv_height);
        return c.lineTo(canv_width / 2 - 1, canv_height / 2 - 1);
      });
      rb = (R_90DEG * 2) + Math.atan((canv_width / 4) / (canv_height / 2));
      this.draw_slice(false, c, rb, canv_width, canv_height, normal_0, function() {
        c.moveTo(canv_width / 2 + 1, canv_height / 2 - 1);
        c.lineTo(canv_width / 2 + 1, canv_height);
        c.lineTo(-1, canv_height);
        return c.lineTo(canv_width / 2 + 1, canv_height / 2 - 1);
      });
      rb = (R_90DEG * 3) - Math.atan((canv_height / 4) / (canv_width / 2));
      this.draw_slice(true, c, rb, canv_width, canv_height, normal_0, function() {
        c.moveTo(canv_width / 2 + 2, canv_height / 2 - 1);
        c.lineTo(0, canv_height + 1);
        c.lineTo(0, canv_height / 2 - 1);
        return c.lineTo(canv_width / 2 + 2, canv_height / 2 - 1);
      });
      rb = (R_90DEG * 3) + Math.atan((canv_height / 4) / (canv_width / 2));
      this.draw_slice(false, c, rb, canv_width, canv_height, normal_0, function() {
        c.moveTo(canv_width / 2 + 2, canv_height / 2 + 1);
        c.lineTo(0, canv_height / 2 + 1);
        c.lineTo(0, -1);
        return c.lineTo(canv_width / 2 + 2, canv_height / 2 + 1);
      });
      rb = (R_90DEG * 4) - Math.atan((canv_width / 4) / (canv_height / 2));
      return this.draw_slice(true, c, rb, canv_width, canv_height, normal_0, function() {
        c.moveTo(canv_width / 2 + 1, canv_height / 2 + 1);
        c.lineTo(-1, 0);
        c.lineTo(canv_width / 2 + 1, 0);
        return c.lineTo(canv_width / 2 + 1, canv_height / 2 + 1);
      });
    }
  };
  dom_init = function() {
    $(window).bind('load', window_init);
    return kaleidoscope.initialize();
  };
  window_init = function() {
    $(window).bind('resize', kaleidoscope.window_resize);
    return kaleidoscope.new_canvas();
  };
  $(dom_init);
}).call(this);

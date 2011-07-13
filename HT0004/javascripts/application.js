(function() {
  var dom_init, kaleidoscope, window_init;
  kaleidoscope = {
    $cntnr: void 0,
    $canvas: void 0,
    $context: void 0,
    current_offset: void 0,
    initialize: function() {
      this.$cntnr = $('#kaleidoscope');
      return $(document).bind('mousemove', function(e) {
        var offset_x, offset_y;
        offset_x = $(window).width() / 2 - e.pageX;
        offset_y = $(window).height() / 2 - e.pageY;
        kaleidoscope.current_offset = {
          x: offset_x,
          y: offset_y
        };
        return $(window).trigger('resize');
      });
    },
    window_resize: function() {
      kaleidoscope.$canvas[0].width = $(window).width();
      kaleidoscope.$canvas[0].height = $(window).height();
      return kaleidoscope.draw(kaleidoscope.current_offset.x, kaleidoscope.current_offset.y);
    },
    new_canvas: function() {
      this.$cntnr.append('<canvas width="' + $(window).width() + '" height="' + $(window).height() + '"></canvas>');
      this.$canvas = this.$cntnr.find('canvas:first');
      this.$context = this.$canvas[0].getContext('2d');
      return $(document).trigger('mousemove');
    },
    draw_slice: function(flip, c, rb, canv_width, canv_height, normal_0, slice) {
      var R_360DEG;
      R_360DEG = 360 * (Math.PI / 180);
      c.save();
      c.beginPath();
      slice();
      c.clip();
      rb = R_360DEG - rb;
      c.translate((canv_width / 2.0) - (Math.cos(rb) * (normal_0.img_w / 2)), (canv_height / 2.0) - (Math.sin(rb) * (normal_0.img_w / 2)));
      c.rotate(rb);
      if (flip) {
        c.scale(-1, -1);
      } else {
        c.scale(1, -1);
      }
      c.closePath();
      c.fill();
      c.stroke();
      return c.restore();
    },
    draw: function(offset_x, offset_y) {
      var R_360DEG, R_90DEG, a_x, a_y, b_x, b_y, c, c_x, c_y, canv_height, canv_width, center_x, center_y, d_a, d_b, d_c, d_x, d_y, e_x, e_y, flipper, i, img, normal_0, p, pattern, r_a, rb, rs, slice_count, _results;
      canv_width = kaleidoscope.$canvas[0].width;
      canv_height = kaleidoscope.$canvas[0].height;
      c = this.$context;
      offset_x || (offset_x = 0);
      offset_y || (offset_y = 0);
      img = document.getElementById('cnvs_1');
      pattern = c.createPattern(img, 'repeat');
      c.strokeStyle = 'rgba(0, 0, 0, 0.4)';
      c.fillStyle = pattern;
      center_x = canv_width / 2;
      center_y = canv_height / 2;
      normal_0 = {
        img_w: img.width,
        img_h: img.height
      };
      R_90DEG = 90 * (Math.PI / 180);
      R_360DEG = 360 * (Math.PI / 180);
      slice_count = 8;
      rs = R_360DEG / slice_count;
      p = canv_width > canv_height ? canv_width : canv_height;
      p = p * 1.5;
      flipper = false;
      _results = [];
      for (i = 0; 0 <= slice_count ? i < slice_count : i > slice_count; 0 <= slice_count ? i++ : i--) {
        a_x = (p * Math.sin(i * rs)) + center_x - offset_x;
        a_y = (p * Math.cos(i * rs)) + center_y - offset_y;
        b_x = (p * Math.sin((i + 1) * rs)) + center_x - offset_x;
        b_y = (p * Math.cos((i + 1) * rs)) + center_y - offset_y;
        d_x = (a_x + b_x) / 2;
        d_y = (a_y + b_y) / 2;
        c_x = canv_width / 2;
        c_y = canv_height / 2;
        e_x = canv_width / 2;
        e_y = canv_height;
        d_a = Math.sqrt(Math.pow(d_x - c_x, 2) + Math.pow(d_y - c_y, 2));
        d_b = Math.sqrt(Math.pow(e_x - c_x, 2) + Math.pow(e_y - c_y, 2));
        d_c = Math.sqrt(Math.pow(d_x - e_x, 2) + Math.pow(d_y - e_y, 2));
        r_a = 2 * Math.atan(Math.sqrt((Math.pow(d_c, 2) - Math.pow(d_b - d_a, 2)) / (Math.pow(d_b + d_a, 2) - Math.pow(d_c, 2))));
        if (d_x < center_x) {
          r_a = R_360DEG - r_a;
        }
        rb = r_a;
        this.draw_slice(flipper, c, rb, canv_width, canv_height, normal_0, function() {
          c.moveTo(canv_width / 2, canv_height / 2);
          c.lineTo(a_x, a_y);
          c.lineTo(b_x, b_y);
          return c.lineTo(canv_width / 2, canv_height / 2);
        });
        _results.push(flipper = !flipper);
      }
      return _results;
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

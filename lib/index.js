
var _convert_description
;

$(function(){
  _convert_description();
});

_convert_description = function(){
  var md
  ,   html
  ;
  
  md   = $('#description').text();
  html = new Showdown.converter().makeHtml(md);
  
  $('#description').html(html);
};

'use strict';

$(function(){
  $.get('./data/img_list.json', function(data) {
    console.log(data);
  });
  window.BackToTop.init({RightDown: true});
  $('#ul1 img').lazyload({event: 'scrollstop', effect:'fadeIn', error: function() {
    this.src = './images/error.jpg';
  }});
  $('#ul2 img').lazyload({event: 'scrollstop' ,effect:'fadeIn'});
  $('#ul3 img').lazyload({event: 'scrollstop' ,effect:'fadeIn'});
  $('#ul4 img').lazyload({event: 'scrollstop' ,effect:'fadeIn'});
  $('img').onload = function() {
    console.log('hello');
  }
});

;(function() {
  'use strict';
  var img_data = null;
  var currentMax = 0;
  var append_pic = function(num) {
    if ($(window).width() < 600) {
      for (var x = 0; x < num; x++) {
        var newNode = document.createElement('li');
        newNode.setAttribute('class', 'panel small-panel');
        newNode.innerHTML = "<img src='images/loading.gif' data-original="
          + img_data[currentMax].mini + "> <p class='desc'>"
          + img_data[currentMax].describe + currentMax + "</p>";
        currentMax++;
        currentMax %= img_data.length;
        $('#col0').append(newNode);
        $(newNode.getElementsByTagName('img')).lazyload({event: 'scrollstop', effect:'fadeIn', error: function() {
          this.src = './images/error.jpg';
        }});
      }
    } else {
    }
  };
  $(function(){
    $.get('./data/img_list.json', function(data) {
      img_data = data;
      append_pic(10);
    });
    window.BackToTop.init({RightDown: true});
    $(window).scroll(function() {
      if ($(window).scrollTop() + $(window).height() * 1.3 > $(document).height()) {
        append_pic(10);
      }
    });
    $('#col0 img').lazyload({event: 'scrollstop', effect:'fadeIn', error: function() {
      this.src = './images/error.jpg';
    }});
    $('#col1 img').lazyload({event: 'scrollstop' ,effect:'fadeIn'});
    $('#col2 img').lazyload({event: 'scrollstop' ,effect:'fadeIn'});
    $('#col3 img').lazyload({event: 'scrollstop' ,effect:'fadeIn'});
    $('img').onload = function() {
      console.log('hello');
    }
  });
})();


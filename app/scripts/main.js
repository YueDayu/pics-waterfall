;(function() {
  'use strict';
  var max = 500;
  var currnet_num = 0;
  var img_data = null;
  var currentMax = 0;
  var get_min_col = function (height) {
    var res = 0;
    var min = height[0];
    for (var x = 1; x < height.length; x++) {
      if (height[x] < min) {
        min = height[x];
        res = x;
      }
    }
    return res;
  };
  var append_pic = function (num) {
    if (img_data === null) {
      return;
    }
    if (currnet_num >= max) {
      return;
    }
    var height = [];
    var width = 0;
    if ($(window).width() >= 600){
      for (var i = 0; i < 4; i++) {
        height[i] = $('#col' + i).height();
      }
      width = $('#col0').width();
    }
    for (var x = 0; x < num; x++) {
      var newNode = document.createElement('li');
      newNode.setAttribute('class', 'panel small-panel');
      newNode.innerHTML = "<img src='images/loading.gif' data-original="
      + img_data[currentMax].mini + "> <p class='desc'>"
      + img_data[currentMax].describe + "</p>";
      var a = img_data[currentMax].height;
      currentMax++;
      currentMax %= img_data.length;
      if ($(window).width() < 600) {
        $('#col0').append(newNode);
      } else {
        var min = get_min_col(height);
        $('#col' + min).append(newNode);
        height[min] += (width * a);
      }
      currnet_num++;
      $(newNode.getElementsByTagName('img')).lazyload({
        effect: 'fadeIn',
        error: function () {
          this.src = './images/error.jpg';
        }
      });
    }
  };
  $(function(){
    $.get('./data/img_list.json', function(data) {
      img_data = data;
      append_pic(20);
    });
    window.BackToTop.init({RightDown: true});
    //document.body.parentNode.style.overflow="hidden";
    $(window).scroll(function() {
      if ($(window).scrollTop() + $(window).height() * 1.3 > $(document).height()) {
        append_pic(10);
      }
    });
  });
})();


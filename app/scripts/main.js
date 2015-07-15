;(function() {
  'use strict';
  var max = 500;
  var currnet_num = 0;
  var img_data = null;
  var currentMax = 0;
  var currentPos = null;
  var show_comment = function(id, page) {
    var comments = $('#comments');
    comments.html('<p>加载中...</p>');
    $.getJSON('./data/img_' + id +'_comment_page_' + page + '.json', function(data) {
      comments.html("");
      for (var x = 0; x < data.length; x++) {
        var newComment = document.createElement('div');
        newComment.setAttribute('class', 'comment');
        newComment.innerHTML = '<h4>' + data[x].name + ':</h4><p>' + data[x].comment +'</p><hr/>';
        comments.append(newComment);
      }
    });
  };
  var click_close = function() {
    document.body.parentNode.style.overflowY="scroll";
    $('#show-pic').attr('style', 'display:none');
    $('#next-page').attr('disabled', false).unbind();
    $('#last-page').attr('disabled', false).unbind();
    $('#pic').attr('src', './images/loading.gif');
  };
  var degreesToRadians = function (degrees) {
    return (degrees * Math.PI) / 180;
  };
  var get_distance = function(slat, slon) {
    if (currentPos == null) {
      return;
    }
    var startLatRads = degreesToRadians(slat);
    var startLongRads = degreesToRadians(slon);
    var destLatRads = degreesToRadians(currentPos.coords.latitude);
    var destLongRads = degreesToRadians(currentPos.coords.longitude);

    var Radius = 6371;
    return Math.round(Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
      Math.cos(startLatRads) * Math.cos(destLatRads) *
      Math.cos(startLongRads - destLongRads)) * Radius);
  };
  var click_pic = function(id) {
    document.documentElement.style.overflow='hidden';
    $('#show-pic').attr('style', 'display:block');
    if ($(window).width() >= 600) {
      $('#pic').attr('data-original', 'images/' + id + '.jpg').lazyload({
        effect: 'fadeIn',
        error: function () {
          this.src = './images/error.jpg';
        }
      });
    }
    $('#comment-title').attr('page', 0).html('评论-第1页/共' + img_data[id - 1].comment_page + '页');
    if (currentPos) {
      $('#distance').html('距离：' + get_distance(img_data[id - 1].latitude, img_data[id - 1].longitude) + 'km');
    } else {
      $('#distance').html('没有当前坐标位置');
    }
    $('#describe').html(img_data[id - 1].describe);
    var current_page = 0;
    show_comment(id, 0);
    var next_btn = $('#next-page');
    var last_btn = $('#last-page');
    if (current_page <= 0) {
      last_btn.attr('disabled', true);
    }
    if(img_data[id - 1].comment_page == 1) {
      next_btn.attr('disabled', true);
    }
    next_btn.click(function() {
      var title = $('#comment-title');
      var page = Number(title.attr('page')) + 1;
      show_comment(id, page);
      title.attr('page', page).html('评论-第' + (page + 1) + '页/共' + img_data[id - 1].comment_page + '页');
      last_btn.attr('disabled', false);
      if(Number(img_data[id - 1].comment_page) <= page + 1) {
        next_btn.attr('disabled', true);
      }
    });
    last_btn.click(function() {
      var title = $('#comment-title');
      var page = Number(title.attr('page')) - 1;
      show_comment(id, page);
      title.attr('page', page).html('评论-第' + (page + 1) + '页/共' + img_data[id - 1].comment_page + '页');
      next_btn.attr('disabled', false);
      if(page <= 0) {
        last_btn.attr('disabled', true);
      }
    });
  };
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
      newNode.innerHTML = "<img src='images/loading.gif' data-original='"
      + img_data[currentMax].mini + "'> <p class='desc'>"
      + img_data[currentMax].describe + "</p>";
      var a = img_data[currentMax].height;
      //var temp = img_data[currentMax].id;
      newNode.setAttribute('onclick', 'click_pic(' + img_data[currentMax].id +');');
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
  $(function() {
    $.getJSON('./data/img_list.json', function(data) {
      img_data = data;
      append_pic(20);
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(data) {
        currentPos = data;
        console.log(data);
      }, function(error) {
        console.log(error);
        alert("获取地理位置失败");
      });
    }
    window.BackToTop.init({RightDown: true});
    $('#bg').click(click_close);
    $('#close').click(click_close);
    $('#pic').click(click_close);
    $(window).scroll(function() {
      if ($(window).scrollTop() + $(window).height() * 1.3 > $(document).height()) {
        append_pic(10);
      }
    });
  });
  window.click_pic = click_pic;
})();

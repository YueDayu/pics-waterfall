!function(){"use strict";var a=500,b=0,c=null,d=0,e=null,f=function(a,b){var c=$("#comments");c.html("<p>加载中...</p>"),$.getJSON("./data/img_"+a+"_comment_page_"+b+".json",function(a){c.html("");for(var b=0;b<a.length;b++){var d=document.createElement("div");d.setAttribute("class","comment"),d.innerHTML="<h4>"+a[b].name+":</h4><p>"+a[b].comment+"</p><hr/>",c.append(d)}})},g=function(){document.body.parentNode.style.overflowY="scroll",$("#show-pic").attr("style","display:none"),$("#next-page").attr("disabled",!1).unbind(),$("#last-page").attr("disabled",!1).unbind(),$("#pic").attr("src","./images/loading.gif")},h=function(a){return a*Math.PI/180},i=function(a,b){if(null!=e){var c=h(a),d=h(b),f=h(e.coords.latitude),g=h(e.coords.longitude),i=6371;return Math.round(Math.acos(Math.sin(c)*Math.sin(f)+Math.cos(c)*Math.cos(f)*Math.cos(d-g))*i)}},j=function(a){document.documentElement.style.overflow="hidden",$("#show-pic").attr("style","display:block"),$(window).width()>=600&&$("#pic").attr("data-original","images/"+a+".jpg").lazyload({effect:"fadeIn",error:function(){this.src="./images/error.jpg"}}),$("#comment-title").attr("page",0).html("评论-第1页/共"+c[a-1].comment_page+"页"),e?$("#distance").html("距离："+i(c[a-1].latitude,c[a-1].longitude)+"km"):$("#distance").html("没有当前坐标位置"),$("#describe").html(c[a-1].describe);var b=0;f(a,0);var d=$("#next-page"),g=$("#last-page");0>=b&&g.attr("disabled",!0),1==c[a-1].comment_page&&d.attr("disabled",!0),d.click(function(){var b=$("#comment-title"),e=Number(b.attr("page"))+1;f(a,e),b.attr("page",e).html("评论-第"+(e+1)+"页/共"+c[a-1].comment_page+"页"),g.attr("disabled",!1),Number(c[a-1].comment_page)<=e+1&&d.attr("disabled",!0)}),g.click(function(){var b=$("#comment-title"),e=Number(b.attr("page"))-1;f(a,e),b.attr("page",e).html("评论-第"+(e+1)+"页/共"+c[a-1].comment_page+"页"),d.attr("disabled",!1),0>=e&&g.attr("disabled",!0)})},k=function(a){for(var b=0,c=a[0],d=1;d<a.length;d++)a[d]<c&&(c=a[d],b=d);return b},l=function(e){if(null!==c&&!(b>=a)){var f=[],g=0;if($(window).width()>=600){for(var h=0;4>h;h++)f[h]=$("#col"+h).height();g=$("#col0").width()}for(var i=0;e>i;i++){var j=document.createElement("li");j.setAttribute("class","panel small-panel"),j.innerHTML="<img src='images/loading.gif' data-original='"+c[d].mini+"'> <p class='desc'>"+c[d].describe+"</p>";var l=c[d].height;if(j.setAttribute("onclick","click_pic("+c[d].id+");"),d++,d%=c.length,$(window).width()<600)$("#col0").append(j);else{var m=k(f);$("#col"+m).append(j),f[m]+=g*l}b++,$(j.getElementsByTagName("img")).lazyload({effect:"fadeIn",error:function(){this.src="./images/error.jpg"}})}}};$(function(){$.getJSON("./data/img_list.json",function(a){c=a,l(20)}),navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(a){e=a,console.log(a)},function(a){console.log(a),alert("获取地理位置失败")}),window.BackToTop.init({RightDown:!0}),$("#bg").click(g),$("#close").click(g),$("#pic").click(g),$(window).scroll(function(){$(window).scrollTop()+1.3*$(window).height()>$(document).height()&&l(10)})}),window.click_pic=j}();
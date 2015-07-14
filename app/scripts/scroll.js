/**
 * Created by Yue Dayu on 2015/7/12.
 */

;(function(){
    'use strict';

    var hasClassName = function (inElement, inClassName)
    {
        var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)');
        return regExp.test(inElement.className);
    };

    var addClassName = function (inElement, inClassName)
    {
        if (!hasClassName(inElement, inClassName)) {
          inElement.className = [inElement.className, inClassName].join(' ');
        }
    };

    var removeClassName = function (inElement, inClassName)
    {
        if (hasClassName(inElement, inClassName)) {
            var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)', 'g');
            var curClasses = inElement.className;
            inElement.className = curClasses.replace(regExp, ' ');
        }
    };

    var max = function(num1, num2) {
        return num1 > num2 ? num1 : num2;
    };

    var getScrollTop = function() {
        if (document.body.scrollTop) {
            return document.body.scrollTop;
        }
        if (document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
        }
        return 0;
    };

    var display = function() {
        if (getScrollTop() < 20) {
            addClassName(this.controller, 'hidden');
        } else {
            removeClassName(this.controller, 'hidden');
        }
    };

    var ToTop = function() {
        this.controller = null;
        this.scrollToTop = function() {
            if (getScrollTop() > 5) {
                window.scrollTo(0, max((getScrollTop() - max(90, getScrollTop() / 17)), 0));
                setTimeout('BackToTop.scrollToTop()', 10);
            }
        };
        this.init = function(style) {
            this.controller = document.createElement('div');
            this.controller.setAttribute('id', 'to-top-btn');
            this.controller.innerHTML = 'top';
            if (style.LeftUp && style.LeftUp === true) {
                this.controller.setAttribute('class', 'left-up');
            } else if (style.LeftDown && style.LeftDown === true) {
                this.controller.setAttribute('class', 'left-down');
            } else if (style.RightUp && style.RightUp === true) {
                this.controller.setAttribute('class', 'right-up');
            } else if (style.RightDown && style.RightDown === true) {
                this.controller.setAttribute('class', 'right-down');
            } else if (style.x && style.y) {
                this.controller.setAttribute('style', 'left:' + style.x + 'px;top:' + style.y + 'px;');
            }
            if (getScrollTop() < 20) {
                addClassName(this.controller, 'hidden');
            }
            document.body.appendChild(this.controller);
            window.addEventListener('scroll', display.bind(this));
            this.controller.addEventListener('click', this.scrollToTop.bind(this));
        };
    };

    window.BackToTop = new ToTop();
})();


/* REQUIRED PLUGINS
 /*! ========================================================================
 * metismenu - v2.5.2
 * A jQuery menu plugin
 * https://github.com/onokumus/metisMenu#readme
 *
 * Made by Osman Nuri Okumuş <onokumus@gmail.com> (https://github.com/onokumus)
 * Under MIT License
 */
!function(n,i){if("function"==typeof define&&define.amd)define(["jquery"],i);else if("undefined"!=typeof exports)i(require("jquery"));else{var e={exports:{}};i(n.jquery),n.metisMenu=e.exports}}(this,function(n){"use strict";function i(n){return n&&n.__esModule?n:{"default":n}}function e(n,i){if(!(n instanceof i))throw new TypeError("Cannot call a class as a function")}var t=(i(n),"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol?"symbol":typeof n}),o=function(){function n(n,i){for(var e=0;e<i.length;e++){var t=i[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(i,e,t){return e&&n(i.prototype,e),t&&n(i,t),i}}();(function(n){function i(){return{bindType:_.end,delegateType:_.end,handle:function(i){return n(i.target).is(this)?i.handleObj.handler.apply(this,arguments):void 0}}}function s(){if(window.QUnit)return!1;var n=document.createElement("mm");for(var i in T)if(void 0!==n.style[i])return{end:T[i]};return!1}function a(i){var e=this,t=!1;n(this).one(v.TRANSITION_END,function(){t=!0}),setTimeout(function(){t||v.triggerTransitionEnd(e)},i)}function r(){_=s(),v.supportsTransitionEnd()&&(n.event.special[v.TRANSITION_END]=i())}var l="metisMenu",f="metisMenu",c="."+f,d=".data-api",u=n.fn[l],h=350,g={toggle:!0,doubleTapToGo:!1,preventDefault:!0,activeClass:"active",collapseClass:"collapse",collapseInClass:"in",collapsingClass:"collapsing"},p={SHOW:"show"+c,SHOWN:"shown"+c,HIDE:"hide"+c,HIDDEN:"hidden"+c,CLICK_DATA_API:"click"+c+d},_=!1,T={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},v={TRANSITION_END:"mmTransitionEnd",triggerTransitionEnd:function(i){n(i).trigger(_.end)},supportsTransitionEnd:function(){return Boolean(_)}};r();var C=function(){function i(n,t){e(this,i),this._element=n,this._config=this._getConfig(t),this._transitioning=null,this.init()}return o(i,[{key:"init",value:function(){var i=this;n(this._element).find("li."+this._config.activeClass).has("ul").children("ul").attr("aria-expanded",!0).addClass(this._config.collapseClass+" "+this._config.collapseInClass),n(this._element).find("li").not("."+this._config.activeClass).has("ul").children("ul").attr("aria-expanded",!1).addClass(this._config.collapseClass),this._config.doubleTapToGo&&n(this._element).find("li."+this._config.activeClass).has("ul").children("a").addClass("doubleTapToGo"),n(this._element).find("li").has("ul").children("a").on(p.CLICK_DATA_API,function(e){var t=n(this),o=t.parent("li"),s=o.children("ul");return i._config.preventDefault&&e.preventDefault(),"true"!==t.attr("aria-disabled")?(o.hasClass(i._config.activeClass)&&!i._config.doubleTapToGo?(t.attr("aria-expanded",!1),i._hide(s)):(i._show(s),t.attr("aria-expanded",!0)),i._config.onTransitionStart&&i._config.onTransitionStart(e),i._config.doubleTapToGo&&i._doubleTapToGo(t)&&"#"!==t.attr("href")&&""!==t.attr("href")?(e.stopPropagation(),void(document.location=t.attr("href"))):void 0):void 0})}},{key:"_show",value:function(i){if(!this._transitioning&&!n(i).hasClass(this._config.collapsingClass)){var e=this,t=n(i);if(t.length){var o=n.Event(p.SHOW);if(t.trigger(o),!o.isDefaultPrevented()){t.parent("li").addClass(this._config.activeClass),this._config.toggle&&this._hide(t.parent("li").siblings().children("ul."+this._config.collapseInClass).attr("aria-expanded",!1)),t.removeClass(this._config.collapseClass).addClass(this._config.collapsingClass).height(0),this.setTransitioning(!0);var s=function(){t.removeClass(e._config.collapsingClass).addClass(e._config.collapseClass+" "+e._config.collapseInClass).height("").attr("aria-expanded",!0),e.setTransitioning(!1),t.trigger(p.SHOWN)};if(!v.supportsTransitionEnd())return void s();t.height(t[0].scrollHeight).one(v.TRANSITION_END,s),a(h)}}}}},{key:"_hide",value:function(i){if(!this._transitioning&&n(i).hasClass(this._config.collapseInClass)){var e=this,t=n(i);if(t.length){var o=n.Event(p.HIDE);if(t.trigger(o),!o.isDefaultPrevented()){t.parent("li").removeClass(this._config.activeClass),t.height(t.height())[0].offsetHeight,t.addClass(this._config.collapsingClass).removeClass(this._config.collapseClass).removeClass(this._config.collapseInClass),this.setTransitioning(!0);var s=function(){e._transitioning&&e._config.onTransitionEnd&&e._config.onTransitionEnd(),e.setTransitioning(!1),t.trigger(p.HIDDEN),t.removeClass(e._config.collapsingClass).addClass(e._config.collapseClass).attr("aria-expanded",!1)};if(!v.supportsTransitionEnd())return void s();0==t.height()||"none"==t.css("display")?s():t.height(0).one(v.TRANSITION_END,s),a(h)}}}}},{key:"_doubleTapToGo",value:function(i){return i.hasClass("doubleTapToGo")?(i.removeClass("doubleTapToGo"),!0):i.parent().children("ul").length?(n(this._element).find(".doubleTapToGo").removeClass("doubleTapToGo"),i.addClass("doubleTapToGo"),!1):void 0}},{key:"setTransitioning",value:function(n){this._transitioning=n}},{key:"_getConfig",value:function(i){return i=n.extend({},g,i)}}],[{key:"_jQueryInterface",value:function(e){return this.each(function(){var o=n(this),s=o.data(f),a=n.extend({},g,o.data(),"object"===("undefined"==typeof e?"undefined":t(e))&&e);if(s||(s=new i(this,a),o.data(f,s)),"string"==typeof e){if(void 0===s[e])throw new Error('No method named "'+e+'"');s[e]()}})}}]),i}();return n.fn[l]=C._jQueryInterface,n.fn[l].Constructor=C,n.fn[l].noConflict=function(){return n.fn[l]=u,C._jQueryInterface},C})(jQuery)});


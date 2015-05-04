(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var daken = require('../index.js');

daken.run();

},{"../index.js":2}],2:[function(require,module,exports){
module.exports = {

    /**
    * Simple library of typing effect
    *
    *
    * @param  {string} selector
    * @param  {object} param
    * @param  {function} callback
    * @return void
    */

    // Defaults param
    DEFAULT_PARAM: {
      typeSpeed         : 100,
      callbackDelay     : 0,
      dakenDataAttr     : 'data-daken',
      blinkInterval     : 500
    },

    param: null,

    _blink: function(el, param) {
      var that = this;
      el.style.opacity = !parseInt(el.style.opacity) ? 1 : 0;
      var timeout = setTimeout(function(){that._blink(el, param);}, param.blinkInterval);
    },

    _objctUpdate:  function ( default_param, compare ) {
      if (typeof(compare) !== 'object') return default_param;
      var key, returnValue = {};
      for ( key in default_param ) {
          if ( key in compare ) {
              returnValue[key] = compare[key];
          }
          else {
              returnValue[key] = default_param[key];
          }
      }
      return returnValue;
    },

    run: function (target, param, callback) {
      var that = this;
      param = typeof(target) === 'object' ? target : undefined;
      param = this._objctUpdate(this.DEFAULT_PARAM, param);
      target = typeof(target) === 'string' ? target : '[' + param.dakenDataAttr + ']';
      var target_dom = document.querySelectorAll(target) ;
      var daken_timer = '';
      var daken_timers = [];
      var dake_cursor = '<span class="daken-cursor">|</span>';

      Array.prototype.map.call(target_dom, function(el, index){
        if ( el.children.length > 0 ||  !el.innerHTML.length ) return;
        var daken_str = el.innerHTML;
        var daken_strs = daken_str.split('');
        var str = '';
        el.innerHTML = '<span class="daken-target"></span>' + dake_cursor;
        daken_timer = setInterval(function(){
          var timer_id = index;
          str += daken_strs.shift();
          el.firstChild.innerHTML = str;
          if (!daken_strs.length) {
            clearInterval(daken_timers[timer_id]);
            that._blink(el.lastChild, param);
            if (typeof(callback) === 'function') setTimeout(callback, param.callbackDelay);
          }
        }, param.typeSpeed);
        daken_timers.push(daken_timer);
      });

    },

    setParam: function (param) {
      this.param = this._obj_update(this.DEFAULT_PARAM, param);
    },

    resetParam: function () {
      this.param = this.DEFAULT_PARAM;
    },

};

},{}]},{},[1]);

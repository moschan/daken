(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var daken = require('../index.js');

daken.run();

},{"../index.js":2}],2:[function(require,module,exports){
'use strict';

/**
* Simple library of typing effect
*
*/
var daken = {

    // Default params
    DEFAULT_PARAM: {
      typeSpeed         : 100,
      callbackDelay     : 0,
      dakenDataAttr     : 'data-daken',
      blinkInterval     : 500
    },

    param: null,

    /**
    * @param  {element} el
    * @param  {object} param
    * @return {void}
    */
    _blink: function(el, param) {
      var that = this;
      el.style.opacity = !parseInt(el.style.opacity) ? 1 : 0;
      var timeout = setTimeout(function(){that._blink(el, param);}, param.blinkInterval);
    },

    /**
    * @param  {object} default_param
    * @param  {object} compare
    * @return {object}
    */
    _objctUpdate:  function ( default_param, compare ) {
      if (typeof(compare) !== 'object') return default_param;
      var key, returnValue = {};
      for ( key in default_param ) {
        returnValue[key] = key in compare ? compare[key] : default_param[key];
      }
      return returnValue;
    },

    /**
    * @param  {string}|{object} selector or param
    * @param  {object} param
    * @return void
    */
    _checkParam: function (target, param) {
      param = typeof(target) === 'object' ? target : undefined;
      param = this._objctUpdate(this.DEFAULT_PARAM, param);
      return param;
    },

    /**
    * @param  {string} selector
    * @param  {object} param
    * @param  {function} callback
    * @return void
    */
    run: function (target, param, callback) {
      var that = this;
      var param = this._checkParam(target, param);
      target = typeof(target) === 'string' ? target : '[' + param.dakenDataAttr + ']';
      var daken_timers = [];
      var daken_elements = '<span class="daken-target"></span><span class="daken-cursor">|</span>';

      Array.prototype.map.call(document.querySelectorAll(target), function(el, index){
        if ( el.children.length > 0 || !el.innerHTML.length ) return;
        // get a typing string
        var daken_strs = el.innerHTML.split('');
        var str = '';
        var type_interval = '';
        el.innerHTML = daken_elements;

        type_interval = setInterval(function(){
          str += daken_strs.shift();
          el.firstChild.innerHTML = str;
          if (!daken_strs.length) {
            clearInterval(daken_timers[index]);
            that._blink(el.lastChild, param);
            if (typeof(callback) === 'function') setTimeout(callback, param.callbackDelay);
          }
        }, param.typeSpeed);

        daken_timers.push(type_interval);
      });

    },

    /**
    * @param  {object} param
    * @return void
    */
    setParam: function (param) {
      this.param = this._obj_update(this.DEFAULT_PARAM, param);
    },

    /**
    * @param  {object} param
    * @return void
    */
    resetParam: function () {
      this.param = this.DEFAULT_PARAM;
    },
};

module.exports = daken;


},{}]},{},[1]);

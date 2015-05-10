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

    state: [],

    timers: [],


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
    * @param  {element} target element of typing effect
    * @param  {int} element id
    * @return void
    */
    _initializeState: function (element, stateId) {
      var daken_elements = '<span class="daken-target"></span><span class="daken-cursor">|</span>';
      this.state[stateId]= {
        element: element,
        worded:  '',
        word:    element.innerHTML.split('')
      };
      element.innerHTML = daken_elements;
    },

    /**
    * @param  {int} element of update
    * @return void
    */
    _updateUI: function (stateId, param) {
      this.state[stateId].worded += this.state[stateId].word.shift();
      this.state[stateId].element.firstChild.innerHTML = this.state[stateId].worded;
      if (!this.state[stateId].word.length) {
        clearInterval(this.timers[stateId]);
        this._blink(this.state[stateId].element.lastChild, param);
        if (typeof(callback) === 'function') setTimeout(callback, param.callbackDelay);
      }
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

      Array.prototype.map.call(document.querySelectorAll(target), function(el, index){
        if ( el.children.length > 0 || !el.innerHTML.length ) return;
        that._initializeState(el, index);
        that.timers.push( setInterval(function(){
          that._updateUI(index, param);
        }, param.typeSpeed) );
      });
    },

    /**
    * @param  {string} type message
    * @param  {string} selector
    * @param  {object} param
    * @param  {function} callback
    * @return void
    */
    runStr: function (type_string, target, param, callback) {
      param = this._checkParam(target, param);
      target = typeof(target) === 'string' ? target : '[' + param.dakenDataAttr + ']';
      Array.prototype.map.call(document.querySelectorAll(target), function(el, index){
        el.innerHTML = type_string;
      });
      this.run(target, param, callback);
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

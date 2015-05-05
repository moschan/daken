'use strict';

var test = require('tape');
var daken = require('../');

test('param test', function (t) {
    t.plan(3);

    // _objctUpdate
    var default_param = {
      param1: 123,
      param2: 'string',
    };
    var modify_param1 = {
      param1: 777,
    };
    var modify_param2 = {
      param2: 'modified',
    };
    var modify_param3 = undefined;

    daken._objctUpdate(default_param, modify_param1);

    t.equal(daken._objctUpdate(default_param, modify_param1).param1, modify_param1.param1 );
    t.equal(daken._objctUpdate(default_param, modify_param2).param2, modify_param2.param2 );
    t.equal(daken._objctUpdate(default_param, modify_param3), default_param );


    // _blink
    // run
    // setParam
    // resetParam


    t.end();
});

## daken.js
Simple javascript library of typing effect.

## example

```JS
  var daken = require('daken');
  daken.run();
```

```HTML
  <h1 data-daken>Hello World</h1>
  <a href="/" data-daken>こんにちは、世界</a>
```

## methods

### run([selector], [options], [callback])
### setParam([options])
### resetParam([options])

## options
```
  // Defaults param
  DEFAULT_PARAM: {
    typeSpeed         : 100,
    callbackDelay     : 0,
    dakenDataAttr     : 'data-daken',
    blinkInterval     : 500
  },
```

## install
npm install daken

## license
MIT

# winston-crashlog

The best project ever.

## Getting Started
Install the module with: `npm install winston-crashlog`

```javascript
var winston_crashlog = require('winston-crashlog');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Crashlog)({ accessKeyId: '1234', accessKeySecret: '4567890' })
    ]
});

```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Mark Wolfe  
Licensed under the MIT license.

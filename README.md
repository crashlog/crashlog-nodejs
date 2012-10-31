# winston-crashlog

Winston transport for the [crashlog.io](http://crashlog.io) service.

[![Build Status](https://secure.travis-ci.org/wolfeidau/winston-crashlog.png)](http://travis-ci.org/wolfeidau/winston-crashlog)


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

## Testing

I have included a small test program named httptest.js, to use it:

Create a directory in your home called .crashlog then add a file containing the credentials from your crash log project.

```javascript
exports.creds = {'accessKeyId': 'XXXX', 'accessKeySecret': 'XXX'};
```

Then simply run use node to run the script.
```shell
node crashlogtest.js
```



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Mark Wolfe  
Licensed under the MIT license.

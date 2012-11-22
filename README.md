# winston-crashlog

Winston transport for the [crashlog.io](http://crashlog.io) service.

[![Build Status](https://secure.travis-ci.org/wolfeidau/winston-crashlog.png)](http://travis-ci.org/wolfeidau/winston-crashlog)


## Getting Started
Install the module with: `npm install winston-crashlog`


## Using Crashlog from within Express

To enable logging to Crashlog via winston in express you will need the following modules.

* winston
* express-winston
* winston-crashlog

Below is a fragment from an express application illustrating it's configuration along side the console logger, note in this
example the `accessKeyId` and `accessKeySecret` are configured outside this code and loaded with `nconf`.

```javascript
module.exports = function (app, configurations, express) {

    var winston = require('winston');
    var expressWinston = require('express-winston');
    var CrashLog = require('winston-crashlog').CrashLog;

    ...
    app.use(expressWinston.errorLogger({
        transports:[
            new winston.transports.Console({
                json:true,
                colorize:true
            }),
            new CrashLog({debug:true, accessKeyId:nconf.get('accessKeyId'), accessKeySecret:nconf.get('accessKeySecret') })
        ]
    }));
    ...

    return app;
}
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

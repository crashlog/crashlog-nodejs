
var http = require('http'),
    winston = require('winston');


var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

winston.handleExceptions(new winston.transports.Http({ 'host': 'localhost', 'port': 8000, 'path': '/notify' }));

//logger.log('info', 'Hello webhook log files!', { 'foo': 'bar' });
throw new Error('Hello, winston!');

var http = require('http'),
    winston = require('winston'),
    winstonCrashLog = require('./lib/winston-crashlog');


var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

//winston.handleExceptions(new winston.transports.Http({ 'host': 'localhost', 'port': 8000, 'path': '/notify' }));
winston.handleExceptions(new winston.transports.CrashLog({ 'host': 'localhost', 'port': 8000, 'path': '/notify' }));

//logger.log('error', 'Hello webhook log files!', { 'foo': 'bar' });
throw new Error('Hello, winston!');
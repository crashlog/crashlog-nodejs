/**
 * Quick script to send a test message through to crashlog.
 *
 * Create a directory in your home called .crashlog then add a file containing the credentials from your crash log project.
 *
 * exports.creds = {'accessKeyId': 'XXXX', 'accessKeySecret': 'XXX'};
 */
var http = require('http'),
    winston = require('winston'),
    winstonCrashLog = require('./lib/winston-crashlog');

var config = require( process.env['HOME'] + '/.crashlog/creds');

console.log('accessKeyId: ' + config.creds.accessKeyId);

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

winston.handleExceptions(new winston.transports.CrashLog({ accessKeyId: config.creds.accessKeyId, accessKeySecret: config.creds.accessKeySecret}));

throw new Error('Hello, winston!');
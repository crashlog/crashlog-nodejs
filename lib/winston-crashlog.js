/*
 * winston-crashlog
 * https://github.com/wolfeidau/winston-crashlog
 *
 * Copyright (c) 2012 Mark Wolfe
 * Licensed under the MIT license.
 */
var util = require('util'),
    crypto = require('crypto'),
    Ofuda = require('ofuda'),
    winston = require('winston');

var CrashLog = exports.CrashLog = function (options) {
    options = options || {};
    options.debug = options.debug || false;

    options.headerPrefix = options.headerPrefix || 'CrashLog';
    options.serviceLabel = options.serviceLabel || 'CrashLog';

    this.name = 'CrashLog';
    this.client = new Ofuda(options);

    this.level = options.level || 'error';
    this.notifierName = options.name || 'nodejsapp';
    this.notifierVersion = options.name || '0.0.1';
    this.handleExceptions = options.handleExceptions || true;

    this.ssl = !!options.ssl;
    this.host = options.host || 'stdin.crashlog.io';
    this.port = options.port;
    this.auth = options.auth;
    this.path = options.path || '/events';
    this.checksum = options.checksum || false;

    if (!this.port) {
        this.port = this.ssl ? 443 : 80;
    }

};

util.inherits(CrashLog, winston.Transport);

winston.transports.CrashLog = CrashLog;

//Expose the name of this Transport on the prototype
CrashLog.prototype.name = 'CrashLog';

CrashLog.prototype.log = function (level, msg, meta, callback) {
    var self = this,
        metac = winston.clone(meta) || {};

    var transport = this.ssl ? require('https') : require('http'),
        requestDate = new Date(meta.date), // get the date from the event record.
        payload = this._buildMessage(msg, metac),
        requestOptions = this._request(payload, requestDate);

    var req = transport.request(requestOptions, function (response) {

        // TODO need to cater for send retries //self.emit('error', err);
        self.emit('logged status ' + response.statusCode);
        callback(null, true);
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(JSON.stringify(payload), encoding = 'utf8');
    req.end();

};

CrashLog.prototype._buildMessage = function (msg, meta) {

    var data = {
        payload:{
            notifier:{
                name:this.notifierName,
                version:this.notifierVersion
            },
            event:{
                message:msg,
                type:"Error",
                timestamp:(new Date(meta.date)).toUTCString()
            },
            backtrace:[],
            environment:{
                platform:meta.process.version
            }
        }

    };

    meta.trace.forEach(function (frame) {
        data.payload.backtrace.push({ file:frame.file, number:frame.line, method:frame.method});
    });

    return data;
};

CrashLog.prototype._request = function (body, requestDate) {

    return this.client.signHttpRequest(this._checkSumRequest({
        method:'POST',
        host:this.host,
        port:this.port,
        path:this.path,
        headers:{
            'Date':requestDate.toUTCString(),
            'Content-Type':'application/json',
            'Content-Length':JSON.stringify(body).length
        }
    }, body)
    , this._buildCanonicalStringFromRequest);

};

CrashLog.prototype._checkSumRequest = function (request, body) {
    if (this.checksum) {
        request.headers['Content-MD5'] = this._checkSumBody(body);
    }
    return request;
};

CrashLog.prototype._checkSumBody = function (body) {
   return crypto.createHash('md5').update(JSON.stringify(body)).digest("hex");
};

CrashLog.prototype._buildCanonicalStringFromRequest = function (request) {
    return [
        request.method,
        request.headers['Content-Type'],
        '',
        request.headers['Date'],
        request.path
    ].join('\n');
};




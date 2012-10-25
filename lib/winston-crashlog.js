/*
 * winston-crashlog
 * https://github.com/markw/winston-crashlog
 *
 * Copyright (c) 2012 Mark Wolfe
 * Licensed under the MIT license.
 */
var util = require('util'),
    Ofuda = require('ofuda'),
    winston = require('winston');

var CrashLog = exports.CrashLog = function (options) {
    options = options || {};
    options.debug = options.debug || false;

    this.name = 'CrashLog';
    this.client = new Ofuda(options);

    this.level = options.level || 'error';
    this.notifierName = options.name || 'nodejsapp';
    this.notifierVersion = options.name || '0.0.1';
};

util.inherits(CrashLog, winston.Transport);

//Expose the name of this Transport on the prototype
CrashLog.prototype.name = 'CrashLog';

CrashLog.prototype.log = function (level, msg, meta, callback) {
    var self = this,
        notifierName = this.notifierName,
        notifierVersion = this.notifierVersion,
        metac = winston.clone(meta) || {};

    var payload = {};

    payload.notifier = {
        name: notifierName,
        version: notifierVersion
    };

    payload.event = {
        message: msg,
        type: "Error",
        timestamp: Date.now()
    };

    console.log(msg);
    console.log(payload);


    callback(null, true);
    self.emit('logged');
}
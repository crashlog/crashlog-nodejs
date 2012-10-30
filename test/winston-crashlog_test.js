var should = require('should'),
    winston = require('winston'),
    crypto = require('crypto'),
    winston_crashlog = require('../lib/winston-crashlog.js');

var fixture = require('./fixtures')

var post_request = {
    method:'POST',
    path:'/events',
    headers:{
        'Content-Type':'application/json'
    }
};

describe('CrashLog', function () {

    var crashLog;

    before(function () {
        crashLog = new winston.transports.CrashLog({});
    });


    describe('options', function () {

        it('should use staging settings when created with no options', function () {

            crashLog.should.have.property('host', 'stdin.crashlog.io');
            crashLog.should.have.property('port', 80);
            crashLog.should.have.property('path', '/events');

        });

    });

    describe('request', function(){

        it('should include a valid md5 sum the request', function(){
            crashLog = new winston.transports.CrashLog({checksum: true});
            crashLog._checkSumRequest(post_request, fixture.sampleMessage)
                .headers.should.have.property('Content-MD5', '0acd31be2fe01acf80abfa9dedd0b9d5');
        });

        it('should build a valid message given an exception model from node', function(){

            crashLog._buildMessage('uncaughtException', fixture.sample_exception).should.eql(fixture.sampleMessage);

        });

        it('should generate a matching canonical string for given request', function(){
            //"POST\napplication/json\n\nTue, 30 Oct 2012 19:48:27 GMT\n/events"
            crashLog._buildCanonicalStringFromRequest(fixture.samplePostRequest)
                .should.eql("POST\napplication/json\n\nTue, 30 Oct 2012 19:48:27 GMT\n/events");
        });

        it('should construct a signature from the request', function(){

            crashLog = new winston.transports.CrashLog({
                accessKeyId: '1234',
                accessKeySecret: '4567890'
            });

            crashLog._request(fixture.samplePostRequest, new Date('Tue, 30 Oct 2012 19:48:27 GMT'))
                .headers.should.have.property('Authorization', 'CrashLog 1234:U72tajmjkXG8Q9y+uA1wcAqMdBA=')
        });
    });

});

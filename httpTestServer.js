var http = require('http'),
    winston = require('winston');

function dateFormat (date, fstr, utc) {
    utc = utc ? 'getUTC' : 'get';
    return fstr.replace (/%[YmdHMS]/g, function (m) {
        switch (m) {
            case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
            case '%m': m = 1 + date[utc + 'Month'] (); break;
            case '%d': m = date[utc + 'Date'] (); break;
            case '%H': m = date[utc + 'Hours'] (); break;
            case '%M': m = date[utc + 'Minutes'] (); break;
            case '%S': m = date[utc + 'Seconds'] (); break;
            default: return m.slice (1); // unknown code, remove %
        }
        // add leading zero if required
        return ('0' + m).slice (-2);
    });
}

var server = http.createServer(function (request, response) {
    console.log(dateFormat(new Date (), "%Y-%m-%d %H:%M:%S", true) + ' ' + request.method + ' ' + request.url );
    console.log(request.headers);
    request.on('data', function(chunk) {
        console.log("Received body data:");

        var resultObject = JSON.parse(chunk.toString());
        console.log(JSON.stringify(resultObject, null, 4));
    });
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
});

server.listen(8000);

console.log("Server running at http://127.0.0.1:8000/");
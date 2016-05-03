// Adapted from https://gist.github.com/kentbrew/764238
["fs", "http", "mime", "path", "url" ].forEach(function (module) {
  global[module] = require(module);
});

var config = {
  'port': 8000,
  'dir': '_site'
};

var server = http.createServer(function (req, res) {

  var pathname = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), config.dir, pathname);

  if (!path.extname(filename)) { filename = filename + '/index.html'; }

  fs.exists(filename, function (gotPath) {

    if (!gotPath) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
        return;
    }

    res.writeHead(200, { 'Content-Type': mime.lookup(filename) });

    fs
      .createReadStream(filename, {
        flags: 'r',
        encoding: 'binary',
        mode: 0666,
        bufferSize: 4 * 1024
      })
      .addListener('data', function (chunk) { res.write(chunk, 'binary'); })
      .addListener('close', function () { res.end(); });

  });
});

server.listen(config.port);


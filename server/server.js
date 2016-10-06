'use strict';

var endsWith     = require('es5-ext/string/#/ends-with')
  , startsWith   = require('es5-ext/string/#/starts-with')
  , memoize      = require('memoizee')
  , readFile     = require('fs2/read-file')
  , autoprefixer = require('autoprefixer')
  , createServer = require('http').createServer
  , resolve      = require('path').resolve
  , parse        = require('url').parse
  , connect      = require('connect')
  , st           = require('st')

  , staticsPath = resolve(__dirname, '../public')
  , programPath = resolve(__dirname, '../client/index.js')
  , cssPath = resolve(__dirname, '../client/theme.css')
  , readIndex;

readIndex = function (root) {
	return readFile(resolve(__dirname, '../public/index.html'))(function (data) {
		return String(data).replace(/ src="\/(?!\/)/g, ' src="' + root)
			.replace(/ href="\/(?!\/)/g, ' href="' + root);
	});
};

module.exports = function (env) {
	var port = isNaN(env.port) ? 8000 : env.port
	  , getIndex = env.dev ? readIndex : memoize(readIndex, { length: 0 })
	  , app = connect()
	  , root = env.root || '/'
	  , webmakeOpts;

	if (env.dev) {
		webmakeOpts = {};
		webmakeOpts[root + 'main.js'] = programPath;
		app.use(require('webmake-middleware')(webmakeOpts, { log: true }));
		app.use(function (req, res, next) {
			var pathname = parse(req.url).pathname;
			if (pathname !== '/theme.css') {
				next();
				return;
			}
			res.writeHead(200, {
				'Content-Type': 'text/css; charset=utf-8',
				// Do not cache generated bundle
				'Cache-Control': 'no-cache'
			});
			readFile(cssPath).done(function (cssText) {
				res.end(autoprefixer.process(cssText).css);
			});
		});
	}
	if (env.sync) {
		app.use(require('bespoke-sync/server')({
			log: true,
			ssePath: root + 'sse-slides/',
			xhrPath: root + 'slide/'
		}));
	}

	app.use(function (req, res, next) {
		var pathname = parse(req.url).pathname;
		if (!startsWith.call(pathname, root) || !endsWith.call(pathname, '/')) {
			next();
			return;
		}
		res.writeHead(200, {
			'Content-Type': 'text/html; charset=utf-8',
			// Do not cache generated bundle
			'Cache-Control': 'no-cache'
		});
		getIndex(root).done(res.end.bind(res));
	});
	app.use(st({ path: staticsPath, cache: !env.dev, index: false, url: root }));
	createServer(app).listen(port);

	console.log("Server started");
};

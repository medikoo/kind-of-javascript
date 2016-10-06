'use strict';

var count        = require('es5-ext/object/count')
  , deferred     = require('deferred')
  , resolve      = require('path').resolve
  , readFile     = require('fs2/read-file')
  , writeFile    = require('fs2/write-file')
  , autoprefixer = require('autoprefixer')
  , webmake      = require('webmake')

  , clientProgram = resolve(__dirname, '../client/index.js')
  , clientProgramBundle = resolve(__dirname, '../public/main.js')
  , clientCss = resolve(__dirname, '../client/theme.css')
  , clientCssBundle = resolve(__dirname, '../public/theme.css');

module.exports = function (env) {
	var promise;
	if (env.dev) return deferred(null);
	return deferred(
		promise = webmake(clientProgram, { output: clientProgramBundle }).aside(function () {
			console.log("Webmake OK [" + promise.parser.modulesFiles.length +
				" modules from " + count(promise.parser.packages) + " packages in " +
				(promise.time / 1000).toFixed(2) + "s]");
		}),
		readFile(clientCss)(function (cssText) {
			return writeFile(clientCssBundle, autoprefixer.process(cssText).css);
		})
	);
};

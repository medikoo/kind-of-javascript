# Kind Of JavaScript
## October 2016, [WarsawJS](http://warsawjs.com/) presentation slides & notes

Published at [medikoo.com/kind-of-javascript](http://medikoo.com/kind-of-javascript/?notes)

Made with [Bespoke.js](https://github.com/markdalgleish/bespoke.js) presentation engine and following plugins: [history](https://github.com/medikoo/bespoke-history#bespoke-history), [keys](https://github.com/markdalgleish/bespoke-keys#bespoke-keys), [notes](https://github.com/medikoo/bespoke-notes#bespoke-notes), [progress](https://github.com/markdalgleish/bespoke-progress#bespoke-progress), [scale](https://github.com/markdalgleish/bespoke-scale#bespoke-scale), [substeps](https://github.com/medikoo/bespoke-substeps#bespoke-substeps), [sync](https://github.com/medikoo/bespoke-substeps#bespoke-sync), [touch](https://github.com/markdalgleish/bespoke-touch#bespoke-touch)

### To install & view presentation locally

	$ npm install
	$ npm start

By default slideshow would be served at port 8000. You can customize it and few other settings by providing `env.json` configuration file in main folder, following settings are supported:
* __dev__: (default: false), if true client file will be generated dynamically on each request (any changes made to client modules will be visible after page reload)
* __port__: (default: 8000), port at which slideshow would be served
* __sync__: (default: false), whether to sync slideshow among different browsers or tabs
* __root__: (default: "/") root url path of presentation

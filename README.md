# webpack-app
Simple example boilerplate app - http://mikelp.github.io/webpack-app.

## (Pre)configuration
### This steps required before you can build project:
- Install last version of [node.js] for your platform (for Mac OS use brew - brew install nodejs)
- Install last version of [git] for your platform (for Mac OS use brew - brew install git)
- Checkout last version from [repository]
- Go to client root folder that include _(./public, ./app, ./doc)_ folders
- Please type in console/terminal command `npm install`
- Install [bower.js] with npm `npm install bower -g`
- Please type in console/terminal command `bower install`
- Enjoy!

### Troubleshooting
- If you receive clang errors while installing the npm packages on OSX 10. Add the following links for -lgcc_s.
- This is particularly an issue on the bufferutil dependency.
- $ cd /usr/local/lib
- $ sudo ln -s ../../lib/libSystem.B.dylib libgcc_s.10.5.dylib
- $ sudo ln -s ../../lib/libSystem.B.dylib libgcc_s.10.4.dylib

## Production build
### Run this command in console/terminal:
- `npm run build:prod`
- or this (example):
- `webpack --progress --colors --conf webpack.config.js`

### Please note
- `--optimize-dedupe` - find and remove duplicated modules
- `--optimize-minimize` - uglify and remove comments
- `--progress` - show build progress in %
- `--colors` - highlight build output
- `--conf` - path to config file
- `--watch` - make build on source changes

### All scripts
- `http:prod:watch` - run server, watch changes, build app (production)
- `http:dev:watch` - run server, watch and apply changes, build app (development)
- `build:prod:watch` - watch and apply changes, and build only (production)
- `build:dev:watch` - watch and apply changes, and build only (development)
- `build:prod` - make build only (production)
- `build:dev` - make build only (development)

## Developers build (only!)
### Run this command in console/terminal without Web Server (for Apache):
- _JavaScript and CSS build watch_ - `npm run build:dev:watch`
- _JavaScript and CSS build_ - `npm run build:dev`

### Running node server on custom port:
- Run server and live build javascript _(edit port in webpack.webserver.js file)_
- $ `npm run http:dev:watch`
- Or in production mode
- $ `npm run http:prod:watch`
- Then...
- Open <a href="http://localhost:[your-port]/webpack-dev-server/">http://localhost:[your-port](http://localhost:[your-port)]  or [[http://localhost:[your-port]/webpack-dev-server/](http://localhost:[your-port]/webpack-dev-server/)</a>
- Enjoy

## Run Unit Tests
### Run this command in terminal to start the test webpack dev server:
- No tests for now

[repository]: https://github.com/MikeLP/webpack-app
[node.js]: https://nodejs.org/en/download/
[bower.js]: http://bower.io/
[git]: http://git-scm.com/

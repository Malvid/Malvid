# Integrations

The [API of Malvid](API.md) allows you to use your existing asset pipeline or toolset together with Malvid.

## Contents

- [Rosid](#rosid)
- [Gulp](#gulp)
- [NPM Scripts](#npm-scripts)

## Rosid

[Rosid](https://github.com/electerious/Rosid) is the recommended way to use Malvid. It's a just-in-time server and static site generator written in Node.js that build and updates your components and UI on-the-fly.

Rosid allows you to use your favorite templating languages and preprocessors in combination with Malvid. This includes EJS, Twig, Nunjucks, SASS, Babel [and more](https://www.npmjs.com/search?q=rosid-handler-).

### How it works

Rosid will transpile all files that have to be transpiled to be readable by a browser and Malvid will display the output / components in its UI.

### Pros and cons

#### Pros

- Includes a server with live-reloading for HTML, styles and scripts
- Real-time updates in the UI of Malvid
- Transpilation of templating languages and other files

#### Cons

- Properly not part of your workflow, yet

### Resources

- 📐 [Skeleton Components](https://github.com/electerious/Skeleton-Components): Preconfigured boilerplate that includes Rosid, Malvid, Nunjucks and preprocessors like SASS and Babel
- ⚙️ [rosid-handler-malvid](https://github.com/comwrap/rosid-handler-malvid): Malvid handler for Rosid

## Gulp

Gulp helps you to automate and enhance your workflow. It works great with the [API of Malvid](API.md).

### How it works

The following is an example `gulpfile.js` that defines two tasks, one to build and save the HTML and JSON of the UI and one to start a dev server with live-reloading enabled.

Once added, these can be run the tasks as `gulp` and `gulp build`. However you can of course change them to be called whatever you like!

```js
const fs = require('fs')
const util = require('util')
const gulp = require('gulp')
const connect = require('gulp-connect')
const malvid = require('malvid')
const pAll = require('p-all')

gulp.task('build', async function() {

	const results = await malvid({
		src: 'src/'
	})

	const html = await results.html()
	const json = await results.json()

	await pAll([
		() => util.promisify(fs.writeFile)('src/index.html', html),
		() => util.promisify(fs.writeFile)('src/index.html.json',  JSON.stringify(json))
	])

	connect.reload()

})

gulp.task('watch', function() {

	gulp.watch([
		'src/**/*',
		'!src/index.html',
		'!src/index.html.json'
	], [
		'build'
	])

	connect.server({
		root: 'src',
		livereload: true
	})

})

gulp.task('default', [ 'build', 'watch' ])
```

### Pros and cons

#### Pros

- Includes a server with live-reloading for HTML, styles and scripts
- Transpilation of templating languages and other files
- Easy to use and powerful

#### Cons

- No real-time updates of the UI (just live-reloading)

### Resources

- ⚙️ [gulp.js](https://gulpjs.com): Automate and enhance your workflow

## NPM Scripts

The locally-installed Malvid module includes a CLI and lets you use your NPM scripts to provide a convenient way to run the CLI without installing Malvid globally.

### How it works

Install `malvid` locally and use its [CLI](CLI.md) in the `scripts` of your `package.json`. You can additionally use `nodemon` to rerun the `build` script every time a file changes.

```json
{
  "name": "example",
  "version": "1.0.0",
  "description": "Malvid example website.",
  "devDependencies": {
    "malvid": "^4.3.0",
  },
  "scripts": {
    "start": "nodemon --watch src --ignore src/index.html --ignore src/index.html.json",
    "build": "malvid index.html index.html.json"
  }
}
```

Now you can use `npm start` during development or `npm run build` to save the UI once.

### Pros and cons

#### Pros

- Easy to set up
- No additional build-tool required

#### Cons

- No server with live-reloading for HTML, styles and scripts
- No real-time updates or live-reloading of the UI (you have to reload manually)
- Inefficient rebuilds when a file changes
- No convenient transpilation of templating languages and other files

### Resources

- 📄 [npm-scripts](https://docs.npmjs.com/misc/scripts): How npm handles the "scripts" field
- ⚙️ [nodemon](https://github.com/remy/nodemon): Monitor for any changes in your node.js application and automatically restart the server
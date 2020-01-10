# Options

Pass an object of options and functions to Malvid to adjust it's behaviour. The default configuration looks like the following:

> ⚠️ Your configuration will be merged with the defaults. You only need to set what you want to modify. Except `resolvers` and `statuses`. Those will be overwritten entirely when you specify them.

```js
const requireData = require('require-data')
const continuousStealthyRequire = require('continuous-stealthy-require')

module.exports = {
	lang: 'en',
	title: 'Malvid',
	description: 'UI to help you build and document web components.',
	style: '',
	script: '',
	links: [],
	src: '',
	pattern: '**/[^_]*.{ejs,njk,hbs,twig}',
	url: (url) => url,
	resolvers: [
		{
			id: 'view',
			label: 'View',
			languages: [ 'twig' ],
			resolve: (filename, fileExt) => [ `${ filename }${ fileExt }` ]
		},
		{
			id: 'data',
			label: 'Data',
			languages: [ 'json', 'js' ],
			parse: async (contents, filePath) => {

				// Allow empty JSON files
				if ((await contents).trim() === '') return '{}'

				// Require uncached JS or JSON file and stringify it
				return JSON.stringify(requireData(filePath, continuousStealthyRequire), null, 2)

			},
			resolve: (filename) => [ `${ filename }.data.json`, `${ filename }.data.js` ]
		},
		{
			id: 'notes',
			label: 'Notes',
			languages: [ 'markdown' ],
			resolve: (filename) => [ `${ filename }.md` ]
		},
		{
			id: 'config',
			label: 'Config',
			languages: [ 'json' ],
			parse: async (contents, filePath) => {

				// Allow empty JSON files
				if ((await contents).trim() === '') return {}

				// Require uncached JS or JSON
				return requireData(filePath, continuousStealthyRequire)

			},
			resolve: (filename) => [ `${ filename }.config.json`, `${ filename }.config.js` ]
		}
	],
	statuses: {
		wip: {
			label: 'WIP',
			description: 'Work in progress',
			color: '#fe913d'
		},
		pending: {
			label: 'Pending',
			description: 'Ready, but waiting for finalization',
			color: '#2d90e8'
		},
		ready: {
			label: 'Ready',
			description: 'Ready to implement',
			color: '#2bc052'
		}
	}
}
```

## Usage

### API

Pass the configuration as an object to Malvid.

Example:

```js
const malvid = require('malvid')

;(async () => {

	const opts = {
		title: 'Awesome project',
		description: 'Component library for our awesome project.'
	}

	const result = await malvid(opts)

	/* Process the result */

})()
```

### CLI

The configuration should be stored in your current working directory as `malvidfile.json` or `malvidfile.js` when using the CLI. Configuration files formatted as JavaScript should be in the style of a module that exports an object.

A JavaScript configuration is required when you want to overwrite options like `url` or `resolvers`. Those options require JavaScript functionality.

Examples:

```json
{
  "title": "Awesome project",
  "description": "Component library for our awesome project."
}
```

```js
module.exports = {
	title: 'Awesome project',
	description: 'Component library for our awesome project.'
}
```

## Properties

### Lang

Type: `String` Optional: `true`

Declare the language of the UI page.

Example:

```json
{
  "lang": "de"
}
```

### Title

Type: `String` Optional: `true`

Title of the UI page.

Example:

```json
{
  "title": "Awesome project"
}
```

### Description

Type: `String` Optional: `true`

UI page description.

Example:

```json
{
  "description": "Component library for our awesome project."
}
```

### Style

Type: `String` Optional: `true`

Custom CSS that gets injected at the end of the body.

Example:

```json
{
  "style": "#iframe { padding: 0 }"
}
```

### Script

Type: `String` Optional: `true`

Custom JS that gets injected at the end of the body.

Example:

```json
{
  "script": "console.log('Injected')"
}
```

### Links

Type: `Array` Optional: `true`

Malvid can show links in the navigation. This is helpful for project related files or sites that aren't part of Malvid (e.g. Jira board, API documentation, InVision design, etc.).

Example:

```json
{
  "links": [
    {
      "label": "Example",
      "href": "https://example.com"
    }
  ]
}
```

### Src

Type: `String` Optional: `true`

Path to the folder Malvid should scan.

Example:

```json
{
  "src": "src/"
}
```

### Pattern

Type: `String` Optional: `true`

The component files Malvid should look for using the same [patterns the shell uses](https://github.com/isaacs/node-glob).

Example:

```json
{
  "pattern": "**/*.njk"
}
```

Pattern examples:

| Pattern | Description |
|:-----------|:------------|
| `*.njk` | Matches all Nunjucks files in the root of your project |
| `[^_]*.njk` | Matches all Nunjucks files in the root of your project not starting with an underscore |
| `**/*.twig` | Matches all Twig files |
| `**/*.{twig,ejs}` | Matches all Twig and EJS files |
| `components/*/*.ejs` | Matches all EJS files located in a subdirectory of `components/` |
| `components/[^_]*/*.ejs` | Matches all EJS files located in a subdirectory of `components/` when the subdirectory does not start with an underscore |
| `components/**/*.ejs` | Matches all EJS files located in `components/` or in any subdirectory of `components/` |

### URL

Type: `Function` Optional: `true`

Function that accepts and returns a URL. Allows you to modify the preview URL of components.

Example:

```js
{
	url: (url) => 'http://localhost:3000' + url
}
```

### Resolvers

Type: `Array` Optional: `true`

Specify the files that belong to components. Each item represents a tab in the UI.

Resolvers like the `view` and `config` should always be part of the array. Otherwise you can't see the view or adjust the [behaviour of a component](Components.md#configuration). The nice thing however is that you can specify how Malvid should parse those files. Use a custom function in the `parse` property and Malvid works with every format you can think of. Want to use YML instead of JS or JSON for the configuration? No problem!

Example:

```js
{
	id: 'style',
	label: 'Style',
	languages: [ 'scss', 'css' ],
	resolve: (filename, fileExt) => [ `${ filename }.scss`, `${ filename }.css` ]
}
```

Malvid scans your folders and finds a component called `button.njk`. It will run though all resolvers to find files that could belong to this button component. It executes the `resolve` function with the parameter `button` and `.njk`. The `resolve` function returns `[ 'button.scss', 'button.css' ]` and Malvid looks for files called `button.scss` and `button.css` in the same folder as the component. Let's say the SCSS file exists and Malvid continues to process the resolver. It executes the `parse` function (when defined) to parse the contents of the file. The returned value will be shown in the [inspector of the UI](Interface.md#inspector) in a tab with the name `Style`. Malvid does this for all components and resolvers.

#### Id

Type: `String` Optional: `false`

Unique identifier.

Can be everything except `config`. `config` is special and should only be used for the configuration resolver.

#### Label

Type: `String` Optional: `false`

Name that describes the content of the file.

The output of the resolver will be shown as a tab in the [inspector of the UI](Interface.md#inspector). This label will be used for the name of the tab.

#### Languages

Type: `Array` Optional: `false`

Syntax highlighting languages.

Supports a subset of languages supported by [highlight.js](https://highlightjs.org). Will be used to highlight the output of the resolver in the [inspector of the UI](Interface.md#inspector). Multiple values are helpful when a resolver accepts multiple formats.

Supported languages: `php`, `python`, `css`, `coffeescript`, `reasonml`, `xml`, `json`, `javascript`, `markdown,` `django`, `elm`, `htmlbars`, `haml`, `handlebars`, `less`, `scss`, `stylus`, `twig`, `typescript`, `yaml`, `plaintext`

#### Parse

Type: `Function` Optional: `true`

Defines how Malvid should parse the contents of the file.

A resolver without a `parse` property will show the contents without modifying it. The `parse` function should always return a string, except for the `config` file where it should return an object. The output of the `parse` function will be shown in the [inspector of the UI](Interface.md#inspector).

Examples:

```js
{
	parse: async (contents, filePath) => {

		// Allow empty JSON files
		if ((await contents).trim() === '') return '{}'

		// Require uncached JS or JSON file and stringify it
		return JSON.stringify(continuousStealthyRequire(filePath), null, 2)

	}
}
```

```js
{
	parse: async (contents, filePath) => {

		// Format contents with opinionated code formatter
		return prettier.format(await contents)

	}
}
```

#### Resolve

Type: `Function` Optional: `false`

Function that returns an array of filenames that Malvid should look for.

### Statuses

Type: `Object` Optional: `true`

Available statuses.

Components can have [statuses associated with them](Interface.md#statuses). Those will be shown in the navigation and preview when specified in the [configuration of a component](Components.md#status). A status must be defined before you can use it and this is the right option to do so.

Example:

```json
"statuses": {
  "wip": {
    "label": "WIP",
    "description": "Work in progress",
    "color": "#fe913d"
  }
}
```

#### Label

Type: `String` Optional: `false`

Label of the status.

Should be short as the label will be displayed on the top right in the [preview of the UI](Interface.md#preview).

#### Description

Type: `String` Optional: `false`

Description of the status.

Will be displayed as a tooltip when you hover the status in the [navigation](Interface.md#navigation) or the status label on the top right in the [preview of the UI](Interface.md#preview).

#### Color

Type: `String` Optional: `false`

Hex color of the status.

Will be used for the status indicator in the [navigation](Interface.md#navigation) and for the status label background on the top right in the [preview of the UI](Interface.md#preview).
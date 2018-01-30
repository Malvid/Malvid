# Options

Pass an object of options and functions to Malvid to adjust it's behaviour. The default configuration looks like the following:

> ⚠️ Your configuration will be merged with the defaults. You only need to set what you want to modify. Except `resolvers` and `statuses`. Those will be overwritten entirely when you specify them.

```js
{
	lang: 'en',
	title: 'Malvid',
	description: 'UI to help you build and document web components.',
	src: '',
	pattern: '**/[^_]*.{ejs,njk,hbs,twig}',
	resolvers: [
		{
			id: 'view',
			label: 'View',
			languages: [ 'twig' ],
			resolve: (fileName, fileExt) => [ `${ fileName }${ fileExt }` ]
		},
		{
			id: 'data',
			label: 'Data',
			languages: [ 'json', 'js' ],
			resolve: (fileName, fileExt) => [ `${ fileName }.data.json`, `${ fileName }.data.js` ]
		},
		{
			id: 'notes',
			label: 'Notes',
			languages: [ 'markdown' ],
			resolve: (fileName, fileExt) => [ `${ fileName }.md` ]
		},
		{
			id: 'config',
			label: 'Config',
			languages: [ 'json' ],
			parse: (contents) => contents=='' ? {} : JSON.parse(contents),
			resolve: (fileName, fileExt) => [ `${ fileName }.config.json` ]
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

### Resolvers

Type: `Array` Optional: `true`

Specify the files that belong to components. Each item represents a tab in the UI.

Resolvers like the `view` and `config` should always be part of the array. Otherwise you can't see the view or adjust the [behaviour of a component](Components.md#Configuration). The nice thing however is that you can specify how Malvid should parse those files. Use a custom function in the `parse` property and Malvid works with every format you can think of. Want to use YML instead of JS or JSON for the configuration? No problem!

Example:

Malvid scans your folders and finds a component called `button.njk`. It will run though all resolvers to find files that could belong to this button component. It executes the `resolve` function with the parameter `button` and `.njk`. The `resolve` function returns `[ 'button.data.json', 'button.data.js' ]` and Malvid looks for files called `button.data.json` and `button.data.js` in the same folder as the component. Let's say the JSON file exists and Malvid continues to process the resolver. It executes the `parse` function (when defined) to parse the contents of the file. The returned value will be shown in the [inspector of the UI](Interface.md#Inspector) in a tab with the name specified in the `label`. Malvid does this for all components and resolvers.

#### Id

Type: `String` Optional: `false`

Unique identifier.

Can be everything except `config`. `config` is special and should only be used for the configuration resolver.

#### Label

Type: `String` Optional: `false`

Name that describes the content of the file.

The output of the resolver will be shown as a tab in the [inspector of the UI](Interface.md#Inspector). This label will be used for the name of the tab.

#### Languages

Type: `Array` Optional: `false`

Syntax highlighting languages.

Supports any language supported by [highlight.js](https://highlightjs.org). Will be used to highlight the output of the resolver in the [inspector of the UI](Interface.md#Inspector). Multiple values are helpful when a resolver accepts multiple formats.

#### Parse

Type: `Function` Optional: `true`

Defines how Malvid should parse the contents of the file.

A resolver without a `parse` property will show the contents without modifying it.

#### Resolve

Type: `Function` Optional: `false`

Function that returns an array of file names that Malvid should look for.
# API

Malvid can be integrated into your project using its API *or* CLI. The API gives you more flexibility and allows you to use Malvid in your existing asset pipeline or toolset.

## Initialize

You must require and await Malvid before you can get the `html` and `json` of the UI.

Syntax:

```js
const malvid = require('malvid')
const instance = await malvid(opts)
```

Example:

```js
const malvid = require('malvid')
const instance = await malvid({ title: 'Malvid' })
```

Parameters:

- `opts` `{?Object}` An object of [options](Options.md).

Returns:

- `{Promise<Object>}` A promise that resolves an object with a `html` and `json` property.

## HTML

Outputs the HTML necessary to view the UI in a browser.

Syntax:

```js
const html = await instance.html
```

Returns:

- `{Promise<String>}` A promise that resolves a string that contains the HTML of the UI.

## JSON

Outputs the data of all components as an object. The UI will use this file to display your components.

- The data should be saved in the same location as the HTML
- The name of the file should be equal to the HTML file, but end with `.json` (e.g. `index.html.json`)

Syntax:

```js
const json = await instance.json
```

Returns:

- `{Promise<Object>}` A promise that resolves an object that contains all information about your components.
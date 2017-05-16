# rosid-handler-components

[![Travis Build Status](https://travis-ci.org/comwrap/rosid-handler-components.svg?branch=master)](https://travis-ci.org/comwrap/rosid-handler-components) [![AppVeyor Status](https://ci.appveyor.com/api/projects/status/6fxwnrdhoh7xw9n1?svg=true)](https://ci.appveyor.com/project/comwrap/rosid-handler-components) [![Coverage Status](https://coveralls.io/repos/github/comwrap/rosid-handler-components/badge.svg?branch=master)](https://coveralls.io/github/comwrap/rosid-handler-components?branch=master)  [![Dependencies](https://david-dm.org/comwrap/rosid-handler-components.svg)](https://david-dm.org/comwrap/rosid-handler-components#info=dependencies)

UI to help you build and document web components.

## Install

```
npm install rosid-handler-components
```

## Usage

### API

```js
const components = require('rosid-handler-components')

components(null).then((data) => {})
```

### Rosid

Add the following object to your `rosidfile.json`, `rosidfile.js` or [routes array](https://github.com/electerious/Rosid#routes). `rosid-handler-components` will always return the HTML of the UI that can be viewed in the browser.

```json
{
	"name"    : "Components",
	"path"    : "ui/**/*.html*",
	"handler" : "rosid-handler-components"
}
```

## Parameters

- `filePath` `{?*}` Not used by this module.
- `opts` `{?Object}` Options.
	- `componentLookup` `{?Object}` - Options for [component-lookup](https://github.com/electerious/component-lookup).

## Returns

- `{Promise}({String|Buffer})` HTML of the UI.
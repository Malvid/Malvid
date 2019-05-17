# Components

A component typically consists of two files:

- Template: The template is the file that the component's markup lives in. It can be written in Nunjucks, Twig or any other templating language you can think of.
- Data: The data can consist of simple data types such as strings, booleans, numbers, arrays and objects. It's the data that will be used to render the template. The format depends on the templating language you choose. Typical formats are JSON, JS or YML.

Combing template and data is up to you. Malvid doesn't care about the build process and can only display what a browser can display.

> 👉 The following examples will mention generated files in round brackets to indicate that those are required to display the component in the browser, but aren't files that are written or added by hand.

A minimal component structure with a Nunjucks component looks like the following:

```
.
├── src
│   ├── button
│   │   ├── (button.html)
│   │   ├── button.njk <= Template
│   │   └── button.data.{js|json} <= Data
```

- The entry folder name is just an example and can be chosen freely
- Malvid detects that files belong to the same component when they start with the same name and are located in the same folder
- It's recommended—but not required—to place all files that belong to the same component into the same folder

## Preview

Malvid expects a HTML preview for each component. The preview should be transpiled by yourself. Malvid itself isn't doing any template transpilation.

The preview file must be placed in the same folder as the template with the same name as the template, but ending with `.html`.

```
.
├── src
│   ├── button
│   │   ├── (button.html) <= Preview
│   │   ├── button.njk
│   │   └── button.data.{js|json}
```

## Note

Put a Markdown file aside your component to write a documentation for it. This might include notes on how and where the component can be used or other useful information for the people who may be using the component library.

```
.
├── src
│   ├── button
│   │   ├── (button.html)
│   │   ├── button.njk
│   │   ├── button.data.{js|json}
│   │   └── button.md <= Note
```

## Configuration

Put a configuration file aside your component to feed the UI with additional information.

```
.
├── src
│   ├── button
│   │   ├── (button.html)
│   │   ├── button.njk
│   │   ├── button.data.{js|json}
│   │   └── button.config.{js|json} <= Configuration
```

Configuration files can be formatted as JSON or as a JavaScript file in the style of a module that exports a configuration object, function or async function.

Examples:

```json
{
  "group": "section",
  "status": "wip"
}
```

```js
module.exports = {
	group: 'section',
	status: 'wip'
}
```

```js
module.exports = () => ({
	group: 'section',
	status: 'wip'
})
```

```js
module.exports = async () => ({
	group: 'section',
	status: 'wip'
})
```

### Group

Type: `String` Default: `undefined` Optional: `true`

Visually group multiple components. It's like a folder. All components with the same group name are grouped together.

> ⚠️ The group name is case insensitive and will be displayed uppercase. An empty string will be ignored.

Example:

```json
{
  "group": "section"
}
```

### Status

Type: `String` Default: `undefined` Optional: `true`

Components can have statuses associated with them. Each status has a colour and a label that can be displayed in the UI to help people quickly understand the status of each component.

Malvid defines some [default statuses](Options.md) *(wip, pending and ready)*, but you are free to define your own to suit the needs of your project, or customise the colours and labels associated with these statuses. Custom statuses can be defined in [the options of Malvid](Options.md#statuses).

> ⚠️ Make sure that a status exists before you use it in a component.

Example:

```json
{
  "status": "wip"
}
```

### Preview

Type: `boolean` Default: `true` Optional: `true`

You can disable the preview for certain components for cases where you do not want or need the preview to be rendered. For example when a component does not have markup but only consists of data.

Example:

```json
{
  "preview": true
}
```

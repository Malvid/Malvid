# CLI

Malvid can be integrated into your project using its API *or* CLI. The CLI tool is located in the `bin` folder and allows you to run Malvid without adding JS files to your project. Only a single `malvidfile.json` or `malvidfile.js` is required in the current working directory when you want to adjust the default behaviour of Malvid.

## Usage

```
Usage:

  malvid [command] [filenames] [options]

Commands:

  html [filename]  output HTML for the UI
  json [filename]  output JSON with component data

Options:

  -V, --version  output the version number
  -h, --help     output usage information

Examples:

  $ malvid index.html index.html.json
  $ malvid html index.html
  $ malvid json index.html.json
```

## Commands

Output both HTML and JSON when executing `malvid` without a command. Two filenames must be specified. The first filename will be used for the HTML file; The second one for the JSON file.

```sh
malvid [filenames]
```

Example:

```sh
malvid index.html index.html.json
```

### HTML

Outputs the HTML necessary to view the UI in a browser.

```sh
malvid html [filename]
```

Example:

```sh
malvid html index.html
```

### JSON

Outputs the data of all components as JSON. The UI will use this file to display your components.

```sh
malvid json [filename]
```

Example:

```sh
malvid json index.html.json
```
# Styleguide

This styleguide presents preferred conventions we follow at [comwrap GmbH](http://comwrap.com) to integrate our components into TYPO3.

## Workflow

1. The front-end team at comwrap writes components in Nunjucks and uses example data to display and test those components. All components can be viewed in the Malvid UI by the whole team.
2. TYPO3 integrates those components with a custom Mask-Nunjucks-Connector extension. The connector uses Twig to render the component. Twig is almost like Nunjucks, but works better in an environment like TYPO3.
3. TYPO3 maps mask fields with a configuration file to provide real data in the same format as the front-end.

## Filenames

- The filename of a component must be written in lowercase
- Components that fill a whole section on a site should start with `section_`
- Components that contain other components to form a whole page should start with `template_`

Example:

```
.
├── src
│   ├── button.njk
│   ├── logo.njk
│   ├── section_features.njk
│   ├── section_footer.njk
│   ├── template_index.njk
│   └── template_about.njk
```

## Headlines

- The headline of a component should be named `header`
- The subheadline of a component should be named `subheader`

Example:

```njk
<h1>{{ header }}</h1>
<h2>{{ subheader }}</h2>
```

```json
{
  "header": "Headline",
  "subheader": "Subheadline"
}
```

## Text

The text of a component should be named `bodytext`.

Example:

```njk
<p>{{ bodytext }}</p>
```

```json
{
  "bodytext": "Lorem ipsum dolor sit amet..."
}
```

## RTE text

- Text containing content from the TYPO3 RTE should be [marked as safe](https://mozilla.github.io/nunjucks/templating.html#safe)
- Don't include RTE content from TYPO3 inside a `<p>`-Tag as TYPO3 already wraps text in `<p>`-Tags
- Use `<p>`-Tags in the example data to imitate the behaviour of real RTE content

Example:

```njk
<div>{{ bodytext | safe }}</div>
```

```json
{
  "bodytext": "<p>Lorem ipsum dolor sit amet...</p>"
}
```

## Links

- The text of a link should be called `label`
- All links should accept optional targets
- The `href` should be an object in the data

Example:

```njk
<a href="{{ href.value }}" {% if href.target %}target="{{ href.target }}"{% endif %}>{{ label }}</a>
```

```json
{
  "label": "Link",
  "href": {
    "value": "#",
    "target": "_blank"
  }
}
```

## Buttons

The text of a button should be called `label`.

```njk
<button>{{ label }}</button>
```

```json
{
  "label": "Button"
}
```

## Images

Images are file references in TYPO3. Their data should always look like the following:

```json
{
  "title": "Cat",
  "alternative": "Fluffy cat playing with a ball",
  "description": "Cats love balls",
  "link": "https://en.wikipedia.org/wiki/Cat",
  "src": "http://via.placeholder.com/350x150"
}
```
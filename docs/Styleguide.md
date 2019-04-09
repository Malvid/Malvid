# Styleguide

This styleguide presents preferred conventions we follow at [comwrap GmbH](https://comwrap.com) to integrate our components into TYPO3.

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

The text of a component should be named `text`.

Example:

```njk
<p>{{ text }}</p>
```

```json
{
  "text": "Lorem ipsum dolor sit amet..."
}
```

## RTE text

- RTE text of a component should be named `bodytext`
- Text containing content from the TYPO3 RTE should be [marked as safe](https://mozilla.github.io/nunjucks/templating.html#safe)
- Don't include RTE content from TYPO3 inside a `<p>`-Tag as TYPO3 already wraps text in `<p>`-Tags
- Use `<p>`-Tags in the example data to imitate the behavior of real RTE content

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

- Images are file references in TYPO3
- It's not possible to add or rename properties inside the `image` object
- `width` and `height` aren't part of the `image` object and must be added outside of it
- `x` and `y` represent the center of the focus area in percent (see below for more information)
- The data must always follow the structure shown below

```json
{
  "image": {
    "title": "Cat",
    "alternative": "Fluffy cat playing with a ball",
    "description": "Cats love balls",
    "link": "https://en.wikipedia.org/wiki/Cat",
    "src": "http://via.placeholder.com/350x150",
    "x": 0.5,
    "y": 0.5
  },
  "image_width": 350,
  "image_height": 150
}
```

Focus area:

TYPO3 allows to set a focus area in the image editor. The center of this area is available in the image data as `x` and `y`. Both coordinates are relative to the width and height of the image. `0.5` is therefore equal to 50% and means that the focus point is positioned in the middle of the image. The focus area can be used to enhance the way images are scaled on different viewport sizes. This is especially helpful when using `background-position`.

Usage examples:

```njk
<img src="{{ image.src }}" alt="{{ image.alternative }}" width="{{ image_width }}" height="{{ image_height }}">
```

```njk
<figure>
	<img src="{{ image.src }}" alt="{{ image.alternative }}" width="{{ image_width }}" height="{{ image_height }}">
	{% if description %}
		<figcaption>{{ description }}</figcaption>
	{% endif %}
</figure>
```

```njk
<svg>
  <use xlink:href="{{ image.src }}"></use>
</svg>
```

```njk
<div style="background-image: url('{{ image.src }}'); {% if x and y %}background-position: calc({{ image.x }} * 100%) calc({{ image.y }} * 100%){% endif %}"></div>
```

## Videos

- Videos are file references in TYPO3
- It's not possible to add or rename properties inside the `video` object
- `width`, `height`, `loop`, `autoplay` and `muted` aren't part of the `video` object and must be added outside of it
- `poster` must be added outside of the `video` object as an `image` object (see [Images](#images))
- The data must always follow the structure shown below


```json
{
  "video": {
    "title": "Cat",
    "alternative": "Fluffy cat playing with a ball",
    "description": "Cats love balls",
    "link": "https://en.wikipedia.org/wiki/Cat",
    "src": "http://example.com/video.mp4"
  },
  "video_width": 350,
  "video_height": 150,
  "video_loop": true,
  "video_autoplay": true,
  "video_muted": true
}
```

Usage example:

```njk
<video
	src="{{ video.src }}"
	width="{{ video_width }}"
	height="{{ video_height }}"
	{% if video_loop %}loop{% endif %}
	{% if video_autoplay %}autoplay{% endif %}
	{% if video_muted %}muted{% endif %}
></video>
```

## Forms

- Include a placeholder for additional hidden fields required by TYPO3
- Provide an optional `message` field to display errors
- Use HTML5 form validation for a validation in the front-end and an additional validation in TYPO3 for safety reasons

```njk
<form action="{{ action }}" method="{{ method }}">

	{{ hidden | safe }}

	{% if message %}
		<p>{{ message }}</p>
	{% endif %}

	<input type="email" name="{{ email.name }}" placeholder="{{ email.placeholder }}" required>
	<input type="password" name="{{ password.name }}" placeholder="{{ password.placeholder }}" data-rsa-encryption required>

	<a href="{{ reset.href.value }}" {% if reset.href.target %}target="{{ reset.href.target }}"{% endif %}>{{ reset.label }}</a>
	<button>{{ submit.label }}</button>

</form>
```

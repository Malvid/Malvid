# Styleguide

This styleguide presents preferred conventions we follow at [comwrap GmbH](https://comwrap.com) to integrate our components into TYPO3.

## Workflow

1. The front-end team at comwrap writes components in Nunjucks and uses example data to display and test those components. All components can be viewed in the Malvid UI by the whole team.
2. TYPO3 integrates those components with a custom Mask-Nunjucks-Connector extension. The connector uses Twig to render the component. Twig is almost like Nunjucks, but works better in an environment like TYPO3.
3. TYPO3 maps mask fields with a configuration file to provide real data in the same format as the front-end.

## Filenames

- The filename of a component must be written in lowercase
- SVG components should start with `icon_`
- Components that contain the content of a lightbox should start with `lightbox_`
- Components that contain a hero should start with `hero_`
- Components that fill a whole section on a site should start with `section_`
- Components that contain other components to form a whole page should start with `template_`

Example:

```
.
├── src
│   ├── button.njk
│   ├── logo.njk
│   ├── icon_arrow.njk
│   ├── icon_close.njk
│   ├── lightbox_image.njk
│   ├── lightbox_video.njk
│   ├── hero_main.njk
│   ├── hero_detail.njk
│   ├── section_features.njk
│   ├── section_footer.njk
│   ├── template_index.njk
│   └── template_about.njk
```

## Headline

- The headline of a component should be named `headline`
- It's not possible to add or rename properties inside the `headline` object
- Custom properties (e.g. the color) must be added outside of the `headline` object
- `position` can be `left`, `center` or `right`

Example:

```njk
<{{ headline.type }} class="{{ headline.style }} align-{{ headline.position }} color-{{ headline_color }}">{{ headline.text }}</{{ headline.type }}>
```

```json
{
  "headline": {
    "text": "Headline",
    "type": "h1",
    "style": "h2",
    "position": "left"
  },
  "headline_color": "primary"
}
```

You don't need to use all properties as it's recommended to keep the amount of configuration low.

Example:

```njk
<h1>{{ headline.text }}</h1>
```

```json
{
  "headline": {
    "text": "Headline"
  }
}
```

## Subheadline

- The subheadline of a component should be named `subheadline`
- It's not possible to add or rename properties inside the `subheadline` object
- Custom properties (e.g. the color) must be added outside of the `subheadline` object
- `position` can be `left`, `center` or `right`

Example:

```njk
<{{ subheadline.type }} class="{{ subheadline.style }} align-{{ subheadline.position }} color-{{ subheadline_color }}">{{ subheadline.text }}</{{ subheadline.type }}>
```

```json
{
  "subheadline": {
    "text": "Subheadline",
    "type": "h1",
    "style": "h2",
    "position": "left"
  },
  "subheadline_color": "primary"
}
```

You don't need to use all properties as it's recommended to keep the amount of configuration low.

Example:

```njk
<h2>{{ subheadline.text }}</h2>
```

```json
{
  "subheadline": {
    "text": "Subheadline"
  }
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
- Text containing content from the TYPO3 RTE must be [marked as safe](https://mozilla.github.io/nunjucks/templating.html#safe)
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

- The link of a component should be named `link`
- It's not possible to add or rename properties inside the `link` object
- Custom properties (e.g. the color) must be added outside of the `link` object
- All links must accept optional targets

Example:

```njk
<a href="{{ link.value }}" {% if link.target %}target="{{ link.target }}"{% endif %}>{{ link.label }}</a>
```

```json
{
  "link": {
    "label": "Link",
    "value": "#",
    "target": "_blank"
  },
  "link_color": "primary"
}
```

## Link Buttons

Links that look like buttons should be named `button`. They must have the same structure as [links](#links).

## Buttons

- The button of a component should be named `button`
- Custom properties (e.g. the color) must be added beside `button`

```njk
<button>{{ button }}</button>
```

```json
{
  "button": "Button",
  "button_color": "primary"
}
```

## Images

- Images are file references in TYPO3
- It's not possible to add or rename properties inside the `image` object
- Custom properties (e.g. the width and height) must be added outside of the `image` object
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
- Custom properties (e.g. `width`, `height`, `loop`, `autoplay` or `muted`) must be added outside of the `video` object
- `poster` must be added outside of the `video` object as an `image` object (see [Images](#images))

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
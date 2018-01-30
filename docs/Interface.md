# Interface

The interface of Malvid consists of three areas: Navigation, preview and inspector.

![Malvid UI in a browser](https://l.electerious.com/uploads/big/e6cb112abd2afd7aafeb210074dfeb2a.png)

## Navigation

The navigation lets you browse through your components.

### Search

Use the search field at the top to find the component you are looking for. Prepend you search term with an indicator to limit the results:

- `view:<term>`: Only search through the templates of your components
- `data:<term>`: Only search through the data of your components
- `notes:<term>`: Only search through the notes of your components

Example:

The input `view:"<a class="` shows all components whose template contains an `<a>` Tag starting with a `class` attribute.

### Groups

Malvid doesn't care about the original folder structure and displays all components below each other. This allows you see all of them at a glance without getting distracted by a deeply nested list. Some components however belong together and that's what groups are for. A group can be defined in the [configuration](Components.md#configuration) of a component. Components with the same group name will be shown beside each other.

### Statuses

Components can have statuses associated with them. A status must be defined in the options passed to Malvid and can then be used in the [configuration](Components.md#configuration) of your components. The status appears right after the component name.

## Preview

See how your component looks and behaves using the preview on the top right.

Malvid expects that you generate a HTML preview for it. The preview file must be placed in the same folder as the template with the same name as the template, but ending with `.html`.

> 🏗 This isn't very flexible and we are working on an option that gives you more control.

Example:

Your component lives in `src/button/` and the template is called `button.njk`. Malvid now tries to preview the URL `/src/button/button.html` that you must have generated.

## Inspector

See the parts of your component on the bottom right.

The inspector typically shows the view, data and notes of your currently selected component. The amount, order and content of the tabs can be adjusted by specifying [custom resolvers](Options.md#Resolvers).
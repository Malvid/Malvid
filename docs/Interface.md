# Interface

The interface of Malvid consists of three areas: Navigation, preview and inspector.

![Malvid UI in a browser](https://s.electerious.com/images/malvid/readme.png)

## Navigation

The navigation lets you browse through your components.

### Search

Use the search field at the top to find the component you are looking for. Prepend your search term with an indicator to limit the results:

- `view:<term>`: Only search through the templates of your components
- `data:<term>`: Only search through the data of your components
- `notes:<term>`: Only search through the notes of your components
- `group:<term>`: Search by group
- `status:<term>`: Search by status

Examples:

- The input `view:"<a class="` shows all components whose template contains an `<a>` Tag starting with a `class` attribute.
- The input `group:` shows all components that are part of a group.
- The input `status:wip` shows all components that are marked with the `wip` status.

### Links

Malvid can show [links](Options.md#links) between search field and components. This is helpful for project related files or sites that aren't part of Malvid (e.g. Jira board, API documentation, InVision design, etc.).

### Groups

Malvid doesn't care about the original folder structure and displays all components below each other. This allows you see all of them at a glance without getting distracted by a deeply nested list. Some components however belong together and that's what groups are for. A group can be defined in the [configuration](Components.md#configuration) of a component. Components with the same group name will be grouped together inside of the navigation.

> 💡 Click the name of a group to hide all components that are not part of that group.

### Statuses

Components can have statuses associated with them. A status must be defined in the options passed to Malvid and can then be used in the [configuration](Components.md#configuration) of your components. The status appears right after the component name.

## Preview

See how your component looks and behaves using the preview on the top right.

Malvid expects that you generate a HTML preview for it. The preview file must be placed in the same folder as the template with the same name as the template, but ending with `.html`.

You can modify the URL to the preview with the [`url` option](Options.md#url).

Example:

Your component lives in `src/button/` and the template is called `button.njk`. Malvid now tries to preview the URL `/src/button/button.html` that you must have generated.

## Inspector

See the parts of your component on the bottom right.

The inspector typically shows the view, data and notes of your currently selected component. The amount, order and content of the tabs can be adjusted by specifying [custom resolvers](Options.md#resolvers).
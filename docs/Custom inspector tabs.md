# Custom inspector tabs

The tabs you see when you start Malvid are just a set of [default resolvers](Options.md). Resolvers specify the files that belong to components. Including how to load their content, how to label the tab and how to highlight the code in the inspector. The default set includes the view, data, notes and a configuration for each component.

## Adding or removing resolvers

You can either overwrite the default set of resolvers or extend it.

### Overwrite

Overwriting the default means that you aren't using any of the default resolvers. You can do so by passing an `resolvers` array to Malvid that only includes your custom resolvers.

Example:

```js
module.exports = {
	resolvers: [
		// Your custom resolvers go here
	]
}
```

### Extend

Extending the default means that you are using all or a part of the default default resolvers. You can do so by passing an `resolvers` array to Malvid that requires the default resolvers and adds custom ones on top of it. The default resolvers are all located inside [the resolvers folder](../src/resolvers/).

Example:

```js
module.exports = {
	resolvers: [
		require('malvid/src/resolvers/view'),
		require('malvid/src/resolvers/data'),
		require('malvid/src/resolvers/notes'),
		require('malvid/src/resolvers/config'),
		// Your custom resolvers go here
	]
}
```

## Custom resolvers

Read more about resolvers in the [resolvers section](Options.md#resolvers).
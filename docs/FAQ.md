# FAQ

## How does Malvid compare to Fractal?

Malvid is very similar to Fractal and highly inspired by it. The key differences are:

- Malvid and Fractal don't care about how you transpile your assets (JS, SCSS, etc.). You can use [gulp](https://gulpjs.com), [Grunt](https://gruntjs.com) or [whatever you want](Integrations.md). Malvid takes this one step further by not caring about the template transpilation either. It's up to you to generate [a HTML preview](Components.md#preview).
- Malvid flattens your folder structure in the UI. You have to specify [the group](Components.md#group) a component belongs to. It won't group you components automatically by folder names.
- There're no sub-folders in Malvid
- There's no support for variants. Each component can only have one associated data set/file. This might change in the future.

## What templating languages are supported by Malvid?

Malvid displays anything a browser can display. It's not tied to one templating language as it's not doing the template transpilation. Generating [a HTML preview](Components.md#preview) is up to you.
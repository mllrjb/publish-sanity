# Publish Sanity

Tests that an NPM module can be:

* packaged `npm pack`
* installed `npm install my-module`
* required `require('my-module')`

Useful as a sanity check to ensure you didn't mess up your `main`, `files`, or subsequent `require` calls.

## Usage

```
npm install publish-sanity --save-dev
```

Add a script to your `package.json`:

```
{
  "scripts": {
    "prepublish": "publish-sanity --ignore-scripts"
  }
}
```

Note: `--ignore-scripts` is necessary to avoid nested calls of `prepublish` during `npm pack`.

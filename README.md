# Publish Sanity

Tests that an NPM module can be:

* packaged `npm pack`
* installed `npm install my-module`
* required `require('my-module')`

Useful as a sanity check to ensure you didn't mess up your `main`, `files`, or subsequent `require` calls.

## Usage

```
{
  "scripts": {
    "prepublish": "publish-sanity --ignore-scripts"
  }
}
```

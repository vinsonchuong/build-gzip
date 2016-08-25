# build-gzip
[![Build Status](https://travis-ci.org/vinsonchuong/build-gzip.svg?branch=master)](https://travis-ci.org/vinsonchuong/build-gzip)

Compress static assets after compilation

## Installing
`build-gzip` is available as an
[npm package](https://www.npmjs.com/package/build-gzip).

## Usage
Add `build-bin` and `build-gzip` to the `package.json`.

```json
{
  "name": "project",
  "private": true,
  "scripts": {
    "build": "build"
  },
  "devDependencies": {
    "build-bin": "^0.0.6",
    "build-gzip": "^0.0.1"
  }
}
```

From the command line, run:
```bash
npm run build
```

`build-gzip` will compress all files in the `dist` directory into new files
suffixed with `.gz`. `build-bin` will ensure that compilation plugins run first
before this compression plugin.

## Development
### Getting Started
The application requires the following external dependencies:
* Node.js

The rest of the dependencies are handled through:
```bash
npm install
```

Run tests with:
```bash
npm test
```

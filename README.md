# resolve-node-version

[![build status](https://secure.travis-ci.org/imlucas/resolve-node-version.png)](http://travis-ci.org/imlucas/resolve-node-version)

Like [node-version-resolver](https://github.com/heroku/node-version-resolver),
but without the coffee and installable from npm.

## Example

```javascript
var resolveNodeVersion = require('resolve-node-version');
resolveNodeVersion('unstable', function(err, v){
  console.log('unstable ->', v);
  // unstable -> 0.11.13
});

resolveNodeVersion('stable', function(err, v){
  console.log('stable ->', v);
  // stable -> 0.10.30
});

resolveNodeVersion('~0.10.0', function(err, v){
  console.log('~0.10.0 ->', v);
  // ~0.10.0 -> 0.10.30
});
```

## Install

```
npm install resolve-node-version
```

## Test

```
npm test
```

## License

MIT

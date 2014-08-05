var request = require('request'),
  semver = require('semver'),
  debug = require('debug')('resolve-node-version');

module.exports = function(want, fn){
  var matches,
    versions = [],
    re = /[0-9]+\.[0-9]+\.[0-9]+/g,
    version;

  request.get('http://nodejs.org/dist/', function(err, res){
    if(err) return fn(err);

    while ((matches = re.exec(res.body)) !== null){
      if(versions.indexOf(matches[0]) === -1){
        versions.push(matches[0]);
      }
    }
    versions.sort(semver.rcompare);
    versions = versions.filter(function(v){
      return semver.gte(v, '0.8.6');
    });

    var stable = versions.filter(function(v){
      return semver(v).minor % 2 === 0;
    });

    var unstable = versions.filter(function(v){
      return semver(v).minor % 2 !== 0;
    });

    if(want === 'stable'){
      version = stable[0];
    }
    else if(want === 'unstable' || want === 'latest'){
      version = unstable[0];
    }
    else {
      version = semver.maxSatisfying(versions, want);
    }
    debug('%s -> %s', want, version);
    fn(null, version);
  });
}

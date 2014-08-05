var assert = require('assert'),
  semver = require('semver'),
  resolveNodeVersion = require('./');

describe('node version', function(){
  var unstable, stable;

  it('should get stable', function(done){
    resolveNodeVersion('stable', function(err, v){
      assert.ifError(err);
      assert(semver(v).minor % 2 === 0);
      stable = v;
      done();
    });
  });

  it('should get unstable', function(done){
    resolveNodeVersion('unstable', function(err, v){
      assert.ifError(err);
      assert(semver(v).minor % 2 !== 0);
      unstable = v;
      done();
    });
  });

  it('should resolve latest to unstable', function(done){
    resolveNodeVersion('latest', function(err, v){
      assert.ifError(err);
      assert.equal(v, unstable);
      done();
    });
  });

  it('should resolve a semver range', function(done){
    resolveNodeVersion('~0.10.0', function(err, v){
      assert.ifError(err);
      assert(semver.gte(v, '0.10.30'));
      done();
    });
  });
});

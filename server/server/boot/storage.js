'use strict';

var path = require('path');

module.exports = function(app) {
  var ds = app.loopback.createDataSource({
    connector: require('loopback-component-storage'),
    provider: 'filesystem',
    root: path.join(__dirname, '../', 'storage'),

    // getFilename will be called multiple times for each "part" of the form upload
    getFilename: function(origFilename, req, res){
      // eslint-disable-next-line no-redeclare
      var origFilename = origFilename.name;
        // optimisticly get the extension
      // eslint-disable-next-line one-var
      var parts = origFilename.split('.'),
        extension = parts[parts.length - 1];

        // Using a local timestamp + user id in the filename (you might want to change this)
      // eslint-disable-next-line max-len
      var newFilename = Math.random().toString().substr(2) + '.' + extension;
      return newFilename;
    },
  });
  var container = ds.createModel('container');
  app.model(container);
};
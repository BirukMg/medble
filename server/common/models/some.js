'use strict';
var app = require('../../server/server');
var models = app.models;
var Container;
module.exports = function(Some) {
  Some.greet = function(req, res, cb) {
    console.log(req.files);
    // Container = models.Container;
    // Container.upload('post', req, res, function(err) {
    //   if (err) {
    //     console.log(err);
    //   }else{
    //     console.log('done')
    //   }
    // });
    // cb(null, 'Greetings... ' + msg);
    // app.post('/api/containers/post/upload', function(req, res) {
    //   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    //   let startup_image = req.files.file;

    //   // Use the mv() method to place the file somewhere on your server 
    //   startup_image.mv('../../server/storage/post', function(err) {
    //     if (err) {
    //       console.log(err);
    //     }else{
    //       console.log('cool');
    //     }
    //   });
    // })
  };

  Some.remoteMethod('greet', {
  accepts: [{
    arg: 'req',
    type: 'object',
    http: {
      source: 'req',
    },
  }, {
    arg: 'res',
    type: 'object',
    http: {
      source: 'res',
    },
  }],
    returns: {arg: 'data', type: 'obj'},
  });
};

'use strict';

var app = require('../../server/server');
var models = app.models;
var Account;
var Post;

module.exports = function(Employment) {
    Employment.postjob = function (req, res, cb) {
        Post = models.Post;
         var date = new Date();
        req.body.postData.post_date = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
        Post.create(req.body.postData, function (err, posteddata) {
            if (err) {
                cb(err)
            } else {
                Account = models.Account;
                req.body.jobData.post_id = posteddata.id;
                Employment.create(req.body.jobData, function (err, postedjob) {
                    if (err) {
                        cb(err)
                    } else {
                        Account.findById(req.body.postData.account_id, function (err, account) {
                            account.number_of_posts = account.number_of_posts + 1
                            return account.save(function (err, updatedaccount) {
                                cb(null, { posteddata, postedjob, updatedaccount });
                            })
                        })
                    }
                })
            }
        })
    }

    Employment.editemployment = function (req, res, cb) {
      console.log(req.body.postData.img);

      Post = models.Post;
      if (Array.isArray(req.body.postData.img) && req.body.postData.img.length == 0) {
        req.body.postData.img = null;
      }
      Post.upsert(req.body.postData, function (err, updatedData) {
        if (err) {
          console.log(err)
        } else {
          Employment.upsert(req.body.jobData, function (err, updatedVdata) {
            if (err) {
              cb(err)
            } else {
              cb(null, {
                status: 'Updated'
              })
            }
          })
        }
      })
    }

    Employment.remoteMethod('postjob', {
        accepts: [{ arg: 'req', type: 'object', http: { source: 'req' } }, { arg: 'res', type: 'object', http: { source: 'res' } }],
        returns: { arg: 'data', type: 'object' },
    });

    Employment.remoteMethod('editemployment', {
        accepts: [{ arg: 'req', type: 'object', http: { source: 'req' } }, { arg: 'res', type: 'object', http: { source: 'res' } }],
        returns: { arg: 'data', type: 'object' },
    });
};

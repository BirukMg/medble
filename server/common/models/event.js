'use strict';

var app = require('../../server/server');
var models = app.models;
var Account;
var Post;

module.exports = function(Event) {
    Event.postevent = function (req, res, cb) {
        Post = models.Post
         var date = new Date();
         req.body.postData.post_date = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
      Post.create(req.body.postData, function (err, posteddata) {
        if (err) {
          cb(err)
        } else {
          Account = models.Account;
          req.body.eventData.post_id = posteddata.id;
          Event.create(req.body.eventData, function (err, postedevent) {
            if (err) {
              cb(err)
            } else {
              Account.findById(req.body.postData.account_id, function (err, account) {
                account.number_of_posts = account.number_of_posts + 1
                return account.save(function (err, updatedaccount) {
                  cb(null, {
                    posteddata,
                    postedevent,
                    updatedaccount
                  });
                  // console.log(accountsave)
                })
              })
            }
          })
        }
      })
    }

    Event.editevent = function (req, res, cb) {
      console.log(req.body.postData.img);

      Post = models.Post;
      if (Array.isArray(req.body.postData.img) && req.body.postData.img.length == 0) {
        req.body.postData.img = null;
      }
      Post.upsert(req.body.postData, function (err, updatedData) {
        if (err) {
          console.log(err)
        } else {
          Event.upsert(req.body.eventData, function (err, updatedVdata) {
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

    Event.remoteMethod('postevent', {
        accepts: [{ arg: 'req', type: 'object', http: { source: 'req' } }, { arg: 'res', type: 'object', http: { source: 'res' } }],
        returns: { arg: 'data', type: 'object' },
    });
    Event.remoteMethod('editevent', {
        accepts: [{ arg: 'req', type: 'object', http: { source: 'req' } }, { arg: 'res', type: 'object', http: { source: 'res' } }],
        returns: { arg: 'data', type: 'object' },
    });
};

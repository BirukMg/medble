'use strict';

var app = require('../../server/server');
var models = app.models;
var Account;
var Post;

module.exports = function(House) {
    House.posthome = function (req, res, cb) {
        Post = models.Post;
        var date = new Date();
        req.body.postData.post_date = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
        Post.create(req.body.postData, function (err, posteddata) {
            if (err) {
                cb(err)
            } else {
                Account = models.Account;
                req.body.homeData.post_id = posteddata.id;
                House.create(req.body.homeData, function (err, postedhouse) {
                    if (err) {
                        cb(err)
                    } else {
                        Account.findById(req.body.postData.account_id, function (err, account) {
                            account.number_of_posts = account.number_of_posts + 1
                            return account.save(function (err, updatedaccount) {
                                cb(null, { posteddata, postedhouse, updatedaccount });
                                // console.log(accountsave)
                            })
                        })
                    }
                })
            }
        })
    }

    House.edithouse = function (req, res, cb) {
        console.log(req.body.postData.img);
        
        Post = models.Post;
        if (Array.isArray(req.body.postData.img) && req.body.postData.img.length == 0) {
            req.body.postData.img = null;
        }
        Post.upsert(req.body.postData, function(err, updatedData){
            if (err) {
                console.log(err)
            }else{
                House.upsert(req.body.houseData, function (err, updatedVdata) {
                    if(err){
                        cb(err)
                    }else{
                        cb(null, {status: 'Updated'})
                    }
                })
            }
        })
    }

    House.remoteMethod('posthome', {
        accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}, {arg: 'res', type: 'object', http: {source: 'res'}}],
        returns: {arg: 'data', type: 'object'},
    });
    House.remoteMethod('edithouse', {
        accepts: [{ arg: 'req', type: 'object', http: { source: 'req' } }, { arg: 'res', type: 'object', http: { source: 'res' } }],
        returns: { arg: 'data', type: 'object' },
    });
};

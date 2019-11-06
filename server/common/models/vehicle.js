'use strict';

var app = require('../../server/server');
var models = app.models;
var Account;
var Post;

module.exports = function(Vehicle) {
    Vehicle.postvehicle = function (req, res, cb) {
        Post = models.Post;
        var date = new Date();
        req.body.postData.post_date = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
        Post.create(req.body.postData, function (err, posteddata){
            if (err) {
                cb(err)
            } else {
                Account = models.Account;
                req.body.vehicleData.post_id = posteddata.id;
                Vehicle.create(req.body.vehicleData, function(err, postedvehicle){
                   if (err) {
                       cb(err)
                   } else {
                       Account.findById(req.body.postData.account_id, function (err, account) {
                           account.number_of_posts = account.number_of_posts + 1
                           return account.save(function (err, updatedaccount) {
                               cb(null, { posteddata, postedvehicle, updatedaccount });
                               // console.log(accountsave)
                           })
                       })
                   }
                })
            }
        })
    }
 
    Vehicle.editvehicle = function (req, res, cb) {
        Post = models.Post;
        if (req.body.postData.img != null && req.body.postData.img.length == 1 && req.body.postData.img[0] == "" || req.body.postData.img.length == 0) {
            req.body.postData.img = null;
        }
        Post.upsert(req.body.postData, function(err, updatedData){
            if (err) {
                console.log(err)
            }else{
                // console.log(updatedData)
                Vehicle.upsert(req.body.vehicleData, function(err, updatedVdata){
                    if(err){
                        cb(err)
                    }else{
                        cb(null, {status: 'Updated'})
                    }
                })
            }
        })
    }

    Vehicle.remoteMethod('postvehicle', {
        accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}, {arg: 'res', type: 'object', http: {source: 'res'}}],
        returns: {arg: 'data', type: 'object'},
    });

    Vehicle.remoteMethod('editvehicle', {
        accepts: [{ arg: 'req', type: 'object', http: { source: 'req' } }, { arg: 'res', type: 'object', http: { source: 'res' } }],
        returns: { arg: 'data', type: 'object' },
    });
};

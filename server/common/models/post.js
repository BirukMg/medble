'use strict';
var app = require('../../server/server');
var models = app.models;
var Account;
var Vehicle;
var House;
var Job;
var Event;

module.exports = function(Post) {
    Post.post = function(req, res, cb) {
        // console.log(req.body);
        Account = models.Account;
        var date = new Date();
        req.body.post_date = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
        Post.create(req.body, function(err, posteddata){
            if (err) {
                cb(err)
            } else {
                Account.findById(req.body.account_id, function(err, account){
                    account.number_of_posts = account.number_of_posts + 1
                    return account.save(function(err, updatedaccount) {
                      cb(null, {posteddata, updatedaccount});
                    // console.log(accountsave)
                    })
                })
            }
        })
        
    //   cb(null, msg);
    }

    Post.getpost = function (id,cb) {
        
        // console.log(id)
        Post.find({where:{account_id : id}, include: ['events', 'vehicles', 'houses', 'employments']}, function(err, postData){
            if (err) {
                console.log(err)
            }
            cb(null,postData)
        });
    };

    Post.deletepost = function(req, res, cb) {
        Post.destroyById(req.body.post_id, function (err, response){
            if (err) {
                cb(err)
            }else{
                switch (req.body.main_category) {
                    case 'employments':
                        Job = models.Employment;
                        Job.destroyAll({ where: { post_id: req.body.post_id } }, function (err, response2) {
                            if (err) {
                                cb(err)
                            } else {
                                cb(null,response2)
                            }
                        });
                        break;
                    case 'events':
                        Event = models.Event;
                        Event.destroyAll({ where: { post_id: req.body.post_id } }, function (err, response2) {
                            if (err) {
                                cb(err)
                            } else {
                                cb(null,response2)
                            }
                        });
                        break;
                    case 'houses':
                        House = models.House;
                        House.destroyAll({ where: { post_id: req.body.post_id } }, function (err, response2) {
                            if (err) {
                                cb(err)
                            } else {
                                cb(null,response2)
                            }
                        });
                        break;
                    case 'vehicles':
                        Vehicle = models.Vehicle;
                        Vehicle.destroyAll({ where: { post_id: req.body.post_id } }, function (err, response2) {
                            if (err) {
                                cb(err)
                            } else {
                                cb(null,response2)
                            }
                        });
                        break;
                    
                    default:
                        cb(null, response);
                        break;
                }
            }
        });
    };

    Post.remoteMethod('post', {
        accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}, {arg: 'res', type: 'object', http: {source: 'res'}}],
        returns: {arg: 'data', type: 'object'},
    });

    Post.remoteMethod('getpost', {
        accepts: [
            { arg: 'id', type: 'number', required: true }
        ],
        returns: { arg: 'data', type: 'object' },
        http: { "verb": "get", "path": "/:id/getpost"}
    });
    Post.remoteMethod('deletepost', {
        accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}, {arg: 'res', type: 'object', http: {source: 'res'}}],
        returns: {arg: 'data', type: 'object'},
    });
};

'use strict';
var app = require('../../server/server');
var models = app.models;
var Account;
var Post;
var Vehicle;
var House;
var Job;
var Event;

module.exports = function(Medbleuser) {
  Medbleuser.signin = function(req, res, cb) {
    // console.log(req.body);
    Account = models.Account;
    Medbleuser.login({username: req.body.username, password: req.body.password}, function(err, user){
        if (err) {
            cb(err);
        }else{
            Medbleuser.findById(user.userId, {include: ['accounts']}, function(err, account){
                if (err) {
                    cb(err);
                } else {
                    // console.log(account)
                    cb(null, {user, account});
                }
            })
        }
    })
  };

  Medbleuser.sociallogin = function(id, cb) {
    Account = models.Account;
    Account.findById(id, function(err, accountData){
      if (err) {
        console.log(err);
      } else {
        Medbleuser.login({username: accountData.username, password: accountData.password}, function(err, user){
          if (err) {
            console.log(err);
          } else {
            cb(null, {user, accountData});
          }
        }) 
      }
    })
  };

  Medbleuser.updateaccount = function(req, res, cb) {
    Account = models.Account;
    Medbleuser.upsert({id: req.body.userId, username: req.body.username, password: req.body.password}, function(err, user){
      if (err) {
        cb(err)
      }else{
        Account.upsert({id: req.body.account_id, username: req.body.username, password: req.body.password}, function(err, account){
          if(err){
            cb(err)
          }else{
            cb(null, account);
          }
        });
      }
    });
     
  };

    Medbleuser.deleteaccount = function(id, cb) {
        Account = models.Account;
        Medbleuser.destroyById(id, function(err, deletedUser){
          if (err) {
            console.log(err);
          } else {
            Account.destroyAll({medbleuser_id : id}, function(err, deletedAccount){
              if (err) {
                console.log(err);
              } else {
                cb(null, deletedAccount)
              }
            })
          }
        })
    };

  Medbleuser.deletewithposts = function (id, accountid, cb) {
    Account = models.Account;
    // deletePost(accountid);
    Medbleuser.destroyById(id,
    function(err, res) {
      if (err) {
        console.log(err);
      } else {
        Account.destroyById(accountid,
        function(err, accinfo){
          if (err) {
            console.log(err);
          } else {
            deletePost(accountid)
            .then(res => {
              cb(null, 'deleted');
            }).catch(err => cb(err));
          }
        });
      }
      
    });
  };
  var deletePost = function(id) {
    return new Promise((resolve, reject) => {
      Post = models.Post;
      Post.find({
          where: {
            account_id: id
          }
        },
        function (err, postData) {
          if (err) {
            console.log(err);
          } else {
            var itemsProcessed = 0;
            postData.forEach(element => {
              Post.destroyById(element.id, function (err, delinfo) {
                if (err) {
                  console.log(err);
                } else {
                  switch (element.main_category) {
                    case 'employments':
                      Job = models.Employment;
                      Job.destroyAll({
                        post_id: element.id
                      }, function (err, res) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log('del');
                        }
                      });
                      break;
                    case 'events':
                      Event = models.Event;
                      Event.destroyAll({
                        post_id: element.id
                      }, function (err, res) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log('del');
                        }
                      });
                      break;
                    case 'houses':
                      House = models.House;
                      House.destroyAll({
                        post_id: element.id
                      }, function (err, res) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log('del');
                        }
                      });
                      break;
                    case 'vehicles':
                      Vehicle = models.Vehicle;
                      Vehicle.destroyAll({
                        post_id: element.id
                      }, function (err, res) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log('del');
                        }
                      });
                      break;
                    default:
                      console.log('del all');
                      break;
                  }
                }
              });
              itemsProcessed = itemsProcessed + 1
              if (itemsProcessed === postData.length) {
                resolve('done');
              }
            });
          }
        });
    })
  }

  Medbleuser.remoteMethod('signin', {
    accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}, {arg: 'res', type: 'object', http: {source: 'res'}}],
    returns: {arg: 'data', type: 'object'},
  });

  Medbleuser.remoteMethod('updateaccount', {
    accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}, {arg: 'res', type: 'object', http: {source: 'res'}}],
    returns: {arg: 'data', type: 'object'},
  });

  Medbleuser.remoteMethod('deleteaccount', {
        accepts: [
            { arg: 'id', type: 'number', required: true }
        ],
        returns: { arg: 'data', type: 'object' },
        http: { "verb": "delete", "path": "/:id/deleteaccount"}
    });
  Medbleuser.remoteMethod('deletewithposts', {
      accepts: [
          { arg: 'id', type: 'number', required: true },
          { arg: 'accountid', type: 'number', required: true }
      ],
      returns: { arg: 'data', type: 'object' },
      http: { "verb": "delete", "path": "/:id/:accountid/deletewithposts"}
  });
  Medbleuser.remoteMethod('sociallogin', {
        accepts: [
            { arg: 'id', type: 'number', required: true }
        ],
        returns: { arg: 'data', type: 'object' },
        http: { "verb": "get", "path": "/:id/sociallogin"}
    });
};


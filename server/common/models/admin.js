'use strict';

var app = require('../../server/server');
var models = app.models;
var Permmision;

module.exports = function(Admin) {


    Admin.addadmin = function(req, res, cb){
        // console.log(req.body);
        Admin.create(req.body.admin, function(err, adminInfo){
            if (err) {
                if (err.details.messages.username != undefined && err.details.messages.username[0] == 'User already exists') {
                    cb('Username already taken');
                }else if(err.details.messages.email != undefined && err.details.messages.email[0] == 'Email already exists') {
                  cb('Email already used');
                }
            } else {
                req.body.permmision.admin_id = adminInfo.id;
                Permmision = models.Permmision
                Permmision.create(req.body.permmision, function(err, permmisionInfo){
                    if (err) {
                        console.log(err);
                    }else{
                        cb(null,{adminInfo, permmisionInfo})
                    }
                });
            }
        })
    }

    Admin.deleteadmin = function(adminid, permmisionid, cb){
        Admin.destroyById(adminid, function(err, adminDelInfo){
            if (err) {
                console.log(err);
            } else {
                Permmision = models.Permmision
                Permmision.destroyById(permmisionid, function(err, permmisionDelInfo){
                    if (err) {
                        console.log(err);
                    } else {
                        cb(null, permmisionDelInfo);
                    }
                });
            }
        });
    }

    Admin.signin = function(req, res, cb){
        // console.log(req.body);
        Admin.login(req.body, function(err, loginInfo){
            if (err) {
                cb(err);
            }else{
                // console.log(loginInfo);
                let fields = {
                    realm: false,
                    email: false,
                    password: false,
                    verificationToken: false,
                    emailVerified: false
                }
                Admin.findById(loginInfo.userId, {include: ['permmisions'], fields: fields}, function(err, adminInfo){
                    if (err) {
                        console.log(err);
                    } else {
                        cb(null, {loginInfo: loginInfo, adminInfo: adminInfo})
                    }
                })
                
            }
        })
    }

    Admin.updateprofile = function (req, res, cb) {
    //   console.log(req.body);
      if (req.body.password == ''){
          let data = {
              username: req.body.username,
              id: req.body.id
          }
          Admin.upsert(data,function(err, updateInfo){
              if (err) {
                cb(err);
              }else{
                  cb(null,updateInfo);
              }
          })
      }else{
          let data = {
            username: req.body.username,
            password: req.body.password,
            id: req.body.id
          }
          Admin.upsert(data, function (err, updateInfo) {
            if (err) {
              cb(err)
            } else {
              cb(null, updateInfo);
            }
          })
      }
    }

    Admin.remoteMethod('addadmin', {
        accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}, {arg: 'res', type: 'object', http: {source: 'res'}}],
        returns: {arg: 'data', type: 'object'},
    });

    Admin.remoteMethod('deleteadmin', {
        accepts: [
            { arg: 'adminid', type: 'number', required: true },
            { arg: 'permmisionid', type: 'number', required: true }
        ],
        returns: { arg: 'data', type: 'object' },
        http: { "verb": "delete", "path": "/:adminid/:permmisionid/deleteadmin"}
    });
    Admin.remoteMethod('signin', {
        accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}, {arg: 'res', type: 'object', http: {source: 'res'}}],
        returns: {arg: 'data', type: 'object'},
    });

     Admin.remoteMethod('updateprofile', {
        accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}, {arg: 'res', type: 'object', http: {source: 'res'}}],
        returns: {arg: 'data', type: 'object'},
    });
};

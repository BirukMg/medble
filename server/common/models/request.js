'use strict';

var app = require('../../server/server');
var models = app.models;
var Account;
var Post;
var async = require('async');


module.exports = function(Request) {


    Request.getRequest = function (id,cb) {
        Request.find({where:{post_id : id}}, function(err, reqData){
        if (err) {
            console.log(err)
        }
        // cb(null,postData)

         function callback(data) {
           cb(null,data);
         }
        var itemsProcessed = 0;
        var arry = []
        reqData.forEach(element => {
            Account = models.Account
            Account.find({where: {id : element.account_id},fields:{full_name:true, img: true}},function(err, accountData){
                arry.push({
                    id: element.id,
                    message: element.message,
                    status: element.status,
                    date: element.date,
                    user_name: accountData[0].full_name,
                    avatar: accountData[0].img
                })
                itemsProcessed = itemsProcessed + 1
                if (itemsProcessed === reqData.length) {
                  callback(arry);
                }
            });
            
        });
        
    });
    };

    Request.getmyrequest = function (id, cb) {
        Request.find({where : {account_id:id}},function(err, data){
            if (err) {
                console.log(err);
            }else{
                function callback(data) {
                  cb(null, data);
                }
                var itemsProcessed = 0;
                var arry = [];
                Post = models.Post
                data.forEach(element => {
                    Post.findById(element.post_id,{fields : {id: true, title: true, category: true, main_category: true}}, function(err, postData){
                        arry.push({
                            req_id: element.id,
                            message: element.message,
                            date: element.date,
                            status: element.status,
                            post_id: postData.id,
                            title: postData.title,
                            category: postData.category,
                            main_category: postData.main_category
                        })
                        itemsProcessed = itemsProcessed + 1
                        if (itemsProcessed === data.length) {
                          callback(arry);
                        }
                    })
                });
            }
        })
        
    };

    




    Request.remoteMethod('getRequest', {
        accepts: [
            { arg: 'id', type: 'number', required: true }
        ],
        returns: { arg: 'data', type: 'object' },
        http: { "verb": "get", "path": "/:id/getRequest"}
    });

    Request.remoteMethod('getmyrequest', {
        accepts: [
            { arg: 'id', type: 'number', required: true }
        ],
        returns: { arg: 'data', type: 'object' },
        http: { "verb": "get", "path": "/:id/getmyrequest"}
    });
};

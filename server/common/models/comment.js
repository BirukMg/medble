'use strict';

var app = require('../../server/server');
var models = app.models;
var Account;

module.exports = function(Comment) {

    Comment.getcomment = function(id,cb) {
        Comment.find({where: {post_id : id}}, function(err,commentData){
            if (err) {
                console.log(err);
            } else {
                function callback(data) {
                  cb(null, data);
                }
                var itemsProcessed = 0;
                var arry = [];
                commentData.forEach(element => {
                    Account = models.Account
                    Account.findById(element.user_id, { fields: { full_name: true, img: true } }, function (err, accountData) {
                        if (err) {
                            console.log(err);
                        } else {
                            arry.push({
                              id: element.id,
                              comment: element.comment,
                              date: element.date,
                              user_name: accountData.full_name,
                              avatar: accountData.img
                            })
                            itemsProcessed = itemsProcessed + 1
                            if (itemsProcessed === commentData.length) {
                              callback(arry);
                            }
                        }
                    })
                });
            }
        });
    };

    Comment.remoteMethod('getcomment', {
        accepts: [
            { arg: 'id', type: 'number', required: true }
        ],
        returns: { arg: 'data', type: 'object' },
        http: { "verb": "get", "path": "/:id/getcomment"}
    });
};

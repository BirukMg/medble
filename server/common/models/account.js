'use strict';
const nodemailer = require('nodemailer');
var mailer = require('nodemailer-promise');
var app = require('../../server/server');
var models = app.models;
var Account;
var Tempaccount;
var Medbleuser;
module.exports = function(Account) {
    function removeafterhour(id){
      Tempaccount = models.Tempaccount;
      Tempaccount.destroyById(id, function(err, delData){
        if (err) {
          console.log(err);
        }
        console.log(delData);
      });
    }
    Account.emailConf = async function(accountData, cb) {
      // console.log(accountData);
        var code = 'mdbl-' + Math.floor(Math.random() * (99999 + 1));
        var sendEmail = mailer.config({
            service: 'gmail',
            auth: {
              user: 'birukjr52@gmail.com', // generated ethereal user
              pass: 'bik@gmail' // generated ethereal password
            }
        });
        var message = {
          from: 'birukjr52@gmail.com',
          to: accountData.email,
          subject: 'Message title',
          text: 'Plaintext version of the message',
          html:  `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>

                <style>
                    .container{
                        padding: 2% 3%;
                        border-style: solid;
                        border-radius: 8px;
                        border-width: 1px;
                        border-color: gray;
                        width: 300px;
                        height: a0px;
                    }
                    .logo{
                        height: 100px;
                        width: 100px;
                        border-radius: 50%;
                        margin-left: 35%;
                        /* vertical-align: middle; */

                    }
                    .text-center {
                        text-align: center!important;
                        color: #a6c;
                        font-weight: 700;
                    }
                    .text-justify {
                        text-align: justify!important;
                        font-weight: 700;
                    }
                    .link{
                        font-weight: 700;
                        text-decoration: none;
                        color: blue
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <img class="logo" src="https://mdbootstrap.com/img/Photos/Others/men.jpg" alt="medble.com">
                    <h3 class="text-center">Welcome to <a href="https://mdbootstrap.com/img/Photos/Others" class="link">Medble.com</a></h3>
                    <p class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo praesentium tempora perspiciatis. Aut quibusdam, quia explicabo, iusto veritatis fugit ratione dolorum neque mollitia odit sapiente aperiam, atque optio eveniet dolores.</p>
                
                    <p> your confirmation code is ` + code + ` <a href = "http://localhost:8080/en/email confirmation?email=` + accountData.email + `"
                    class = "link"> Confirm here </a></p>
                </div>
            </body>
            </html>`
        };
        Account = models.Account;
        Account.count({email: accountData.email},function(err, countData){
          if (err) {
            console.log(err);
          } else {
            if (countData > 0) {
              // return cb(null,{msg: 'Email alredy in use'});
              console.log('max');
              
            }else{
              sendEmail(message)
              .then(function (info) {
                accountData.code = code;
                Tempaccount = models.Tempaccount;
                Tempaccount.create(accountData, function(err, tempData){
                  if (err) {
                    console.log(err);
                    
                  }else{
                    // cb(null,{msg: 'sent'});
                    console.log('sent');
                    
                    setTimeout(removeafterhour, 60000, tempData.id);
                  }
                });
              })
              .catch(function (err) {
                console.log('got error');
                console.log(err)
              });
            }
            
          }
        })
        
    }

    Account.countPost = function(id,cb){
      Account.find(function(err, accounts){
        cb(null, accounts);
      });
    }

    Account.emailverify = function (verifyData, cd){
      Tempaccount = models.Tempaccount;
      Medbleuser = models.Medbleuser;
      Tempaccount.find({where: {email: verifyData.email, code: verifyData.code}}, function(err, tempData){
        if (err) {
          console.log(err);
        } else {
          if (tempData.length <= 0) {
            console.log('exp');
          } else {
            delete tempData[0].code;
            Medbleuser.create({
              username: tempData[0].username,
              email: tempData[0].email,
              password: tempData[0].password
            },function(err, userData){
             if (err) {
               console.log(err);
             } else {
                tempData[0].medbleuser_id = userData.id;
                Account.create(tempData[0], function (err, accountData) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('done');
                  }
                })
             }
            })
          }
        }
      })
    }

    Account.remoteMethod('emailConf', {
        accepts: { arg: 'accountData', type: 'object' },
        returns: { arg: 'data', type: 'object' }
    });
    Account.remoteMethod('emailverify', {
      accepts: { arg: 'verifyData', type: 'object' },
      returns: { arg: 'data', type: 'object' }
    });
    Account.remoteMethod('countPost', {
        accepts: { arg: 'id', type: 'number' },
        returns: { arg: 'data', type: 'object' }
    });
};

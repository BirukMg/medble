'use strict';

var app = require('../../server/server');
var models = app.models;
var Account;
var Skill;
var Education;
var Experience;
var Interest;

module.exports = function(Resume) {

    var deleteResume = function(id){
      return new Promise(function(resolve, reject) {
        Skill = models.Skill;
        Education = models.Educationalinformation;
        Experience = models.Experienceinformation;
        Interest = models.Interest;
        Resume.destroyById(id, function(err, resumeDelInfo) {
          if (err) {
            console.log('resume err')
          } else {
            Education.destroyAll({resume_id: id}, function(err, eduDelInfo){
              if (err) {
                console.log('edu err')
              } else {
                Experience.destroyAll({resume_id: id}, function(err, expDelInfo){
                  if (err) {
                    console.log('exp err')
                  } else {
                    Interest.destroyAll({resume_id: id}, function(err, interestDelInfo){
                      if (err) {
                        console.log('int err')
                      } else {
                        Skill.destroyAll({resume_id: id}, function(err, skillDelInfo){
                          if (err) {
                            console.log('skill err')
                          } else {
                            resolve('delleted');
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      });
    }

    Resume.addresume = function (req, res, cb) {
    //   console.log(req.body.basic_information);
        
        Resume.create(req.body.basic_information, function(err, postedResume) {
            if (err) {
                cb(err)
            } else {
                Skill = models.Skill;
                Education = models.Educationalinformation;
                Experience = models.Experienceinformation;
                Interest = models.Interest;
                Account = models.Account
                req.body.skillData.forEach(element => {
                    element.resume_id = postedResume.id;
                    Skill.create(element, function(err, postedSkill){
                        if (err) {
                            cb(err)
                        }
                    });
                });

                req.body.educationData.forEach(element => {
                  element.resume_id = postedResume.id;
                  Education.create(element, function(err, postedEducation) {
                    if (err) {
                      cb(err)
                    }
                  });
                });

                req.body.experienceData.forEach(element => {
                  element.resume_id = postedResume.id;
                  Experience.create(element, function(err, postedExperience) {
                    if (err) {
                      cb(err);
                    }
                  });
                });

                req.body.interestData.forEach(element => {
                  element.resume_id = postedResume.id;
                  Interest.create(element, function(err, postedInterest) {
                    if (err) {
                      cb(err);
                    }
                  });
                });
                Account.findById(req.body.basic_information.account_id, function(err, account) {
                    account.number_of_posts = account.number_of_posts + 1;
                    account.resume = true;
                    return account.save(function(err, updatedaccount) {
                      cb(null, updatedaccount);
                    // console.log(accountsave)
                    })
                })
            }
        });
    }


    Resume.deleteresume = function (id, accountId, cb) {
      // console.log(id, accountId);
      deleteResume(id).then(res => {
        Account = models.Account;
        Account.upsert({id: accountId, resume: false}, function(err, updateInfo) {
          if (err) {
            console.log(null, err);
          } else {
            cb(null, updateInfo);
          }
        });
      }).catch(err => console.log(null, err));
    }

    Resume.remoteMethod('addresume', {
        accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}, {arg: 'res', type: 'object', http: {source: 'res'}}],
        returns: {arg: 'data', type: 'object'},
    });

    Resume.remoteMethod('deleteresume', {
        accepts: [
            { arg: 'id', type: 'number', required: true },
            { arg: 'accountId', type: 'number', required: true }
        ],
        returns: { arg: 'data', type: 'object' },
        http: { "verb": "delete", "path": "/:id/:accountId/deleteresume"}
    });
};

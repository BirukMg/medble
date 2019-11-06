<template>
  <div>
    <div v-if="JSON.parse(this.$store.state.account).resume">
      <h5 class="font-weight-bold text-warning">You alredy have a resume <a href="">click here</a> to manage.</h5>
    </div>
    <div v-if="!JSON.parse(this.$store.state.account).resume">
      <h6>{{$t('post.category')}}: <span class="text-secondary font-weight-bold">{{$t('category.resume.aplly')}} ({{$t('category.resume.' + item.toLowerCase())}})</span></h6>
      <v-stepper v-model="e1">
     <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
        {{ snackbar.text}}
        <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
      </v-snackbar>
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">{{$t('post.resume.basicinformation.personalinfo')}}</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">{{$t('post.resume.educationalinformation.educationalinfo')}}</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3">{{$t('post.resume.experienceinformation.experienceinfo')}}</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 4" step="4">{{$t('post.resume.skill')}}</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="5">{{$t('post.resume.interest')}}</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="white" height="auto">
            <div class="comtainer">
              <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg"/>
              <img :src="addImgData.preview" class="rounded-circle resume-pic" alt="Resume picture" @click="$refs.pickAddImg.click()">
                <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                        <mdb-input type="text" :label="$t('post.resume.basicinformation.firstname')" v-model="basic_information.first_name" outline size="sm"/>
                    </div>
                     <div class="form-group">
                        <mdb-input type="number" :label="$t('post.resume.basicinformation.phonenumber')" v-model="basic_information.phone_number" outline size="sm"/>
                    </div>
                     <div class="form-group">
                        <mdb-input type="text" :label="$t('post.resume.basicinformation.country')" v-model="basic_information.country" outline size="sm"/>
                    </div>
                     <div class="form-group">
                        <mdb-input type="text" :label="$t('post.resume.basicinformation.address')" v-model="basic_information.address" outline size="sm"/>
                    </div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                     <div class="form-group">
                        <mdb-input type="text" :label="$t('post.resume.basicinformation.lastname')" v-model="basic_information.last_name" outline size="sm"/>
                    </div>
                     <div class="form-group">
                        <mdb-input type="email" :label="$t('post.resume.basicinformation.email')" v-model="basic_information.email" outline size="sm"/>
                    </div>
                     <div class="form-group">
                        <mdb-input type="text" :label="$t('post.resume.basicinformation.city')" v-model="basic_information.city" outline size="sm"/>
                    </div>
                    <div class="form-group">
                        <mdb-input type="textarea" :row="3" :label="$t('post.resume.basicinformation.about')" v-model="basic_information.about" outline size="sm"/>
                    </div>
                </div>
            </div>
            </div>
        </v-card>
        <button type="button" class="btn btn-outline-primary btn-sm" @click="handleStepOne">{{$t('post.resume.next')}}</button>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="white" height="auto">
            <div class="comtainer">
                <div v-for="i in educationData" :key="i">
                  <h5 class="float-right" style="cursor: pointer; margin-top: 10px" @click="deleteArry(i,educationData)"><i class="fa fa-times text-danger"></i></h5>
                  <div class="row border-light border-bottom">
                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <mdb-input type="text" disabled :label="$t('post.resume.educationalinformation.studyprogram')" v-model="i.study_program" outline size="sm"/>
                        </div>
                        <div class="form-group">
                            <mdb-input type="text" disabled :label="$t('post.resume.educationalinformation.country')" v-model="i.country" outline size="sm"/>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <v-menu v-model="modalStart" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="i.start_date" disabled :label="$t('post.resume.educationalinformation.startdate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="i.start_date" @input="modalStart = false"></v-date-picker>
                                </v-menu>
                            </div>
                            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <v-menu v-model="modalEnd" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                                  <template v-slot:activator="{ on }">
                                    <v-text-field v-model="i.end_date" disabled :label="$t('post.resume.educationalinformation.enddate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="i.end_date" @input="modalEnd = false"></v-date-picker>
                                </v-menu>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <mdb-input type="text" disabled :label="$t('post.resume.educationalinformation.institution')" v-model="i.institution" outline size="sm"/>
                        </div>
                        <div class="form-group">
                            <mdb-input type="text" disabled :label="$t('post.resume.educationalinformation.city')" v-model="i.city" outline size="sm"/>
                        </div>
                        <div class="form-group">
                            <mdb-input type="email" disabled :label="$t('post.resume.educationalinformation.gpa')" v-model="i.gpa" outline size="sm"/>
                        </div>
                    </div>
                </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="form-group">
                          <mdb-input type="text" :label="$t('post.resume.educationalinformation.studyprogram')" v-model="educational_information.study_program" outline size="sm"/>
                      </div>
                      <div class="form-group">
                          <mdb-input type="text" :label="$t('post.resume.educationalinformation.country')" v-model="educational_information.country" outline size="sm"/>
                      </div>
                      <div class="row">
                          <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <v-menu v-model="modalStart" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                                <template v-slot:activator="{ on }">
                                  <v-text-field v-model="educational_information.start_date" :label="$t('post.resume.educationalinformation.startdate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="educational_information.start_date" @input="modalStart = false"></v-date-picker>
                              </v-menu>
                          </div>
                          <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                              <v-menu v-model="modalEnd" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                                <template v-slot:activator="{ on }">
                                  <v-text-field v-model="educational_information.end_date" :label="$t('post.resume.educationalinformation.enddate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="educational_information.end_date" @input="modalEnd = false"></v-date-picker>
                              </v-menu>
                          </div>
                      </div>
                      <button type="button" class="btn btn-outline-primary btn-sm float-left" @click="handleStepTwo">{{$t('post.resume.add')}}</button>
                  </div>
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="form-group">
                          <mdb-input type="text" :label="$t('post.resume.educationalinformation.institution')" v-model="educational_information.institution" outline size="sm"/>
                      </div>
                      <div class="form-group">
                          <mdb-input type="text" :label="$t('post.resume.educationalinformation.city')" v-model="educational_information.city" outline size="sm"/>
                      </div>
                      <div class="form-group">
                          <mdb-input type="number" :label="$t('post.resume.educationalinformation.gpa')" v-model="educational_information.gpa" outline size="sm"/>
                      </div>
                  </div>
                </div>
            </div>
        </v-card>

        <button type="button" class="btn btn-outline-primary btn-sm" @click="e1 = e1 - 1">{{$t('post.resume.back')}}</button>
        <button type="button" class="btn btn-outline-primary btn-sm" @click="e1 = e1 + 1">{{$t('post.resume.next')}}</button>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="white" height="auto">
            <div class="comtainer">
                <div v-for="i in experienceData" :key="i">
                  <h5 class="float-right" style="cursor: pointer; margin-top: 10px" @click="deleteArry(i,experienceData)"><i class="fa fa-times text-danger"></i></h5>
                  <div class="row border-light border-bottom">
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <mdb-input type="text" disabled :label="$t('post.resume.experienceinformation.position')" v-model="i.position" outline size="sm"/>
                    </div>
                    <div class="form-group">
                      <mdb-input type="text" disabled :label="$t('post.resume.experienceinformation.country')" v-model="i.country" outline size="sm"/>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <v-menu v-model="modalStart2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                              <template v-slot:activator="{ on }">
                                <v-text-field v-model="i.start_date" disabled :label="$t('post.resume.experienceinformation.startdate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="i.start_date" @input="modalStart2 = false"></v-date-picker>
                            </v-menu>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <v-menu v-model="modalEnd2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                              <template v-slot:activator="{ on }">
                                <v-text-field v-model="i.end_date" disabled :label="$t('post.resume.experienceinformation.enddate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="i.end_date" @input="modalEnd2 = false"></v-date-picker>
                            </v-menu>
                        </div>
                    </div>
                    <div class="form-group">
                        <mdb-input type="textarea" :row="3" disabled :label="$t('post.resume.experienceinformation.tasks')" v-model="i.tasks" outline size="sm"/>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="form-group">
                          <mdb-input type="text" disabled :label="$t('post.resume.experienceinformation.workplace')" v-model="i.work_place" outline size="sm"/>
                      </div>
                      <div class="form-group">
                          <mdb-input type="text" disabled :label="$t('post.resume.experienceinformation.city')" v-model="i.city" outline size="sm"/>
                      </div>
                      <div class="form-group">
                          <mdb-input type="textarea" :row="3" disabled :label="$t('post.resume.experienceinformation.companydescription')" v-model="i.company_description" outline size="sm"/>
                      </div>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <mdb-input type="text" disabled :label="$t('post.resume.experienceinformation.contactperson')" v-model="i.contact_person" outline size="sm" style="margin-top: 0; height: 20px"/>
                        </div>
                        <mdb-input type="text" disabled :label="$t('post.resume.experienceinformation.contactinformation')" v-model="i.contact_information" outline size="sm" style="margin-top: 0; height: 20px"/>
                      </div>
                  </div>
                </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <mdb-input type="text" :label="$t('post.resume.experienceinformation.position')" v-model="experience_information.position" outline size="sm"/>
                    </div>
                    <div class="form-group">
                      <mdb-input type="text" :label="$t('post.resume.experienceinformation.country')" v-model="experience_information.country" outline size="sm"/>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <v-menu v-model="modalStart2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                              <template v-slot:activator="{ on }">
                                <v-text-field v-model="experience_information.start_date" :label="$t('post.resume.experienceinformation.startdate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="experience_information.start_date" @input="modalStart2 = false"></v-date-picker>
                            </v-menu>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <v-menu v-model="modalEnd2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                              <template v-slot:activator="{ on }">
                                <v-text-field v-model="experience_information.end_date" :label="$t('post.resume.experienceinformation.enddate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="experience_information.end_date" @input="modalEnd2 = false"></v-date-picker>
                            </v-menu>
                        </div>
                    </div>
                    <div class="form-group">
                        <mdb-input type="textarea" :row="3" :label="$t('post.resume.experienceinformation.tasks')" v-model="experience_information.tasks" outline size="sm"/>
                    </div>
                    <button type="button" class="btn btn-outline-primary btn-sm float-left" @click="handleStepThree">{{$t('post.resume.add')}}</button>
                  </div>
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="form-group">
                          <mdb-input type="text" :label="$t('post.resume.experienceinformation.workplace')" v-model="experience_information.work_place" outline size="sm"/>
                      </div>
                      <div class="form-group">
                          <mdb-input type="text" :label="$t('post.resume.experienceinformation.city')" v-model="experience_information.city" outline size="sm"/>
                      </div>
                      <div class="form-group">
                          <mdb-input type="textarea" :row="3" :label="$t('post.resume.experienceinformation.companydescription')" v-model="experience_information.company_description" outline size="sm"/>
                      </div>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <mdb-input type="text" :label="$t('post.resume.experienceinformation.contactperson')" v-model="experience_information.contact_person" outline size="sm" style="margin-top: 0; height: 20px"/>
                        </div>
                        <mdb-input type="text" :label="$t('post.resume.experienceinformation.contactinformation')" v-model="experience_information.contact_information" outline size="sm" style="margin-top: 0; height: 20px"/>
                      </div>
                  </div>
                </div>
            </div>
        </v-card>

        <button type="button" class="btn btn-outline-primary btn-sm" @click="e1 = e1 - 1">{{$t('post.resume.back')}}</button>
        <button type="button" class="btn btn-outline-primary btn-sm" @click="e1 = e1 + 1">{{$t('post.resume.next')}}</button>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card
          class="mb-12"
          color="white"
          height="auto"
        >
          <div class="row" v-for="i in skillData" :key="i">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <h2 style="width: 100%"><span class="badge badge-pill badge-info" style="width: 100%">{{i.name}}</span></h2>
            </div>
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <div class="row">
                <v-rating v-model="i.value" empty-icon="star_border" full-icon="star"></v-rating>
              </div>
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <div class="row">
                <h5 style="cursor: pointer; margin-top: 10px" @click="deleteArry(i,skillData)"><i class="fa fa-times text-danger"></i></h5>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <mdb-input type="text" :label="$t('post.resume.skill')" v-model="skill.name" outline size="sm"/>
              <button type="button" class="btn btn-outline-primary btn-sm float-left" @click="addSkill">{{$t('post.resume.add')}}</button>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div class="row">
                <v-rating v-model="skill.value" empty-icon="star_border" full-icon="star" style="margin-top: 15px"></v-rating>
              </div>
            </div>
          </div>
        </v-card>

        <button type="button" class="btn btn-outline-primary btn-sm" @click="e1 = e1 - 1">{{$t('post.resume.back')}}</button>
        <button type="button" class="btn btn-outline-primary btn-sm" @click="e1 = e1 + 1">{{$t('post.resume.next')}}</button>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card
          class="mb-12"
          color="white"
          height="auto"
        >
          <div class="container">
            <div class="row">
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6" v-for="i in interestData" :key="i">
                <h4 style="width: 100%"><span class="badge badge-pill badge-info" style="width: 100%;">{{i.interestValue}} <span class="float-right" style="cursor: pointer; font-size: 17px;" @click="deleteArry(i, interestData)"><i class="fa fa-times text-danger"></i></span></span></h4>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <mdb-input type="text" :label="$t('post.resume.skill')" v-model="interestValue" outline size="sm" style="margin-top: 0; height: 20px"/>
                <button type="button" class="btn btn-outline-primary btn-sm float-left" @click="addInterest">{{$t('post.resume.add')}}</button>
              </div>
            </div>
          </div>
        </v-card>

       <button type="button" class="btn btn-outline-primary btn-sm" @click="e1 = e1 - 1">{{$t('post.resume.back')}}</button>
        <button type="button" class="btn btn-outline-primary btn-sm" @click="addResume">{{$t('post.post')}}</button>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
    </div>
  </div>
</template>
<script>
  import {mdbInput} from 'mdbvue'
  import axios from 'axios'
  export default {
    props: ['item'],
    components :{
        mdbInput
    },
    data () {
      return {
        rating: 0,
        modalStart: false,
        modalEnd: false,
        modalStart2: false,
        modalEnd2: false,
        snackbar: {
          snackbar: false,
          text: '',
          color: '',
          timeout: 0
        },
        passed: {
          stepOne: false,
          stepTwo: false,
          stepThree: false,
          stepFour: false,
          stepFive: false,
        },
        passedOne: false,
        passedTwo: false,
        passedThree: false,
        passedFour: false,
        passedFive: false,
        e1: 1,
        resumeData: {
            start_date: '',
            end_date: ''
        },
        basic_information : {
          first_name: '',
          last_name: '',
          phone_number: '',
          email: '',
          country: '',
          city: '',
          address: '',
          about: '',
          category: this.item,
          img: null,
          account_id: JSON.parse(this.$store.state.account).id
        },
        educational_information: {
          study_program: '',
          institution: '',
          country: '',
          city: '',
          start_date: '',
          end_date: '',
          gpa: 0
        },
        educationData: [],
        experience_information: {
          position: '',
          work_place: '',
          country: '',
          city: '',
          start_date:'',
          end_date: '',
          company_description: '',
          tasks: '',
          contact_person: '',
          contact_information: ''
        },
        experienceData:[],
        skill: {
          name: 'lo',
          value: 1
        },
        interestValue: '',
        skillData: [],
        interestData: [],
        addImgData: {
          selectedImg: null,
          progress: 0,
          msg:'Upload',
          preview: require('../../../../assets/img/img(31).jpg'),
          show: false
        }
      }
    },
    mounted() {
      
    },
    methods: {
      handleStepOne(){
        this.checkEmpty(this.basic_information)
        if (this.passed) {
          this.e1 = this.e1 + 1
        }
      },
      handleStepTwo(){
        this.checkEmpty(this.educational_information)
        if (this.passed) {
          this.educationData.push({
            study_program: this.educational_information.study_program,
            institution: this.educational_information.institution,
            country: this.educational_information.country,
            city: this.educational_information.city,
            start_date: this.educational_information.start_date,
            end_date: this.educational_information.end_date,
            gpa: this.educational_information.gpa
          })
        }
      },
      handleStepThree(){
        this.checkEmpty(this.experience_information)
        if (this.passed) {
          this.experienceData.push({
            position: this.experience_information.position,
            work_place: this.experience_information.work_place,
            country: this.experience_information.country,
            city: this.experience_information.city,
            start_date: this.experience_information.start_date,
            end_date: this.experience_information.end_date,
            company_description: this.experience_information.company_description,
            tasks: this.experience_information.tasks,
            contact_person: this.experience_information.contact_person,
            contact_information: this.experience_information.contact_information
          })
        }
      },
      addSkill(){
        if (this.skill.name == '') {
          
        }else{
          this.skillData.push({
            name: this.skill.name,
            value: this.skill.value
          })
        }
      },
      addInterest(){
        if (this.interestValue == '') {
          
        }else{
          this.interestData.push({interestValue:this.interestValue})
        }
      },
      deleteArry(index, arry){
        arry.splice(arry.indexOf(index),1)
      },
      onAddImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.snackbar.snackbar = true
          this.snackbar.text = this.$t('post.selectimg')
          this.snackbar.color = 'red darken-2'
          this.snackbar.timeout = 3000
        }else{
          this.addImgData.selectedImg = e.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[0])
          reader.onload = event => {
            this.addImgData.preview = event.target.result
          }
        }
      },
      checkEmpty(obj){
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] == '' && key != 'email') {
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('post.resume.req.' + key.replace(/_/g, '') + "req")
                this.snackbar.color = 'red darken-2'
                this.passed = false
                break
            }else if (key == 'email' && obj[key] != '' && !this.validateEmail(obj[key])) {
              this.snackbar.snackbar = true
                this.snackbar.text = this.$t('post.resume.req.emailinvalid')
                this.snackbar.color = 'red darken-2'
                this.passed = false
                break
            }else {
              this.passed = true
            }
          }
        }
      },
      addResume(){
        if (this.addImgData.selectedImg == null) {
          this.snackbar.snackbar = true
          this.snackbar.text = this.$t('post.wait')
          this.snackbar.color = 'blue darken-2'
          this.snackbar.timeout = 0
          axios.post(this.$store.state.server_ip +'/api/resumes/addresume', {
            basic_information: this.basic_information, 
            educationData: this.educationData, 
            experienceData: this.experienceData, 
            skillData: this.skillData, 
            interestData: this.interestData
          }).then(res=> {
            this.$store.dispatch('updateAccount', res.data.data)
            .then(res => {
              this.snackbar.snackbar = false
              this.snackbar.snackbar = true
              this.snackbar.text = this.$t('post.success')
              this.snackbar.color = 'green darken-2'
              this.snackbar.timeout = 3000
            })
          }).catch(err => {
            if (err.message == 'Network Error') {
              this.snackbar.snackbar = false
              this.snackbar.snackbar = true
              this.snackbar.text = this.$t('post.networkerr')
              this.snackbar.color = 'red darken-2'
              this.snackbar.timeout = 3000
            }else{
              this.snackbar.snackbar = false
              this.snackbar.snackbar = true
              this.snackbar.text = this.$t('post.somethingwrong')
              this.snackbar.color = 'red darken-2'
              this.snackbar.timeout = 3000
            }
          })
        } else {
          let formData = new FormData();
          formData.append('file',this.addImgData.selectedImg)
          axios.post(this.$store.state.server_ip +'/api/containers/post/upload',formData,{
            onUploadProgress: uploadEvent => {
              this.snackbar.snackbar = true
              this.snackbar.text = this.$t('post.wait')
              this.snackbar.color = 'blue darken-2'
              this.snackbar.timeout = 0
            }
          }).then(res => {
            this.basic_information.img = res.data.result.files.file[0].name
            axios.post(this.$store.state.server_ip +'/api/resumes/addresume', {
            basic_information: this.basic_information, 
            educationData: this.educationData, 
            experienceData: this.experienceData, 
            skillData: this.skillData, 
            interestData: this.interestData
            }).then(res=> {
              this.$store.dispatch('updateAccount', res.data.data)
              .then(res => {
                this.snackbar.snackbar = false
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('post.success')
                this.snackbar.color = 'green darken-2'
                this.snackbar.timeout = 3000
              })
            }).catch(err => {
              if (err.message == 'Network Error') {
                this.snackbar.snackbar = false
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('post.networkerr')
                this.snackbar.color = 'red darken-2'
                this.snackbar.timeout = 3000
              }else{
                this.snackbar.snackbar = false
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('post.somethingwrong')
                this.snackbar.color = 'red darken-2'
                this.snackbar.timeout = 3000
              }
            })
          }).catch(err => {
              if (err.message == 'Network Error') {
                this.snackbar.snackbar = false
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('post.networkerr')
                this.snackbar.color = 'red darken-2'
                this.snackbar.timeout = 3000
              }else{
                this.snackbar.snackbar = false
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('post.somethingwrong')
                this.snackbar.color = 'red darken-2'
                this.snackbar.timeout = 3000
              }
            })
        }
      },
      validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      },
      isFileImage(file) {
          return file && file['type'].split('/')[0] === 'image';
      }
    },
  }
</script>
<style scoped>
  .resume-pic{
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
</style>

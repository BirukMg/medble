<template>
    <!-- <v-app> -->
      <div class="container">
        <section>
          <div>
             <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
                {{ snackbar.text}}
                <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
              </v-snackbar>
            <div class="row">
            <div class="col-6">
              <h6 style="float: left" class="font-weight-bold">{{$t('post.category')}}: <span class="text-secondary font-weight-bold text-capitalize">{{$t('category.employments.' + 'employments'.toUpperCase())}} ({{$t('category.employments.' + postData.category.toLowerCase())}})</span></h6>
              <div class="form-group">
                <mdb-input type="text" :label="$t('post.title')" v-model="postData.title" outline size="sm"/>
              </div>
              <div class="form-group">
                <mdb-input type="textarea" :label="$t('post.description')" :row="4" v-model="postData.description" outline size="sm"/>
              </div>
               <div class="form-group">
                  <mdb-input type="number" :label="$t('post.phonenumber')" v-model="postData.phone_number" outline size="sm"/>
                </div>
                <div class="form-group">
                  <label for="category" style="float: left">{{$t('post.Select category')}}</label>
                  <select id="category" class="browser-default custom-select custom-select-sm" v-model="postData.category">
                    <option v-for="(i,index) in employments" :key="i" :value="employments[index]">{{$t('category.employments.' + i.toLowerCase())}}</option>
                  </select>
                </div>
              <div class="form-group">
                <label for="state" style="float: left">{{$t('post.city')}}</label>
                <select id="state" class="browser-default custom-select custom-select-sm"  v-model="postData.city">
                  <option value="Addis Ababa">{{$t('post.citylist.Addis Ababa')}}</option>
                  <option value="Adama | Nazreth">{{$t('post.citylist.Adama | Nazreth')}}</option>
                  <option value="Arba Minch">{{$t('post.citylist.Arba Minch')}}</option>
                  <option value="Bahir Dar">{{$t('post.citylist.Bahir Dar')}}</option>
                  <option value="Debre Zeit | Bishoftu">{{$t('post.citylist.Debre Zeit | Bishoftu')}}</option>
                  <option value="Dessie">{{$t('post.citylist.Dessie')}}</option>
                  <option value="Dire Dawa">{{$t('post.citylist.Dire Dawa')}}</option>
                  <option value="Gonder">{{$t('post.citylist.Gonder')}}</option>
                  <option value="Hawassa">{{$t('post.citylist.Hawassa')}}</option>
                  <option value="Mekelle">{{$t('post.citylist.Mekelle')}}</option>
                  <option value="Shashemene">{{$t('post.citylist.Shashemene')}}</option>
                  <option value="Others">{{$t('post.citylist.Other')}}</option>
                </select>
              </div>
              <div class="form-group">
                <mdb-input type="text" :label="$t('post.employment.companyname')" v-model="jobData.company_name" outline size="sm"/>
              </div>
              <div class="form-group">
                <mdb-input type="text" :label="$t('post.employment.jobposition')" v-model="jobData.job_position" outline size="sm"/>
              </div>
          </div>
          <div class="col-6">
            <div class="form-group">
                <mdb-input type="textarea" :label="$t('post.employment.jobdescription')" :row="4" v-model="jobData.job_description" outline size="sm"/>
              </div>
            <div class="form-group">
                <label for="state" style="float: left">{{$t('post.employment.qualification')}}</label>
                <select id="state" class="browser-default custom-select custom-select-sm" v-model="jobData.qualification">
                  <option value="certificate">{{$t('post.employment.certificate')}}</option>
                  <option value="diploma">{{$t('post.employment.diploma')}}</option>
                  <option value="dgree">{{$t('post.employment.dgree')}}</option>
                  <option value="mastret">{{$t('post.employment.mastret')}}</option>
                  <option value="phd">{{$t('post.employment.phd')}}</option>
                  <option value="others">{{$t('post.employment.others')}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="state" style="float: left">{{$t('post.employment.experience')}}</label>
                <select id="state" class="browser-default custom-select custom-select-sm" v-model="jobData.experience">
                  <option>{{$t('post.employment.freshgraduate')}}</option>
                  <option>1 - 2 {{$t('post.employment.year')}}</option>
                  <option>3 - 5 {{$t('post.employment.year')}}</option>
                  <option>6 - 7 {{$t('post.employment.year')}}</option>
                  <option>8 - 10 {{$t('post.employment.year')}}</option>
                  <option>+10 {{$t('post.employment.year')}}</option>
                </select>
              </div>
              <div class="row">
              <div class="col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                       <select class="custom-select custom-select-sm" outline v-model="jobData.currency">
                          <option value="birr">{{$t('post.birr')}}</option>
                          <option>$</option>
                          <option>‎€</option>
                          <option>£</option>
                        </select>
                  </div>
                  <mdb-input type="number" :label="$t('post.employment.salary')" v-model="jobData.salary" outline size="sm" style="margin-top: 0; height: 20px"/>
                  <div class="input-group-append">
                    <select class="custom-select custom-select-sm" v-model="jobData.job_type">
                      <option value="Full name">{{$t('post.employment.Full time')}}</option>
                      <option value="Part time">{{$t('post.employment.Part time')}}</option>
                      <option value="Contart">{{$t('post.employment.Contrat')}}</option>
                      <option value="Internship">{{$t('post.employment.Internship')}}</option>
                      <option value="Seasonal">{{$t('post.employment.Seasonal')}}</option>
                      <option value="Employe's choise">{{$t('post.employment.Employe choise')}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
                <v-dialog v-model="job_deadline" :return-value.sync="jobData.deadline_date" persistent full-width width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="jobData.deadline_date" :label="$t('post.employment.jobdeadline')" prepend-icon="event" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="jobData.deadline_date" scrollable>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="job_deadline = false">{{$t('post.ok')}}</v-btn>
                  </v-date-picker>
                </v-dialog>
              </div>
            <div class="img-content">
              <div class="img-list" v-if="addImgData.preview != ''">
                <div class="row">
                  <div class="col-2">
                    <img :src="addImgData.preview" class="float-left selected-img rounded" alt="..." @dblclick="removeImg(index)">
                  </div>
                </div>
                <span style="float: left" v-if="addImgMsg.show"><p class="text-primary">{{$t('post.removeimg')}}</p></span>
              </div>
              <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg"/>
              <mdb-btn color="primary" class="add-img-btn" size="sm" @click="$refs.pickAddImg.click()"><mdb-icon icon="plus" class="mr-1"/> {{$t('post.addimg')}}</mdb-btn>
            </div>
          </div>
          </div>
          <button type="button" style="width: 50%" class="btn btn-outline-primary btn-sm waves-effect" @click="update">{{$t('managment.Save changes')}}</button>
          </div>
        </section>
    </div>
    <!-- </v-app> -->
</template>
<script>
import {mdbIcon, mdbBtn, mdbInput} from 'mdbvue'
import axios from 'axios'
export default {
    props: ['item'],
    components:{
      mdbIcon, mdbBtn, mdbInput
    },
    data() {
    return {
      snackbar: {
        snackbar: false,
        text: '',
        color: '',
        timeout: 0
      },
      passed: false,
      userId: '',
      add: '',
      addImgMsg: {
        title: '',
        styles: '',
        show: false
      },
      postData:{},
      job_deadline: false,
      jobData: {},
      postMsg: {
        title: '',
        styles: '',
        show: false
      },
      addImgData: {
          selectedImg: null,
          progress: 0,
          msg:'Upload',
          preview: '',
          show: false
        },
     employments:["Accounting",
          "Adminstrative & office jobs",
          "Advertising & Marketing jobs",
          "Arts, media & Designen jobs",
          "Biothecnology & pharmaceuticals",
          "Community, social Service & nonprofit",
          "Construction, mining & Trades",
          "Educations, Training & library",
          "Employment placement Agencies",
          "Enginneering",
          "Finanicial & Banking",
          "General Labor",
          "Goverment",
          "Hotels&hospitality",
          "Human Resources(HR)",
          "information Technology(IT)",
          "installation,maintenance & Repair",
          "insurance",
          "internet & ecommerce",
          "Law enforcement & security",
          "Legal & paralegal",
          "Medical & helthcare",
          "Others",
          "Personal Care,spas & fitness",
          "Professional Services",
          "Real Estate",
          "Resturant & Beverage",
          "Retail & Wholesale",
          "sales",
          "Science",
          "Sports & recreation",
          "Telecommunications",
          "Television ,film&Entertainment",
          "Trensportation"]
     }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
        let filter = {
          include : ['employments']
        }
        axios.get(this.$store.state.server_ip  + '/api/posts/' + this.item +'?filter='+ JSON.stringify(filter))
        .then(res => {
          this.postData = Object.assign({}, res.data)
          this.jobData = Object.assign({}, res.data.employments)
          delete this.postData.employments
          delete this.postData.price
          if (this.postData.img == null) {

          }else{
            this.addImgData.preview = this.$store.state.server_ip + '/api/containers/post/download/' + this.postData.img
          }
        })
      },
    onAddImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.snackbar.snackbar = true
          this.snackbar.text = this.$t('post.selectimg')
          this.snackbar.color = 'red darken-2'
          this.snackbar.timeout = 3000
        }else{
          this.addImgMsg.show = true
          this.addImgData.selectedImg = e.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[0])
          reader.onload = event => {
            this.addImgData.preview = event.target.result
          }
        }
      },
      isFileImage(file) {
          return file && file['type'].split('/')[0] === 'image';
      },
      removeImg(img,index){
        if (this.addImgData.preview.substring(0,4) == 'http') {
          this.postData.img = null
          this.addImgData.preview = ''
        }else{
          this.addImgData.selectedImg = null
          this.addImgData.preview = ''
        }
      },
      update(){
        this.checkEmptyJob(this.jobData)
        this.checkEmpty(this.postData)
        if (this.passVec && this.passPost) {
          if (this.addImgData.selectedImg == null) {
            this.snackbar.snackbar = true
            this.snackbar.text = this.$t('post.wait')
            this.snackbar.color = 'blue darken-2'
            this.snackbar.timeout = 0
            axios.post(this.$store.state.server_ip +'/api/employments/editemployment',{
              postData : this.postData,
              jobData: this.jobData
            }).then(res => {
              this.snackbar.snackbar = false
              this.snackbar.snackbar = true
              this.snackbar.text = this.$t('managment.success')
              this.snackbar.color = 'green darken-2'
              this.snackbar.timeout = 3000
              this.$router.push('/' + this.$i18n.locale + '/my post')
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
                
                this.postData.img = res.data.result.files.file[0].name
                axios.post(this.$store.state.server_ip +'/api/employments/editemployment',{
                  postData : this.postData,
                  jobData: this.jobData
                }).then(res => {
                  this.snackbar.snackbar = false
                  this.snackbar.snackbar = true
                  this.snackbar.text = this.$t('managment.success')
                  this.snackbar.color = 'green darken-2'
                  this.snackbar.timeout = 3000
                  this.$router.push('/' + this.$i18n.locale + '/my post')
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
        }
      },
      checkEmpty(object){
          for (const key in object) {
            if (object.hasOwnProperty(key)) {
              if (object[key] == '' && key != 'view' && key != 'img') {
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('post.' + key.replace(/_/g, '') + "req")
                this.snackbar.color = 'red darken-2'
                this.snackbar.timeout = 3000
                this.passPost = false
                break
              }else{
                this.passPost = true
              }
            }
          }
      },
      checkEmptyJob(object){
          for (const key in object) {
            if (object.hasOwnProperty(key)) {
              if (object[key] == '' && key != 'view') {
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('post.employment.' + key.replace(/_/g, '') + "req")
                this.snackbar.color = 'red darken-2'
                this.snackbar.timeout = 3000
                this.passVec = false
                break
              }else{
                this.passVec = true
              }
            }
          }
      },
      validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      },
      phonenumber(inputtxt) {
          var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
          if (inputtxt.value.match(phoneno)){
              return true;
          }
          else {
              alert("message");
              return false;
          }
      }
  }
}
</script>
<style scoped>
    .img-list{
        width: auto;
        height: 25%;
        border-radius: 2px;
        padding: 5px
    }
    .img-content{
      margin-bottom: 5px;
    }
    .selected-img{
      height: 100px;
      width: 100px;
      margin-left: 5spx;
      cursor: pointer;
    }
</style>

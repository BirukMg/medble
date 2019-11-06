<template>
    <div class="">
        <div class="row">
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2 ">
                <div class="text-center">
                    <img :src="img" class="rounded-circle profile-pic" alt="Profile picture">
                </div>
            </div>
            <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
            <div class="col-sm-9 col-md-9 col-lg-9 col-xl-9 basic-info">
                <div class="row text-white">
                    <h3>{{resumeData.first_name + ' ' + resumeData.last_name}}</h3>
                    <span @click="launchEdit"><i class="fa fa-pen text-warning edit-icon"></i></span>
                </div>
                <div class="row text-white">
                    <h5 class="text-capitalize">{{$t('category.resume.' + resumeData.category.toLowerCase())}}</h5>
                </div>

                <div class="row text-white border-light border-top some-about" style="width: 100%">
                    <p class="text-justify">{{resumeData.about}}</p>
                </div>
            </div>
        </div>

        <mdb-modal size="md" v-if="editModal" @close="editModal = false">
          <mdb-modal-header>
            <mdb-modal-title>{{$t('post.resume.message.Edit prsonal information')}}</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
              <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 30px" :color="snackbar.color">
                {{ snackbar.text}}
                <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
              </v-snackbar>
            <mdb-input type="text" :label="$t('post.resume.basicinformation.firstname')" v-model="editData.first_name" outline size="sm"/>
            <mdb-input type="text" :label="$t('post.resume.basicinformation.lastname')" v-model="editData.last_name" outline size="sm"/>
            <div class="form-group">
                <label for="category" style="float: left">{{$t('post.Select category')}}</label>
                <select id="category" class="browser-default custom-select custom-select-sm" v-model="editData.category">
                    <option v-for="(i,index) in employments" :key="i" :value="employments[index]">{{$t('category.resume.' + i.toLowerCase())}}</option>
                </select>
            </div>
            <mdb-input type="textarea" label="Some about you" v-model="editData.about" outline size="sm"/>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-success btn-sm" @click="edit">{{$t('managment.Save changes')}}</button>
          </mdb-modal-footer>
        </mdb-modal>
    </div>
</template>
<script>
import {mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbInput} from 'mdbvue'
import axios from 'axios'
export default {
    props: ['resumeData', 'resumeId'],
    name: 'ProfileHeader',
    components: {
        mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbInput
    },
    data() {
        return {
            img:  require('../../../../assets/img/img(31).jpg'),
            editModal: false,
            headerData: {},
            passed: false,
            editData: {},
            snackbar: {
              snackbar: false,
              text: '',
              color: '',
            },
            employments:[
                "Accounting",
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
                "Trensportation"
            ]
     
        }
    },
    methods: {
        launchEdit(){
            this.editData = Object.assign({}, {
                first_name: this.resumeData.first_name,
                last_name: this.resumeData.last_name,
                category: this.resumeData.category,
                about: this.resumeData.about,
            })
            this.editModal = true
        },
        edit(){
            this.checkEmpty(this.editData)
            if (this.passed) {
                axios.patch(this.$store.state.server_ip  + '/api/resumes/' + this.resumeId, this.editData)
                .then(res => {
                    this.resumeData = res.data
                    this.editModal = false
                })
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
      validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      },
    },
}
</script>
<style scoped>
    .profile-pic{
        width: 150px;
        height: 150px;
        cursor: pointer;
        /* margin-left: 25%; */
    }
    .basic-info{
        width: 100%;
        height: auto;
        background-color: #2E2E2E;
        border-radius: 3px;
        padding: 2% 0 0 5%
    }
    .edit-icon{
        cursor: pointer;
        margin: 10px
    }
</style>

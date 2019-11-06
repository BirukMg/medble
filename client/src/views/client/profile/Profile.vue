<template>
    <div class="container text-center">
        <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
            {{ snackbar.text}}
            <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
        </v-snackbar>
        <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg"/>
        <img :src="$store.state.server_ip +'/api/containers/post/download/' + addImgData.preview" class="rounded-circle profile-pic" alt="Resume picture" @click="$refs.pickAddImg.click()">
        <h5 class="font-weight-bold text-warning" v-if="showOldPass">Your account is free, you can upgrade <a href="">here</a></h5>
        <h5 class="font-weight-bold text-success" v-if="!showOldPass">Pro Account </h5>
        <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <h3 class="font-weight-bold">Personal detail</h3>
                <mdb-input type="text" label="Full name" outline v-model="personal_info.full_name"/>
                <mdb-input type="text" label="Address" outline v-model="personal_info.address"/>
                <button type="button" class="btn btn-outline-primary waves-effect" @click="updatePersonal">Update personal detail</button>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <h3 class="font-weight-bold">Account detail</h3>
                <mdb-input type="text" label="Username" outline v-model="account_info.username"/>
                <br>
                <mdb-input :type="showOldPass ? 'tetx' : 'password'" class="mt-0 mb-3" v-model="old_pass" outline label="Old password" ariaDescribedBy="button-addon2">
                    <mdb-btn color= '' group slot="append" id="button-addon2" @click="showOldPass = !showOldPass"><i :class="showOldPass ? 'fa fa-eye-slash' : 'fa fa-eye'"></i></mdb-btn>
                </mdb-input>
                <mdb-input :type="showPass ? 'tetx' : 'password'" class="mt-0 mb-3" v-model="new_pass" outline label="New password" ariaDescribedBy="button-addon2">
                    <mdb-btn color= '' group slot="append" id="button-addon2" @click="showPass = !showPass"><i :class="showPass ? 'fa fa-eye-slash' : 'fa fa-eye'"></i></mdb-btn>
                </mdb-input>
                <mdb-input :type="showConfPass ? 'tetx' : 'password'" class="mt-0 mb-3" v-model="conf_pass" outline label="Confirm password" ariaDescribedBy="button-addon2">
                    <mdb-btn color= '' group slot="append" id="button-addon2" @click="showConfPass = !showConfPass"><i :class="showConfPass ? 'fa fa-eye-slash' : 'fa fa-eye'"></i></mdb-btn>
                </mdb-input>
                <button type="button" class="btn btn-outline-primary waves-effect" @click="updateAccount">Update account detail</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mdbInput, mdbBtn} from 'mdbvue'
import Axios from 'axios';
export default {
    name: 'Profile',
    components: {
        mdbInput, mdbBtn
    },
    data() {
        return {
            addImgData: {
                selectedImg: '',
                progress: 0,
                msg:'Upload',
                preview: JSON.parse(this.$store.state.account).img,
                show: false
            },
            snackbar: {
                snackbar: false,
                text: '',
                timeout: 0,
                color: '',
            },
            passed: false,
            showPass: false,
            showConfPass: false,
            showOldPass: false,
            personal_info: {
                full_name: JSON.parse(this.$store.state.account).full_name,
                address: JSON.parse(this.$store.state.account).address
            },
            account_info: {
                username: JSON.parse(this.$store.state.account).username,
                password: JSON.parse(this.$store.state.account).password
            },
            old_pass: '',
            new_pass: '',
            conf_pass: ''
        }
    },
    mounted() {
        
    },
    methods: {
        onAddImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.snackbar.snackbar = true
          this.snackbar.text = 'Please select image'
          this.snackbar.color = 'red darken-2'
          this.snackbar.timeout = 3000
        }else{
          let formData = new FormData
          formData.append('file', e.target.files[0])
          this.snackbar.snackbar = true
            this.snackbar.text = 'In proccess...'
            this.snackbar.color = 'indigo'
            this.snackbar.timeout = 0
          Axios.post(this.$store.state.server_ip +'/api/containers/post/upload', formData)
          .then(res => {
              this.addImgData.preview = res.data.result.files.file[0].name
              Axios.patch(this.$store.state.server_ip +'/api/accounts/' + JSON.parse(this.$store.state.account).id,{img: res.data.result.files.file[0].name})
              .then(res => {
                    this.$store.dispatch('updateAccount', res.data)
                    .then(res => {
                        this.snackbar.snackbar = false
                    })
              })
          }).catch(err => {
            this.snackbar.snackbar = true
            this.snackbar.text = 'Something went wrong, try again'
            this.snackbar.timeout = 3000
            this.snackbar.color = 'red darken-2'
          })
        }
        },
        isFileImage(file) {
            return file && file['type'].split('/')[0] === 'image';
        },
        updatePersonal(){
            this.checkEmpty(this.personal_info)
            if (this.passed) {
                this.snackbar.snackbar = true
                this.snackbar.text = 'Please wait...'
                this.snackbar.color = 'blue darken-2'
                this.snackbar.timeout = 0
                Axios.patch(this.$store.state.server_ip +'/api/accounts/' + JSON.parse(this.$store.state.account).id, this.personal_info)
                .then(res => {
                    this.$store.dispatch('updateAccount', res.data)
                    .then(res => {
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'Personal information updated successfully'
                        this.snackbar.color = 'green darken-2'
                        this.snackbar.timeout = 5000
                    })
                }).catch(err => {
                    this.snackbar.snackbar = true
                    this.snackbar.text = 'Something went wrong, try again'
                    this.snackbar.timeout = 3000
                    this.snackbar.color = 'red darken-2'
                })
            }
        },
        updateAccount(){
            this.checkEmpty(this.account_info)
            if (this.passed) {
                if (this.old_pass != '' || this.new_pass != '' || this.conf_pass != '') {
                    if (this.old_pass != JSON.parse(this.$store.state.account).password) {
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'Your old password is not match'
                        this.snackbar.timeout = 3000
                        this.snackbar.color = 'red darken-2'
                    }else if (!this.checkPass(this.new_pass)) {
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'Please make your password strong, include Uppercase, lowercase and numbers'
                        this.snackbar.timeout = 3000
                        this.snackbar.color = 'red darken-2'
                    }else if (this.new_pass != this.conf_pass) {
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'Your new password is not match'
                        this.snackbar.timeout = 3000
                        this.snackbar.color = 'red darken-2'
                    }
                    else{
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'Please wait...'
                        this.snackbar.color = 'blue darken-2'
                        this.snackbar.timeout = 0
                        Axios.post(this.$store.state.server_ip + "/api/medbleusers/updateaccount",{
                            username: this.account_info.username,
                            password: this.new_pass,
                            userId: parseInt(this.$store.state.userId),
                            account_id: JSON.parse(this.$store.state.account).id
                        }).then(res => {
                            this.$store.dispatch('updateAccount', res.data.data)
                            .then(res => {
                                this.snackbar.snackbar = true
                                this.snackbar.text = 'Account information updated successfully'
                                this.snackbar.color = 'green darken-2'
                                this.snackbar.timeout = 5000
                            })
                        }).catch(err => {
                            this.snackbar.snackbar = true
                            this.snackbar.text = 'Something went wrong, try again'
                            this.snackbar.timeout = 3000
                            this.snackbar.color = 'red darken-2'
                        })
                    }
                }else{
                    this.snackbar.snackbar = true
                        this.snackbar.text = 'Please wait...'
                        this.snackbar.color = 'blue darken-2'
                        this.snackbar.timeout = 0
                    Axios.post(this.$store.state.server_ip + "/api/medbleusers/updateaccount",{
                        username: this.account_info.username,
                        password: JSON.parse(this.$store.state.account).password,
                        userId: parseInt(this.$store.state.userId),
                        account_id: JSON.parse(this.$store.state.account).id
                    }).then(res => {
                        this.$store.dispatch('updateAccount', res.data.data)
                        .then(res => {
                            this.snackbar.snackbar = true
                            this.snackbar.text = 'Account information updated successfully'
                            this.snackbar.color = 'green darken-2'
                            this.snackbar.timeout = 5000
                        })
                    }).catch(err => {
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'Something went wrong, try again'
                        this.snackbar.timeout = 3000
                        this.snackbar.color = 'red darken-2'
                    })
                }
            }
        },
        checkPass(pass){
           return /[a-z]/.test(pass) && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && pass.length > 5
        },
        checkEmpty(obj){
            for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] == '') {
                    this.snackbar.snackbar = true
                    this.snackbar.text = 'The ' + key.replace(/_/g, ' ') + " field is required"
                    this.snackbar.color = 'red darken-2'
                    this.snackbar.timeout = 3000
                    this.passed = false
                    break
                }else if (key == 'email' && !this.validateEmail(obj[key])) {
                    this.snackbar.snackbar = true
                    this.snackbar.text = "invalid email address"
                    this.snackbar.color = 'red darken-2'
                    this.snackbar.timeout = 3000
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
      }
    },
}
</script>
<style scoped>
    .profile-pic{
        cursor: pointer;
        height: 200px;
        width: 200px;
    }.btn{
        width: 100%;
    }
</style>

<template>
    <div class="container">
        <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
            {{ snackbar.text}}
            <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
        </v-snackbar>
        <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 border border-light rounded">
                <div class="text-center">
                    <hr class="hr-light"><h3 class="font-weight-bold text-primary">Medble Admin Profie</h3><hr class="hr-light">
                </div>
                <div class="login-form text-center">
                    <mdb-input type="text" outline class="login-input" label="Username" size="md" v-model="profileData.username"/>
                    <mdb-input :type="showPass ? 'tetx' : 'password'" class="mt-0 mb-3" v-model="profileData.password" outline label="Old password" ariaDescribedBy="button-addon2">
                        <mdb-btn color= '' group slot="append" id="button-addon2" @click="showPass = !showPass"><i :class="showPass ? 'fa fa-eye-slash' : 'fa fa-eye'"></i></mdb-btn>
                    </mdb-input>
                    <button type="submit" class="btn btn-sm btn-outline-primary waves-effect" @click="update">Save changes</button>
                </div>
            </div>
            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>
            
        </div>
    </div>
</template>
<script>
import {mdbInput, mdbBtn} from 'mdbvue'
import axios from 'axios'
export default {
    components: {
        mdbInput, mdbBtn
    },
    data(){
        return{
            passed: false,
            profileData: {
                username: JSON.parse(this.$store.state.adminInfo).username,
                password: '',
                id: JSON.parse(this.$store.state.adminInfo).id
            },
            showPass: false,
            snackbar: {
              snackbar: false,
              text: '',
              color: '',
              timeout: 0
            },
        }
    },
    mounted() {
        
    },
    methods: {
        update() {
            this.checkEmpty(this.profileData)
            if (this.passed) {
                this.snackbar.snackbar = true
                this.snackbar.text = "Please wait..."
                this.snackbar.color = 'blue darken-2'
                this.snackbar.timeout = 0
                axios.post(this.$store.state.server_ip + "/api/admins/updateprofile",
                    this.profileData
                ).then(res => {
                    this.$store.dispatch('updateAdminInfo', res.data.data.username)
                    .then(res => {
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'Account information updated successfully'
                        this.snackbar.color = 'green darken-2'
                        this.snackbar.timeout = 5000
                        location.reload()
                    })
                }).catch(err => {
                    if (err.message == 'Network Error') {
                        this.snackbar.snackbar = false
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'Connection faild'
                        this.snackbar.color = 'red darken-2'
                        this.snackbar.timeout = 3000
                    }else{
                        if (err.response.data.error.details.messages.username[0] != undefined) {
                            this.snackbar.snackbar = false
                            this.snackbar.snackbar = true
                            this.snackbar.text = 'Username alredy taken'
                            this.snackbar.color = 'red darken-2'
                            this.snackbar.timeout = 3000
                        }
                    }
                    
                })
            }
        },
        checkEmpty(obj){
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] == '' && key != 'password') {
                this.snackbar.snackbar = true
                this.snackbar.text = 'The ' + key.replace(/_/g, ' ') + " field is required"
                this.snackbar.color = 'red darken-2'
                this.passed = false
                break
            }else if (key == 'password' && obj[key] != '' && !this.checkPass(obj[key])) {
                this.snackbar.snackbar = true
                this.snackbar.text = "Please make your password strong, include Uppercase, lowercase and numbers"
                this.snackbar.color = 'red darken-2'
                this.passed = false
                break
            }else {
              this.passed = true
            }
          }
        }
      },
        checkPass(pass){
            return /[a-z]/.test(pass) && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && pass.length > 5
        }
    },
}
</script>

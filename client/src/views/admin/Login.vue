<template>
    <div class="container login-content">
        <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
            {{ snackbar.text}}
            <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
        </v-snackbar>
    <div class="text-center">
        <img class="logo" src="https://mdbootstrap.com/img/Photos/Others/men.jpg" alt="Card image cap">
        <hr class="hr-light"><h3 class="font-weight-bold text-primary">Medble Admin Login</h3><hr class="hr-light">
    </div>
    <div class="login-form">
        <mdb-input type="text" outline class="login-input" label="Username" size="md" v-model="loginData.username"/>
        <mdb-input type="password" outline class="login-input" label="Password" size="md" v-model="loginData.password"/>
        <button type="button" class="btn btn-outline-primary waves-effect" @click="login">Login</button>
        <div style="margin-top: 20px">
          <!-- Forgot password -->
          <h5 class="text-primary font-weight-bold" style="cursor: pointer">Forgot password?</h5>
        </div>

    </div>
    </div>
</template>

<script>
import {mdbInput} from 'mdbvue'
export default {
    name: 'Login',
    components: {
        mdbInput
    },
    data() {
        return {
            passed: false,
            snackbar: {
              snackbar: false,
              text: '',
              color: '',
              timeout: 0
            },
            loginData: {
              username: '',
              password: ''
            }
        }
    },
    mounted() {
        if (this.$store.getters.isAdminLoggedIn && JSON.parse(this.$store.state.adminInfo).role == 'super') {
            this.$router.push('/' + this.$i18n.locale + '/admin/super/manage users')
        }else if (this.$store.getters.isAdminLoggedIn && JSON.parse(this.$store.state.adminInfo).role == 'sub') {
            if (!JSON.parse(this.$store.state.adminInfo).permmisions.user) {
                this.$router.push('/' + this.$i18n.locale + '/admin/sub')
            } else {
                this.$router.push('/' + this.$i18n.locale + '/admin/sub/manage users')   
            }
        }
    },
    methods: {
        login(){
            this.checkEmpty(this.loginData)
            if (this.passed) {
                this.snackbar.snackbar = true
                this.snackbar.text = "Please wait..."
                this.snackbar.color = 'blue darken-2'
                this.snackbar.timeout = 0
                this.$store.dispatch('adminlogin', this.loginData)
                .then(res => {
                    if (JSON.parse(this.$store.state.adminInfo).role == 'super') {
                        this.$router.push('/' + this.$i18n.locale + '/admin/super/manage users')
                    }
                    if (JSON.parse(this.$store.state.adminInfo).role == 'sub') {
                        if (!JSON.parse(this.$store.state.adminInfo).permmisions.user) {
                            this.$router.push('/' + this.$i18n.locale + '/admin/sub')
                        } else {
                         this.$router.push('/' + this.$i18n.locale + '/admin/sub/manage users')   
                        }
                    }
                }).catch(err => {
                    if(err.message == 'Network Error'){
                        this.snackbar.snackbar = false
                        this.snackbar.snackbar = true
                        this.snackbar.text = "Connection failed !"
                        this.snackbar.color = 'red darken-2'
                        this.snackbar.timeout = 3000
                    }else{
                        if (err.response.status == 401) {
                            this.snackbar.snackbar = false
                            this.snackbar.snackbar = true
                            this.snackbar.text = "Incorrect username/password"
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
            if (obj[key] == '') {
                this.snackbar.snackbar = true
                this.snackbar.text = 'The ' + key.replace(/_/g, ' ') + " field is required"
                this.snackbar.color = 'red darken-2'
                this.passed = false
                break
            }else {
              this.passed = true
            }
          }
        }
      }
    },
}
</script>


<style scoped>
    .login-content{
        padding: 5% 20% 0 20%;
        margin-top: 10%
    }
    .btn{
        width: 100%;
    }
    .login-form{
        margin-left: 5px
    }
    .logo{
        height: 100px;
        width: 100px;
        border-radius: 50%;
        /* margin-left: 35%; */
    }
</style>

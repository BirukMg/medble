<template>
    <div class="container login-content">
        <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
            {{ snackbar.text}}
            <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
        </v-snackbar>
        <div class="">
        <a href="http://localhost:3000/facebook" style="width: 100%">
            <button type="button" class="btn btn-outline-primary waves-effect"><i class="fab fa-facebook-f"></i> {{$t('loginPage.loginwithfb')}}</button>
        </a>
        <a href="http://localhost:3000/google" style="width: 100%">
            <button type="button" class="btn btn-outline-danger waves-effect"><i class="fab fa-google"></i> {{$t('loginPage.loginwithggl')}}</button>
        </a>
        </div>
    <div class="row" style="margin-top: 5%">
        <hr class="hr-light"><h4>{{$t('loginPage.or')}}</h4><hr class="hr-light">
    </div>
    <div class="login-form">
        <mdb-input type="text" outline class="login-input" :label="$t('loginPage.username')" size="md" v-model="loginData.username"/>
        <mdb-input type="password" outline class="login-input" :label="$t('loginPage.password')" size="md" v-model="loginData.password"/>
        <button type="button" class="btn btn-outline-primary waves-effect" @click="login">{{$t('loginPage.login')}}</button>
        <div style="margin-top: 20px">
          <!-- Forgot password -->
          <h5 class="text-primary " style="cursor: pointer">{{$t('loginPage.forgotpass')}}</h5>
        </div>

    </div>
    </div>
</template>

<script>
import VFacebookLogin from 'vue-facebook-login-component'
import {mdbInput} from 'mdbvue'
export default {
    name: 'Login',
    components: {
        mdbInput,VFacebookLogin
    },
    data() {
        return {
            passed: false,
            snackbar: {
              snackbar: false,
              text: '',
              color: '',
            },
            loginData: {
              username: 'username@969274413429390',
              password: 'pass@969274413429390'
            }
        }
    },
    mounted() {
        if (this.$route.query.userdata != undefined) {
            if (JSON.parse(this.$route.query.userdata).message != undefined && JSON.parse(this.$route.query.userdata).message == 'Email already used') {
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('loginPage.emailinuse')
                this.snackbar.color = 'red darken-2'
            } else {
                this.$store.dispatch('sociallogin',JSON.parse(this.$route.query.userdata))
                .then(res => {
                    this.$router.push('/' + this.$i18n.locale + '/home')
                    this.snackbar.snackbar = true
                    this.snackbar.text = "Done !"
                    this.snackbar.color = 'green darken-2'
                }).catch(err => {
                    if(err.message == 'Network Error'){
                        this.snackbar.snackbar = true
                        this.snackbar.text = this.$t('loginPage.networkerr')
                        this.snackbar.color = 'red darken-2'
                    }else{
                        this.snackbar.snackbar = true
                        this.snackbar.text = this.$t('loginPage.somethingwrong')
                        this.snackbar.color = 'red darken-2'
                    }
                })
            }
        }
    },
    methods: {
        login(){
            this.checkEmpty(this.loginData)
            if (this.passed) {
                this.$store.dispatch('login', this.loginData)
                .then(res => {
                    this.$router.push('/' + this.$i18n.locale + '/home')
                    this.snackbar.snackbar = true
                    this.snackbar.text = "Done !"
                    this.snackbar.color = 'green darken-2'
                }).catch(err => {
                    if(err.message == 'Network Error'){
                        this.snackbar.snackbar = true
                        this.snackbar.text = this.$t('loginPage.networkerr')
                        this.snackbar.color = 'red darken-2'
                    }else{
                        if (err.response.status == 401) {
                            this.snackbar.snackbar = true
                            this.snackbar.text = this.$t('loginPage.incorrectdetail')
                            this.snackbar.color = 'red darken-2'
                        }else{
                            this.snackbar.snackbar = true
                            this.snackbar.text = this.$t('loginPage.somethingwrong')
                            this.snackbar.color = 'red darken-2'
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
                this.snackbar.text = this.$t('loginPage.' + key.replace(/_/g, '') + "req")
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
</style>

<template>
    <div class="container login-content">
        <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
            {{ snackbar.text}}
            <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
        </v-snackbar>
    <div class="login-form">
        <mdb-input type="text" outline class="login-input" v-model="accountData.full_name" :label="$t('register.fullname')" size="md" />
        <mdb-input type="text" outline class="login-input" v-model="accountData.username" :label="$t('register.username')" size="md" />
        <mdb-input type="text" outline class="login-input" v-model="accountData.address" :label="$t('register.address')" size="md" />
        <mdb-input type="text" outline class="login-input" v-model="accountData.email" :label="$t('register.email')" size="md" />
        <mdb-input :type="showPass ? 'tetx' : 'password'" v-model="accountData.password" class="mt-0 mb-3" outline :label="$t('register.password')" ariaDescribedBy="button-addon2">
            <mdb-btn color= '' size="sm" group slot="append" id="button-addon2" @click="showPass = !showPass"><i :class="showPass ? 'fa fa-eye-slash' : 'fa fa-eye'"></i></mdb-btn>
        </mdb-input>
        <mdb-input :type="showConfPass ? 'tetx' : 'password'" v-model="conf_pass" class="mt-0 mb-3" outline :label="$t('register.confpass')" ariaDescribedBy="button-addon2">
            <mdb-btn color= '' size="sm" group slot="append" id="button-addon2" @click="showConfPass = !showConfPass"><i :class="showConfPass ? 'fa fa-eye-slash' : 'fa fa-eye'"></i></mdb-btn>
        </mdb-input>
        <button type="button" class="btn btn-outline-primary waves-effect" @click="register">{{$t('register.register')}}</button>

    </div>
    </div>
</template>

<script>
import {mdbInput, mdbBtn} from 'mdbvue'
import axios from 'axios'
export default {
    name: 'Login',
    components: {
        mdbInput, mdbBtn
    },
    data() {
        return {
            showPass: false,
            showConfPass: false,
            passed: false,
            snackbar: {
              snackbar: false,
              text: '',
              color: '',
            },
            accountData: {
                full_name: '',
                username: '',
                address: '',
                email: 'emi@com.cpm',
                password: ''
            },
            conf_pass: '11',
        }
    },
    mounted() {
        
    },
    methods: {
        register(){
            this.checkEmpty(this.accountData)
            if (this.passed) {
                if (this.conf_pass == '') {
                    this.snackbar.snackbar = true
                    this.snackbar.text = this.$t('register.notconfpass')
                    this.snackbar.color = 'red darken-2'
                }else if (this.accountData.password != this.conf_pass) {
                    this.snackbar.snackbar = true
                    this.snackbar.text = this.$t('register.passnotmatch')
                    this.snackbar.color = 'red darken-2'
                }else{
                    axios.post(this.$store.state.server_ip + '/api/accounts/emailConf',{accountData :this.accountData})
                    .then(res => {
                        console.log(res.data)
                    }).catch(err => console.log(err.message))
                }
            }
        },
        checkEmpty(obj){
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] == '') {
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('register.' + key.replace(/_/g, '') + "req")
                this.snackbar.color = 'red darken-2'
                this.passed = false
                break
            }else if (key == 'email' && !this.validateEmail(obj[key])) {
              this.snackbar.snackbar = true
                this.snackbar.text = this.$t('register.invalidemail')
                this.snackbar.color = 'red darken-2'
                this.passed = false
                break
            }else if (key == 'password' && !this.checkPass(obj[key])) {
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('register.invalidpass')
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
       checkPass(pass){
           return /[a-z]/.test(pass) && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && pass.length > 5
        },
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

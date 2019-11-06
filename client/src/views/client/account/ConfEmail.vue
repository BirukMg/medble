<template>
    <div class="container border border-light rounded main-content text-center">
        <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
            {{ snackbar.text}}
            <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
        </v-snackbar>
        <img class="logo" src="https://mdbootstrap.com/img/Photos/Others/men.jpg" alt="Card image cap">
        <h3 class="text-info font-weight-bold">Confirmation for Medble.com</h3>
        {{verifyData.email}}
        <mdb-input type="text" outline class="login-input" v-model="verifyData.code" label="Confirmation code" placeholder="mdbl-xxxxxx" size="md" />
        <button type="button" class="btn btn-outline-primary waves-effect" @click="verify">Verify</button>
    </div>
</template>
<script>
import {mdbInput} from 'mdbvue'
import axios from 'axios'
export default {
    components: {
        mdbInput
    },
    data() {
        return {
            verifyData : {
                email: this.$route.query.email,
                code: ''
            },
             snackbar: {
              snackbar: false,
              text: '',
              color: '',
            },
        }
    },
    methods: {
        verify(){
            if (this.verifyData.code == '') {
                this.snackbar.snackbar = true
                this.snackbar.text = 'Please insert verification code'
                this.snackbar.color = 'red darken-2'
            }else if (!this.checkcode(this.verifyData.code)) {
                this.snackbar.snackbar = true
                this.snackbar.text = 'Invalid verification code'
                this.snackbar.color = 'red darken-2'
            }else{
                axios.post(this.$store.state.server_ip + '/api/accounts/emailverify', {verifyData: this.verifyData})
                .then(res => {

                })
            }
        },
        checkcode(code){
            return code.includes('mdbl-') && code.length == 9 && code.substring(0,5) == 'mdbl-'
        }
    },
}
</script>
<style scoped>
    .main-content{
        margin-top: 200px
    }
    .logo{
        height: 100px;
        width: 100px;
        border-radius: 50%;
        /* margin-left: 35%; */
    }
</style>
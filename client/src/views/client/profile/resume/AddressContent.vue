<template>
    <div>
        
        <div class="row">
            <span @click="launchEdit"><i class="fa fa-pen text-warning edit-icon"></i></span>
        </div>
        <div class="row">
            <span class="input-group">
                <i class="fa fa-envelope address-icons"></i>
                <p class="text-justify">{{resumeData.email}}</p>
            </span>
        </div>
        <div class="row">
            <span class="input-group">
                <i class="fa fa-mobile address-icons"></i>
                <p class="text-justify">{{resumeData.phone_number}}</p>
            </span>
        </div>
        <div class="row">
            <span class="input-group">
                <i class="fa fa-building address-icons"></i>
                <p class="text-justify">{{resumeData.city}}</p>
            </span>
        </div>
        <div class="row">
            <span class="input-group">
                <i class="fa fa-home address-icons"></i>
                <p class="text-justify">{{resumeData.country}}</p>
            </span>
        </div>
        <div class="row">
            <span class="input-group">
                <i class="fa fa-map-marker address-icons"></i>
                <p class="text-justify">{{resumeData.address}}</p>
            </span>
        </div>

        <mdb-modal size="md" v-if="editModal" @close="editModal = false">
          <mdb-modal-header>
            <mdb-modal-title>{{$t('post.resume.message.Edit Address')}}</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
              <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 30px" :color="snackbar.color">
                {{ snackbar.text}}
                <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
              </v-snackbar>
            <mdb-input type="text" :label="$t('post.resume.basicinformation.email')" v-model="editData.email" outline size="sm"/>
            <mdb-input type="text" :label="$t('post.resume.basicinformation.phonenumber')" v-model="editData.phone_number" outline size="sm"/>
            <mdb-input type="text" :label="$t('post.resume.basicinformation.city')" v-model="editData.city" outline size="sm"/>
            <mdb-input type="text" :label="$t('post.resume.basicinformation.country')" v-model="editData.country" outline size="sm"/>
            <mdb-input type="text" :label="$t('post.resume.basicinformation.address')" v-model="editData.address" outline size="sm"/>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-success btn-sm" @click="edit">Save changes</button>
          </mdb-modal-footer>
        </mdb-modal>
    </div>
</template>
<script>
import {mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbInput} from 'mdbvue'
import axios from 'axios'
export default {
    props: ['resumeData','resumeId'],
    name: 'Address',
    components: {
        mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbInput
    },
    data() {
        return {
            editModal: false,
            addressData: {},
            passed: false,
            editData: {},
            snackbar: {
              snackbar: false,
              text: '',
              color: '',
            }
        }
    },
    mounted() {
    //    console.log(this.resumeData)
    },
    methods: {
        launchEdit(){
            this.editData = Object.assign({}, {
                email: this.resumeData.email,
                phone_number: this.resumeData.phone_number,
                city: this.resumeData.city,
                country: this.resumeData.country,
                address: this.resumeData.address,
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
    .address-icons{
        margin: 5px 15px 0 0
    }
    .edit-icon{
        cursor: pointer;
    }
</style>

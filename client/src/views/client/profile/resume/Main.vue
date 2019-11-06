<template>
    <div class="container">
        <resume-header :resumeData ="resumes" :resumeId ="resumes.id"/>
        <div class="row" style="margin-top: 30px">
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <address-content :resumeData ="resumes" :resumeId ="resumes.id"/>
                <sill-content :resumeData ="resumes.skills" :resumeId ="resumes.id"/>
                <interest-content :resumeData ="resumes.interests" :resumeId ="resumes.id"/>
            </div>
            <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
            <div class="col-sm-9 col-md-9 col-lg-9 col-xl-9">
                <edu-content :resumeData ="resumes.educationalinformations" :resumeId ="resumes.id"/>
                <exp-content :resumeData ="resumes.experienceinformations" :resumeId ="resumes.id"/>
                <button class="btn btn-danger" style="width: 100%; margin: 20px 0" @click="deleteModal = true">{{$t('post.resume.message.Delete')}}</button>
            </div>
        </div>

        <mdb-modal size="sm" v-if="deleteModal" @close="deleteModal = false">
          <mdb-modal-header class="cancel-modal-header">
            <mdb-modal-title class="text-white">{{$t('post.delete.Are you sure')}}</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body class="text-center">
            <i class="fa fa-times fa-4x animated rotateIn" style="color:red"></i>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-danger btn-sm" @click="deleteResume">{{$t('post.delete.Yes')}}</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal = false">{{$t('post.delete.No')}}</button>
          </mdb-modal-footer>
        </mdb-modal>
    </div>
</template>
<script>
import {mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter} from 'mdbvue'
import resumeHeader from './Header'
import addressContent from './AddressContent'
import eduContent from './EduContent'
import expContent from './expContent'
import sillContent from './SillContent'
import interestContent from './InterestCOntent'
import axios from 'axios';
export default {
    name: 'Resume',
    components: {
        resumeHeader, addressContent, eduContent, expContent, sillContent, interestContent,
        mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter
    },
    data() {
        return {
            resumes: {},
            addressData: {},
            deleteModal: false,
        }
    },
    mounted() {
        if (JSON.parse(this.$store.state.account).resume) {
            let filter = {
                include: {resumes:['skills','interests','experienceinformations','educationalinformations']}
            }
            axios.get(this.$store.state.server_ip  + '/api/accounts/'+ JSON.parse(this.$store.state.account).id +'?filter='+ JSON.stringify(filter))
            .then(res => {
                this.resumes = Object.assign({}, res.data.resumes)
                this.addressData.email = res.data.resumes.email
                this.addressData.phone_number = res.data.resumes.phone_number
                this.addressData.city = res.data.resumes.city
                this.addressData.country = res.data.resumes.country
                this.addressData.address = res.data.resumes.address
            })
        } else {
            this.$router.push({ path: '/' + this.$i18n.locale + '/home' })
        }
    },
    methods: {
        deleteResume(){
            axios.delete(this.$store.state.server_ip + '/api/resumes/'+ this.resumes.id + '/' + JSON.parse(this.$store.state.account).id +'/deleteresume')
            .then(res => {
                // console.log(res);
                this.deleteModal = false
                this.$store.dispatch('updateAccount', res.data.data)
                .then(res => {
                    this.$router.push({ path: '/' + this.$i18n.locale + '/home' })                    
                })
            })
        }
    },
}
</script>
<style scoped>
    .cancel-modal-header{
        background-color: red;
        padding-left: 35%
    }
</style>
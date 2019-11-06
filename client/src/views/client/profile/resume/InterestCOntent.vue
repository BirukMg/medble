<template>
    <div>
        <section>
            <div class="row">
                <div style="width: 100%; margin-top: 15%" >
                    <div class="row border-dark border-bottom resume-center">
                        <h2 class="row font-weight-bold text-uppercase">{{$t('post.resume.interest')}} <span @click="addModal = true"><h4><i class="fa fa-plus text-success add-icons"></i></h4></span></h2>
                    </div>
                    <div class="row border border-light rounded interests text-white bd-highlight" v-for="(i,index) in resumeData" :key="i">
                       <div class="col-10">
                           <h5 class="row">{{i.interestValue}}</h5>
                       </div>
                       <div class="col-2">
                            <span @click="remove(i.id,index)"><i class="fa fa-times text-danger del-icon" style="margin-top: 5px;"></i></span>    
                       </div>
                    </div>
                </div>
            </div>
        </section>
         <mdb-modal size="md" v-if="addModal" @close="addModal = false">
          <mdb-modal-header>
            <mdb-modal-title>{{$t('post.resume.message.Add Interest')}}</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
                <mdb-input type="text" v-model="addData.interestValue" :label="$t('post.resume.interest')" outline size="sm"/>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-success btn-sm" @click="add">{{$t('post.resume.add')}}</button>
          </mdb-modal-footer>
        </mdb-modal>
    </div>
</template>
<script>
import {mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbInput} from 'mdbvue'
import axios from 'axios'
export default {
    props: ['resumeData', 'resumeId'],
    name: 'Skills',
    components: {
        mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbInput
    },
    data() {
        return {
            addModal: false,
            addData: {
                interestValue: ''
            }
        }
    },
    methods: {
        add(){
            axios.post(this.$store.state.server_ip  + '/api/resumes/' + this.resumeId + '/interests',this.addData)
            .then(res => {
                this.resumeData.push(res.data)
            })
        },
        remove(id,index){
            axios.delete(this.$store.state.server_ip  + '/api/interests/' + id)
            .then(res => {
                this.resumeData.splice(index,1)
                this.deleteModal = false
            }).catch(err => {
                console.log(err)
            })
        }
    },
}
</script>

<style scoped>
    .interests{
        padding: 5px 0px 0 5px;
        margin-top: 10px;
        background-color: #413b3b
    }
    .add-icons{
        cursor: pointer;
        margin: 5px
    }
    .del-icon{
        cursor: pointer;
    }
</style>

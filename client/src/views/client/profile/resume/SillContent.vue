<template>
    <div>
        <section>
            <div class="row">
                <div style="width: 100%; margin-top: 15%" >
                    <div class="row border-dark border-bottom resume-center">
                        <h2 class="row font-weight-bold text-uppercase">{{$t('post.resume.skill')}} <span @click="addModal = true"><h4><i class="fa fa-plus text-success add-icons"></i></h4></span></h2>
                    </div>
                    <div class="row border border-light rounded skills text-white bd-highlight" v-for="i in resumeData" :key="i">
                       <div class="col-6">
                           <h5 class="row">{{i.name}}</h5>
                       </div>
                       <div class="col-6">
                            <i class="fa fa-star" style="margin-top: 7px; color: yellow" v-for="j in i.value" :key="j"></i>
                       </div>
                    </div>
                </div>
            </div>
        </section>

        <mdb-modal size="md" v-if="addModal" @close="addModal = false">
          <mdb-modal-header>
            <mdb-modal-title>{{$t('post.resume.message.Add Skill')}}</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
              <div class="row">
                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <mdb-input type="text" v-model="addData.name" :label="$t('post.resume.skill')" outline size="sm"/>
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <v-rating empty-icon="star_border" v-model="addData.value" full-icon="star" style="margin-top: 15px"></v-rating>
                    </div>
                </div>
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
                name: '',
                value: 1
            }
        }
    },
    methods: {
        add(){
            axios.post(this.$store.state.server_ip  + '/api/resumes/' + this.resumeId + '/skills',this.addData)
            .then(res => {
                this.resumeData.push(res.data)
            })
        }
    },
}
</script>

<style scoped>
    .skills{
        padding: 5px 0px 0 5px;
        margin-top: 10px;
        background-color: #413b3b
    }
    .add-icons{
        cursor: pointer;
        margin: 5px
    }
</style>

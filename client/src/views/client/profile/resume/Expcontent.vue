<template>
    <div>
        <section style="margin-top: 5%">
            <div class="row border-dark border-bottom resume-center">
                <h2 class="font-weight-bold text-uppercase input-group">{{$t('post.resume.experienceinformation.experienceinfo')}} <span @click="addModal = true"><h4><i class="fa fa-plus text-success add-icons"></i></h4></span></h2>
            </div>
            <div class="border-light border-bottom" v-for="(i,index) in resumeData" :key="i">
                <div class="row resume-center">
              <div class="col-sm-1 col-md-11 col-lg-11 col-xl-11">
                  <h2 class="row">{{i.position}}</h2>
              </div>
              <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1" style="margin-top: 1%">
                    <div class="row">
                      <span @click="launcheditItemModal(i,index)"><i class="fa fa-pen text-warning add-icons"></i></span>
                      <span @click="launchDeleteModal(i,index)"><i class="fa fa-times text-danger add-icons"></i></span>
                    </div>
                </div>
            </div>
            <div class="row resume-center">
                <h4>{{i.company}}</h4>
            </div>
            <div class="row resume-center">
                <p class="text-justify">{{i.company_description}}</p>
            </div>
            <!-- <div class="row resume-center"> -->
                <div class="row resume-center">
                    <h6 class="font-weight-bold">{{$t('post.resume.experienceinformation.tasks')}}</h6>
                </div>
                  <div class="row resume-center">
                    <p class="text-justify">{{i.tasks}}</p>
                </div>
            <!-- </div> -->
            <div class="resume-center">
                <p class="float-left font-italic font-weight-bold">{{i.start_date + ' – ' + i.end_date}}</p>
                <p class="float-right font-italic font-weight-bold">{{i.city}}, {{i.country}}</p>
            </div>
            <p class="font-italic font-weight-bold">{{i.contact_person}}: {{i.contact_information}}</p>
            </div>
        </section>


        <mdb-modal size="lg" v-if="addModal" @close="addModal = false">
          <mdb-modal-header>
            <mdb-modal-title>{{$t('post.resume.message.Add Experience Information')}}</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
              <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 30px" :color="snackbar.color">
                {{ snackbar.text}}
                <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
              </v-snackbar>
               <div class="row">
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <mdb-input type="text" :label="$t('post.resume.experienceinformation.position')"v-model="experience_information.position" outline size="sm"/>
                    </div>
                    <div class="form-group">
                      <mdb-input type="text" :label="$t('post.resume.experienceinformation.country')" v-model="experience_information.country" outline size="sm"/>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <v-menu v-model="modalStart2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                              <template v-slot:activator="{ on }">
                                <v-text-field v-model="experience_information.start_date" :label="$t('post.resume.experienceinformation.startdate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="experience_information.start_date" @input="modalStart2 = false"></v-date-picker>
                            </v-menu>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <v-menu v-model="modalEnd2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                              <template v-slot:activator="{ on }">
                                <v-text-field v-model="experience_information.end_date" :label="$t('post.resume.experienceinformation.enddate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="experience_information.end_date" @input="modalEnd2 = false"></v-date-picker>
                            </v-menu>
                        </div>
                    </div>
                    <div class="form-group">
                        <mdb-input type="textarea" :row="3" :label="$t('post.resume.experienceinformation.tasks')" v-model="experience_information.tasks" outline size="sm"/>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="form-group">
                          <mdb-input type="text" :label="$t('post.resume.experienceinformation.workplace')" v-model="experience_information.work_place" outline size="sm"/>
                      </div>
                      <div class="form-group">
                          <mdb-input type="text" :label="$t('post.resume.experienceinformation.city')" v-model="experience_information.city" outline size="sm"/>
                      </div>
                      <div class="form-group">
                          <mdb-input type="textarea" :row="3" :label="$t('post.resume.experienceinformation.companydescription')" v-model="experience_information.company_description" outline size="sm"/>
                      </div>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <mdb-input type="text" :label="$t('post.resume.experienceinformation.contactperson')" v-model="experience_information.contact_person" outline size="sm" style="margin-top: 0; height: 20px"/>
                        </div>
                        <mdb-input type="text" :label="$t('post.resume.experienceinformation.contactinformation')" v-model="experience_information.contact_information" outline size="sm" style="margin-top: 0; height: 20px"/>
                      </div>
                  </div>
                </div>
            </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-success btn-sm" @click="add">{{$t('post.resume.add')}}</button>
          </mdb-modal-footer>
        </mdb-modal>

        <mdb-modal size="sm" v-if="deleteModal" @close="deleteModal = false">
          <mdb-modal-header class="cancel-modal-header">
            <mdb-modal-title class="text-white">{{$t('post.delete.Are you sure')}}</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body class="text-center">
            <i class="fa fa-times fa-4x animated rotateIn" style="color:red"></i>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-danger btn-sm" @click="delet">{{$t('post.delete.Yes')}}</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal = false">{{$t('post.delete.No')}}</button>
          </mdb-modal-footer>
        </mdb-modal>

        <mdb-modal size="lg" v-if="editModal" @close="editModal = false">
          <mdb-modal-header>
            <mdb-modal-title>{{$t('post.resume.message.Edit Experience Information')}}</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
              <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 30px" :color="snackbar.color">
                {{ snackbar.text}}
                <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
              </v-snackbar>
              <div class="row">
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="form-group">
                      <mdb-input type="text" :label="$t('post.resume.experienceinformation.position')" v-model="editData.position" outline size="sm"/>
                    </div>
                    <div class="form-group">
                      <mdb-input type="text" :label="$t('post.resume.experienceinformation.country')" v-model="editData.country" outline size="sm"/>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <v-menu v-model="modalStart2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                              <template v-slot:activator="{ on }">
                                <v-text-field v-model="editData.start_date" :label="$t('post.resume.experienceinformation.startdate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editData.start_date" @input="modalStart2 = false"></v-date-picker>
                            </v-menu>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <v-menu v-model="modalEnd2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"  offset-y full-width min-width="290px">
                              <template v-slot:activator="{ on }">
                                <v-text-field v-model="editData.end_date" :label="$t('post.resume.experienceinformation.enddate')" prepend-icon="event" readonly v-on="on"></v-text-field>
                              </template>
                              <v-date-picker v-model="editData.end_date" @input="modalEnd2 = false"></v-date-picker>
                            </v-menu>
                        </div>
                    </div>
                    <div class="form-group">
                        <mdb-input type="textarea" :row="3" :label="$t('post.resume.experienceinformation.tasks')" v-model="editData.tasks" outline size="sm"/>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="form-group">
                          <mdb-input type="text" :label="$t('post.resume.experienceinformation.workplace')" v-model="editData.work_place" outline size="sm"/>
                      </div>
                      <div class="form-group">
                          <mdb-input type="text" :label="$t('post.resume.experienceinformation.city')" v-model="editData.city" outline size="sm"/>
                      </div>
                      <div class="form-group">
                          <mdb-input type="textarea" :row="3" :label="$t('post.resume.experienceinformation.companydescription')" v-model="editData.company_description" outline size="sm"/>
                      </div>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <mdb-input type="text" :label="$t('post.resume.experienceinformation.contactperson')" v-model="editData.contact_person" outline size="sm" style="margin-top: 0; height: 20px"/>
                        </div>
                        <mdb-input type="text" :label="$t('post.resume.experienceinformation.contactinformation')" v-model="editData.contact_information" outline size="sm" style="margin-top: 0; height: 20px"/>
                      </div>
                  </div>
                </div>
            </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-success btn-sm" @click="edit">{{$t('managment.Save changes')}}</button>
          </mdb-modal-footer>
        </mdb-modal>
    </div>
</template>

<script>
import {mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbInput} from 'mdbvue'
import axios from 'axios'
export default {
    props: ['resumeData','resumeId'],
    name: 'Expcontent',
    components: {
        mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbInput
    },
    data() {
        return {
            addModal: false,
            deleteModal: false,
            editModal: false,
            passed: false,
            modalStart: false,
            modalEnd: false,
            experience_information: {
                position: '',
                work_place: '',
                country: '',
                city: '',
                start_date:'',
                end_date: '',
                company_description: '',
                tasks: '',
                contact_person: '',
                contact_information: ''
            },
            deleteItem: {
              id: 0,
              index: 0
            },
            editData: {},
            editIndex: 0,
            snackbar: {
              snackbar: false,
              text: '',
              color: '',
            }
        }
    },
     methods: {
        add(){
            this.checkEmpty(this.experience_information)
            if (this.passed) {
                axios.post(this.$store.state.server_ip  + '/api/resumes/' + this.resumeId + '/experienceinformations',this.experience_information)
                .then(res => {
                    this.resumeData.push(res.data)
                })
            }
        },
        delet(){
          axios.delete(this.$store.state.server_ip  + '/api/experienceinformations/' + this.deleteItem.id)
          .then(res => {
            this.resumeData.splice(this.deleteItem.index,1)
            this.deleteModal = false
          })
        },
        edit(){
          axios.patch(this.$store.state.server_ip  + '/api/experienceinformations/' + this.editData.id, this.editData)
          .then(res => {
            this.resumeData[this.editIndex] = res.data
            this.editModal = false
          })
        },
        launchDeleteModal(item,index){
          this.deleteItem.id = item.id
          this.deleteItem.index = index
          this.deleteModal = true
        },
        launcheditItemModal(item,index){
          this.editModal = true
          this.editData =  Object.assign({}, item)
          this.editIndex = index
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
    .add-icons{
        cursor: pointer;
        margin: 10px 0 0 10px
    }
     .cancel-modal-header{
      background-color: red;
      padding-left: 35%
  }
</style>

<template>
  <div class="main-contetn">
   <div class="float-left">
      <div style="margin-bottom: -100px" class="input-group">
        <mdb-input type="text" label="Search ads" style="width: 200px" v-model="search" outline size="sm"/>
        <div style="margin-top: 20px"><button class="btn btn-primary btn-sm" @click="newModal = true"><i class="fa fa-plus"/> new Ads</button></div>
      </div>
   </div>
   <v-app style="background-color: #fff">
     <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
       :search="search"
       :loading="items.length <= 0 ? true : false"
    >
    <template slot="no-data">
        <tr style="visibility: hidden;" />
    </template>
      <template slot="items" slot-scope="props">
          
        <!-- <v-data-table item-key="name" class="elevation-1" loading loading-text="Loading... Please wait" v-if="items.length <= 0"></v-data-table> -->
       <td class="text-xs-left" style="width: 50px">{{items.indexOf(props.item) + 1}}</td>
        <td class="text-xs-left px-0"  style="width: 300px">
          <img :src="props.item.img == null ? default_img : $store.state.server_ip + '/api/containers/ads/download/' + props.item.img" class="item-img" alt="post image">
        </td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.title}}</td>
       <td class="text-xs-left"  style="width: 600px">{{props.item.description | truncate(100)}}</td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.time}} Sec</td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.position}}</td>
       <td class="text-xs-left px-0" style="width: 700px">
            <span v-if="props.item.show" @click="hideShow(props.item)"><i style="margin-left: 15px" class="fa fa-eye-slash mr-1 icons" size="lg"/></span>
            <span v-if="!props.item.show" @click="hideShow(props.item)"><i style="margin-left: 15px" class="fa fa-eye mr-1 icons" size="lg"/></span>
            <span @click="launchEditModal(props.item,items.indexOf(props.item))"><i style="margin-left: 15px" class="fa fa-pen mr-1 icons text-warning" size="lg"/></span>
            <span @click="launchDeleteModal(props.item,items.indexOf(props.item))"><i style="margin-left: 15px" class="fa fa-trash mr-1 icons text-danger" size="lg"/></span>    
       </td>
      </template>
    </v-data-table>
   </v-app>
   <mdb-modal size="sm" v-if="deleteModal" @close="deleteModal = false">
          <mdb-modal-header class="cancel-modal-header">
            <mdb-modal-title class="text-white">Are you sure?</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body class="text-center">
            <i class="fa fa-times fa-4x animated rotateIn" style="color:red"></i>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-danger btn-sm" @click="dlt">Yes</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal = false">No</button>
          </mdb-modal-footer>
        </mdb-modal>



    <mdb-modal size="md" v-if="newModal" @close="newModal = false">
          <mdb-modal-header>
            <mdb-modal-title>New Ads</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body class="text-center">
              <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
              {{ snackbar.text}}
              <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
            </v-snackbar>
             <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg"/>
            <img :src="addImgData.preview == null ? default_img : addImgData.preview" @click="$refs.pickAddImg.click()" alt="Ads Image" class="img-thumbnail ads-img">
            <mdb-input type="text" label="Title" placeholder="Have no title? leave empty" v-model="postData.title" outline size="sm"/>
            <mdb-input type="textarea" label="Description" placeholder="Have no description? leave empty" v-model="postData.description" outline size="sm"/>
            <mdb-input type="number" label="Time to change in second" placeholder="Required" v-model="postData.time" outline size="sm"/>
             <mdb-btn-group>
                <mdb-btn color="primary" size="sm" @click="togglePosition" :active="position">Left</mdb-btn>
                <mdb-btn color="primary" size="sm" @click="togglePosition" :active="!position">Right</mdb-btn>
            </mdb-btn-group>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-success btn-sm" @click="addAds">Save</button>
          </mdb-modal-footer>
        </mdb-modal>

        <mdb-modal size="md" v-if="editModal" @close="editModal = false">
          <mdb-modal-header>
            <mdb-modal-title>Edit Ads</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body class="text-center">
              <v-snackbar v-model="editsnackbar.snackbar" :top="true" style="margin-top: 70px" :color="editsnackbar.color">
              {{ editsnackbar.text}}
              <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="editsnackbar.snackbar = false"/>
            </v-snackbar>
             <input type="file" style="display: none" @change="onEditImg" ref="pickAddImg"/>
            <img :src="editImgData.preview" @click="$refs.pickAddImg.click()" alt="Ads Image" class="img-thumbnail ads-img">
            <mdb-input type="text" label="Title" placeholder="Have no title? leave empty" v-model="editData.title" outline size="sm"/>
            <mdb-input type="textarea" label="Description" placeholder="Have no description? leave empty" v-model="editData.description" outline size="sm"/>
            <mdb-input type="number" label="Time to change in second" placeholder="Required" v-model="editData.time" outline size="sm"/>
             <mdb-btn-group>
                <mdb-btn color="primary" size="sm" @click="toggleEditPosition" :active="editposition">Left</mdb-btn>
                <mdb-btn color="primary" size="sm" @click="toggleEditPosition" :active="!editposition">Right</mdb-btn>
            </mdb-btn-group>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-success btn-sm" @click="edit">Save changes</button>
          </mdb-modal-footer>
        </mdb-modal>
  </div>
</template>
<script>
import {mdbInput, mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbBtnGroup, mdbBtn } from 'mdbvue'
import axios from 'axios'
export default {
  components: {
    mdbInput, mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbBtnGroup, mdbBtn 
  },
  data() {
    return {
      default_img: require('../../../../../assets/img/placeholder.jpg'),
      deleteModal: false,
      newModal: false,
      editModal: false,
      messageModal: false,
      position: true,
      editposition: true,
      search: '',
      headers: [
        { text: 'No',align: 'left',value: 'post_no'},
        { text: 'Image',align: 'left', value: ''},
        { text: 'Title',align: 'left', value: 'title'},
        { text: 'Description',align: 'left', value: 'description'},
        { text: 'Time',align: 'left', value: 'time'},
        { text: 'Position',align: 'left', value: 'position'},
        { text: 'Action',  align: 'left'},
      ],
      items:[],
      deleteItem: {
        id: 0,
        index: 0,
        main_category: ''
      },
      postData: {
          title: '',
          description: '',
          time: 0,
          position: 'left',
          img: null
      },
      addImgData: {
          selectedImg: null,
          progress: 0,
          msg:'Upload',
          preview: null,
          show: false
        },
      editImgData: {
          selectedImg: null,
          progress: 0,
          msg:'Upload',
          preview: null,
          show: false
        },
        snackbar: {
        snackbar: false,
        text: '',
        color: '',
        timeout: 0
      },
        editsnackbar: {
        snackbar: false,
        text: '',
        color: '',
        timeout: 0
      },
      editData:{}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
      init(){
        axios.get(this.$store.state.server_ip  + '/api/ads')
        .then(res => {
          this.items = res.data
        })
      },
      hideShow(item){
        axios.patch(this.$store.state.server_ip  + '/api/ads/' + item.id,{
          show: !item.show
        }).then(res => {
          item.show = res.data.show
        })
      },
      togglePosition(){
        this.position = !this.position
        if (this.position) {
          this.postData.position = 'left'
        } else {
          this.postData.position = 'right'
        }
      },
      toggleEditPosition(){
        this.editposition = !this.editposition
        if (this.editposition) {
          this.editData.position = 'left'
        } else {
          this.editData.position = 'right'
        }
      },
      addAds(){
          if (this.postData.time == 0) {
            this.snackbar.snackbar = true
            this.snackbar.text = 'The time field is requred'
            this.snackbar.color = 'red darken-2'
            this.snackbar.timeout = 3000
          }else if (this.postData.position == '') {
            this.snackbar.snackbar = true
            this.snackbar.text = 'Please select position'
            this.snackbar.color = 'red darken-2'
            this.snackbar.timeout = 3000
          } else if (this.postData.time < 0) {
            this.snackbar.snackbar = true
            this.snackbar.text = 'Invalid time'
            this.snackbar.color = 'red darken-2'
            this.snackbar.timeout = 3000
          } else {
            if (this.addImgData.selectedImg == null) {
                this.snackbar.snackbar = true
                this.snackbar.text = 'Please wait...'
                this.snackbar.color = 'blue darken-2'
                this.snackbar.timeout = 0
                axios.post(this.$store.state.server_ip  + '/api/ads', this.postData)
                .then(res => {
                    this.items.push(res.data)
                    this.snackbar.snackbar = true
                    this.snackbar.text = 'New ADS add successfuly'
                    this.snackbar.color = 'green darken-2'
                    this.snackbar.timeout = 0
                }).catch(err => {
                if (err.message == 'Network Error') {
                  this.snackbar.snackbar = false
                  this.snackbar.snackbar = true
                  this.snackbar.text = 'Connection faild'
                  this.snackbar.color = 'red darken-2'
                  this.snackbar.timeout = 3000
                }else{
                  this.snackbar.snackbar = false
                  this.snackbar.snackbar = true
                  this.snackbar.text = 'Something went wrong, try again'
                  this.snackbar.color = 'red darken-2'
                  this.snackbar.timeout = 3000
                }
              })
            }else{
                let formData = new FormData();
                formData.append('file',this.addImgData.selectedImg)
                axios.post(this.$store.state.server_ip +'/api/containers/ads/upload',formData,{
                    onUploadProgress: uploadEvent => {
                    this.snackbar.snackbar = true
                    this.snackbar.text = 'Please wait...'
                    this.snackbar.color = 'blue darken-2'
                    this.snackbar.timeout = 0
                    }
                }).then(res => {
                    this.postData.img = res.data.result.files.file[0].name
                    axios.post(this.$store.state.server_ip  + '/api/ads', this.postData)
                    .then(res => {
                        this.items.push(res.data)
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'New ADS add successfuly'
                        this.snackbar.color = 'green darken-2'
                        this.snackbar.timeout = 0
                    }).catch(err => {
                        if (err.message == 'Network Error') {
                        this.snackbar.snackbar = false
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'Connection faild'
                        this.snackbar.color = 'red darken-2'
                        this.snackbar.timeout = 3000
                        }else{
                        this.snackbar.snackbar = false
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'Something went wrong, try again'
                        this.snackbar.color = 'red darken-2'
                        this.snackbar.timeout = 3000
                        }
                    })
                })
            }
          }
      },
      dlt(){
        axios.delete(this.$store.state.server_ip  + '/api/ads/'+this.deleteItem.id)
        .then(res => {
          this.items.splice(this.deleteItem.index,1)
          this.deleteModal = false
        })
      },
      edit(){
        axios.patch(this.$store.state.server_ip  + '/api/ads/'+this.editData.id, this.editData)
        .then(res => {
          this.items[this.editData.index] = res.data
          this.editModal = false
          this.editImgData.selectedImg = null
          this.editsnackbar.snackbar = false
          this.editImgData.preview = null
        })
        if (this.editData.time == 0) {
            this.editsnackbar.snackbar = true
            this.editsnackbar.text = 'The time field is requred'
            this.editsnackbar.color = 'red darken-2'
            this.editsnackbar.timeout = 3000
          }else if (this.editData.time < 0) {
            this.editsnackbar.snackbar = true
            this.editsnackbar.text = 'Invalid time'
            this.editsnackbar.color = 'red darken-2'
            this.editsnackbar.timeout = 3000
          } else {
            if (this.editImgData.selectedImg == null) {
                this.editsnackbar.snackbar = true
                this.editsnackbar.text = 'Please wait...'
                this.editsnackbar.color = 'blue darken-2'
                this.editsnackbar.timeout = 0
                axios.patch(this.$store.state.server_ip  + '/api/ads/'+this.editData.id, this.editData)
                .then(res => {
                    this.items[this.editData.index] = res.data
                    this.editModal = false
                    this.editImgData.selectedImg = null
                    this.editsnackbar.snackbar = false
                    this.init()

                }).catch(err => {
                if (err.message == 'Network Error') {
                  this.editsnackbar.snackbar = false
                  this.editsnackbar.snackbar = true
                  this.editsnackbar.text = 'Connection faild'
                  this.editsnackbar.color = 'red darken-2'
                  this.editsnackbar.timeout = 3000
                }else{
                  this.editsnackbar.snackbar = false
                  this.editsnackbar.snackbar = true
                  this.editsnackbar.text = 'Something went wrong, try again'
                  this.editsnackbar.color = 'red darken-2'
                  this.editsnackbar.timeout = 3000
                }
              })
            }else{
                let formData = new FormData();
                formData.append('file',this.editImgData.selectedImg)
                axios.post(this.$store.state.server_ip +'/api/containers/ads/upload',formData,{
                    onUploadProgress: uploadEvent => {
                    this.editsnackbar.snackbar = true
                    this.editsnackbar.text = 'Please wait...'
                    this.editsnackbar.color = 'blue darken-2'
                    this.editsnackbar.timeout = 0
                    }
                }).then(res => {
                    this.editData.img = res.data.result.files.file[0].name
                    axios.patch(this.$store.state.server_ip  + '/api/ads/'+this.editData.id, this.editData)
                    .then(res => {
                        this.items[this.editData.index] = res.data
                        this.editModal = false
                        this.editImgData.selectedImg = null
                        this.init()
                    }).catch(err => {
                        if (err.message == 'Network Error') {
                        this.editsnackbar.snackbar = false
                        this.editsnackbar.snackbar = true
                        this.editsnackbar.text = 'Connection faild'
                        this.editsnackbar.color = 'red darken-2'
                        this.editsnackbar.timeout = 3000
                        }else{
                        this.editsnackbar.snackbar = false
                        this.editsnackbar.snackbar = true
                        this.editsnackbar.text = 'Something went wrong, try again'
                        this.editsnackbar.color = 'red darken-2'
                        this.editsnackbar.timeout = 3000
                        }
                    })
                })
            }
          }
      },
      launchDeleteModal(item,index){
        this.deleteItem.id = item.id
        this.deleteItem.index = index
        this.deleteItem.main_category = item.main_category
        this.deleteModal = true
      },
      launchEditModal(item,index){
        this.editData = Object.assign({}, item)
        this.editData.index = index
        this.editposition = item.position == 'left'? true: false;
        this.editImgData.preview = item.img == null ? this.default_img : this.$store.state.server_ip + '/api/containers/ads/download/' + item.img;
        this.editModal = true
      },
      onAddImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.snackbar.snackbar = true
          this.snackbar.text = 'Please select image'
          this.snackbar.color = 'red darken-2'
          this.snackbar.timeout = 3000
        }else{
          this.addImgData.selectedImg = e.target.files[0];
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[0])
          reader.onload = event => {
            this.addImgData.preview = event.target.result;
          }
        }
      },
      onEditImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.editsnackbar.snackbar = true
          this.editsnackbar.text = 'Please select image'
          this.editsnackbar.color = 'red darken-2'
          this.editsnackbar.timeout = 3000
        }else{
          this.editImgData.selectedImg = e.target.files[0];
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[0])
          reader.onload = event => {
            this.editImgData.preview = event.target.result;
          }
        }
      },
      isFileImage(file) {
          return file && file['type'].split('/')[0] === 'image';
      }
  },
}
</script>
<style scoped>
  .icons{
    cursor: pointer;
  }
  .cancel-modal-header{
      background-color: red;
      padding-left: 35%
  }
  .req-modal-header{
      background-color: #33b5e5;
      padding-left: 35%
  }
  .item-img{
    height: 40px;
    width: 40px;
    margin-top: 10px;
  }
  .req-avater{
        height: 50px;
        width: 50px;
    }
    .main-contetn{
      padding: 2% 5%
  }
  .ads-img{
      height: 200px;
      width: 70%;
      cursor: pointer;
  }
</style>

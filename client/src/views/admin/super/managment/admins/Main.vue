<template>
  <div class="main-contetn">
   <div class="float-left">
      <div style="margin-bottom: -100px" class="input-group">
        <mdb-input type="text" label="Search admins" style="width: 200px" v-model="search" outline size="sm"/>
        <div style="margin-top: 20px"><button class="btn btn-primary btn-sm" @click="newModal = true"><i class="fa fa-plus"/> new Admin</button></div>
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
       <td class="text-xs-left"  style="width: 600px">{{props.item.username}}</td>
       <td class="text-xs-left"  style="width: 600px">{{props.item.email}}</td>
       <td class="text-xs-left"  style="width: 600px">
           <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" @change="mgnPermmision('user',props.item.permmisions)" class="custom-control-input" v-model="props.item.permmisions.user" :id="'user'+props.item.permmisions.id">
                <label class="custom-control-label" :for="'user'+props.item.permmisions.id"><i class="fa fa-user mr-1 perm-icons"/></label>
            </div>
            <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" @change="mgnPermmision('post',props.item.permmisions)" class="custom-control-input" v-model="props.item.permmisions.post" :id="'post'+props.item.permmisions.id">
                <label class="custom-control-label" :for="'post'+props.item.permmisions.id"><i class="fa fa-newspaper mr-1 perm-icons"/></label>
            </div>

            <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" @change="mgnPermmision('ads',props.item.permmisions)" class="custom-control-input" v-model="props.item.permmisions.ads" :id="'ads'+props.item.permmisions.id">
                <label class="custom-control-label" :for="'ads'+props.item.permmisions.id"><i class="fa fa-ad perm-icons"/></label>
            </div>
       </td>
       <td class="text-xs-left px-0" style="width: 700px">
            <span @click="mngLogin(props.item)" v-if="props.item.permmisions.active"><i class="fa fa-user-lock text-success icons"/></span>
            <span @click="mngLogin(props.item)" v-if="!props.item.permmisions.active"><i class="fa fa-user-lock text-warning icons"/></span>
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
            <mdb-modal-title>New Admin</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body class="text-center">
              <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
              {{ snackbar.text}}
              <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
            </v-snackbar>
            <mdb-input type="text" label="Username" v-model="postData.username" outline size="sm"/>
            <mdb-input type="text" label="Email" v-model="postData.email" outline size="sm"/>
            <mdb-input :type="showPass ? 'tetx' : 'password'" v-model="postData.password" class="mt-0 mb-3" outline label="Password" ariaDescribedBy="button-addon2">
                <mdb-btn color= '' size="sm" group slot="append" id="button-addon2" @click="showPass = !showPass"><i :class="showPass ? 'fa fa-eye-slash' : 'fa fa-eye'"></i></mdb-btn>
            </mdb-input>
            <mdb-input :type="showConfPass ? 'tetx' : 'password'" v-model="re_pass" class="mt-0 mb-3" outline label="Re-password" ariaDescribedBy="button-addon2">
                <mdb-btn color= '' size="sm" group slot="append" id="button-addon2" @click="showConfPass = !showConfPass"><i :class="showConfPass ? 'fa fa-eye-slash' : 'fa fa-eye'"></i></mdb-btn>
            </mdb-input>
            <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" v-model="permmision.user" id="add">
                <label class="custom-control-label" for="add"><i class="fa fa-user mr-1 perm-icons"/></label>
            </div>
            <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" v-model="permmision.post" id="edit">
                <label class="custom-control-label" for="edit"><i class="fa fa-newspaper mr-1 perm-icons"/></label>
            </div>

            <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" v-model="permmision.ads" id="delete">
                <label class="custom-control-label" for="delete"><i class="fa fa-ad perm-icons"/></label>
            </div>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-success btn-sm" @click="addAdmin">Save</button>
          </mdb-modal-footer>
        </mdb-modal>
  </div>
</template>
<script>
import {mdbInput, mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbBtnGroup, mdbBtn, mdbIcon } from 'mdbvue'
import axios from 'axios'
export default {
  components: {
    mdbInput, mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, mdbBtnGroup, mdbBtn, mdbIcon
  },
  data() {
    return {
      passed: false,
      showPass: false,
      showConfPass: false,
      default_img: require('../../../../../assets/img/placeholder.jpg'),
      deleteModal: false,
      newModal: false,
      search: '',
      headers: [
        { text: 'No',align: 'left',value: 'post_no'},
        { text: 'Username',align: 'left', value: 'username'},
        { text: 'Email',align: 'left', value: 'email'},
        { text: 'Permmision',align: 'left', value: 'permmision'},
        { text: 'Action',  align: 'left'},
      ],
      items:[],
      deleteItem: {
        adminid: 0,
        permmision: 0,
        index: 0,
      },
      postData: {
          username: '',
          email: '',
          password: '',
          role: '',
      },
      permmision: {
          user: true,
          post: true,
          ads: true,
          active: true
      },
      re_pass: '',
        snackbar: {
        snackbar: false,
        text: '',
        color: '',
        timeout: 0
      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
      init(){
        let filter = {
            include: ['permmisions'],
            where: {
              role: 'sub'
            }
        }
        axios.get(this.$store.state.server_ip  + '/api/admins?filter=' + JSON.stringify(filter))
        .then(res => {
          this.items = res.data
        })
      },
      mgnPermmision(per, permmision){ 

        
        switch (per) {
            case 'user':
                axios.patch(this.$store.state.server_ip  + '/api/permmisions/' + permmision.id,{
                    user: permmision.user
                })
                break;
            case 'post':
                axios.patch(this.$store.state.server_ip  + '/api/permmisions/' + permmision.id,{
                    post: permmision.post
                })
                break;
            case 'ads':
                axios.patch(this.$store.state.server_ip  + '/api/permmisions/' + permmision.id,{
                    ads: permmision.ads
                })
                break;
          }
      },
      mngLogin(item){
        axios.patch(this.$store.state.server_ip  + '/api/permmisions/' + item.permmisions.id,{
          active: !item.permmisions.active
        }).then(res => {
          item.permmisions.active = res.data.active
        })
      },
      addAdmin(){
          this.checkEmpty(this.postData)
            if (this.passed) {
                if (this.re_pass == '') {
                    this.snackbar.snackbar = true
                    this.snackbar.text = 'Please confirm password'
                    this.snackbar.color = 'red darken-2'
                }else if (this.postData.password != this.re_pass) {
                    this.snackbar.snackbar = true
                    this.snackbar.text = 'Password is not match'
                    this.snackbar.color = 'red darken-2'
                }else{
                    this.snackbar.snackbar = false
                    this.snackbar.snackbar = true
                    this.snackbar.text = 'Please wait...'
                    this.snackbar.color = 'blue darken-2'
                    this.snackbar.timeout = 3000
                    axios.post(this.$store.state.server_ip + '/api/admins/addadmin',{admin: this.postData, permmision: this.permmision})
                    .then(res => {
                        this.init()
                        this.snackbar.snackbar = false
                        this.snackbar.snackbar = true
                        this.snackbar.text = 'New admin added successfully'
                        this.snackbar.color = 'green darken-2'
                        this.snackbar.timeout = 3000
                    }).catch(err =>{
                        if (err.message == 'Network Error') {
                            this.snackbar.snackbar = false
                            this.snackbar.snackbar = true
                            this.snackbar.text = 'Connection faild'
                            this.snackbar.color = 'red darken-2'
                            this.snackbar.timeout = 3000
                        }else{
                            this.snackbar.snackbar = false
                            this.snackbar.snackbar = true
                            this.snackbar.text = err.response.data.error.message
                            this.snackbar.color = 'red darken-2'
                            this.snackbar.timeout = 3000
                        }
                    })
                }
            }
      },
      dlt(){
        axios.delete(this.$store.state.server_ip  + '/api/admins/'+ this.deleteItem.adminid + '/' + this.deleteItem.permmisionid + '/deleteadmin')
        .then(res => {
          this.items.splice(this.deleteItem.index,1)
          this.deleteModal = false
        })
      },
      launchDeleteModal(item,index){
        this.deleteItem.adminid = item.id
        this.deleteItem.permmisionid = item.permmisions.id
        this.deleteItem.index = index
        this.deleteModal = true
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
            }else if (key == 'email' && !this.validateEmail(obj[key])) {
              this.snackbar.snackbar = true
                this.snackbar.text = "invalid email address"
                this.snackbar.color = 'red darken-2'
                this.passed = false
                break
            }else if (key == 'password' && !this.checkPass(obj[key])) {
                this.snackbar.snackbar = true
                this.snackbar.text = "Please make your password strong, include Uppercase, lowercase and numbers"
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
  .perm-icons{
      margin-top: 5px
  }
</style>

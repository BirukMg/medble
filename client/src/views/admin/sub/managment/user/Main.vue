<template>
  <div class="main-contetn">
   <div class="float-left">
      <div style="margin-bottom: -100px">
        <mdb-input type="text" label="Search users" style="width: 200px" v-model="search" outline size="sm"/>
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
          <img :src="props.item.img == null ? default_img : $store.state.server_ip + '/api/containers/user/download/' + props.item.img" class="item-img" alt="post image">
        </td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.full_name}}</td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.address}}</td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.email}}</td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.username}}</td>
       <td class="text-xs-left"  style="width: 500px">
           <span :class="showPasss ? '' : 'hide'">{{props.item.password}}</span>
           <span @click="showPass(props.item)" v-if="!props.item.showPass"><i class="fa fa-eye float-right icons"/></span>
           <span @click="showPass(props.item)" v-if="props.item.showPass"><i class="fa fa-eye-slash float-right icons"/></span>
        </td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.account_type}}</td>
       <td class="text-xs-left px-0" style="width: 700px">
            <span @click="mngLogin(props.item)" v-if="props.item.active"><i class="fa fa-user-lock text-success icons"/></span>
            <span @click="mngLogin(props.item)" v-if="!props.item.active"><i class="fa fa-user-lock text-warning icons"/></span>
            <span @click="launchDeleteModal(props.item, items.indexOf(props.item))"><i class="fa fa-trash text-danger icons"/></span>
            <span><i class="fa fa- text-danger"/></span>
            <router-link  v-if="JSON.parse($store.state.adminInfo).permmisions.post" :to="`/${$i18n.locale}/admin/sub/manage users/post/` + props.item.id">
              <span><i class="fa fa-newspaper text-info icons"/></span>
            </router-link>
            <span><i class="fa fa-arrow-circle-up text-secondary icons"/></span>
       </td>
      </template>
    </v-data-table>
   </v-app>
   <mdb-modal size="md" v-if="deleteModal" @close="deleteModal = false">
          <mdb-modal-header class="cancel-modal-header">
            <mdb-modal-title class="text-white">Are you sure?</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body class="text-center">
            <i class="fa fa-times fa-4x animated rotateIn" style="color:red"></i>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-danger btn-sm" @click="dltAccount">Delete account only</button>
            <button class="btn btn-danger btn-sm" @click="dltWithposts">Delete with posts</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal = false">Cancel</button>
          </mdb-modal-footer>
        </mdb-modal>

        <mdb-modal v-if="messageModal" @close="messageModal = false">
          <mdb-modal-header class="req-modal-header">
            <mdb-modal-title class="text-white">Requests</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
            <div v-for="(i,index) in reqData" :key="index">
                <div class="row">
                <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 ">
                    <img :src="i == null ? default_img : $store.state.server_ip + '/api/containers/post/download/' + i.avatar" class="rounded-circle z-depth-1-half req-avater">
                </div>
                <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 ">
                </div>
                <div class="col-sm-7 col-md-7 col-lg-7 col-xl-7">
                    <a class="text-primary font-weight-bold">{{i.user_name}}</a>
                    <div class="date">{{new Date(i.date).toString().substring(0,16)}}</div>
                </div>
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <span class="input-group float-right">
                      <h6 v-if="i.status == 'rejected'" class="font-weight-bold text-danger mr-1">Rejected</h6>
                      <h6 v-if="i.status == 'accepted'" class="font-weight-bold text-success mr-1">Accepted</h6>
                      <span @click="mngSatus('accepted',i,index)" v-if="i.status == 'rejected' || i.status == 'pendding'"><i class="fa fa-check text-success mr-1 icons"></i></span>
                      <span @click="mngSatus('rejected',i,index)" v-if="i.status == 'accepted' || i.status == 'pendding'"><i class="fa fa-times text-danger mr-1 icons"></i></span>
                    </span>
                </div>
                </div>
                <div class="row">
                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2 ">
                    </div>
                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                        <p class="dark-grey-text mb-lg-0 mb-md-5 mb-4">
                            {{i.message}}
                        </p>
                    </div>
                </div>
            </div>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-outline-info btn-sm" @click="messageModal = false">Close</button>
          </mdb-modal-footer>
        </mdb-modal>
  </div>
</template>
<script>
import {mdbInput, mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, } from 'mdbvue'
import axios from 'axios'

export default {
  components: {
    mdbInput, mdbModal,mdbModalHeader,mdbModalTitle,mdbModalBody,mdbModalFooter, 
  },
  data() {
    return {
      default_img: require('../../../../../assets/img/placeholder.jpg'),
      deleteModal: false,
      messageModal: false,
      search: '',
      headers: [
        { text: 'No',align: 'left',value: 'post_no'},
        { text: 'Image',align: 'left', value: ''},
        { text: 'Full name',align: 'left', value: 'title'},
        { text: 'Address',align: 'left', value: 'category'},
        { text: 'Email',align: 'left', value: 'main_category'},
        { text: 'Username',align: 'left', value: 'title'},
        { text: 'Password',align: 'left', value: 'title'},
        { text: 'Account type',align: 'left', value: 'description'},
        { text: 'Action',  align: 'left'},
      ],
      items:[],
      deleteItem: {
        id: 0,
        accountid: 0,
        index: 0,
        main_category: ''
      },
      reqData: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
      init(){
        axios.get(this.$store.state.server_ip  + '/api/accounts/')
        .then(res => {
          this.items = res.data
          this.items.forEach(element => {
            element.showPass = false
          });
        })
      },
      showPass(pass){
        pass.showPass= !pass.showPass
      },
      mngLogin(item){
        axios.patch(this.$store.state.server_ip  + '/api/accounts/' + item.id,{
          active: !item.active
        }).then(res => {
          item.active = res.data.active
        })
      },
      dltAccount(){
        axios.delete(this.$store.state.server_ip  + '/api/medbleusers/' + this.deleteItem.id + '/deleteaccount')
        .then(res => {
          this.items.splice(this.deleteItem.index,1)
          this.deleteModal = false
        })
      },
      dltWithposts(){
        axios.delete(this.$store.state.server_ip  + '/api/medbleusers/' + this.deleteItem.id + '/' +  this.deleteItem.accountid +'/deletewithposts')
        .then(res => {
          this.items.splice(this.deleteItem.index,1)
          this.deleteModal = false
        })
      },
      launchDeleteModal(item,index){
        this.deleteItem.id = item.medbleuser_id
        this.deleteItem.accountid = item.id
        this.deleteItem.index = index
        this.deleteItem.main_category = item.main_category
        this.deleteModal = true
      },
      launchMessageModal(item,index){
        this.messageModal = true
        this.reqData = []
        axios.get(this.$store.state.server_ip + '/api/requests/'+ item.id +'/getRequest')
        .then(res => {
          this.reqData = res.data.data
        })
      },
      mngSatus(value,item,index){
        axios.patch(this.$store.state.server_ip + '/api/requests/' + item.id, {
          status: value
        }).then(res=> {
          this.reqData[index].status = res.data.status
        })
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
  .hide{
    -webkit-text-security:disc;
    }
</style>

<template>
  <div class="container">
   <div class="row">
      <div>
        <mdb-input type="text" :label="$t('managment.post.Search your posts')" v-model="search" outline size="sm"/>
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
          <img :src="props.item.img.length == 0 ? default_img : $store.state.server_ip + '/api/containers/post/download/' + props.item.img[0]" class="item-img" alt="post image">
        </td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.title}}</td>
       <td class="text-xs-left"  style="width: 300px">{{$t('category.' + props.item.main_category + '.' + props.item.category.toLowerCase())}}</td>
       <td class="text-xs-left"  style="width: 300px">{{$t('category.' + props.item.main_category + '.' + props.item.main_category.toUpperCase())}}</td>
       <td class="text-xs-left"  style="width: 600px">{{props.item.description | truncate(100)}}</td>
       <td class="text-xs-left px-0" style="width: 700px">
            <span v-if="props.item.show" @click="hideShow(props.item)"><i style="margin-left: 15px" class="fa fa-eye-slash mr-1 icons" size="lg"/></span>
            <span v-if="!props.item.show" @click="hideShow(props.item)"><i style="margin-left: 15px" class="fa fa-eye mr-1 icons" size="lg"/></span>
            <span @click="launchDeleteModal(props.item,items.indexOf(props.item))"><i style="margin-left: 15px" class="fa fa-trash mr-1 icons text-danger" size="lg"/></span>
            <span @click="launchMessageModal(props.item,items.indexOf(props.item))" v-if="props.item.main_category == 'marchandise' || props.item.main_category == 'houses' || props.item.main_category == 'vehicles'"><i style="margin-left: 15px" class="fa fa-envelope mr-1 icons text-info" size="lg"/></span>
            <router-link :to="`/${$i18n.locale}/my post/view/` + props.item.main_category + '/' + props.item.id">
              <span><i style="margin-left: 15px" class="fa fa-ellipsis-h mr-1 icons text-info" size="lg"/></span>
            </router-link>
       </td>
      </template>
    </v-data-table>
   </v-app>
   <mdb-modal size="sm" v-if="deleteModal" @close="deleteModal = false">
          <mdb-modal-header class="cancel-modal-header">
            <mdb-modal-title class="text-white">{{$t('post.delete.Are you sure')}}</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body class="text-center">
            <i class="fa fa-times fa-4x animated rotateIn" style="color:red"></i>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-danger btn-sm" @click="dlt">{{$t('post.delete.Yes')}}</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal = false">{{$t('post.delete.No')}}</button>
          </mdb-modal-footer>
        </mdb-modal>

        <mdb-modal v-if="messageModal" @close="messageModal = false">
          <mdb-modal-header class="req-modal-header text-center">
            <mdb-modal-title class="text-white">{{$t('managment.Requests.Requests')}}</mdb-modal-title>
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
                      <h6 v-if="i.status == 'rejected'" class="font-weight-bold text-danger mr-1">{{$t('managment.Requests.Rejected')}}</h6>
                      <h6 v-if="i.status == 'accepted'" class="font-weight-bold text-success mr-1">{{$t('managment.Requests.Accepted')}}</h6>
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
            <button class="btn btn-outline-info btn-sm" @click="messageModal = false">{{$t('managment.Requests.Close')}}</button>
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
      default_img: require('../../../../assets/img/placeholder.jpg'),
      deleteModal: false,
      messageModal: false,
      search: '',
      headers: [
        { text: this.$t('managment.post.No'),align: 'left',value: 'post_no'},
        { text: this.$t('managment.post.Image'),align: 'left', value: ''},
        { text: this.$t('managment.post.Title'),align: 'left', value: 'title'},
        { text: this.$t('managment.post.Category'),align: 'left', value: 'category'},
        { text: this.$t('managment.post.Main category'),align: 'left', value: 'main_category'},
        { text: this.$t('managment.post.Description'),align: 'left', value: 'description'},
        { text: this.$t('managment.post.Action'),  align: 'left'},
      ],
      items:[],
      deleteItem: {
        id: 0,
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
        axios.get(this.$store.state.server_ip  + '/api/posts/'+ JSON.parse(this.$store.state.account).id +'/getpost')
        .then(res => {
          this.items = res.data.data
          this.items.forEach(element => {
            if (element.img == null) {
              element.img = []
            }else{
              element.img = element.img.split(",")
            }
          });
        })
      },
      hideShow(item){
        axios.patch(this.$store.state.server_ip  + '/api/posts/' + item.id,{
          show: !item.show
        }).then(res => {
          item.show = res.data.show
        })
      },
      dlt(){
        axios.post(this.$store.state.server_ip  + '/api/posts/deletepost',{
          post_id: this.deleteItem.id,
          main_category: this.deleteItem.main_category
        }).then(res => {
          this.items.splice(this.deleteItem.index,1)
          this.deleteModal = false
        })
      },
      launchDeleteModal(item,index){
        this.deleteItem.id = item.id
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
</style>

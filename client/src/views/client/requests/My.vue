<template>
  <div class="container">
   <div class="row">
      <div>
        <mdb-input type="text" label="Search your posts" v-model="search" outline size="sm"/>
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
       <td class="text-xs-left"  style="width: 300px">{{props.item.title}}</td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.category}}</td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.main_category}}</td>
       <td class="text-xs-left"  style="width: 600px">{{props.item.message | truncate(100)}} <span @click="launchEditModal(props.item,items.indexOf(props.item))"><i class="fa fa-pen text-info icons mr-1" /></span> </td>
       <td class="text-xs-left"  style="width: 600px">{{new Date(props.item.date).toString().substring(0,16)}}</td>
       <td class="text-xs-left"  style="width: 600px">
         <h6 class="text-capitalize text-warning" v-if="props.item.status == 'pendding'">{{props.item.status}}</h6>
         <h6 class="text-capitalize text-danger" v-if="props.item.status == 'rejected'">{{props.item.status}}</h6>
         <h6 class="text-capitalize text-success" v-if="props.item.status == 'accepted'">{{props.item.status}}</h6>
       </td>
       <td class="text-xs-left px-0" style="width: 300px">
            <span @click="launchDeleteModal(props.item,items.indexOf(props.item))"><i style="margin-left: 15px" class="fa fa-times mr-1 icons text-danger" size="lg"/></span>
            <router-link :to="`/${$i18n.locale}/detail/` + props.item.post_id">
              <span><i style="margin-left: 15px" class="fa fa-eye mr-1 icons" size="lg"/></span>
            </router-link>
       </td>
      </template>
    </v-data-table>
   </v-app>
   <mdb-modal size="sm" v-if="deleteModal" @close="deleteModal = false">
          <mdb-modal-header class="cancel-modal-header">
            <mdb-modal-title class="text-white">Are you sure?</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
            <i class="fa fa-times fa-4x animated rotateIn" style="color:red"></i>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-danger btn-sm" @click="cancelReq">Yes</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal = false">No</button>
          </mdb-modal-footer>
        </mdb-modal>


         <mdb-modal size="sm" v-if="editModal" @close="editModal = false">
          <mdb-modal-header>
            <mdb-modal-title>Edit your message</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
            <mdb-input type="textarea" label="Message" :row="4" v-model="editData.message" outline size="sm"/>
          </mdb-modal-body>
          <mdb-modal-footer>
            <button class="btn btn-info btn-sm" @click="editMessage">Save changes</button>
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
      default_img: require('../../../assets/img/placeholder.jpg'),
      deleteModal: false,
      editModal: false,
      search: '',
      headers: [
        { text: 'No',align: 'left',value: 'post_no'},
        { text: 'Title',align: 'left', value: 'title'},
        { text: 'Category',align: 'left', value: 'category'},
        { text: 'Main category',align: 'left', value: 'main_category'},
        { text: 'Message',align: 'left', value: 'message'},
        { text: 'Date',align: 'left', value: 'date'},
        { text: 'Status',align: 'left', value: 'status'},
        { text: 'Action',  align: 'left'},
      ],
      items:[],
      deleteItem: {
        id: 0,
        index: 0,
        main_category: ''
      },
      reqData: [],
      editData: {},
      editIndex: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
      init(){
        axios.get(this.$store.state.server_ip  + '/api/requests/'+ JSON.parse(this.$store.state.account).id +'/getmyrequest')
        .then(res => {
          this.items = res.data.data
        })
      },
      cancelReq(){
        axios.delete(this.$store.state.server_ip  + '/api/requests/' + this.deleteItem.id)
        .then(res => {
          this.items.splice(this.deleteItem.index,1)
          this.deleteModal = false
        })
      },
      launchDeleteModal(item,index){
        this.deleteItem.id = item.req_id
        this.deleteItem.index = index
        this.deleteModal = true
      },
      launchEditModal(item,index){
        this.editData = Object.assign({},item)
        this.editIndex = index
        this.editModal = true
      },
      editMessage(){
        axios.patch(this.$store.state.server_ip  + '/api/requests/' + this.editData.req_id,{
          message: this.editData.message
        })
        .then(res => {
          this.items[this.editIndex].message = res.data.message 
          this.editModal = false
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
  .item-img{
    height: 40px;
    width: 40px;
    margin-top: 10px;
  }
</style>

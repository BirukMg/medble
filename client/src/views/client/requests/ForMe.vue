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
        <td class="text-xs-left px-0"  style="width: 300px">
          <img :src="props.item.img.length == 0 ? default_img : $store.state.server_ip + '/api/containers/post/download/' + props.item.img[0]" class="item-img" alt="post image">
        </td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.title}}</td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.category}}</td>
       <td class="text-xs-left"  style="width: 300px">{{props.item.main_category}}</td>
       <td class="text-xs-left"  style="width: 600px">{{props.item.description | truncate(100)}}</td>
       <td class="text-xs-left px-0" style="width: 300px">
            <span v-if="props.item.show" @click="hideShow(props.item)"><i style="margin-left: 15px" class="fa fa-eye-slash mr-1 icons" size="lg"/></span>
            <span v-if="!props.item.show" @click="hideShow(props.item)"><i style="margin-left: 15px" class="fa fa-eye mr-1 icons" size="lg"/></span>
            <span @click="launchDeleteModal(props.item,items.indexOf(props.item))"><i style="margin-left: 15px" class="fa fa-trash mr-1 icons text-danger" size="lg"/></span>
            <router-link :to="`/${$i18n.locale}/my post/view/` + props.item.main_category + '/' + props.item.id">
              <span><i style="margin-left: 15px" class="fa fa-ellipsis-h mr-1 icons text-info" size="lg"/></span>
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
            <button class="btn btn-danger btn-sm" @click="dlt">Yes</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal = false">No</button>
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
      search: '',
      headers: [
        { text: 'No',align: 'left',value: 'post_no'},
        { text: 'Image',align: 'left', value: ''},
        { text: 'Title',align: 'left', value: 'title'},
        { text: 'Category',align: 'left', value: 'category'},
        { text: 'Main category',align: 'left', value: 'main_category'},
        { text: 'Description',align: 'left', value: 'description'},
        { text: 'Action',  align: 'left'},
      ],
      items:[],
      deleteItem: {
        id: 0,
        index: 0,
        main_category: ''
      }
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

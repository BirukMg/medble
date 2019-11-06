<template>
    <!-- <v-app> -->
      <div class="container ">
        <section v-if="postData != null">
          <div>
            <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
              {{ snackbar.text}}
              <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
            </v-snackbar>
            <div class="row">
            <div class="col-6">
              <h6 style="float: left" class="font-weight-bold">{{$t('post.category')}}: <span class="text-secondary font-weight-bold text-capitalize">{{$t('category.marchandise.' + 'marchandise'.toUpperCase())}} ({{$t('category.marchandise.' + postData.category.toLowerCase())}})</span></h6>
              <div class="form-group">
                <mdb-input type="text" :label="$t('post.title')" v-model="postData.title" outline size="sm"/>
              </div>
              <div class="form-group">
                <mdb-input type="textarea" :label="$t('post.description')" :row="4" v-model="postData.description" outline size="sm"/>
              </div>
              <div class="form-group">
                <label for="category" style="float: left">{{$t('post.Select category')}}</label>
                <select id="category" class="browser-default custom-select custom-select-sm" v-model="postData.category">
                  <option v-for="(i,index) in marchandise" :key="i" :value="marchandise[index]">{{$t('category.marchandise.' + i.toLowerCase())}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="state" style="float: left">{{$t('post.city')}}</label>
                <select id="state" class="browser-default custom-select custom-select-sm" v-model="postData.city">
                  <option value="Addis Ababa">{{$t('post.citylist.Addis Ababa')}}</option>
                  <option value="Adama | Nazreth">{{$t('post.citylist.Adama | Nazreth')}}</option>
                  <option value="Arba Minch">{{$t('post.citylist.Arba Minch')}}</option>
                  <option value="Bahir Dar">{{$t('post.citylist.Bahir Dar')}}</option>
                  <option value="Debre Zeit | Bishoftu">{{$t('post.citylist.Debre Zeit | Bishoftu')}}</option>
                  <option value="Dessie">{{$t('post.citylist.Dessie')}}</option>
                  <option value="Dire Dawa">{{$t('post.citylist.Dire Dawa')}}</option>
                  <option value="Gonder">{{$t('post.citylist.Gonder')}}</option>
                  <option value="Hawassa">{{$t('post.citylist.Hawassa')}}</option>
                  <option value="Mekelle">{{$t('post.citylist.Mekelle')}}</option>
                  <option value="Shashemene">{{$t('post.citylist.Shashemene')}}</option>
                  <option value="Others">{{$t('post.citylist.Other')}}</option>
                </select>
              </div>
              <div class="row">
              <div class="col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                       <select class="custom-select custom-select-sm" outline v-model="postData.currency">
                          <option value="Birr">{{$t('post.birr')}}</option>
                          <option>$</option>
                          <option>‎€</option>
                          <option>£</option>
                        </select>
                  </div>
                  <mdb-input type="number" :label="$t('post.price')" v-model="postData.price" outline size="sm" style="margin-top: 0; height: 20px"/>
                  <div class="input-group-append">
                    <select class="custom-select custom-select-sm" v-model="postData.price_type">
                      <option value="Fixed">{{$t('post.Fixed')}}</option>
                      <option value="Slightly Negotiable">{{$t('post.Slightly negotiable')}}</option>
                      <option value="Negotiable">{{$t('post.Negotiable')}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <mdb-input type="number" :label="$t('post.phonenumber')" v-model="postData.phone_number" outline size="sm"/>
            </div>
            <div class="form-group">
              <label style="float: left">{{$t('post.condition')}}</label>
              <select class="custom-select custom-select-sm" v-model="postData.condition">
                <option value="New">{{$t('post.New')}}</option>
                <option value="Slightly Used">{{$t('post.Slightly Used')}}</option>
                <option value="Used">{{$t('post.Used')}}</option>
              </select>
            </div>
            <mdb-btn-group>
                <mdb-btn color="primary" size="sm" @click="toggleStatus" :active="status">{{$t('post.sale')}}</mdb-btn>
                <mdb-btn color="primary" size="sm" @click="toggleStatus" :active="!status">{{$t('post.rent')}}</mdb-btn>
            </mdb-btn-group>
            <div class="img-content">
              <div class="img-list">
                <div class="row">
                  <div class="col-2" v-for="(img,index) in addImgData.preview" :key="img">
                    <img :src="img.file" class="float-left selected-img rounded" alt="..." @dblclick="removeImg(img,index)">
                  </div>
                </div>
                <span style="float: left" v-if="addImgData.preview.length > 0"><p class="text-primary">{{$t('post.removeimg')}}</p></span>
              </div>
              <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg"/>
              <mdb-btn color="primary" class="add-img-btn" size="sm" @click="$refs.pickAddImg.click()"><mdb-icon icon="plus" class="mr-1"/> {{$t('post.addimg')}}</mdb-btn>
            </div>
          </div>
          </div>
          <button type="button" style="width: 50%" class="btn btn-outline-primary btn-sm waves-effect" @click="update">{{$t('managment.Save changes')}}</button>
          </div>
        </section>
    </div>
    <!-- </v-app> -->
</template>
<script>
import {mdbIcon, mdbBtn, mdbInput, mdbBtnGroup} from 'mdbvue'
import axios from 'axios'
export default {
    props: ['item'],
    components:{
      mdbIcon, mdbBtn, mdbInput, mdbBtnGroup
    },
    data() {
    return {
      status: true,
      snackbar: {
        snackbar: false,
        text: '',
        color: '',
        timeout: 0,
      },
      passed: false,
      addImgMsg: {
        title: '',
        styles: '',
        show: false
      },
      postData: null,
      addImgData: {
          selectedImg: [],
          progress: 0,
          msg:'Upload',
          preview: [],
          show: false
        },
     marchandise: ["appliances","clothing","collecting&art","computers","electronices","furniture","musical instruments","health & beauty","sporting Goods","firuts & vegitables","free","other"]
    }
  },
  mounted(){
      axios.get(this.$store.state.server_ip +'/api/posts/' + this.item)
      .then(res => {
        this.postData = Object.assign({}, res.data)
        this.status = res.data.status == 'sale' ? true : false;
        if (this.postData.img == null) {
            // this.postData.img = []
          }else{
            this.postData.img = this.postData.img.split(",")
            this.postData.img.forEach(element => {
              this.addImgData.preview.push({file: this.$store.state.server_ip + '/api/containers/post/download/' + element})
            });
          }
      })
  },
  methods:{
    onAddImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.snackbar.snackbar = true
          this.snackbar.text = this.$t('post.selectimg')
          this.snackbar.color = 'red darken-2'
          this.snackbar.timeout = 3000
        }else if (this.postData.img != null && this.addImgData.selectedImg.length + this.postData.img.length >= 6) {
          this.snackbar.snackbar = true
          this.snackbar.text = this.$t('post.maximumimg')
          this.snackbar.color = 'orange darken-2'
          this.snackbar.timeout = 3000
        }else{
          this.addImgMsg.show = true
          this.addImgData.selectedImg.push(e.target.files[0])
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[0])
          reader.onload = event => {
            this.addImgData.preview.push({file:event.target.result, selectedIndex: this.addImgData.selectedImg.length - 1})
          }
        }
      },
      isFileImage(file) {
          return file && file['type'].split('/')[0] === 'image';
      },
      removeImg(img,index){
        if (this.addImgData.preview[index].file.substring(0,4) == 'http') {
          var img = this.addImgData.preview[index].file.substring(this.$store.state.server_ip.length + '/api/containers/post/download/'.length, this.addImgData.preview[index].length)
          this.postData.img.splice(this.postData.img.indexOf(img),1)
          this.addImgData.preview.splice(index,1)
        }else{
            if (this.addImgData.selectedImg.length == this.addImgData.preview.lenght) {
              this.addImgData.preview.splice(index,1)
              this.addImgData.selectedImg.splice(index,1)
            } else {
              this.addImgData.preview.splice(index,1)
              this.addImgData.selectedImg.splice(img.selectedIndex,1)
              console.log();
            }
        }
      },
      toggleStatus(){
        this.status = !this.status
        if (this.status) {
          this.postData.status = 'sale'
        } else {
          this.postData.status = 'rent'
        }
        // alert(this.postData.status)
      },
      update(){
        this.checkEmpty(this.postData)
        if (this.passed) {
          if (this.addImgData.selectedImg.length == 0) {
            this.snackbar.snackbar = true
            this.snackbar.text = this.$t('post.wait')
            this.snackbar.color = 'blue darken-2'
            this.snackbar.timeout = 0
            if (Array.isArray(this.postData.img) && this.postData.img.length == 0) {
              this.postData.img = null;
            }
            axios.patch(this.$store.state.server_ip +'/api/posts/' + this.item, this.postData)
            .then(res => {
              this.snackbar.snackbar = false
              this.snackbar.snackbar = true
              this.snackbar.text = this.$t('managment.success')
              this.snackbar.color = 'green darken-2'
              this.snackbar.timeout = 3000
              this.$router.push('/' + this.$i18n.locale + '/my post')
            }).catch(err => {
              if (err.message == 'Network Error') { 
                this.snackbar.snackbar = false
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('post.networkerr')
                this.snackbar.color = 'red darken-2'
                this.snackbar.timeout = 3000
              }else{
                this.snackbar.snackbar = false
                this.snackbar.snackbar = true
                this.snackbar.text = this.$t('post.somethingwrong')
                this.snackbar.color = 'red darken-2'
                this.snackbar.timeout = 3000
              }
            })
          } else {
              let formData = new FormData();
              for (let index = 0; index < this.addImgData.selectedImg.length; index++) {
                formData.append('file',this.addImgData.selectedImg[index])
              }
              axios.post(this.$store.state.server_ip +'/api/containers/post/upload',formData,{
                onUploadProgress: uploadEvent => {
                  this.snackbar.snackbar = true
                  this.snackbar.text = this.$t('post.wait')
                  this.snackbar.color = 'blue darken-2'
                  this.snackbar.timeout = 0
                }
              }).then(res => {
                let arry =  this.postData.img == null ? [] : this.postData.img
                for (let index = 0; index < res.data.result.files.file.length; index++) {
                  arry.push(res.data.result.files.file[index].name)
                }
                this.postData.img = arry.toString()
                axios.patch(this.$store.state.server_ip +'/api/posts/' + this.item, this.postData)
                .then(res => {
                  this.snackbar.snackbar = false
                  this.snackbar.snackbar = true
                  this.snackbar.text = this.$t('managment.success')
                  this.snackbar.color = 'green darken-2'
                  this.snackbar.timeout = 3000
                  this.$router.push('/' + this.$i18n.locale + '/my post')
                }).catch(err => {
                  if (err.message == 'Network Error') { 
                    this.snackbar.snackbar = false
                    this.snackbar.snackbar = true
                    this.snackbar.text = this.$t('post.networkerr')
                    this.snackbar.color = 'red darken-2'
                    this.snackbar.timeout = 3000
                  }else{
                    this.snackbar.snackbar = false
                    this.snackbar.snackbar = true
                    this.snackbar.text = this.$t('post.somethingwrong')
                    this.snackbar.color = 'red darken-2'
                    this.snackbar.timeout = 3000
                  }
                })
              })
          }
        }
      },
      checkEmpty(object){
          for (const value in object) {
              if (object.hasOwnProperty(value)) {
                  if (object[value] == '' && value != 'view'&& value != 'img') {
                      this.snackbar.text = this.$t('post.' + value.replace(/_/g, '') + "req")
                      this.snackbar.color = 'red darken-2'
                      this.snackbar.snackbar = true
                      this.snackbar.timeout = 3000
                      this.passed = false
                      break
                      
                  }else if (value == 'email' && !this.validateEmail(object[value])) {
                    this.snackbar.text = object[value] + " is invalid email"
                    this.snackbar.color = 'red darken-2'
                    this.snackbar.snackbar = true
                    this.snackbar.timeout = 3000
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
      phonenumber(inputtxt) {
          var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
          if (inputtxt.value.match(phoneno)){
              return true;
          }
          else {
              alert("message");
              return false;
          }
      }
  }
}
</script>
<style scoped>
    .img-list{
        width: auto;
        height: 25%;
        border-radius: 2px;
        padding: 5px
    }
    .img-content{
      margin-bottom: 5px;
    }
    .selected-img{
      height: 100px;
      width: 100px;
      margin-left: 5spx;
      cursor: pointer;
    }
</style>

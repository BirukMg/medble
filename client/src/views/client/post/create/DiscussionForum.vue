<template>
    <div>
        <section>
      <div class="container">
        <v-snackbar v-model="snackbar.snackbar" :top="true" style="margin-top: 70px" :color="snackbar.color">
          {{ snackbar.text}}
          <i class="fa fa-times text-white float-right" style="cursor: pointer" @click="snackbar.snackbar = false"/>
        </v-snackbar>
        <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <h6 style="float: left">{{$t('post.category')}}: <span class="text-secondary font-weight-bold">{{$t('category.discussion forum.' + 'discussion Forum'.toUpperCase())}} ({{$t('category.discussion forum.' + item.toLowerCase())}})</span></h6>
          <div class="form-group">
            <mdb-input type="text" :label="$t('post.title')" v-model="postData.title" outline size="sm"/>
          </div>
          <div class="form-group">
            <mdb-input type="textarea" :label="$t('post.description')" :row="4" v-model="postData.description" outline size="sm"/>
          </div>
          <div class="img-content">
            <div class="img-list">
              <div class="row">
                <div class="col-2" v-for="(img,index) in addImgData.preview" :key="img">
                  <img :src="img" class="float-left selected-img rounded" alt="..." @dblclick="removeImg(index)">
                </div>
              </div>
              <span style="float: left" v-if="addImgMsg.show"><p class="text-primary">{{$t('post.removeimg')}}</p></span>
            </div>
            <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg"/>
            <mdb-btn color="primary" class="add-img-btn" size="sm" @click="$refs.pickAddImg.click()"><mdb-icon icon="plus" class="mr-1"/>{{$t('post.addimg')}}</mdb-btn>
          </div>
        </div>
        <div class="col-2"></div>
      </div>
      <button type="button" style="width: 50%;margin-top: 30px" class="btn btn-outline-primary btn-sm waves-effect" @click="post">{{$t('post.post')}}</button>
      </div>
    </section>
    </div>
</template>
<script>
import axios from 'axios'
import {mdbBtn,mdbInput, mdbIcon} from 'mdbvue'
export default {
    props: ['item'],
    name: 'Community',
    components: {
      mdbBtn,mdbInput, mdbIcon
    },
    data(){
        return {
            snackbar: {
              snackbar: false,
              text: '',
              color: '',
              timeout: 0
            },
            postData: {
              title: '',
              description: '',
              main_category: 'discussion forum',
              category: this.item,
              imgs:null,
              account_id: JSON.parse(this.$store.state.account).id
            },
            passed: false,
            userId: '',
            add: '',
            addImgMsg: {
              title: '',
              styles: '',
              show: false
            },
            currency: 'Birr',
            postMsg: {
              title: '',
              styles: '',
              show: false
            },
            addImgData: {
              selectedImg: [],
              progress: 0,
              msg:'Upload',
              preview: [],
              show: false
            }
      
        }
    },
    mounted() {
      
    },
    methods: {
      onAddImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.snackbar.snackbar = true
          this.snackbar.text = this.$t('post.selectimg')
          this.snackbar.color = 'red darken-2'
          this.snackbar.timeout = 3000
        }else if (this.addImgData.selectedImg.length > 5) {
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
            this.addImgData.preview.push(event.target.result)
          }
        }
      },
      isFileImage(file) {
          return file && file['type'].split('/')[0] === 'image';
      },
      removeImg(index){
        this.addImgData.selectedImg.splice(this.addImgData.selectedImg.indexOf(index),1)
        this.addImgData.preview.splice(this.addImgData.preview.indexOf(index),1)
        if (this.addImgData.preview.length <= 0) {
          this.addImgMsg.show = false
        }
      },
      post(){
        this.checkEmpty(this.postData,this.snackbar)
        if (this.passed) {
          if (JSON.parse(this.$store.state.account).number_of_posts > this.$store.state.post_limit && JSON.parse(this.$store.state.account).account_type == 'free') {
            this.snackbar.snackbar = true
            this.snackbar.text = this.$t('post.reached limit')
            this.snackbar.color = 'orange darken-2'
            this.snackbar.timeout = 3000
          } else {
            if (this.addImgData.selectedImg.length <= 0) {
              this.snackbar.snackbar = true
              this.snackbar.text = this.$t('post.wait')
              this.snackbar.color = 'blue darken-2'
              this.snackbar.timeout = 0
              axios.post(this.$store.state.server_ip +'/api/posts/post',this.postData)
              .then(res=> {
                this.$store.dispatch('updateAccount', res.data.data.updatedaccount)
                .then(res => {
                  this.snackbar.snackbar = false
                  this.snackbar.snackbar = true
                  this.snackbar.text = this.$t('post.success')
                  this.snackbar.color = 'green darken-2'
                  this.snackbar.timeout = 3000
                })
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
                let arry = []
                for (let index = 0; index < res.data.result.files.file.length; index++) {
                  arry.push(res.data.result.files.file[index].name)
                }
                this.postData.img = arry.toString()
                axios.post(this.$store.state.server_ip +'/api/posts/post',this.postData)
                .then(res=> {
                  this.$store.dispatch('updateAccount', res.data.data.updatedaccount)
                  .then(res => {
                    this.snackbar.snackbar = false
                    this.snackbar.snackbar = true
                    this.snackbar.text = this.$t('post.success')
                    this.snackbar.color = 'green darken-2'
                    this.snackbar.timeout = 3000
                  })
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
            }
          }
        }
      },
      checkEmpty(object,msgs){
          for (const value in object) {
              if (object.hasOwnProperty(value)) {
                  if (object[value] == '') {
                      msgs.text = this.$t('post.' + value.replace(/_/g, '') + "req")
                      msgs.color = 'red darken-2'
                      msgs.snackbar = true
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
      width: 100px
    }
</style>

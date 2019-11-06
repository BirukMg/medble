<template>
    <div>
        <section>
      <div class="container">
        <h5 :class="postMsg.styles" v-if="postMsg.show">{{postMsg.title}}</h5>
        <div class="row">
        <div class="col-6">
          <div class="form-group">
            <input type="text" placeholder="Title" class="form-control" v-model="postData.title">
          </div>
          <div class="form-group">
            <textarea class="form-control rounded-0" placeholder="Description" rows="3" v-model="postData.description"></textarea>
          </div>
          <div class="form-group">
            <input type="text" placeholder="State" class="form-control" v-model="postData.state">
          </div>
          <div class="form-group">
            <input type="text" placeholder="Email" class="form-control" v-model="postData.email">
          </div>
          <div class="row">
            <div class="col-8">
              <div class="form-group">
                <input type="number" placeholder="Price" style="width: 100%" class="form-control" v-model="postData.price">
              </div>
            </div>
            <div class="col-4">
              <select class="browser-default custom-select">
                <option selected>Birr</option>
                <option value="1">$</option>
                <option value="2">‎€</option>
                <option value="3">£</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <input type="text" placeholder="Brand" class="form-control" v-model="postData.brand">
          </div>
          <div class="form-group">
            <input type="text" placeholder="VIN" class="form-control" v-model="postData.vin">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="category">Category</label>
            <select class="browser-default custom-select" id="category" v-model="postData.category">
              <option v-for="(item, index) in construction_farm" :key="index">{{item}}</option>
            </select>
          </div>
          <div class="form-group">
            <input type="text" placeholder="City" class="form-control" v-model="postData.city">
          </div>
          <div class="form-group">
            <input type="text" placeholder="Phone" class="form-control" v-model="postData.phone">
          </div>
          <div class="form-group">
            <input type="text" placeholder="Name" class="form-control" v-model="postData.name">
          </div>
          <div class="form-group">
            <label for="year">Year</label>
            <select class="browser-default custom-select" id="year" v-model="postData.year">
              <option v-for="(year, index) in year" :key="index">{{year}}</option>
            </select>
          </div>
          <div class="img-content">
            <h5 :class="addImgMsg.styles" v-if="addImgMsg.show">{{addImgMsg.title}}</h5>
            <div class="img-list">
              <div class="row">
                <div class="col-2" v-for="(img,index) in addImgData.preview">
                  <img :src="img" class="float-left selected-img" alt="..." @dblclick="removeImg(index)">
                </div>
              </div>
            </div>
            <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg">
            <mdb-btn color="primary" class="add-img-btn" size="sm" @click="$refs.pickAddImg.click()"><mdb-icon icon="plus" class="mr-1"/> Add image</mdb-btn>
          </div>
        </div>
      </div>
      <button type="button" style="width: 50%;margin-top: 30px" class="btn btn-outline-primary btn-sm waves-effect" @click="post">Post</button>
      </div>
    </section>
    </div>
</template>
<script>
import axios from 'axios'
import {mdbBtn, mdbIcon} from 'mdbvue'
export default {
    props: ['item'],
    name: 'ConstructionFarm',
    components: {
      mdbBtn,mdbIcon
    },
    data(){
        return {
            construction_farm:["Forestry&Farm","Equipments","Garden Supplies","yard","Heavy Equipment","others","Tractors"],
            postData: {
              title: '',
              description: '',
              state: '',
              email: '',
              price: '',
              brand:'',
              vin: '',
              category: this.item,
              main_category: 'construction and farm equipment',
              city: '',
              phone: '',
              name: '',
              year: '',
              imgs:[]
            },
            year: [
              1990,
              1991,
              1992,
              1993,
              1994,
              1995,
              1996,
              1997,
              1998,
              1999,
              2000,
              2001,
              2002,
              2003,
              2004,
              2005,
              2006,
              2007,
              2008,
              2009,
              2010,
              2011,
              2011,
              2012,
              2013,
              2014,
              2015,
              2016,
              2017,
              2018,
              2019,
              2020,
              2020,
              2021,
              2021,
              2022,
              2023,
              2024,
              2025,
              2026,
              2027,
              2028,
              2029,
              2030
            ],
            passed: false,
            userId: '',
            add: '',
            addImgMsg: {
              title: '',
              styles: '',
              show: false
            },
            currency: ' Birr',
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
      let year = new Date().getFullYear()
      console.log('year')
      // for (let index = Date().getFullYear(); index < 2050; index++) {
      //   const element = array[index];
        
      // }
    },
    methods: {
      onAddImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.addImgMsg.show = true
          this.addImgMsg.title = "Please select image"
          this.addImgMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.addImgData.selectedImg.length > 5) {
          this.addImgMsg.show = true
          this.addImgMsg.title = "Maximum"
          this.addImgMsg.styles = "text-warning font-weight-bold animated bounceIn"
        }else{
          this.addImgMsg.show = true
          this.addImgMsg.title = e.target.files[0].name + ' Double click to remove'
          this.addImgMsg.styles = "text-success font-weight-bold animated bounceIn"
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
        this.addImgMsg.show = false
      },
      post(){
        this.checkEmpty(this.postData,this.postMsg)
        if (this.passed) {
          axios.get('http://'+ this.$store.state.server_ip +':3000/api/accounts/'+ this.$store.state.account_id)
          .then(res => {
            let number_of_posts = res.data.number_of_posts
            if (res.data.number_of_posts > 10 && res.data.account_type == 'free') {
              this.postMsg.show = true
              this.postMsg.title = "You have reached limit of post, please upgrade your account"
              this.postMsg.styles = "text-warning font-weight-bold"
            }else{
              if (this.addImgData.selectedImg.length <= 0){
                this.postData.price = this.postData.price + this.currency
                axios.post('http://'+ this.$store.state.server_ip +':3000/api/accounts/'+ this.$store.state.account_id +'/posts',this.postData,{
                  onUploadProgress: uploadEvent => {
                    this.postMsg.show = true
                    this.postMsg.title = "Posting..."
                    this.postMsg.styles = "text-success font-weight-bold"
                  }
                }).then(res => {
                  axios.patch('http://'+ this.$store.state.server_ip +':3000/api/accounts/'+ this.$store.state.account_id,{
                    number_of_posts: number_of_posts + 1
                  }).then(res => {
                    this.postMsg.show = true
                    this.postMsg.title = "Posted"
                    this.postMsg.styles = "text-success font-weight-bold"
                  })
                })
              }else{
                let formData = new FormData();
                for (let index = 0; index < this.addImgData.selectedImg.length; index++) {
                  formData.append('file',this.addImgData.selectedImg[index])
                }
                let headers = {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
                axios.post('http://'+ this.$store.state.server_ip +':3000/api/containers/images/upload',formData,{
                  onUploadProgress: uploadEvent => {
                    this.postMsg.show = true
                    this.postMsg.title = "Posting..."
                    this.postMsg.styles = "text-success font-weight-bold"
                  }
                }).then(res => {
                  for (let index = 0; index < res.data.result.files.file.length; index++) {
                    this.postData.imgs.push(res.data.result.files.file[index].name)
                  }
                  this.postData.price = this.postData.price + this.currency
                  axios.post('http://'+ this.$store.state.server_ip +':3000/api/accounts/'+ this.$store.state.account_id +'/posts',this.postData)
                  .then(res => {
                    axios.patch('http://'+ this.$store.state.server_ip +':3000/api/accounts/'+ this.$store.state.account_id,{
                    number_of_posts: number_of_posts + 1
                    }).then(res => {
                      this.postMsg.show = true
                      this.postMsg.title = "Posted"
                      this.postMsg.styles = "text-success font-weight-bold"
                    })
                  })
                })
              }
            }
          })
        }
      },
      checkEmpty(object,msgs){
          for (const value in object) {
              if (object.hasOwnProperty(value)) {
                  if (object[value] == '' && !Array.isArray(object[value])) {
                      msgs.title = value.replace(/_/g, ' ') + " is requred"
                      msgs.styles = 'text-danger font-weight-bold animated fadeIn'
                      msgs.show = true
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
      }
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
    label{
      float: left;
    }
</style>

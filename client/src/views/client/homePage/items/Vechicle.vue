<template>
    <div class="container">
        <section class="magazine-section my-5">
            <div class="row">
                <div class="col-lg-8 col-md-12">
                  <div class="single-news mb-lg-0 mb-4">
                    <div class="view overlay rounded z-depth-1-half mb-4">
                        <img class="img-fluid main-img" :src="post_data.img == null ? default_img : preview" alt="Sample image">
                        <a>
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>
                    <div class="news-data d-flex justify-content-between">
                      <routerLink :to="`/${$i18n.locale}/posts/vehicles/` + post_data.category" class="deep-orange-text">
                          <h6 class="font-weight-bold text-capitalize"><i class="fa fa-cutlery pr-2"></i>{{post_data.category}} for {{post_data.status}}</h6>
                      </routerLink>
                      <p class="font-weight-bold dark-grey-text float-right"><i class="fa fa-clock pr-2"></i>{{post_data.post_date.substring(0,16)}}</p>
                    </div>
                    <div class="row">
                      <div class="view overlay rounded z-depth-1 mb-4 col-lg-2 col-md-12" v-for="(i,index) in post_data.img" :key="i +1">
                        <img class="img-fluid more-img" :src="$store.state.server_ip + '/api/containers/post/download/' + i" alt="Sample image">
                        <a>
                          <div class="mask rgba-white-slight" @click="changeImg(index)"></div>
                        </a>
                      </div>
                    </div>
                        <h3 class="font-weight-bold dark-grey-text mb-3"><a>{{post_data.title}}</a></h3>
                        <p class="dark-grey-text mb-lg-0 mb-md-5 mb-4">{{post_data.description}}</p>

                        <div class="row">
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <h4><span class="badge badge-primary"><i class="fa fa-copyright"></i> {{post_data.vehicles.make}}</span></h4>
                          </div>
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <h4><span class="badge badge-primary"><i class="fa fa-tag"></i> {{post_data.vehicles.model}}</span></h4>
                          </div>
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <h4><span class="badge badge-primary"><i class="fa fa-fingerprint"></i> {{post_data.vehicles.vin}}</span></h4>
                          </div>
                           <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <h4><span class="badge badge-primary"><i class="fa fa-calendar"></i> {{post_data.vehicles.year}}</span></h4>
                          </div>
                          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <h4><span class="badge badge-primary"><i class="fa fa-phone-alt"></i> {{post_data.phone_number}}</span></h4>
                          </div>
                          
                        </div>
                        <div class="form-group" v-if="JSON.parse(this.$store.state.account).id != post_data.account_id">
                            <mdb-input type="textarea" v-model="reqData.message" label="Message for the owner" :row="4" outline size="sm"/>
                            <button type="button" v-if="!loading" class="btn btn-outline-primary btn-sm waves-effect" @click="sendReq()">send</button>
                        </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-12">
                  <div class="single-news mb-4" v-for="(i,index) in related_posts" :key="index">
                      <div class="row" v-if="i.id != post_data.id">
                      <div class="col-md-3">
                        <div class="view overlay rounded z-depth-1 mb-4">
                          <img class="img-fluid" :src="i.img == null ? default_img : $store.state.server_ip + '/api/containers/post/download/' + i.img[0]" alt="Sample image">
                          <a>
                            <div class="mask rgba-white-slight"></div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-9">
                        <p class="font-weight-bold dark-grey-text">{{i.title}}</p>
                        <div class="d-flex justify-content-between">
                          <div class="col-11 text-truncate pl-0 mb-3">
                            <a href="#!" class="dark-grey-text">{{i.description | truncate(50)}}</a>
                          </div>
                          <router-link :to="`/${$i18n.locale}/detail/` + i.id"><i class="fa fa-angle-double-right"></i></router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
</template>

<script>
import {mdbInput} from 'mdbvue'
import axios from 'axios'
export default {
    props: ['post_data'],
  name: 'ItemDetail',
  components: {
    mdbInput
  },
  data() {
    return {
     default_img: require('../../../../assets/img/26.jpg'),
     preview: '',
    related_posts: {},
    reqData: {
        message: '',
        owner_id :this.post_data.account_id,
        post_id: this.post_data.id,
      },
      loading: false
    }
  },
  mounted() {
    this.relatedPosts()
    // console.log(this.post_data.img[0])
    
    if (this.post_data.img != null) {
        this.preview = this.$store.state.server_ip + '/api/containers/post/download/' + this.post_data.img[0]
    }
  },
  methods: {
    relatedPosts(){
        let filter = {
            where : {
                category: this.post_data.category,
                show: true
            },
            include: ['vehicles'],
            limit: 6
        }
        axios.get(this.$store.state.server_ip  + '/api/posts?filter='+ JSON.stringify(filter))
        .then(res => {
          res.data.forEach(element => {
            if (element.img != null) {
              element.img = element.img.split(",")
            }
          });
          this.related_posts = res.data
            
        })
    },
    changeImg(index){
        this.preview = this.$store.state.server_ip + '/api/containers/post/download/' + this.post_data.img[index]
    },
    sendReq(){
      var date = new Date();
      this.reqData.date = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
      this.loading = true
      axios.post(this.$store.state.server_ip + '/api/accounts/'+ JSON.parse(this.$store.state.account).id +'/requests', this.reqData)
      .then(res => {
        this.loading = false
      })
    }
  },
}
</script>
<style scoped>
.main-img{
        width: 100%;
        height: 330px;
    }
    .more-img{
      height: 100%;
      width: 100%;
    }
</style>

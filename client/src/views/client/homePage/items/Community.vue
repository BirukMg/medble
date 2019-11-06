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
                      <routerLink :to="`/${$i18n.locale}/posts/services/` + post_data.category" class="deep-orange-text">
                          <h6 class="font-weight-bold text-capitalize"><i class="fa fa-cutlery pr-2"></i>{{post_data.category}}</h6>
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


                        <div v-for="(i,index) in comments" :key="index">
                            <div class="row">
                            <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 ">
                                <img :src="i.avatar == null ? default_img : $store.state.server_ip + '/api/containers/post/download/' + i.avatar" class="rounded-circle z-depth-1-half comment-avater">
                            </div>
                            <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
                                <a class="text-primary font-weight-bold">{{i.user_name}}</a>
                                <div class="date">{{new Date(i.date).toString().substring(0,16)}}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 ">
                            </div>
                            <div class="col-sm-11 col-md-11 col-lg-11 col-xl-11">
                                <p class="dark-grey-text mb-lg-0 mb-md-5 mb-4 text-justify">
                                    {{i.comment}}
                                </p>
                            </div>
                        </div>
                        </div>
                        <div class="form-group">
                            <mdb-input type="textarea" v-model="commentData.comment" label="Your comment" :row="4" outline size="sm"/>
                            <button type="button" class="btn btn-outline-primary btn-sm waves-effect" @click="comment()">Done</button>
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
    commentData: {
        comment:'',
        user_id: JSON.parse(this.$store.state.account).id,
    },
    comments:[]
    }
  },
  mounted() {
    this.relatedPosts()
    this.getcomment();
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
    getcomment(){
        axios.get(this.$store.state.server_ip + '/api/comments/' + this.post_data.id + '/getcomment')
        .then(res => {
            this.comments = res.data.data
        })
    },
    changeImg(index){
        this.preview = this.$store.state.server_ip + '/api/containers/post/download/' + this.post_data.img[index]
    },
    comment(){
        if (this.commentData.comment == '') {
            
        } else {
            var date = new Date();
            this.commentData.date = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
            axios.post(this.$store.state.server_ip + '/api/posts/'+ this.post_data.id +'/comments',this.commentData)
            .then(res => {
              this.comments.push({
                id: res.data.id,
                comment: res.data.comment,
                date: res.data.date,
                user_name: JSON.parse(this.$store.state.account).full_name,
                avatar: JSON.parse(this.$store.state.account).img
              })
            })
        }
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
    .comment-avater{
        height: 50px;
        width: 50px;
    }
</style>

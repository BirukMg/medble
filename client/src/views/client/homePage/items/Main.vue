<template>
    <div class="container">
        <section class="text-center my-5">
            <h2 class="h1-responsive font-weight-bold my-5 text-capitalize">{{$route.params.category}}</h2>
            <div class="row">
                <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 mb-4" v-for="i in postData" :key="i">
                    <div class="view overlay rounded z-depth-2 mb-4">
                        <img class="img-fluid" :src="i.img == null ? default_img : $store.state.server_ip + '/api/containers/post/download/' + i.img[0]" alt="Sample image">
                        <a>
                        <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>
                    <a href="#!" :class="icons[$route.params.category].color">
                        <h6 class="font-weight-bold mb-3"><i :class="icons[$route.params.category].icon"></i>{{i.category}}</h6>
                    </a>
                    <h4 class="font-weight-bold mb-3 text-capitalize"><strong>{{i.title}}</strong></h4>
                    <p>by <a class="font-weight-bold">Billy Forester</a>, <span class="font-italic font-weight-bold">{{i.post_date.substring(0,16)}}</span></p>
                    <p class="dark-grey-text">{{i.description | truncate(100)}}</p>
                    <router-link :to="`/${$i18n.locale}/detail/` + i.id">
                        <button type="button" class="btn btn-dark rounded">More ...</button>
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Posts',
    components: {

    },
    data() {
        return {
            icons: {
                marchandise: {
                    icon: 'fa fa-shopping-basket pr-2',
                    color: 'pink-text'
                },
                vehicles: {
                    icon: 'fa fa-car pr-2',
                    color: 'yellow-text'
                },
                houses: {
                    icon: 'fa fa-building pr-2',
                    color: 'orange-text'
                },
                community: {
                    icon: 'fa fa-users pr-2',
                    color: 'blue-text'
                },
                discussionforums: {
                    icon: 'fa fa-comments pr-2',
                    color: 'text-info'
                },
                services: {
                    icon: 'fa fa-cogs pr-2',
                    color: 'text-primary'
                },
                review: {
                    icon: 'fa fa-edit pr-2',
                    color: 'text-danger'
                },
                events: {
                    icon: 'fa fa-calendar-day pr-2',
                    color: 'text-secondary'
                },
                employments: {
                    icon: 'fa fa-suitcase pr-2',
                    color: 'amber-text'
                },
                resumes: {
                    icon: 'fa fa-user-graduate pr-2',
                    color: 'purple-text'
                }
            },
            postData: {},
            default_img: require('../../../../assets/img/26.jpg'),
            preview: '',
        }
    },
    mounted() {
        this.init()
    },
    watch: {
        '$route.params.item': function (item) {
            this.$forceUpdate()
            this.init()
        }
    },
    methods: {
        init(){
            if (this.$route.params.item == 'all') {
                let filter = {
                where : {
                    main_category: this.$route.params.category,
                    show: true
                }
            }
            axios.get(this.$store.state.server_ip  + '/api/posts?filter='+ JSON.stringify(filter))
            .then(res => {
                    res.data.forEach(element => {
                        if (element.img != null) {
                        element.img = element.img.split(",")
                        }
                    });
                this.postData = res.data
            }).catch(err => {
                console.log(err);
                
            })
            } else {
                let filter = {
                where : {
                    category: this.$route.params.item,
                    main_category: this.$route.params.category,
                    show: true
                }
            }
            axios.get(this.$store.state.server_ip  + '/api/posts?filter='+ JSON.stringify(filter))
            .then(res => {
                res.data.forEach(element => {
                        if (element.img != null) {
                        element.img = element.img.split(",")
                        }
                    });
                this.postData = Object.assign({}, res.data)
            }).catch(err => {
                console.log(err);
                
            })
            }
        },
        toDetail(data){
            this.$router.push({
                name: 'ItemDetail',
                params: {
                    items: data
                }
            });
        }
    },
}
</script>
<style scoped>
    .item-card{
        width: 100px;
    }
</style>

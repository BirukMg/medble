<template>
  <div>
    <job-detail :post_data ="postData" v-if="postData.main_category == 'employments'"/>
    <vehicle-detail :post_data ="postData" v-if="postData.main_category == 'vehicles'"/>
    <event-detail :post_data ="postData" v-if="postData.main_category == 'events'"/>
    <house-detail :post_data ="postData" v-if="postData.main_category == 'houses'"/>
    <marchandise-detail :post_data ="postData" v-if="postData.main_category == 'marchandise'"/>
    <service-detail :post_data ="postData" v-if="postData.main_category == 'services'"/>
    <community-detail :post_data ="postData" v-if="postData.main_category == 'community' || postData.main_category == 'discussionforums' || postData.main_category == 'review'"/>
  </div>
</template>
<script>
import axios from 'axios'
import jobDetail from './Job'
import vehicleDetail from './Vechicle'
import eventDetail from './Event'
import houseDetail from './House'
import marchandiseDetail from './Marchandise'
import serviceDetail from './Services'
import communityDetail from './Community'
export default {
  name: 'ItemDetail',
  components: {
    jobDetail, vehicleDetail, eventDetail, houseDetail,marchandiseDetail,serviceDetail,communityDetail
  },
  data() {
    return {
      postData: {}
    }
  },
  watch: {
      '$route.params.item_id': function (item) {
        this.$forceUpdate()
        this.init()  
      }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      let filter = {
        include : ['vehicles','events','employments','houses']
      }
      axios.get(this.$store.state.server_ip  + '/api/posts/' + this.$route.params.item_id +'?filter='+ JSON.stringify(filter))
      .then(res => {
        // console.log(res);
        if (res.data.img != null) {
            res.data.img = res.data.img.split(",")
            // this.preview = this.$store.state.server_ip + '/api/containers/post/download/' + this.post_data.img[0]
        }
        this.postData = Object.assign({}, res.data)
        
      })
    }
  },
}
</script>

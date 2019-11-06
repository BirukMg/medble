<template>
    <div style="overflow-y: scroll; height:500px;">
        <div class="row test">
                <div class="col-md-6 col-xl-2 sub-menu mb-xl-0 mb-4">
                  <h6 class="sub-title text-uppercase font-weight-bold white-text row">
                    <router-link class="white-text" :to="`/${$i18n.locale}/posts/community/all`"> 
                      {{$t('category.community.' + 'Community'.toUpperCase())}}
                    </router-link>
                  </h6>
                  <ul class="list-unstyled">
                    <li v-for="item in community" :key="item">
                      <router-link class="menu-item pl-0 text-white row" :to="`/${$i18n.locale}/posts/community/` + item.toLowerCase()">
                        <i class="fa fa-caret-right pl-1 pr-3 d-inline-block"></i>{{$t('category.community.' + item.toLowerCase())}}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6 col-xl-2 sub-menu mb-xl-0 mb-4">
                  <h6 class="sub-title text-uppercase font-weight-bold white-text row">
                    <router-link class="white-text" :to="`/${$i18n.locale}/posts/discussionforums/all`">
                      {{$t('category.discussion forum.' + 'discussion Forum'.toUpperCase())}}
                    </router-link>
                  </h6>
                  <ul class="list-unstyled">
                    <li v-for="item in discussionForum" :key="item">
                     <router-link class="menu-item pl-0 text-white row" :to="`/${$i18n.locale}/posts/discussionforums/` + item.toLowerCase()">
                        <i class="fa fa-caret-right pl-1 pr-3 d-inline-block"></i>{{$t('category.discussion forum.' + item.toLowerCase())}}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6 col-xl-2 sub-menu mb-xl-0 mb-4">
                  <h6 class="sub-title text-uppercase font-weight-bold white-text row">
                    <router-link class="white-text" :to="`/${$i18n.locale}/posts/services/all`">
                      {{$t('category.services.' + 'services'.toUpperCase())}}
                    </router-link>
                  </h6>
                  <ul class="list-unstyled">
                    <li v-for="item in services" :key="item">
                      <router-link class="menu-item pl-0 text-white row" :to="`/${$i18n.locale}/posts/services/` + item.toLowerCase()">
                        <i class="fa fa-caret-right pl-1 pr-3 d-inline-block"></i>{{$t('category.services.' + item.toLowerCase())}}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6 col-xl-2 sub-menu mb-xl-0 mb-4">
                  <h6 class="sub-title text-uppercase font-weight-bold white-text row">
                    <router-link class="white-text" :to="`/${$i18n.locale}/posts/review/all`">
                      {{$t('category.reviews.' + 'reviews'.toUpperCase())}}
                    </router-link>
                  </h6>
                  <ul class="list-unstyled">
                    <li v-for="item in reviews" :key="item">
                     <router-link class="menu-item pl-0 text-white row" :to="`/${$i18n.locale}/posts/review/` + item.toLowerCase()">
                        <i class="fa fa-caret-right pl-1 pr-3 d-inline-block"></i>{{$t('category.reviews.' + item.toLowerCase())}}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6 col-xl-2 sub-menu mb-xl-0 mb-4">
                  <h6 class="sub-title text-uppercase font-weight-bold white-text row">
                    <router-link class="white-text" :to="`/${$i18n.locale}/posts/events/all`">
                      {{$t('category.event.' + 'event'.toUpperCase())}}
                    </router-link>
                  </h6>
                </div>
              </div>
    </div>
</template>
<script>
import {mdbDropdownMenu} from 'mdbvue'
export default {
    name: 'SalesList',
    components: {
      mdbDropdownMenu
    },
    data() {
      return {
        community: ["Activities","Artists","Childcare","Classes","General","Groups","Local News","Lost+Found","Missed connection","Musicians","Pets","Politics","Rideshare","Volunteers"],
        discussionForum:["Mobile Phones","Arts","Autos","Beauty","Bikes","Business","Entertainment","Fix it","Food","Gaming","Garden","Health","History","Housing","Legal","Marriage","Money","Music","Pets","Philos",
        "Photo","Politics","Science","Spirit","Transport","Writing"],
        services:["Automotive","Computer Repair","Creative","Events","Financial","Home Service","Moving & Labor","Legal","Lessons & Training","Real Estate Agents","Skilled Trades","Other Businesses"],
        reviews:["Bank","Bar","Cafe","Clinic","Hospitals","Hotels","Mall","Restaurants","Salons","Schools","Supermarkets","Transport","Others"]
      }
    },
    mounted() {
      
    },
    methods: {
      
    },
}
</script>
<style scoped>
  .test{
    width: 1713px;
     margin-left: 10%
  }
  @media (max-width: 990px){
  }
  .drop-down{
    z-index: -2;
    margin-left: -218px;
    opacity: 0.9;
  }
</style>
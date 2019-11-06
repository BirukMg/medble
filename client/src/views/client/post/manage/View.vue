<template>
    <v-app class="vapp-content container">
        <div class="create-content">
        <community :item ="$route.params.item_id" v-if="$route.params.category == 'community'"/>
        <DiscussionForum :item ="$route.params.item_id" v-if="$route.params.category == 'discussion forum'"/>
        <Employment :item ="$route.params.item_id" v-if="$route.params.category == 'employments'"/>
        <Marchandise :item ="$route.params.item_id" v-if="$route.params.category == 'marchandise'"/>
        <Houses :item ="$route.params.item_id" v-if="$route.params.category == 'houses'"/>
        <Services :item ="$route.params.item_id" v-if="$route.params.category == 'services'"/>
        <Vehicles :item ="$route.params.item_id" v-if="$route.params.category == 'vehicles'"/>
        <Review :item ="$route.params.item_id" v-if="$route.params.category == 'reviews'"/>
        <Event :item ="$route.params.item_id" v-if="$route.params.category == 'event'"/>
    </div>
    </v-app>
</template>
<script>
import Community from './Community'
import DiscussionForum from './DiscussionForum'
import Employment from './Employment'
import Marchandise from './Marchandise'
import Houses from './RealEstate'
import Services from './Services'
import Vehicles from './Vehicles'
import Review from './Review'
import Event from './Event'

export default {
    name: 'Create',
    components: {
        Community, DiscussionForum, Employment, Marchandise, Houses, Services, Vehicles, Review, Event
    }
}
</script>
<style scoped>
    .create-content{
        margin: 100px 0px;
    }
    .vapp-content{
        height: auto;
        background-color: #fff;
    }
</style>


<template>
    <v-app class="vapp-content container">
        <div class="create-content">
        <community :item ="$route.params.item" v-if="$route.params.category == 'community'"/>
        <construction-farm :item ="$route.params.item" v-if="$route.params.category == 'construction and farm equipment'"/>
        <DiscussionForum :item ="$route.params.item" v-if="$route.params.category == 'discussion forum'"/>
        <Employment :item ="$route.params.item" v-if="$route.params.category == 'employments'"/>
        <Marchandise :item ="$route.params.item" v-if="$route.params.category == 'marchandise'"/>
        <Houses :item ="$route.params.item" v-if="$route.params.category == 'houses'"/>
        <Services :item ="$route.params.item" v-if="$route.params.category == 'services'"/>
        <Vehicles :item ="$route.params.item" v-if="$route.params.category == 'vehicles'"/>
        <Review :item ="$route.params.item" v-if="$route.params.category == 'reviews'"/>
        <Event :item ="$route.params.item" v-if="$route.params.category == 'event'"/>
        <Resume :item ="$route.params.item" v-if="$route.params.category == 'resume'"/>
    </div>
    </v-app>
</template>
<script>
import Community from './Community'
import ConstructionFarm from './ConstructionFarm'
import DiscussionForum from './DiscussionForum'
import Employment from './Employment'
import Marchandise from './Marchandise'
import Houses from './RealEstate'
import Services from './Services'
import Vehicles from './Vehicles'
import Review from './Review'
import Event from './Event'
import Resume from './Resume'

export default {
    name: 'Create',
    components: {
        Community, ConstructionFarm, DiscussionForum, Employment, Marchandise, Houses, Services, Vehicles, Review, Event, Resume
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


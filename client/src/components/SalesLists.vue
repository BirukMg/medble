<template>
    <div style="overflow-y: scroll; height:500px;">
        <div class="row test">
                <div class="col-md-6 col-xl-3 sub-menu mb-xl-0 mb-4">
                  <h6 class="sub-title text-uppercase font-weight-bold white-text row">
                    <router-link class="white-text" :to="`/${$i18n.locale}/posts/marchandise/all`">
                      {{$t('category.marchandise.' + 'marchandise'.toUpperCase())}}
                    </router-link>
                  </h6>
                  <ul class="list-unstyled">
                    <li v-for="item in marchandise" :key="item">
                      <router-link class="menu-item pl-0 text-white row" :to="`/${$i18n.locale}/posts/marchandise/` + item.toLowerCase()">
                        <i class="fa fa-caret-right pl-1 pr-3 d-inline-block"></i>{{$t('category.marchandise.' + item.toLowerCase())}}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6 col-xl-3 sub-menu mb-xl-0 mb-4">
                  <h6 class="sub-title text-uppercase font-weight-bold white-text row"> 
                    <router-link class="white-text" :to="`/${$i18n.locale}/posts/vehicles/all`">
                      {{$t('category.vehicles.' + 'vehicles'.toUpperCase())}}
                    </router-link></h6>
                  <ul class="list-unstyled">
                    <li v-for="item in vehicles" :key="item">
                      <router-link class="menu-item pl-0 text-white row" :to="`/${$i18n.locale}/posts/vehicles/` + item.toLowerCase()">
                        <i class="fa fa-caret-right pl-1 pr-3 d-inline-block"></i>{{$t('category.vehicles.' + item.toLowerCase())}}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6 col-xl-3 sub-menu mb-xl-0 mb-4">
                  <h6 class="sub-title text-uppercase font-weight-bold white-text row">
                    <router-link class="white-text" :to="`/${$i18n.locale}/posts/houses/all`">
                      {{$t('category.houses.' + 'houses'.toUpperCase())}}
                    </router-link>
                  </h6>
                  <ul class="list-unstyled">
                    <li v-for="item in houses" :key="item">
                      <router-link class="menu-item pl-0 text-white row" :to="`/${$i18n.locale}/posts/houses/` + item.toLowerCase()">
                        <i class="fa fa-caret-right pl-1 pr-3 d-inline-block"></i>{{$t('category.houses.' + item.toLowerCase())}}
                      </router-link>
                    </li>
                  </ul>
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
        marchandise: ["Appliances","Clothing","Collecting&art","Computers","Electronices","Furniture","Musical instruments","Health & beauty","Sporting Goods","Firuts & vegitables","Free","Other"],
        vehicles:["Auto parts","Accessories","Boats","Cars","Motorscycles","RVs","Trucks","Vans","Other"],
        houses: [
          "Real Estate",
          "Condominium",
          "Duplexes",
          "Homes",
          "Land",
          "Apartements",
          "Rooms for rent",
          "Short term rentals",
          "Vacation rentals",
          "Others"
        ],
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
</style>
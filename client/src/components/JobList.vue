<template>
    <div style="overflow-y: scroll; height:500px;">
        <div class="row test">
          <div class="col-md-6 col-xl-3 sub-menu mb-xl-0 mb-4">
            <h6 class="sub-title text-uppercase font-weight-bold white-text">
              <router-link class="white-text" :to="`/${$i18n.locale}/posts/employments/all`">
                {{$t('category.employments.' + 'employments'.toUpperCase())}}
              </router-link>
            </h6>
            <ul class="list-unstyled">
              <li v-for="item in employments" :key="item">
               <router-link class="menu-item pl-0 text-white row" :to="`/${$i18n.locale}/posts/employments/` + item.toLowerCase()">
                  <i class="fa fa-caret-right pl-1 pr-3 d-inline-block"></i>{{$t('category.employments.' + item.toLowerCase())}}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-6 col-xl-3 sub-menu mb-xl-0 mb-4">
            <h6 class="sub-title text-uppercase font-weight-bold white-text">
               <router-link class="white-text" :to="`/${$i18n.locale}/posts/resumes/all`">
                  {{$t('category.employments.' + 'resume'.toUpperCase())}}
                </router-link>
            </h6>
            <ul class="list-unstyled">
              <li v-for="item in resumes" :key="item">
                <router-link class="menu-item pl-0 text-white row" :to="`/${$i18n.locale}/posts/resumes/` + item.toLowerCase()">
                  <i class="fa fa-caret-right pl-1 pr-3 d-inline-block"></i>{{$t('category.employments.' + item.toLowerCase())}}
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
        employments:[
          "Accounting",
          "Adminstrative & office jobs",
          "Advertising & Marketing jobs",
          "Arts, media & Designen jobs",
          "Biothecnology & pharmaceuticals",
          "Community, social Service & nonprofit",
          "Construction, mining & Trades",
          "Educations, Training & library",
          "Employment placement Agencies",
          "Enginneering",
          "Finanicial & Banking",
          "General Labor",
          "Goverment",
          "Hotels&hospitality",
          "Human Resources(HR)",
          "information Technology(IT)",
          "installation,maintenance & Repair",
          "insurance",
          "internet & ecommerce",
          "Law enforcement & security",
          "Legal & paralegal",
          "Medical & helthcare",
          "Others",
          "Personal Care,spas & fitness",
          "Professional Services",
          "Real Estate",
          "Resturant & Beverage",
          "Retail & Wholesale",
          "sales",
          "Science",
          "Sports & recreation",
          "Telecommunications",
          "Television ,film&Entertainment",
          "Trensportation"
        ],
        resumes:[
          "Accounting",
          "Adminstrative & office jobs",
          "Advertising & Marketing jobs",
          "Arts, media & Designen jobs",
          "Biothecnology & pharmaceuticals",
          "Community, social Service & nonprofit",
          "Construction, mining & Trades",
          "Educations, Training & library",
          "Employment placement Agencies",
          "Enginneering",
          "Finanicial & Banking",
          "General Labor",
          "Goverment",
          "Hotels&hospitality",
          "Human Resources(HR)",
          "information Technology(IT)",
          "installation,maintenance & Repair",
          "insurance",
          "internet & ecommerce",
          "Law enforcement & security",
          "Legal & paralegal",
          "Medical & helthcare",
          "Others",
          "Personal Care,spas & fitness",
          "Professional Services",
          "Real Estate",
          "Resturant & Beverage",
          "Retail & Wholesale",
          "sales",
          "Science",
          "Sports & recreation",
          "Telecommunications",
          "Television ,film&Entertainment",
          "Trensportation"
        ]
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
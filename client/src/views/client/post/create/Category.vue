<template>
  <div class="container">
    <v-card max-width="100%" class="mx-auto">
    <v-toolbar color="dark" dark>
      <v-toolbar-title>{{$t('post.Select category')}}: </v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-list style="padding: 3%">
      <v-list-group v-for="item in items" :key="item.title" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="$t('category.' + item.title + '.' + item.title.toUpperCase())"><i class="fa fa-user"></i></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item>
            <ul class="list-unstyled">
                <li v-for="subItem in item.items" :key="subItem.title" class="row">
                    <router-link :to="`/${$i18n.locale}` + '/create/' + item.title.toLowerCase() + '/' + subItem.title.toLowerCase()"><i class="fa fa-caret-right pl-1 pr-3 d-inline-block"></i>{{$t('category.' + item.title + '.' + subItem.title.toLowerCase())}}</router-link>
                </li>
            </ul>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        path: '/create/',
        items: [
          {
            action: 'shopping_cart',
            title: 'marchandise',
            items: [
             {title:"Appliances"},{title:"Clothing"},{title:"Collecting&art"},{title:"Computers"},{title:"Electronices"},{title:"Furniture"},{title:"Musical instruments"},{title:"Health & beauty"},{title:"Sporting Goods"},{title:"Firuts & vegitables"},{title:"Free"},{title:"Other"}
            ]
          },
          {
            action: 'directions_car',
            title: 'vehicles',
            active: true,
            items: [
              {title: "Auto parts"},{title: "Accessories"},{title: "Boats"},{title: "Cars"},{title: "Motorscycles"},{title: "RVs"},{title: "Trucks"},{title: "Vans"},{title: "Other"}
            ],
          },
          {
            action: 'home',
            title: 'houses',
            items: [
              {title: "Real Estate"},{title: "Condominium"},{title: "Duplexes"},{title: "Homes"},{title: "Land"},{title: "Apartements"},{title: "Rooms for rent"},{title: "Short term rentals"},{title: "Vacation rentals"},{title: "Others"}
            ],
          },
          {
            action: 'group',
            title: 'community',
            items: [
              {title: "Activities"},{title: "Artists"},{title: "Childcare"},{title: "Classes"},{title: "General"},{title: "Groups"},{title: "Local News"},{title: "Lost+Found"},{title: "Missed connection"},{title: "Musicians"},{title: "Pets"},{title: "Politics"},{title: "Rideshare"},{title: "Volunteers"}
            ],
          },
          {
            action: 'comment',
            title: 'discussion forum',
            items: [
              {title: "Mobile Phones"},{title: "Arts"},{title: "Autos"},{title: "Beauty"},{title: "Bikes"},{title: "Business"},{title: "Entertainment"},{title: "Fix it"},{title: "Food"},{title: "Gaming"},{title: "Garden"},{title: "Health"},{title: "History"},{title: "Housing"},{title: "Legal"},{title: "Marriage"},{title: "Money"},{title: "Music"},{title: "Pets"},{title: "Philos"},{title: "Photo"},{title: "Politics"},{title: "Science"},{title: "Spirit"},{title: "Transport"},{title: "Writing"}
            ],
          },
          {
            action: 'settings_applications',
            title: 'services',
            items: [
              {title: "Automotive"},{title: "Computer Repair"},{title: "Creative"},{title: "Events"},{title: "Financial"},{title: "Home Service"},{title: "Moving & Labor"},{title: "Legal"},{title: "Lessons & Training"},{title: "Real Estate Agents"},{title: "Skilled Trades"},{title: "Other Businesses"}
            ],
          },
          {
            action: 'rate_review',
            title: 'reviews',
            items: [
              {title: "Bank"},{title: "Bar"},{title: "Cafe"},{title: "Clinic"},{title: "Hospitals"},{title: "Hotels"},{title: "Mall"},{title: "Restaurants"},{title: "Salons"},{title: "Schools"},{title: "Supermarkets"},{title: "Transport"},{title: "Others"}
            ],
          },
          {
            action: 'event',
            title: 'event',
            items: [
              {title:"event"}
            ],
          },
          {
            action: 'card_travel',
            title: 'employments',
            items: [
              {title: "Accounting"},{title: "Adminstrative & office jobs"},{title: "Advertising & Marketing jobs"},{title: "Arts, media & Designen jobs"},{title: "Biothecnology & pharmaceuticals"},{title: "Community, social Service & nonprofit"},{title: "Construction, mining & Trades"},{title: "Educations, Training & library"},{title: "Employment placement Agencies"},{title: "Enginneering"},{title: "Finanicial & Banking"},{title: "General Labor"},{title: "Goverment"},{title: "Hotels&hospitality"},{title: "Human Resources(HR)"},{title: "information Technology(IT)"},{title: "installation,maintenance & Repair"},{title: "insurance"},{title: "internet & ecommerce"},{title: "Law enforcement & security"},{title: "Legal & paralegal"},{title: "Medical & helthcare"},{title: "Others"},{title: "Personal Care, spas & fitness"},{title: "Professional Services"},{title: "Real Estate"},{title: "Resturant & Beverage"},{title: "Retail & Wholesale"},{title: "sales"},{title: "Science"},{title: "Sports & recreation"},{title: "Telecommunications"},{title: "Television, film & Entertainment"},{title: "Trensportation"}
            ],
          },
          {
            action: 'assignment_ind',
            title: 'resume',
            items: [
              {title: "Accounting"},{title: "Adminstrative & office jobs"},{title: "Advertising & Marketing jobs"},{title: "Arts, media & Designen jobs"},{title: "Biothecnology & pharmaceuticals"},{title: "Community, social Service & nonprofit"},{title: "Construction, mining & Trades"},{title: "Educations, Training & library"},{title: "Employment placement Agencies"},{title: "Enginneering"},{title: "Finanicial & Banking"},{title: "General Labor"},{title: "Goverment"},{title: "Hotels&hospitality"},{title: "Human Resources(HR)"},{title: "information Technology(IT)"},{title: "installation,maintenance & Repair"},{title: "insurance"},{title: "internet & ecommerce"},{title: "Law enforcement & security"},{title: "Legal & paralegal"},{title: "Medical & helthcare"},{title: "Others"},{title: "Personal Care, spas & fitness"},{title: "Professional Services"},{title: "Real Estate"},{title: "Resturant & Beverage"},{title: "Retail & Wholesale"},{title: "sales"},{title: "Science"},{title: "Sports & recreation"},{title: "Telecommunications"},{title: "Television, film & Entertainment"},{title: "Trensportation"}
            ],
          },
        ],
      }
    },
  }
</script>
<style scoped>
    .list-items:hover{
        background-color: #ccc;
    }
    .list-items{
        padding-left: 1%;
        height: 50px;
        background-color: #ccc;
    }
</style>

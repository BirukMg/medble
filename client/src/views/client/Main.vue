<template>
    <div style="z-index: 10">
        <mdb-navbar class="special-color-dark" position="top" dark transparent scrolling>
      <mdb-navbar-toggler style="max-width: 100%">
        <mdb-navbar-brand :to="`/${$i18n.locale}/home`"><strong>መድብል</strong></mdb-navbar-brand>
        <mdb-navbar-nav>
          <mdb-nav-item waves-fixed @click="toggleMenu">{{$t('nav.salesandrental')}} <i class="fa fa-caret-down pl-1 pr-3 "/></mdb-nav-item>
          <mdb-nav-item @click="toggleMenu2" waves-fixed>{{$t('nav.social')}} <i class="fa fa-caret-down pl-1 pr-3 "/></mdb-nav-item>
          <mdb-nav-item @click="toggleMenu3" waves-fixed>{{$t('nav.job')}} <i class="fa fa-caret-down pl-1 pr-3 "/></mdb-nav-item>
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
            <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink slot="toggle"  waves-fixed><i class="fa fa-language"></i> {{lang}}</mdb-dropdown-toggle>
                <mdb-dropdown-menu>
                    <mdb-dropdown-item @click.prevent="switchLang('amh')">አማርኛ</mdb-dropdown-item>
                    <mdb-dropdown-item @click.prevent="switchLang('en')" class="font-weight-bold">English</mdb-dropdown-item>
                </mdb-dropdown-menu>
            </mdb-dropdown>
            <mdb-nav-item :to="`/${$i18n.locale}/account`" v-if="!$store.getters.isLoggedIn">{{$t('nav.loginregister')}}</mdb-nav-item>
            <mdb-nav-item :to="`/${$i18n.locale}/post`" v-if="$store.getters.isLoggedIn">{{$t('nav.post')}}</mdb-nav-item>
            <mdb-dropdown tag="li" class="nav-item mr-5">
            <mdb-dropdown-toggle class="mr-5" v-if="$store.getters.isLoggedIn" tag="a" navLink slot="toggle"  waves-fixed><i class="fa fa-cog"></i> {{JSON.parse(this.$store.state.account).full_name}}</mdb-dropdown-toggle>
                <mdb-dropdown-menu class="mr-5">
                    <mdb-dropdown-item :to="`/${$i18n.locale}/profile`">{{$t('nav.profile')}}</mdb-dropdown-item>
                    <mdb-dropdown-item :to="`/${$i18n.locale}/my post`">{{$t('nav.mypost')}}</mdb-dropdown-item>
                    <mdb-dropdown-item v-if="$store.getters.isLoggedIn && JSON.parse(this.$store.state.account).resume" :to="`/${$i18n.locale}/my resume`">{{$t('nav.resume')}}</mdb-dropdown-item>
                    <mdb-dropdown-item :to="`/${$i18n.locale}/my request`">{{$t('nav.request')}}</mdb-dropdown-item>
                    <mdb-dropdown-item v-if="$store.getters.isLoggedIn" @click="logout">{{$t('nav.logout')}}</mdb-dropdown-item>
                </mdb-dropdown-menu>
            </mdb-dropdown>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>

    <div :class="style" v-if="showMenu">
        <i class="fa fa-times float-right" style="cursor: pointer;" @click="showMenu = false"></i>
        <sales-list @click="showMenu = false"/>
    </div>
    <div :class="style" v-if="showMenu2">
        <i class="fa fa-times float-right" style="cursor: pointer;" @click="showMenu2 = false"></i>
        <community-list />
    </div>
    <div :class="style" v-if="showMenu3">
        <i class="fa fa-times float-right" style="cursor: pointer;" @click="showMenu3 = false"></i>
        <job-list />
    </div>
        <router-view style="margin-top: 60px"></router-view>
        <!-- <md-try /> -->
        <main-footer />
    </div>
</template>
<script>
import communityList from '../../components/CommunityLists'
import salesList from '../../components/SalesLists'
import jobList from '../../components/JobList'
import mainFooter from '../../components/Footer'
import mdTry from '../../components/Try'
import { mdbContainer, mdbRow, mdbIcon, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbInput, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem } from 'mdbvue';
export default {
    name: 'ClientMain',
    components: {
        mdTry,mainFooter,jobList,communityList,salesList,mdbContainer, mdbRow, mdbIcon, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbInput, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem
    },
    data() {
        return {
            showMenu: false,
            showMenu2: false,
            showMenu3: false,
            style: 'menu',
            lang: this.$i18n.locale == 'en'? 'ቋንቋ' : 'Language'
        }
    },
    mounted() {
        // this.$router.push({ path: '/' + this.$i18n.locale + '/home' })
    },
    methods: {
        logout(){
            this.$store.dispatch('logout')
            .then(() => console.log('looged out'))
            .catch(err => console.log(err))
        },
        switchLang(lang){
            this.$i18n.locale = lang
            this.lang = this.$i18n.locale == 'en'? 'ቋንቋ' : 'Language'
            this.$router.push({
                params: {lang: lang}
            })
        },
        toggleMenu(){
        if (this.showMenu) {
            this.style = 'menu text-white animated position-fixed special-color slideOutUp'
            this.showMenu = false
        }else if (!this.showMenu) {
            this.style = 'menu text-white animated position-fixed special-color slideInDown'
            this.showMenu = true
            this.showMenu2 = false
            this.showMenu3 = false
        }
        },
        toggleMenu2(){
        if (this.showMenu2) {
            this.style = 'menu text-white animated position-fixed special-color slideOutUp'
            this.showMenu2 = false
        }else if (!this.showMenu2) {
            this.style = 'menu text-white animated position-fixed special-color slideInDown'
            this.showMenu = false
            this.showMenu2 = true
            this.showMenu3 = false
        }
        },
        toggleMenu3(){
        if (this.showMenu3) {
            this.style = 'menu text-white animated position-fixed special-color slideOutUp'
            this.showMenu3 = false
        }else if (!this.showMenu3) {
            this.style = 'menu text-white animated position-fixed special-color slideInDown'
            this.showMenu = false
            this.showMenu2 = false
            this.showMenu3 = true
        }
    }
    },
}
</script>
<style scoped>
  .test{
    /* width: 1713px; */
  }
  @media (max-width: 990px){
  
}
  .drop-down{
    z-index: -2;
    margin-left: -68px;
  }
  .header{
    width: 100%;
    height: 200px;
    background-color: #212121;
    margin-top: -20px
  }
  .nav-width{
      width: 100%;
  }
  .menu{
      background-image: linear-gradient(to bottom, #3b3d3f, #212121);
      width: 100%;
      height: auto;
      z-index: 1;
      opacity: 0.9;
      padding: 2% 10%
  }
</style>
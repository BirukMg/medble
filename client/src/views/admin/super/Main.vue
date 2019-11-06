<template>
  <div>
     <mdb-navbar class="special-color-dark" position="top" dark transparent scrolling>
      <mdb-navbar-toggler style="max-width: 100%">
        <mdb-navbar-brand href="#"><strong>ምድብል</strong></mdb-navbar-brand>
        <mdb-navbar-nav>
          <mdb-nav-item :to="`/${$i18n.locale}/admin/super/manage users`"><i class="fa fa-users pl-1 pr-3 "/> Users</mdb-nav-item>
          <mdb-nav-item :to="`/${$i18n.locale}/admin/super/manage posts`" waves-fixed><i class="fa fa-newspaper pl-1 pr-3 "/> Posts</mdb-nav-item>
          <mdb-nav-item :to="`/${$i18n.locale}/admin/sub/manage ads`" waves-fixed><i class="fa fa-ad pl-1 pr-3 "/> ADSs</mdb-nav-item>
          <mdb-nav-item :to="`/${$i18n.locale}/admin/sub/manage admins`" waves-fixed><i class="fa fa-user-tie pl-1 pr-3 "/> Sub admins</mdb-nav-item>
        </mdb-navbar-nav>
        <mdb-navbar-nav right class="mr-5">
            <mdb-dropdown tag="li" class="nav-item mr-5">
            <mdb-dropdown-toggle v-if="$store.getters.isAdminLoggedIn" tag="a" navLink slot="toggle"  waves-fixed><i class="fa fa-cog"></i> {{JSON.parse(this.$store.state.adminInfo).username}}</mdb-dropdown-toggle>
                <mdb-dropdown-menu>
                    <mdb-dropdown-item :to="`/${$i18n.locale}/admin/super/profile`">Profile</mdb-dropdown-item>
                    <mdb-dropdown-item @click="logout">Logout</mdb-dropdown-item>
                </mdb-dropdown-menu>
            </mdb-dropdown>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>

    <router-view style="margin-top: 100px"></router-view>
  </div>
</template>
<script>
import { mdbContainer, mdbRow, mdbIcon, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbInput, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem } from 'mdbvue';
export default {
  components: {
    mdbContainer, mdbRow, mdbIcon, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbInput, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem
  },
  mounted() {
    // console.log(this.$store.getters.isAdminLoggedIn && JSON.parse(this.$store.state.adminInfo).role == 'super');
    
    if (this.$store.getters.isAdminLoggedIn && JSON.parse(this.$store.state.adminInfo).role == 'super') {
      
    }else{
      this.$router.push('/' + this.$i18n.locale + '/admin')
    }
  },
  methods: {
    logout(){
        this.$store.dispatch('adminlogout')
        .then(() => this.$router.push('/' + this.$i18n.locale + '/admin'))
        .catch(err => console.log(err))
    }
  },
}
</script>
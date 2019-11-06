<template>
  <div>
     <mdb-navbar class="special-color-dark" position="top" dark transparent scrolling>
      <mdb-navbar-toggler style="max-width: 100%">
        <mdb-navbar-brand href="#"><strong>ምድብል</strong></mdb-navbar-brand>
          <mdb-nav-item :to="`/${$i18n.locale}/admin/sub/manage users`" v-if="JSON.parse($store.state.adminInfo).permmisions.user"><i class="fa fa-users pl-1 pr-3 "/> Users</mdb-nav-item>
          <mdb-nav-item :to="`/${$i18n.locale}/admin/sub/manage posts`" v-if="JSON.parse($store.state.adminInfo).permmisions.post" waves-fixed><i class="fa fa-newspaper pl-1 pr-3 "/> Posts</mdb-nav-item>
          <mdb-nav-item :to="`/${$i18n.locale}/admin/sub/manage ads`" v-if="JSON.parse($store.state.adminInfo).permmisions.ads" waves-fixed><i class="fa fa-ad pl-1 pr-3 "/> ADSs</mdb-nav-item>
          <h5 class="font-weight-bold text-capitalize text-white text-center" v-if="!JSON.parse($store.state.adminInfo).permmisions.user && !JSON.parse($store.state.adminInfo).permmisions.post && !JSON.parse($store.state.adminInfo).permmisions.ads">
            You have no any permmisions, Contact your administrator
          </h5>
        </mdb-navbar-nav>
        <mdb-navbar-nav right class="mr-5">
            <mdb-dropdown tag="li" class="nav-item mr-5">
            <mdb-dropdown-toggle tag="a" navLink slot="toggle" v-if="$store.getters.isAdminLoggedIn" waves-fixed><i class="fa fa-cog"></i> {{JSON.parse(this.$store.state.adminInfo).username}}</mdb-dropdown-toggle>
                <mdb-dropdown-menu>
                    <mdb-dropdown-item :to="`/${$i18n.locale}/admin/sub/profile`">Profile</mdb-dropdown-item>
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
    if (this.$store.getters.isAdminLoggedIn && JSON.parse(this.$store.state.adminInfo).role == 'sub') {
      
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
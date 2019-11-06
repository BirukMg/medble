<template>
    <div class="container">
        <profile-header />
        <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <side-menu />
            </div>
        </div>
    </div>
</template>
<script>
import profileHeader from './Header'
import sideMenu from './SideMenu'
export default {
    name: 'ProfileMain',
    components: {
        profileHeader,sideMenu
    }
}
</script>

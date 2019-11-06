<template>
    <div class="">
        <div class="side-menu">
            <div class="row">
                <i class="fa fa-envelope"></i>
            </div>
            <div class="row">
                some@cool.com
            </div>
            <div class="row">
                <i class="fa fa-mobile"></i>
            </div>
            <div class="row">
                +251932264993
            </div>
            <div class="row">
                <i class="fa fa-map-marker"></i>
            </div>
            <div class="row">
                Nifas Silk Lafto, woreda 12, Addis Ababa, Ethiopia
            </div>

            <div class="row profile-navigation border-top border-light">
                <button type="button" class="btn btn-outline-warning btn-profile"><i class="fa fa-arrow-up"></i> Free Account upgrade to pro</button>
                <button type="button" class="btn btn-outline-info btn-profile"><i class="fa fa-cog"></i> Edit your profile</button>
            </div>

            <div class="row profile-navigation border-top border-light">
                <button type="button" class="btn btn-outline-secondary btn-profile"><i class="fa fa-newspaper"></i> My posts</button>
                <button type="button" class="btn btn-outline-primary btn-profile"><i class="fa fa-user"></i> My resume</button>
                <button type="button" class="btn btn-outline-info btn-profile"><i class="fa fa-info"></i> My requests</button>
                <button type="button" class="btn btn-outline-dark btn-profile"><i class="fa fa-paper-plane"></i> request for me</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideMenu',
    components: {

    },
    data() {
        return {
            img:  require('../../../assets/img/img(31).jpg')
        }
    },
}
</script>
<style scoped>
    .side-menu{
        padding-left: 10%;
        margin-top: 50px;
    }
    .profile-navigation{
        margin-top: 15%;
        padding-top: 25px;
    }
    .btn-profile{
        width: 100%;
    }
</style>

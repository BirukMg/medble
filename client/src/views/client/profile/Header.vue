<template>
    <div class="">
        <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4 ">
                <div class="text-center">
                    <img :src="img" class="rounded-circle profile-pic" alt="Profile picture">
                </div>
            </div>
            <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 basic-info">
                <div class="row text-white">
                    <h3>Full Name</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProfileHeader',
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
    .profile-pic{
        width: 150px;
        height: 150px;
        cursor: pointer;
        /* margin-left: 25%; */
    }
    .basic-info{
        width: 100%;
        height: 150px;
        background-color: #2E2E2E;
        border-radius: 3px;
        padding: 5% 0 0 5%
    }
</style>

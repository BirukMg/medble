<template>
    <div class="container">
        <div class="upin-content">
            <div class="btn-group up-in">
                <button type="button" :class="swap ? 'btn btn-dark' : 'btn btn-light'" @click="swaping('/account/login',true)">{{$t('account.login')}}</button>
                <button type="button" :class="!swap ? 'btn btn-dark' : 'btn btn-light'" @click="swaping('/account/register', false)">{{$t('account.register')}}</button>
            </div>
            <router-view></router-view>
            <router-link :to="`/${$i18n.locale}/home`">{{$t('account.backtohome')}}</router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AccountMain',
    components: {
        
    },
    data() {
        return {
            swap: true
        }
    },
    mounted() {
        if (this.$store.getters.isLoggedIn) {
            this.$router.push({ path: '/' + this.$i18n.locale + '/home' })
        }else{
            // this.$router.push({ path: '/' + this.$i18n.locale + '/account/login' })
        }
    },
    methods: {
        swaping(route, bool){
            this.swap = bool
            this.$router.push({ path: '/' + this.$i18n.locale + route })
        }
    },
}
</script>


<style scoped>
    .up-in{
        width: 100%;
    }
    .upin-content{
        padding: 0 20%
    }
</style>

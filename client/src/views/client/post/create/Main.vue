<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'PostMain',
    components: {

    },
    data() {
        return {
            
        }
    },  
    mounted() {
        this.$router.push({ path: '/' + this.$i18n.locale + '/post/select category' })
    },
}
</script>

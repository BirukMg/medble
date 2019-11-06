<template>
    <div>
        <div class="header text-center">
            <search-content />
        </div>
        <div class="row" style="margin-top: 20px">
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
               <router-link :to="`/${$i18n.locale}/scam`"><p class="animated fadeIn infinite" style="color: red; margin-top: 20px;"><span style="font-weight: bold">Scam Alert!!!</span> click here</p></router-link>
                <h1>{{$t('message')}}</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <top-posts />
                <new-post />
                <category />
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <h1>AD HERE</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
            </div>
        </div>
    </div>
</template>

<script>
import topPosts from './TopPosts'
import category from './Categories'
import newPost from './NewPost'
import searchContent from '../../../components/SearchContent'
export default {
    components: {
        topPosts,category,searchContent, newPost
    }
}
</script>
<style scoped>
    .header{
    width: 100%;
    height: 250px;
    background-image: linear-gradient(to bottom, #3b3d3f, #212121);
    margin-top: -20px;
    padding: 5% 0
  }
</style>

<template>
  <div class="container">
    <carousel :per-page="1" :autoplay="true" :autoplayTimeout="3000" :speed="1000" :paginationEnabled="false" :loop="true" :navigate-to="someLocalProperty" :mouse-drag="true">
    <slide>
      <div class="row">
          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3" style="margin-top: 5px" v-for="i in 4" :key="i">
              <div class="card card-image" style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);">
          <div class="text-white text-center d-flex align-items-center rgba-black-light py-5 px-4">
              <div>
              <h5 class="pink-text"><i class="fas fa-chart-pie"></i> Marketing</h5>
              <h3 class="card-title pt-2"><strong>This is the card title</strong></h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                  optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos.
                  Odit sed qui, dolorum!.</p>
              <a class="btn btn-pink"><i class="fas fa-clone left"></i> View project</a>
              </div>
          </div>

          </div>
          </div>
      </div>
    </slide>
    <slide>
      <div class="row">
          <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3" style="margin-top: 5px" v-for="i in 4" :key="i">
              <div class="card card-image" style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);">
          <div class="text-white text-center d-flex align-items-center rgba-black-light py-5 px-4">
              <div>
              <h5 class="pink-text"><i class="fas fa-chart-pie"></i> Marketing</h5>
              <h3 class="card-title pt-2"><strong>This is the card title</strong></h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                  optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos.
                  Odit sed qui, dolorum!.</p>
              <a class="btn btn-pink"><i class="fas fa-clone left"></i> View project</a>
              </div>
          </div>

          </div>
          </div>
      </div>
    </slide>
  </carousel>
  </div>
</template>

<script>
import { mdbCarousel, mdbCarouselItem, mdbCarouselCaption, mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText,mdbView,mdbMask,mdbIcon } from 'mdbvue';

export default {
  name: 'CarouselPage',
  components: {
    mdbCarousel,
    mdbCarouselItem,
    mdbCarouselCaption, mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText,mdbView,mdbMask,mdbIcon
  },
  data() {
      return {
          img: require('../../../assets/img/img (12).jpg')
      }
  },
};
</script>

<style scoped>
</style>
<template id="">
  <div>
    <mdb-container style="margin-top: 30px">
      <section id="products" class="text-center wow fadeIn" data-wow-delay="0.3s">
                  <div class="row">

                      <!-- Grid column -->
                      <div class="col-md-4 mb-4 intro-cards" @click="$router.push('/categories/marchandise')">
                          <i class="fa fa-4x fa-shopping-basket"></i>
                          <h4 class="font-weight-bold my-4">Merchandise</h4>
                          <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                      </div>
                      <!-- Grid column -->

                      <!-- Grid column -->
                      <div class="col-md-4 mb-4 intro-cards" @click="$router.push('/categories/vehicles')">
                          <i class="fa fa-4x fa-car"></i>
                          <h4 class="font-weight-bold my-4">Vehicles</h4>
                          <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                      </div>
                      <!-- Grid column -->

                      <!-- Grid column -->
                      <div class="col-md-4 mb-4 intro-cards" @click="$router.push('/categories/employment')">
                          <i class="fa fa-4x fa-briefcase"></i>
                          <h4 class="font-weight-bold my-4">Employment</h4>
                          <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                      </div>
                      <!-- Grid column -->

                  </div>
                  <!-- Grid row -->
                  <div class="row">

                      <!-- Grid column -->
                      <div class="col-md-4 mb-4 intro-cards" @click="$router.push('/categories/constructionFarm')">
                          <i class="fa fa-4x fa-building"></i>
                          <h4 class="font-weight-bold my-4">Construction</h4>
                          <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                      </div>
                      <!-- Grid column -->

                      <!-- Grid column -->
                      <div class="col-md-4 mb-4 intro-cards" @click="$router.push('/categories/realstate')">
                          <i class="fa fa-4x fa-home"></i>
                          <h4 class="font-weight-bold my-4">Real Estate</h4>
                          <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                      </div>
                      <!-- Grid column -->

                      <!-- Grid column -->
                      <div class="col-md-4 mb-4 intro-cards" @click="$router.push('/categories/rentals')">
                          <i class="fa fa-4x fa-key"></i>
                          <h4 class="font-weight-bold my-4">Rentals</h4>
                          <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                      </div>
                      <!-- Grid column -->
                      <div class="row">

                          <!-- Grid column -->
                          <div class="col-md-4 mb-4 intro-cards" @click="$router.push('/categories/services')">
                              <i class="fa fa-4x fa-cogs"></i>
                              <h4 class="font-weight-bold my-4">Services</h4>
                              <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                          </div>
                          <!-- Grid column -->
                          <!-- Grid column -->
                          <div class="col-md-4 mb-4 intro-cards" @click="$router.push('/categories/')">
                              <i class="fa fa-4x fa-truck"></i>
                              <h4 class="font-weight-bold my-4">Farm Equipment</h4>
                              <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                          </div>
                          <!-- Grid column -->
                           <!-- Grid column -->
                          <div class="col-md-4 mb-4 intro-cards" @click="$router.push('/categories/events')">
                              <i class="fa fa-4x fa-calendar-check"></i>
                              <h4 class="font-weight-bold my-4">Events</h4>
                              <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                          </div>
                          <!-- Grid column -->
                      </div>

                      <div class="row">

                          <!-- Grid column -->
                          <div class="col-md-4 mb-4">
                          </div>
                          <!-- Grid column -->
                          <!-- Grid column -->
                          <div class="col-md-4 mb-4 intro-cards" @click="$router.push('/categories/')">
                              <i class="fa fa-4x fa-user"></i>
                              <h4 class="font-weight-bold my-4">Resumes</h4>
                              <p class="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
                          </div>
                          <!-- Grid column -->
                           <!-- Grid column -->
                          <div class="col-md-4 mb-4">
                          </div>
                          <!-- Grid column -->
                      </div>

                  </div>
              </section>
    </mdb-container>
  </div>
</template>
<script>
  import {mdbContainer} from 'mdbvue';
  export default {
    name: 'Home',
    components: {
      mdbContainer
    },
    data() {
      return {
        modal: false
      }
    }
  }
</script>
<style scopped>
  .intro-cards:hover{
    cursor: pointer;
    box-shadow: 1px 1px 1px 1px grey;
    border-radius: 6px;
  }
  .intro-cards{
    padding: 20px;
  }
</style>

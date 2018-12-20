<template>
  <div>
    <!-- SERVICES SECTION -->
    <section id="index-services" class="my-5">
      <div class="container">
        <div class="row">
          <!-- Title -->
          <div class="col">
            <div class="page-sub-title text-center">
              <h2 class>Services</h2>
              <div class="line"></div>
            </div>
          </div>
        </div>
        <!-- End of title -->
        <!-- Content -->
        <div class="row mt-5 text-center">
          <div class="col-md-4 pt-2 service">
            <p>
              <i class="fas fa-car fa-10x"></i>
            </p>
            <p class="font-weight-bold">Share your ride</p>
            <p class="small font-weight-light">
              Are you getting sick of traveling alone and spent so much money on gas? Share your
              ride today,and forget about this problems.
            </p>
          </div>
          <div class="col-md-4 pt-2 service">
            <p>
              <i class="fas fa-users fa-10x"></i>
            </p>
            <p class="font-weight-bold">Find new friends</p>
            <p class="small font-weight-light">
              Finding new friends is easier than ever,nothing makes better friendship than spending
              few hours casually chatting with some interesting people.
            </p>
          </div>
          <div class="col-md-4 pt-2 service">
            <p>
              <i class="fas fa-map-marker-alt fa-10x"></i>
            </p>
            <p class="font-weight-bold">Go to new places</p>
            <p class="small font-weight-light">
              Find some new favourite place to chill out,you have no longer got excuse for not
              travelling and discovering.
            </p>
          </div>
        </div>
        <!-- End of Content -->
      </div>
    </section>

    <!-- STATISTICS SECTION -->
    <section id="index-statistics">
      <!-- Title -->
      <div class="container my-5">
        <div class="row">
          <div class="col">
            <div class="page-sub-title text-center">
              <h2 class>Statistics</h2>
              <div class="line"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Title -->
      <!-- Content -->
      <div id="index-statistics-content" class="position-relative">
        <div class="dark-overlay">
          <div class="container">
            <div class="row text-center align-items-center">
              <div class="col-md-4">
                <p class="m-0 counter">5,000</p>
                <p class="m-0 headline">Happy users</p>
              </div>
              <div class="col-md-4">
                <p class="m-0 counter">7,000</p>
                <p class="m-0 headline">Successful rides</p>
              </div>
              <div class="col-md-4">
                <p class="m-0 counter">600,000</p>
                <p class="m-0 headline">Miles traveled in a good company</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Content -->
    </section>

    <!-- TESTIMONIALS SECTION -->
    <section id="index-testimonials" class="my-5">
      <div class="container">
        <!-- Title -->
        <div class="row">
          <div class="col">
            <div class="page-sub-title text-center">
              <h2 class>Testimonials</h2>
              <div class="line"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Title -->
      <!-- Content -->
      <div class="container">
        <div class="row text-center my-4">
          <div class="col">
            <!-- SLICK -->
            <slick ref="slick" :options="slickOptions">
              <blockquote class="blockquote">
                <img class="img-fluid rounded-circle m-auto pb-2" src="/img/avatar-01.jpg">
                <p class="mb-0">
                  I really like to work for Sidecar. You get to meet all kinds of people. Different
                  types of characters. Get to enjoy some places that you haven't gone to in the city
                  or outside of the city.
                </p>
                <footer class="blockquote-footer">
                  Michelle Scott From
                  <cite title="Company 1">2533 Lakeview St</cite>
                </footer>
              </blockquote>
              <blockquote class="blockquote">
                <img class="img-fluid rounded-circle m-auto pb-2" src="/img/avatar-02.jpg">
                <p class="mb-0">
                  Amazing company, amazing goals! Sidecar is a community, it is more than a job.
                  Forging relationships and creating experiences that are changing the way we
                  travel!
                </p>
                <footer class="blockquote-footer">
                  Claudia Knight From
                  <cite title="Company 1">7762 Pecan Acres Ln</cite>
                </footer>
              </blockquote>
              <blockquote class="blockquote">
                <img class="img-fluid rounded-circle m-auto pb-2" src="/img/avatar-03.jpg">
                <p class="mb-0">
                  This position allows for great flexibility for retirees, students and/or extra
                  income stream. There are bonus opportunities for signing on drivers and new
                  customers.
                </p>
                <footer class="blockquote-footer">
                  Ramon Hayes From
                  <cite title="Company 1">8119 Oak Rd</cite>
                </footer>
              </blockquote>
            </slick>
            <!-- END OF SLICK -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Slick from "vue-slick";

export default {
  data() {
    return {
      slickOptions: {
        infinite: true,
        slideToShow: 1,
        slideToScroll: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000
      }
    };
  },
  components: { Slick }
};
</script>
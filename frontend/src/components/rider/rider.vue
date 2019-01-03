<template>
  <transition
    enter-active-class="animated fadeIn faster"
    leave-active-class="animated fadeOut faster"
    mode="out-in"
  >
    <book-car v-if="riderStatus==='init'"></book-car>
    <waiting v-if="riderStatus==='waiting'"></waiting>
    <request-accepted v-if="riderStatus==='requestAccepted'"></request-accepted>
  </transition>
</template>

<script>
import bookCar from "./book-car.vue";
import waiting from "./rider-waiting.vue";
import requestAccepted from "./rider-request-accepted.vue";

export default {
  computed: {
    riderStatus() {
      return this.$store.getters.getRiderStatus;
    }
  },
  components: {
    "book-car": bookCar,
    waiting: waiting,
    "request-accepted": requestAccepted
  },
  mounted() {
    this.sockets.subscribe("requestAccepted", data => {
      this.$store.commit("changeDriverInfo", data.driver);
      this.$store.commit("changeRiderStatus", "requestAccepted");

      // setTimeout(() => {
      //   this.$store.commit("changeRiderStatus", "init");
      // }, 10000);
    });
    this.sockets.subscribe("noAvailable", data => {
      console.log("No available");
    });
  }
};
</script>
<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <driver-init v-if="driverStatus==='init'"></driver-init>
    <new-request v-if="driverStatus==='newRequest'"></new-request>
  </transition>
</template>

<script>
import driverInit from "./driver-init.vue";
import newRequest from "./driver-new-request.vue";

export default {
  computed: {
    driverStatus() {
      return this.$store.getters.getDriverStatus;
    }
  },
  components: {
    "driver-init": driverInit,
    "new-request": newRequest
  },
  mounted() {
    this.sockets.subscribe("newRequest", data => {
      this.$store.commit("changeRequestInfo", data);
      this.$store.commit("changeDriverStatus", "newRequest");
    });
  }
};
</script>
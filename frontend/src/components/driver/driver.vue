<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <driver-init v-if="driverStatus==='init'"></driver-init>
    <new-request v-if="driverStatus==='new request'"></new-request>
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
  }
};
</script>
<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <driver-init v-if="driverStatus==='init'"></driver-init>
  </transition>
</template>

<script>
import driverInit from "./driver-init.vue";

export default {
  computed: {
    driverStatus() {
      return this.$store.getters.getDriverStatus;
    }
  },
  components: {
    "driver-init": driverInit
  }
};
</script>
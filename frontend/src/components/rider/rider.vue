<template>
  <transition
    enter-active-class="animated fadeIn faster"
    leave-active-class="animated fadeOut faster"
    mode="out-in"
  >
    <book-car v-if="status==='init'"></book-car>
    <waiting v-if="status==='waiting'"></waiting>
  </transition>
</template>

<script>
import bookCar from "./book-car.vue";
import waiting from "./rider-waiting.vue";

export default {
  data() {
    return {
      status: "init"
    };
  },
  components: {
    "book-car": bookCar,
    waiting: waiting
  },
  mounted() {
    setTimeout(() => {
      this.status = "waiting";
    }, 3000);
  }
};
</script>
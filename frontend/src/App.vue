<template>
  <div>
    <app-header></app-header>
    <router-view :key="$route.fullPath"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import header from "./components/common/header.vue";
import footer from "./components/common/footer.vue";

export default {
  components: {
    "app-header": header,
    "app-footer": footer
  }
};
</script>
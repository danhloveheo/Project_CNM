<template>
  <section id="driver-accept">
    <img src="/img/blank-avatar.png" class="img-fluid driver-avatar">
    <div class="driver-info">
      <p class="driver-name">{{driverInfo.fullName}}</p>
      <div class="car-info">
        <p class="car-type">
          Chevrolet Tahoe
          <span class="car-plate">38A-00023</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    driverInfo() {
      return this.$store.getters.getDriverInfo;
    }
  }
};
</script>

<style scoped>
#driver-accept {
  background-color: #63a599;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

#driver-accept .driver-avatar {
  border-radius: 100% !important;
  border: 5px solid #fff;
  position: absolute;
  top: 30%;
  left: 50%;
  width: 200px;
  height: 200px;
  margin-top: -100px;
  margin-left: -100px;
}

#driver-accept .driver-info {
  position: absolute;
  width: 100%;
  display: table;
  top: 45%;
}

#driver-accept .driver-name {
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  display: table-row;
  text-align: center;
}

#driver-accept .car-info {
  display: table-row;
  text-align: center;
  margin-top: 10px;
  font-size: 1.5rem;
  color: #fff;
}

#driver-accept .car-plate {
  background-color: #fff;
  color: #63a599;
  padding: 2px 10px;
  margin-left: 5px;
  border-radius: 5px !important;
}
</style>
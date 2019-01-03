<template>
  <section id="driver-accept">
    <div class="notification">
      <div class="container">
        <p>Yay, we found you a driver!</p>
      </div>
    </div>
    <div class="driver-info">
      <div class="container">
        <img src="img/blank-avatar.png" class="img-fluid driver-avatar">
        <div class="message">
          <p>
            Hi, my name is
            <span class="driver-name">{{driverInfo.fullName}}</span>
          </p>
          <p>and I am 0.2 km away</p>
          <div class="car-info">
            <p class="car-type">
              <i class="fas fa-car"></i> Chevrolet Tahoe
            </p>
            <p>
              <span class="car-plate">38A-00023</span>
            </p>
          </div>
        </div>
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

#driver-accept .notification {
  background-color: #f4f1e3;
  position: relative;
  width: 100%;
  height: 25%;
}

#driver-accept .notification p {
  color: #63a599;
  font-size: 1.8rem;
  font-weight: 500;
  padding-top: 30px;
  text-align: center;
}

#driver-accept .driver-info {
  position: absolute;
  width: 100%;
  top: 25%;
}

#driver-accept .driver-info .driver-avatar {
  border-radius: 100% !important;
  border: 5px solid #f4f1e3;
  position: absolute;
  top: 30%;
  left: 50%;
  width: 150px;
  height: 150px;
  margin-top: -180px;
  margin-left: -75px;
}

#driver-accept .driver-info .message {
  color: #fff;
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
  margin-top: 70px;
}

#driver-accept .driver-info .message p {
  padding: 5px 0;
  margin: 0 auto;
}

#driver-accept .driver-name {
  font-size: 1.8rem;
  font-weight: 700;
}

#driver-accept .car-info {
  padding-top: 20px;
  text-align: center;
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
<template>
  <div class="loader-container">
    <div class="loader">New&nbsp;Rider&nbsp;Request....</div>
    <div class="pickup-info">
      <div class="pickup-address">
        <p>
          <i class="fas fa-map-marker-alt"></i>
          {{this.requestInfo.curAddress}}
        </p>
        <p>
          <i class="fas fa-route mr-1"></i> 1.5 km
        </p>
      </div>
      <div class="action">
        <button class="btn btn-primary-outline-custom" @click="driverAccepted">Accept</button>
        <button class="btn btn-primary-outline-custom" @click="driverRejected">Decline</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    requestInfo() {
      return this.$store.getters.getRequestInfo;
    }
  },
  methods: {
    driverAccepted() {
      this.$socket.emit("driverAccepted", {
        rider: this.requestInfo,
        driver: {
          fullName: this.$store.getters.fullName,
          curPosition: this.$store.getters.getCurPosition
        }
      });
    },
    driverRejected() {
      this.$socket.emit("driverRejected", { rider: this.requestInfo });
      this.$store.commit("changeDriverStatus", "init");
    }
  }
};
</script>

<style scoped>
.loader-container {
  background: #63a599;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.loader {
  width: 380px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-family: helvetica, arial, sans-serif;
  text-transform: uppercase;
  font-weight: 900;
  color: #fff;
  letter-spacing: 0.2em;
}
.loader::before,
.loader::after {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  background: #fff;
  position: absolute;
  -webkit-animation: load 0.7s infinite alternate ease-in-out;
  animation: load 0.7s infinite alternate ease-in-out;
}
.loader::before {
  top: 0;
}
.loader::after {
  bottom: 0;
}

.pickup-info {
  display: table;
  position: absolute;
  width: 100%;
  top: 48%;
}

.pickup-address {
  display: table-row;
  text-align: center;
  color: #fff;
  border: 15px solid #fff;
  font-weight: bold;
}

.action {
  display: table-row;
  text-align: center;
}

.action button {
  margin: 10px 100px;
  padding: 10px 50px;
}

@-webkit-keyframes load {
  0% {
    left: 0;
    height: 30px;
    width: 15px;
  }
  50% {
    height: 8px;
    width: 40px;
  }
  100% {
    left: 365px;
    height: 30px;
    width: 15px;
  }
}

@keyframes load {
  0% {
    left: 0;
    height: 30px;
    width: 15px;
  }
  50% {
    height: 8px;
    width: 40px;
  }
  100% {
    left: 365px;
    height: 30px;
    width: 15px;
  }
}
</style>
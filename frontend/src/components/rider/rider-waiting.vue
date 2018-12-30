<template>
  <div class="loader-container">
    <div class="loader">Requesting&nbsp;Driver....</div>
  </div>
</template>

<style scoped>
.loader-container {
  background: #f4f1e3;
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
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-family: helvetica, arial, sans-serif;
  text-transform: uppercase;
  font-weight: 900;
  color: #63a599;
  letter-spacing: 0.2em;
}
.loader::before,
.loader::after {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  background: #63a599;
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
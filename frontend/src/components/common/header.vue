<template>
  <!-- HEADER -->
  <section id="index-header" class="position-relative">
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">SIDECAR</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ml-auto">
            <button class="nav-item nav-link active" href="#">Home</button>
            <button class="nav-item nav-link" v-b-modal.driver-modal>Driver</button>
            <button class="nav-item nav-link" v-b-modal.rider-modal>Rider</button>
            <button class="nav-item nav-link" v-b-modal.login-modal>Login</button>
          </div>
        </div>
      </div>
    </nav>
    <!-- END NAVBAR -->
    <!-- LOGIN MODAL -->
    <b-modal id="login-modal" class="login-modal" hide-header hide-footer centered>
      <div class="signup-form m-0 p-0">
        <form class="m-0" @submit.prevent="onLogin">
          <h2>Log In</h2>
          <p class="hint-text">
            Don't have account yet? Register as a
            <a href="#" v-b-modal.rider-modal>Rider</a> or
            <a href="#" v-b-modal.driver-modal>Driver</a> now!
          </p>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="Email"
              autocomplete="email"
              v-model="login.email"
            >
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
              autocomplete="none"
              v-model="login.password"
            >
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary-custom btn-lg btn-block">Sign In</button>
          </div>
        </form>
      </div>
    </b-modal>

    <!--RIDER REGISTER MODAL -->
    <b-modal id="rider-modal" class="register-modal" hide-header hide-footer centered>
      <div class="signup-form m-0 p-0">
        <form class="m-0" @submit.prevent="onSubmitRider">
          <h2>Rider</h2>
          <p class="hint-text">Create your account. It's free and only takes a minute.</p>
          <div class="form-group">
            <div class="row">
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  name="first_name"
                  placeholder="First Name"
                  autocomplete="false"
                  v-model="rider.firstName"
                >
              </div>
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  name="last_name"
                  placeholder="Last Name"
                  autocomplete="false"
                  v-model="rider.lastName"
                >
              </div>
            </div>
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="Email"
              v-model="rider.email"
            >
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
              v-model="rider.password"
            >
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="confirm_password"
              placeholder="Confirm Password"
              v-model="rider.confirmPassword"
            >
          </div>
          <div class="form-group">
            <label class="checkbox-inline">
              <input type="checkbox"> I accept the
              <a href="#">Terms of Use</a> &amp;
              <a href="#">Privacy Policy</a>
            </label>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary-custom btn-lg btn-block">Register Now</button>
          </div>
          <div class="text-center">
            Already have an account?
            <a href="#" v-b-modal.login-modal>Sign in</a>
          </div>
        </form>
      </div>
    </b-modal>

    <!--DRIVER REGISTER MODAL -->
    <b-modal id="driver-modal" class="register-modal" hide-header hide-footer centered>
      <div class="signup-form m-0 p-0">
        <form class="m-0" @submit.prevent="onSubmitDriver">
          <h2>Driver</h2>
          <p class="hint-text">Create your account. It's free and only takes a minute.</p>
          <div class="form-group">
            <div class="row">
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  name="first_name"
                  placeholder="First Name"
                  autocomplete="false"
                  v-model="driver.firstName"
                >
              </div>
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  name="last_name"
                  placeholder="Last Name"
                  autocomplete="false"
                  v-model="driver.lastName"
                >
              </div>
            </div>
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="Email"
              v-model="driver.email"
            >
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
              v-model="driver.password"
            >
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="confirm_password"
              placeholder="Confirm Password"
              v-model="driver.confirmPassword"
            >
          </div>
          <div class="form-group">
            <label class="checkbox-inline">
              <input type="checkbox"> I accept the
              <a href="#">Terms of Use</a> &amp;
              <a href="#">Privacy Policy</a>
            </label>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary-custom btn-lg btn-block">Register Now</button>
          </div>
          <div class="text-center">
            Already have an account?
            <a href="#" v-b-modal.login-modal>Sign in</a>
          </div>
        </form>
      </div>
    </b-modal>
  </section>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      rider: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "rider"
      },
      driver: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "driver"
      }
    };
  },
  methods: {
    onSubmitRider() {
      const formData = {
        firstName: this.rider.firstName,
        lastName: this.rider.lastName,
        email: this.rider.email,
        password: this.rider.password,
        role: this.rider.role
      };

      this.$store.dispatch("registerRider", formData);
    },

    onSubmitDriver() {
      const formData = {
        firstName: this.driver.firstName,
        lastName: this.driver.lastName,
        email: this.driver.email,
        password: this.driver.password,
        role: this.driver.role
      };

      this.$store.dispatch("registerDriver", formData);
    },
    onLogin() {
      const formData = {
        email: this.login.email,
        password: this.login.password
      };

      this.$store.dispatch("login", formData);
    }
  }
};
</script>

<style>
div.login-modal .modal-content,
div.register-modal .modal-content {
  width: 400px !important;
}

div.login-modal .modal-body,
div.register-modal .modal-body {
  padding: 0;
  margin: 0;
}
</style>
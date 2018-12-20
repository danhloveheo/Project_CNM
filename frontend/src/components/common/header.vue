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
        <form class="m-0">
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
            >
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
              autocomplete="none"
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
        <form class="m-0">
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
                >
              </div>
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  name="last_name"
                  placeholder="Last Name"
                  autocomplete="false"
                >
              </div>
            </div>
          </div>
          <div class="form-group">
            <input type="email" class="form-control" name="email" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" name="password" placeholder="Password">
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="confirm_password"
              placeholder="Confirm Password"
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
        <form class="m-0">
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
                >
              </div>
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  name="last_name"
                  placeholder="Last Name"
                  autocomplete="false"
                >
              </div>
            </div>
          </div>
          <div class="form-group">
            <input type="email" class="form-control" name="email" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" name="password" placeholder="Password">
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="confirm_password"
              placeholder="Confirm Password"
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
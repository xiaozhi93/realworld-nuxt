<template>
  <div class="app">
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" active-class="active" exact to="/"
              >Home</nuxt-link
            >
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                exact-active-class="active"
                to="/editor"
              >
                <i class="ion-compose"></i>&nbsp;New Post</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                exact-active-class="active"
                to="/settings"
              >
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                exact-active-class="active"
                :to="{name: 'profile', params: {username: user.username }}"
              >
                <img class="user-pic" :src="user.image" alt="" />
                {{ user.username }}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                exact-active-class="active"
                to="/login"
                >Sign in</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                exact-active-class="active"
                to="/register"
                >Sign up</nuxt-link
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <nuxt-child />
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "IndexLayout",
  computed: {
    ...mapState(["user"]),
  },
};
</script>
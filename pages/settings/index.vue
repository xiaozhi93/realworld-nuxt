<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="message in messages" :key="message">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>
          <form @submit.prevent>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  autocomplete="new-password"
                  v-model="user.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateUser"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUser, updateUser } from "@/services/user";
import Cookie from "js-cookie";
export default {
  name: "SettingPage",
  middleware: "authenticated",
  async asyncData() {
    const { data } = await getUser();
    const { user } = data;
    return {
      user: {
          ...user,
          password: ''
      }
    };
  },
  head() {
      return {
          title: `Setting--conduit`
      }
  },
  data() {
      return {
          errors: {}
      }
  },
  methods: {
    async updateUser() {
        const { username, bio, image, email, password } = this.user
        const params = { username, image, email, bio }
        if (password) {
            params.password = password
        }
        try {
            await updateUser(params);
            this.$router.push({ name: "profile", params: { username: this.user.username} });
        } catch(e) {
            this.errors = e.response.data.errors;
        }
    },
    async logout() {
      Cookie.remove('user');
      this.$store.commit("setUser", null);
      this.$router.replace({ name: "home" });
    },
  },
};
</script>
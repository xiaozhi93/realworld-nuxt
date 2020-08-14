<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account ?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account ?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="message in messages" :key="message">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                minlength="8"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login, register } from "@/services/user";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: 'LoginPage',
  middleware: 'notAuthenticated',
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  head() {
    return {
        title: `${this.isLogin ? 'Sign in' : 'Sign up'}--conduit`
    }
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    async onSubmit() {
      try {
        const params = this.user;
        const service = this.isLogin ? login : register;
        const { data }= await service({
          user: params,
        });
        // TODO: 保存用户登录状态
        console.log(data)
        this.$store.commit("setUser", data.user);
        Cookie.set("user", data.user);
        this.$router.push("/");
      } catch (e) {
        this.errors = e.response.data.errors;
      }
    },
  },
};
</script>
<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn" v-if="isMe" @click="$router.push({ name: 'settings'})">
                <i class="ion-gear-a"></i>
                 Edit Profile Settings
            </button>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="toggleFollowToUser"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? "Unfollow" : "Follow" }}
              {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: $route.name === 'myActicle' }"
                  :to="{ name: 'myActicle' }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: $route.name === 'favoriteActicle' }"
                  :to="{ name: 'favoriteActicle' }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>
          <nuxt-child :key="$route.name" :profile="profile" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getProfileFormUser,
  setFollowToUser,
  deleteFollowToUser,
} from "@/services/user";
import ActicleList from "./ActicleList";
export default {
  name: "ProfilePage",
  middleware: "authenticated",
  components: {
    ActicleList,
  },
  head() {
      return {
          title: `${this.$route.params.username}--conduit`
      }
  },
  computed: {
      isMe() {
          return this.profile.username === this.$store.state.user.username
      }
  },
  async asyncData({ params }) {
    const { data } = await getProfileFormUser(params.username);
    const { profile } = data;
    profile.followDisabled = false;
    return {
      profile,
    };
  },
  methods: {
    async toggleFollowToUser() {
      this.profile.followDisabled = true;
      if (this.profile.following) {
        await deleteFollowToUser(this.profile.username);
        this.profile.following = false;
      } else {
        await setFollowToUser(this.profile.username);
        this.profile.following = true;
      }
      this.profile.followDisabled = true;
    },
  },
};
</script>
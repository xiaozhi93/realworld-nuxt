<template>
  <div class="article-meta">
    <nuxt-link
      :to="{ name: 'profile', params: { username: article.author.username } }"
      ><img :src="article.author.image"
    /></nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{ name: 'profile', params: { username: article.author.username } }"
        class="author"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{
        article.createdAt | formatDate("MMM DD,YYYY")
      }}</span>
    </div>
    <template v-if="user && (article.author.username === user.username)">
      <nuxt-link
        :to="{
           name: 'updateEditor',
           params: { slug: article.slug}
        }"
        class="btn btn-outline-secondary btn-sm"
      >
        <i class="ion-edit"></i>
        Edit Article
      </nuxt-link>
      &nbsp;&nbsp;
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle" :disabled="deleteLoading">
        <i class="ion-trash-a"></i>
        Delete Article
      </button>
    </template>
    <template v-else>
      <button
        :disabled="followLoading"
        @click="toggleFollowToUser"
        class="btn btn-sm btn-secondary action-btn"
      >
        <i class="ion-plus-round"></i>
        &nbsp;{{ article.author.following ? "Unfollow" : "Follow" }}
        {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button :disabled="favoriteLoading" class="btn btn-sm btn-primary" @click="toggleFavoriteToArticle">
        <i class="ion-heart"></i>
        &nbsp; {{ article.favorited ? "Unfavorite Post" : "Favorite Post" }}
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  deleteFavoriteToArticle,
  setFavoriteToArticle,
  deleteArticle,
} from "@/services/article";
import { setFollowToUser, deleteFollowToUser } from "@/services/user";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
        deleteLoading: false,
        followLoading: false,
      favoriteLoading: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async deleteArticle() {
        this.deleteLoading = true
        await deleteArticle(this.article.slug)
        this.deleteLoading = false
        this.$router.replace({ name: 'home'})
    },
    async toggleFollowToUser() {
      this.followLoading = true;
      if (this.article.author.following) {
        await deleteFollowToUser(this.article.author.username);
        this.article.author.following = false; // 直接修改属性共享的数据， 一般不能修改prop
      } else {
        await setFollowToUser(this.article.author.username);
        this.article.author.following = true;
      }
      this.followLoading = true;
    },
    async toggleFavoriteToArticle() {
      this.favoriteLoading = true;
      // 交互
      if (this.article.favorited) {
        await deleteFavoriteToArticle(this.article.slug);
        this.article.favorited = false;
        this.article.favoritesCount--;
      } else {
        await setFavoriteToArticle(this.article.slug);
        this.article.favorited = true;
        this.article.favoritesCount++;
      }
      this.favoriteLoading = false;
    },
  },
};
</script>
<template>
  <div>
    <div class="article-preview" v-if="loading">
      Loading Acticles
    </div>
    <div
      v-else
      class="article-preview"
      v-for="article in list"
      :key="article.slug"
    >
      <div class="article-meta">
        <nuxt-link
          :to="{
            name: 'profile',
            params: { username: article.author.username },
          }"
        >
          <img :src="article.author.image"
        /></nuxt-link>
        <div class="info">
          <nuxt-link
            class="author"
            :to="{
              name: 'profile',
              params: { username: article.author.username },
            }"
            >{{ article.author.username }}</nuxt-link
          >
          <span class="date">
            {{ article.createdAt | formatDate("MMM DD,YYYY") }}</span
          >
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          :class="{ active: article.favorited }"
          :disabled="article.favoriteDisabled"
          @click="toggleFavoriteToArticle(article)"
        >
          <i class="ion-heart"></i> {{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link
        class="preview-link"
        :to="{ name: 'article', params: { slug: article.slug } }"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        <ul class="tag-list" v-if="article.author.username === user.username">
          <li
            class="tag-default tag-pill tag-outline"
            v-for="tag in article.tagList"
            :key="tag"
          >
            {{ tag }}
          </li>
        </ul>
      </nuxt-link>
    </div>
    <!-- 分页 -->
    <nav v-if="totalPage > 1">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ active: item === page }"
          v-for="item in totalPage"
          :key="item"
        >
          <a class="page-link" @click="onPageChange(item)">
            {{ item }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import {
  getArticles,
  deleteFavoriteToArticle,
  setFavoriteToArticle,
} from "@/services/article";
import { mapState } from "vuex";
export default {
  name: "ArticleList",
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      limit: 10,
      list: null,
      total: null,
      loading: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.total / this.limit);
    },
  },
  mounted() {
    // 前端渲染
    this.getArticles();
  },
  methods: {
    async getArticles() {
      this.loading = true;
      const params = {
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
      };
      if (this.$route.name === "myActicle") {
        params.author = this.profile.username;
      } else {
        params.favorited = this.profile.username;
      }
      const { data } = await getArticles(params);
      const { articles, articlesCount } = data;
      this.list = articles;
      this.total = articlesCount;
      this.loading = false;
    },
    async toggleFavoriteToArticle(article) {
      article.favoriteDisabled = true;
      // 交互
      if (article.favorited) {
        await deleteFavoriteToArticle(article.slug);
        article.favorited = false;
        article.favoritesCount--;
      } else {
        await setFavoriteToArticle(article.slug);
        article.favorited = true;
        article.favoritesCount++;
      }
      article.favoriteDisabled = false;
    },
    onPageChange(page) {
      this.page = page;
      this.getArticles();
    },
  },
};
</script>
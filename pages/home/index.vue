<template>
  <div class="home-page">
    <div class="banner" v-if="!user">
      <div class="container">
        <h1 class="logo-font">conduit-windfly</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  :to="{ name: 'home', query: { tab: 'your_feed' } }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  :to="{ name: 'home', query: { tab: 'global_feed' } }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{ name: 'home', query: { tab: 'tag', tag: tag } }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
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
              :to="{ name: 'article', params: { slug: article.slug } }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list" v-if="user && (article.author.username === user.username)">
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
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{ active: item === page }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: { page: item, tag: $route.query.tag, tab: tab },
                  }"
                >
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{ name: 'home', query: { tag: item, tab: 'tag' } }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                >{{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getArticles,
  getYourFeedArticles,
  getTags,
  setFavoriteToArticle,
  deleteFavoriteToArticle,
} from "@/services/article";
import { mapState } from "vuex";
export default {
  name: "HomePage",
  watchQuery: ["page", "tag", "tab"],
  head() {
      return {
          title: 'Home--conduit'
      }
  },
  async asyncData({ query }) {
    const page = parseInt(query.page || 1);
    const limit = 20;
    const tab = query.tab || "global_feed";
    const tag = query.tag;
    const loadArticles =
      tab === "your_feed" ? getYourFeedArticles : getArticles;
    // const { data } = await getArticles({
    //     limit,
    //     offset: (page - 1) * limit
    // })
    // const { data: tagData } = await getTags()
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag: tag,
      }),
      getTags(),
    ]);
    // 添加默认可点击状态
    const { articles } = articleRes.data;
    articles.forEach((article) => {
      article.favoriteDisabled = false;
    });
    return {
      articles: articles,
      articlesCount: articleRes.data.articlesCount,
      limit,
      page,
      tags: tagRes.data.tags,
      tab,
      tag,
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async toggleFavoriteToArticle(article) {
      article.favoriteDisabled = true;
      // 交互
      if (article.favorited) {
        await deleteFavoriteToArticle(article.slug);
        article.favorited = false
        article.favoritesCount--;
      } else {
        await setFavoriteToArticle(article.slug);
        article.favorited = true
        article.favoritesCount++;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>
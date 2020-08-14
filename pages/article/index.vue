<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article"></ArticleMeta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.body"></div>
          <ul
            class="tag-list"
            v-if="user && article.author.username === user.username"
          >
            <li
              class="tag-default tag-pill tag-outline"
              v-for="tag in article.tagList"
              :key="tag"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article"></ArticleMeta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleComment :article="article"></ArticleComment>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticle } from "@/services/article";
import ArticleMeta from "./ArticleMeta";
import ArticleComment from "./ArticleComment";
import MarkdownIt from "markdown-it";
import { mapState } from "vuex";
export default {
  name: "ArticlePage",
  components: {
    ArticleMeta,
    ArticleComment,
  },
  head() {
    return {
      title: this.article.title,
      meta: [{ hid: 'description', name: "description", content: this.article.description }],
    };
  },
  async asyncData({ params }) {
    try {
      const { data } = await getArticle(params.slug); // 文章删除
      const { article } = data;
      const markdownIt = new MarkdownIt();
      article.body = markdownIt.render(article.body);
      return {
        article,
      };
    } catch (e) {}
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
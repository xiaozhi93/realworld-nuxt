<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="tag"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keydown.enter="addTag"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="item in article.tagList"
                    :key="item"
                  >
                    <i class="ion-close-round" @click="removeTag(item)"></i>
                    {{ item }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="submitArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createArticle, getArticle } from "@/services/article";
export default {
  name: "EditorPage",
  middleware: "authenticated",
  head() {
      return {
          title: `Editor--conduit`
      }
  },
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      tag: "",
    };
  },
  mounted() {
    if (this.$route.name === "updateEditor") {
      this.getArticle();
    }
  },
  methods: {
    async getArticle() {
      const { data } = await getArticle(this.$route.params.slug);
      this.article = data.article;
    },
    addTag() {
      if (!this.article.tagList.find((item) => item === this.tag)) {
        this.article.tagList.push(this.tag);
        this.tag = "";
      }
    },
    removeTag(tag) {
      this.article.tagList = this.article.tagList.filter(
        (item) => item !== tag
      );
    },
    async submitArticle() {
      await createArticle({
        article: this.article,
      });
      this.$router.push({ name: "home" });
    },
  },
};
</script>
<template>
  <div class="commnet">
    <form class="card comment-form" @submit.prevent>
      <div class="card-block">
        <textarea
            v-model="comment.body"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="postCommentToArticle">
          Post Comment
        </button>
      </div>
    </form>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: { username: comment.author.username },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: { username: comment.author.username },
          }"
          class="comment-author"
          >{{ comment.author.username }}</nuxt-link
        >
        <span class="date-posted">{{
          comment.author.createdAt | formatDate("MMM DD,YYYY")
        }}</span>
        <span class="mod-options">
          <i class="ion-trash-a" v-if="user && (comment.author.username === user.username)" @click="deleteCommentFromArticle(comment.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getCommentsFormArticle, addCommentToArticle, deleteCommentFormArticle  } from "@/services/article";
export default {
  name: "ArticleComment",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comment: {
        body: "",
      },
      comments: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },

  mounted() {
      this.getCommentsFormArticle()
  },
  methods: {
    async getCommentsFormArticle() {
      const { data } = await getCommentsFormArticle(this.$route.params.slug);
      const { comments } = data;
      this.comments = comments;
    },
    async postCommentToArticle() {
        await addCommentToArticle(this.article.slug, { comment: this.comment })
        this.comment.body = ""
        this.getCommentsFormArticle()
    },
    async deleteCommentFromArticle(commentId) {
        await deleteCommentFormArticle(this.article.slug, commentId)
        this.getCommentsFormArticle()
    }
  },
};
</script>
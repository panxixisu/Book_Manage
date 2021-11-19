<template>
  <div class="defaultForm" v-show ="this.$store.state.getReady">

    <div class="title">
      {{ dataForm.bookName }}
    </div>
    <div class="author">
      {{ dataForm.authorName }} 
    </div>
    <div class="intro">{{ dataForm.Introduction }}</div>
    <div style="margin-top: 20px">
      <div
        style="float: left; width: 25%"
        v-for="chapter in chapters"
        :key="chapter.chapterId"
      >
        <el-button type="text" @click="gotoBookRead(chapter.chapterId)">{{
          chapter.chapter
        }}</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.state.getReady = false;
  },
  computed: {
    dataForm: function () {
   
      this.$store.state.getReady = true;
      return this.$store.state.editData[0];
      
    },
    chapters: function () {
      return this.$store.state.allChapterData;
    },
    // imgUrl: function () {
    //   return this.$store.state.editAuthorData[0].authorImgName;
    // },
    // geturl(){
    //     return require('../upload/'+this.$store.state.img.imgname)

    // }
  },
  methods: {
    gotoBookRead(id) {
      for (let i in this.$store.state.chapterIdGroup) {
        if (this.$store.state.chapterIdGroup[i] == id) {
          this.$store.state.EditChapterData = this.$store.state.allChapterData[
            i
          ];
          this.$store.state.chapterPointer.now = i-0;
          this.$store.state.chapterPointer.pre = i - 1;
          if (Number(i) + 1 == this.$store.state.allChapterData.length) {
            this.$store.state.chapterPointer.next = -1;
          } else {
            this.$store.state.chapterPointer.next = Number(i)+1;
          }
          break;
        }
      }
     
      this.$router.push("/Author/book-read");
    },
  },
};
</script>

<style scoped>
.defaultForm {
  width: 94%;
  margin-top: 25px;
  margin-left: 30px;
}

.avatar {
  width: 92px;
  display: block;
}

.time {
  font-size: 13px;
  color: #999;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.intro {
  margin-top: 10px;
  font-size: 13px;
  color: #b1aeae;
  text-align: left;
}

.author {
  margin-top: 10px;
  text-align: center;
}
</style>
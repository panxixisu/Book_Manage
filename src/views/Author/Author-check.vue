<template>
  <div class="defaultForm" v-show="this.$store.state.getReady">
    <el-tabs tabPosition="left" >
      <el-tab-pane label="作者信息">
        <img :src="'http://www.panxixi.xyz/web/AuthorImg/' + imgUrl" class="avatar" />
        <div style="margin-top: 15px; text-align: left">
          姓名：{{ dataForm.authorName }}
        </div>
        <div style="margin-top: 15px; text-align: left">
          简介：{{ dataForm.Introduction }}
        </div>
        <div style="margin-top: 35px">
          <el-button @click="$router.back(-1)" size="mini">返回</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="作品列表">
        <div class="book-item" v-for="book in books" :key="book.bookId">
          <div class="img">
            <img width="90" :src="'http://www.panxixi.xyz/web/upload/' + book.imgName" />
          </div>
          <div class="content">
            <div style="height: 30px">
              <div class="title">{{ book.bookName }}</div>
              <div class="category">
                <el-tag type="success" size="mini"
                  >{{ book.Words }} 万字</el-tag
                >
              </div>
            </div>
            <div class="introduction">
              {{ book.Introduction }}
            </div>
            <div class="author">
              <el-button
                type="text"
                class="button"
                @click="gotoBookDetails(book.bookId)"
                >查看</el-button
              >
            </div>
          </div>
        </div>
       
      </el-tab-pane>
    </el-tabs>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
    
    };
  },
  computed: {
    dataForm: function () {
    
      return this.$store.state.editAuthorData[0];
    },
    books: function () {
      return this.$store.state.books;
    },
    imgUrl: function () {
      return this.$store.state.editAuthorData[0].authorImgName;
    },
    // geturl(){
    //     return require('../upload/'+this.$store.state.img.imgname)

    // }
  },
  created() {},
  methods: {
    gotoBookDetails(bookId) {
       this.$store.dispatch('agetEditData',bookId);
     
       
      this.$store.dispatch("agetallChapterData", bookId);
   
         this.$router.push("/Author/book-details");
  
     
    },
  },
};
</script>

<style scoped>
.defaultForm {
  width: 94%;
  margin-top: 25px;
  margin-left: 10px;
}

.avatar {
  width: 128px;
  height: 128px;
  display: block;
}

.book-item {
  height: 130px;
  margin-bottom: 20px;
}
.book-item .img {
  float: left;
  width: 16%;
}
.book-item .content {
  float: left;
  width: 84%;
}
.book-item .content .title {
  float: left;
  width: 80%;
  text-align: left;
  font-weight: bold;
}
.book-item .content .category {
  text-align: right;
  float: left;
  width: 20%;
}
.book-item .content .introduction {
  color: #b1aeae;
  font-size: 12px;
  height: 70px;
  text-align: left;
}
.book-item .content .author {
  color: #9db4e5;
  font-size: 13px;
  font-weight: bold;
  height: 26px;
  text-align: left;
}
</style>
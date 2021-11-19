<template>
  <div style="padding: 10px">
    <el-row :gutter="20">
      <el-col :span="17">
        <el-card class="box-card" shadow="hover">
          <div class="card-header">高分图书</div>

          <div class="book-item" v-for="book in books" :key="book.bookId" style="width:100%;height:150px">
            <div class="img" >
              <img v-lazy="'http://www.panxixi.xyz/web/upload/' + book.imgName" width="100%"  />
            </div>
            <div class="content">
              <div style="height:20%">
                <div class="title">
                  <el-link type="text" @click="gotoBookDetails(book.bookId)">{{
                    book.bookName
                  }}</el-link>
                </div>
                <div class="category">
                  <el-tag type="success" size="mini">{{
                    book.dicCategory
                  }}</el-tag>
                </div>
              </div>
              <div class="introduction">
                {{ book.Introduction }}
              </div>
              <div class="author">
                {{ book.authorName }}
              </div>
            </div>
          </div>
        </el-card> 
      </el-col>
      <el-col :span="7">
       
          <el-card class="box-card" shadow="hover">
            <div class="card-header">作品量排行</div>
            <div v-for="author in authors" :key="author.authorId" style="width:100%;">
              <div class="author-item">
                <div style="float: left;width:40%;">
                
                   <img :src="'http://www.panxixi.xyz/web/AuthorImg/'+author.authorImgName"  class="author-item-img" />
                </div>
                 <div style="float: left;width:50%;text-align:left;padding-left:2%">
                  <span class="author-text">
                    <el-link
                      :underline="false"
                      @click="gotoAuthorDetails(author.authorId)"
                      >{{ author.authorName }}</el-link
                    >
                  </span>
                  <span class="author-book-text"> ({{ author.works }})</span>
                </div>
              </div>
              <!-- <div style="clear: both"></div> -->
            </div>
          </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    books: function () {
      return this.$store.state.topBooks;
    },
    authors: function () {
      return this.$store.state.MaxWork;
    },
  },
  created() {
    this.$store.state.getReady = false;
  },
  methods: {
gotoBookDetails(bookId){
 this.$store.dispatch('agetEditData',bookId);
      this.$store.dispatch("agetallChapterData", bookId);
      setTimeout(() => {
         this.$router.push("/Author/book-details");
      }, 400);

},gotoAuthorDetails(authorId){
  this.$store.state.getReady = false;
  this.$store.dispatch('agetEditAuthorData',authorId);
           
              
     setTimeout(() => {
        this.$router.push('/showAuthor/author-check') 
     }, 700);
},
    
  },
};
</script>

<style scoped>
body {
  margin: 0px;
}







.homeHeader .title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #ffffff;
}

.homeHeader .userInfo {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 32px;
  height: 32px;
  border-radius: 24px;
  margin-left: 8px;
  margin-right: 10px;
}

.el-dropdown-link {
  color: rgb(32, 25, 25);
  display: flex;
  align-items: center;
}

.main-header {
  line-height: 45px;
  background: #e4f5ff;
  padding: 15px;
  width: 100%;
}

.card-header {
  padding-bottom: 20px;
  width: 100%;
  font-weight: bold;
}

.text {
  font-size: 14px;
}

.book-item {
  height: 130px;
  width: 100%;
  margin-bottom: 20px;
}
.book-item .img {
  float: left;
  width: 13%;
  height: 100%;
}
.book-item .content {
  float: left;
  width: 85%;
  height: 100%;
  padding-left: 2%;
}
.book-item .content .title {
  float: left;
  width: 80%;
  text-align: left;
}
.book-item .content .category {
  text-align: right;
  float: left;
  width: 20%;
}
.book-item .content .introduction {
  color: #b1aeae;
  font-size: 13px;
  height: 58%;
  text-overflow: ellipsis;
  text-align: left;
  display: block;
  overflow: hidden;
   -webkit-line-clamp: 5;
  text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  
}
.book-item .content .author {
  color: #9db4e5;
  font-size: 13px;
  font-weight: bold;
  height: 20%;
  text-align: left;
}

.author-text {
  font-size: 14px;
  color: rgb(221, 103, 133);
  font-weight: bold;
}

.author-book-text {
  font-size: 14px;
  color: rgb(175, 178, 182);
}

.author-item {
  height: 60px;
  line-height: 60px;
  width:100%;
  display: block;
  margin:8px

}

.author-item-img {
  /* width: 48px;
  height: 48px; */
  float: right;
  width: 50%;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>

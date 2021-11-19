<template>
  <div>
    <!--工具栏-->
    <el-form :inline="true" :model="formInline" size="mini" class="toolbar" style="text-align:left; height: 40px;padding-left:16px">
      <el-form-item label="关键字">
        <el-input
          v-model="formInline.keyword"
          placeholder="书籍名称/BookID"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="dicCategory">
        <el-select
          v-model="formInline.dicCategory"
          clearable
          placeholder="请选择"
          style="width: 120px"
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.id"
            :label="item.val"
            :value="item.val"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="频道" prop="dicChannel">
        <el-select
          v-model="formInline.dicChannel"
          clearable
          placeholder="请选择"
          style="width: 120px"
        >
          <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.val"
            :value="item.val"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="gotoAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <!--表格区-->
    <el-table :data="getTabledata" border style="width: 100%" size="small">
      <template slot="empty"> 还没有数据呢~ (⊙︿⊙) </template>
      <el-table-column label="封面" width="110" align="center">
        <template slot-scope="scope">
          <!-- <el-image
            style="height: 63px; width: 55px"
            lazy
            :src="getImg(scope.row.imgName)"
            fit="fill"
          ></el-image> -->
          <img  style="height: 63px; width: 55px" v-lazy="getImg(scope.row.imgName)" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="bookId" label="图书ID" width="120">
      </el-table-column>
      <el-table-column prop="bookName" label="图书名称"> </el-table-column>
      <el-table-column prop="authorName" label="作者" width="100">
      </el-table-column>
      <el-table-column prop="dicCategory" label="所属类别" width="100">
      </el-table-column>
      <el-table-column prop="labelName" label="标签"> </el-table-column>
      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            plain
            @click="handleChapter(scope.row.bookId)"
            >章节</el-button
          >
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.row.bookId)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            plain
            @click="handleDelete(scope.row.bookId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--分页区-->
    <div class="Pagination" style="text-align: left; margin-top: 10px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="limit"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryOptions: "",
      channelOptions: "",
      tableData: this.mainData,  //呈现数据
      limit: 6,
      isTempData: false, //判断当前表格提供数据为全部数据 还是检索的临时数据
      currentPage: 1,
      //用于提交搜索查询的数据
      formInline: {
        keyword: "",
        dicCategory: "",
        dicChannel: "",
      },
    };
  },
  computed: {
    // tableData:
    // this.$store.state.data,
   //mainData用于表示翻页的总数据
     mainData:function(){
          if (this.isTempData) {
        // this.total = this.$store.state.tempData.length; 
        return this.$store.state.tempData;
      } else {
       
         
          // this.total = this.$store.state.data.length;
        return this.$store.state.data;
      }
   },
   //数据总数
   total:function(){
     return this.mainData.length
   },
    //决定呈现当前的表格数据
    getTabledata() {
  
 let begin = (this.currentPage-1)*this.limit;
      let position = begin+this.limit;
      let temp = [];
      
      for(let i = begin;i<position&&i<this.total;i++){
          temp.push(this.mainData[i])
      }
      this.tableData = temp;
    return this.tableData;
    },

  },
  created() {
  this.$store.state.getReady =false;
    this.initForm();


  },
  methods: {
    async initForm() {
      await this.getDictionaryOptions("dicCategory");
      await this.getDictionaryOptions("disChannel");
    },
       async getEditData(bookId){
      //获取分类 频道等数据
              this.$http
                    .post("web/php/getEditData.php", {bookId:bookId})
                    .then(
                  
                      (res) => {
                               this.$store.state.editData = res.data
                        
                      }
                    );

            },
    async getDictionaryOptions(type) {
      //获取分类 频道等数据
      this.$http
        .post("web/php/configuration.php", { type: type })
        .then(
    
          (res) => {
            if (type == "dicCategory") {
              // 分类
       
              this.categoryOptions = res.data;
           
            } else {
              // 所属频道
              this.channelOptions = res.data;
            }
          }
        );
    },
        
    test() {
   
     
  
      
    },
    getImg(src) {
      
      return "http://www.panxixi.xyz/web/upload/" + src;
    },
   
 
    handleDelete(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // this.deleteRequest("/book/delete", { id: id }).then((resp) => {
          //   if (resp.code == 200) {
          //     this.getListData();
          //   }
          // });
              this.$http.post('web/php/deleteBook.php',{id:id}).then(res=>{
                  this.$store.dispatch('afetchTopBook');
              this.$store.dispatch('afetchMaxWork');
                     this.$store.dispatch('afetchalldata');

                       this.$message({
                message:'删除成功',
                type:'success'
              })
                     
      })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
//获取当前页面的临时数据，包括翻页，检索
    getListData() {
      let form = {
        page: this.currentPage,
        limit: this.limit,
        dicCategory: this.formInline.dicCategory,
        dicChannel: this.formInline.dicChannel,
        bookName: this.formInline.keyword,
      };
     
  
      this.$http.post('web/php/getlist.php',form).then(res=>{

this.$store.state.tempData = res.data

this.isTempData = true
this.currentPage = 1
      })
    },
    handleSizeChange(val) {
   
    },
    handleCurrentChange(val) {
      this.currentPage = val;

     
    },
    onSearch() {
      this.getListData();
    },
   
     gotoAdd() {
      this.$router.push("/showbook/book-add");
    },
     handleChapter(bookId) {
    
         this.$store.dispatch('agetallChapterData',bookId);
 
     
     this.$router.push("/showbook/book-chapter");
    
    },
       handleEdit(bookId) {
    
      this.$store.state.getReady = false;
      this.$store.dispatch('agetEditData',bookId);
  
      setTimeout(() => {
     
      this.$router.push("/showbook/book-edit");   
      },700);
     
    },
  },
};
</script>

<style scoped>
.toolbar {
  height: 40px;
  
}

</style>
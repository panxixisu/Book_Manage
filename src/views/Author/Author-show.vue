<template>
  <div>
        <!--工具栏-->
        <el-form :inline="true" size="mini" class="toolbar" style="text-align:left">
            <el-form-item>
                <el-button type="primary" @click="gotoAdd" >新增</el-button>
            </el-form-item>
        </el-form>
        <!--表格区-->
        <el-table :data="getTabledata" border style="width: 100%;" size="small">
            <template slot="empty">
                还没有数据呢~ (⊙︿⊙)
            </template>
            <el-table-column label="头像" width="90" align="center">
                <template slot-scope="scope" >
                    <el-avatar shape="square" :size="50" :src="getImg(scope.row.authorImgName)"></el-avatar>
                </template>
              
            </el-table-column>
            <el-table-column prop="authorName" label="作者名称" width="180" >
            </el-table-column>
            <el-table-column prop="Introduction" label="简介">
            </el-table-column>
            <el-table-column align="center" label="操作" width="240">
            <template slot-scope="scope" >
                <el-button size="mini" type="primary" plain 
                @click="handleDetails(scope.row.authorId)">查看</el-button>
                <el-button size="mini" type="warning" plain 
                @click="handleEdit(scope.row.authorId)">编辑</el-button>
                <el-button size="mini" type="danger"  plain 
                @click="handleDelete(scope.row.authorId)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!--分页区-->
        <div class="Pagination" style="text-align: left; margin-top: 10px;">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="limit"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
 
    </div>
</template>

<script>
export default {
    data() {
        return {
            bookId:'',
            tableData:'',
            limit: 10,
         
            currentPage: 1
        }
    },
  computed: {

 
   //数据总数
    total:function(){
          return this.$store.state.AuthorData.length; 
        },
    //决定呈现当前的表格数据
  getTabledata() {

 let begin = (this.currentPage-1)*this.limit;
      let position = begin+this.limit;
      let temp = [];
      
      for(let i = begin;i<position&&i<this.total;i++){
          temp.push(this.$store.state.AuthorData[i])
      }
      this.tableData = temp;
    return this.tableData;
    },

  },
  created() {
   this.$store.state.getReady = false;
  },
  methods: {
    test(){
         console.log(this.$store.state.AuthorData)
    },
    
     getImg(src) {
      console.log(src);
      return "http://www.panxixi.xyz/web/AuthorImg/" + src;
    },
  
       handleDetails(authorId){
         
         this.$store.state.getReady = false;
           this.$store.dispatch('agetEditAuthorData',authorId);
           
              
  
        this.$router.push('/showAuthor/author-check') 
    
    
 
        
 
  // this.$http.post('web/keshe/src/php/deleteAuthor.php',{authorId:authorId}).then(res=>{
  //              console.log(res.data,'result')
    
  //     })

        },
 
   

    handleDelete(authorId) {
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
             this.$http.post('web/php/deleteAuthor.php',{authorId:authorId}).then(res=>{
               console.log(res.data,'result')
                  this.$store.dispatch('afetchTopBook');
              this.$store.dispatch('afetchMaxWork');
         this.$store.dispatch('agetAllauthorData');
            this.$store.dispatch('afetchalldata');
         
      })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;

     
    },
  
   
     gotoAdd() {
      this.$router.push("/showAuthor/Author-add");
    },
  
       handleEdit(authorId) {
      // console.log(bookId)
      // this.getEditData(bookId);
      this.$store.dispatch('agetEditAuthorData',authorId);
  
      setTimeout(() => {
     
      this.$router.push("/showAuthor/author-edit");   
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
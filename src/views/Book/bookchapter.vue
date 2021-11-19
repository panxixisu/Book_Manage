<template>
    <div v-show="this.$store.state.getReady">
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
         
            <el-table-column prop="chapter" label="章节名称"  >
            </el-table-column>
           
            <el-table-column align="center" label="操作" width="240">
            <template slot-scope="scope" >
                <el-button size="mini" type="primary" plain 
                @click="handleEdit(scope.row.chapterId)">编辑</el-button>
                <!-- <el-button size="mini" type="warning" plain 
                @click="handleEdit(scope.row.chapterId)">编辑</el-button> -->
                <el-button size="mini" type="danger"  plain 
                @click="handleDelete(scope.row.chapterId)">删除</el-button>
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
    created(){
       
        // 图书ID
        // this.bookId = this.$route.params.bookId;
    },
      computed:{
        total:function(){
          return this.$store.state.allChapterData.length; 
        },
        
       //决定呈现当前的表格数据
    getTabledata() {

 let begin = (this.currentPage-1)*this.limit;
      let position = begin+this.limit;
      let temp = [];
      
      for(let i = begin;i<position&&i<this.total;i++){
          temp.push(this.$store.state.allChapterData[i])
      }
      this.tableData = temp;
    return this.tableData;
    },
      },
    methods:{
        handleStatus(val){
            let icon = "el-icon-unlock";
            if(val){
                icon = "el-icon-lock";
            }
            return icon;
        },
        
        handleEdit(id) {
            this.$store.dispatch('agetEditChapterData',id);
  
      setTimeout(() => {
     
      this.$router.push("/showbook/book-chapter/chapter-edit");   
      
      },700);
        },
        handleDelete(id) {
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 this.$http.post('web/php/deleteChapter.php',{id:id}).then(res=>{
                   this.$store.dispatch('agetallChapterData',this.$store.state.ChapterDataBookId);  
                     
      })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
            
        },
        // getListData(){
        //     this.getRequest('/book-chapter/get-list', {page:this.currentPage,limit:this.limit,bookId:this.$route.params.bookId}).then(resp => {
        //         if (resp.code == 200) {
        //             this.tableData = resp.data;
        //             this.total = resp.total;
        //         }
        //     })
        // },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        test(){
          console.log(this.$store.state.ChapterData,'chapterData')
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getListData();
        },
        onSearch(){
            this.getListData();
        },
        gotoAdd(){
            this.$router.push("/showbook/book-chapter/chapter-add");
        }
    }
  };
</script>

<style scoped>
    .toolbar{
        height: 40px;
    }
</style>
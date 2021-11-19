<template>
    <div>

    
        <!--工具栏-->
        <el-form :inline="true" size="mini" class="toolbar" style="text-align:left">
            <el-form-item  > 
                <el-button type="primary" @click="gotoAdd" >新增</el-button>
            </el-form-item>
        </el-form>
        <!--表格区-->
        <el-table :data="getTabledata" border style="width: 100%;" size="small">
            <template slot="empty">
                还没有数据呢~ (⊙︿⊙)
            </template>
            <el-table-column prop="label" label="字典类型"  >
            </el-table-column>
            <el-table-column prop="val" label="字典名称"  >
            </el-table-column>
           
           
            <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope" >
                <el-button size="mini" type="primary" plain 
                @click="handleEdit(scope.row.Id)">编辑</el-button>
                <el-button size="mini" type="danger"  plain 
                @click="handleDelete(scope.row.Id)">删除</el-button>
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
    
            tableData:'',
            limit: 10,
         
            currentPage: 1
        }
    },
  computed: {

 
   //数据总数
    total:function(){
          return this.$store.state.dictionary.length; 
        },
    //决定呈现当前的表格数据
  getTabledata() {

 let begin = (this.currentPage-1)*this.limit;
      let position = begin+this.limit;
      let temp = [];
      
      for(let i = begin;i<position&&i<this.total;i++){
          temp.push(this.$store.state.dictionary[i])
      }
      this.tableData = temp;
    return this.tableData;
    },

  },
  created() {
  //  this.$store.state.getReady = false;
  },
  methods: {
    test(){
         console.log(this.$store.state.dictionary)
    },
    
    
  
    
 
   

    handleDelete(Id) {
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
             this.$http.post('web/php/deleteDictionary.php',{Id:Id}).then(res=>{
          
        this.$store.dispatch('afetchDictionary');
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

    handleSizeChange(val) {
     
    },
    handleCurrentChange(val) {
      this.currentPage = val;

     
    },
  
   
     gotoAdd() {
      this.$router.push("/dictionary/dictionary-add");
    },
  
       handleEdit(Id) {
      // console.log(bookId)
      // this.getEditData(bookId);
   
      this.$store.dispatch('agetEditDictionaryData',Id);
  
      setTimeout(() => {
     
      this.$router.push("/dictionary/dictionary-edit");   
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
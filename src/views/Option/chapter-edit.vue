<template>
    <div class="defaultForm">
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="135px" >
            <el-form-item label="书名" prop="bookName">
                {{dataForm.bookName}}
            </el-form-item>
            <el-form-item label="章节名称" prop="chapter">
                <el-input v-model="dataForm.chapter"></el-input>
            </el-form-item>
           
            <el-form-item label="章节内容" prop="content">
                <el-input type="textarea" :rows="12" v-model="dataForm.content"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm('dataForm')">确认修改</el-button>
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
 
    </div>
</template>

<script>
  export default {
    data() {
      return {
        // dataForm: {
        //     bookId:this.$store.state.ChapterDataBookId,
        //     chapter: this.$store.state.EditChapterData[0].chapter,
        //   bookName:'',
        //     content:this.$store.state.EditChapterData[0].content,
          
        // },
        rules: {
          chapter: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
         
        }
      };
    },
    created(){
        // 图书ID
   
      
    },
   computed:{
     dataForm:function(){
       return this.$store.state.EditChapterData[0]
     }
   },
    methods: {

     
      submitForm(dataForm) {
        this.$refs[dataForm].validate((valid) => {
          if (valid) {
           this.$http.post('web/php/editChapter.php', this.dataForm).then(res => {
                   this.$store.dispatch('agetallChapterData',this.dataForm.bookId);
                   
        this.$store.dispatch('afetchTopBook');
        this.$store.dispatch('afetchMaxWork');
          this.$message({
                message:'修改成功',
                type:'success'
              })
                 this.$router.back(-1)
                    })
          } else {
   
            return false;
          }
        });
      },
      resetForm(dataForm) {
        this.$refs[dataForm].resetFields();
      }
    }
  }
</script>

<style scoped>
    .defaultForm {
        margin-top: 20px;
        width: 85%
    }
</style>
<template>
    <div class="defaultForm">
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="135px" >
            <el-form-item label="旧密码" prop="oldpsw">
               <el-input v-model="dataForm.oldpsw"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpsw">
                <el-input v-model="dataForm.newpsw"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dataForm')">确认</el-button>
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
 
    </div>
</template>

<script>
  export default {
    data() {
      return {
        dataForm: {
         oldpsw:"",
         newpsw:""
          
        },
        rules: {
          oldpsw: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          newpsw: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ],
         
        }
      };
    },
    created(){
        // 图书ID
   
      
    },
   computed:{
     
   },
    methods: {

     
      submitForm(dataForm) {
        this.$refs[dataForm].validate((valid) => {
          if (valid) {
           this.$http.post('web/php/ModifyPsw.php', this.dataForm).then(res => {
              if(res.data!=""){

           this.$message({
                message:'修改成功',
                type:'success'
              })
             this.$router.push("/topPage");
              }else{
                this.$message({
                message:'修改失败',
                type:'error'
              })
              }
                    })
          } else {
            console.log('error submit!!');
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
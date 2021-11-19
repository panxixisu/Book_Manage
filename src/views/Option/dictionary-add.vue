<template>
    <div class="defaultForm">
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="135px" >
            <el-form-item label="字典类型" prop="category" style="text-align:left">
                <el-select v-model="dataForm.category" placeholder="请选择字典类型">
                  <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.label" :value="item.category"></el-option>
                </el-select>
            </el-form-item>
     
            <el-form-item label="名称" prop="val">
                <el-input v-model="dataForm.val"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dataForm')">保存</el-button>
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                typeOptions:[{category:'dicCategory',label:'书籍分类'},{category:'disChannel',label:'频道分类'}],
                dataForm: {
                    category: '',
                
                    val: '',
                
                },
                rules: {
                    category: [
                        { required: true, message: '请选择字典类型哦', trigger: 'blur' }
                    ],val: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                   
                }
            };
        },
        created(){
     
        },
        methods: {
            submitForm(dataForm) {
                this.$refs[dataForm].validate((valid) => {
                if (valid) {
                    this.$http.post('web/php/addNewDictionary.php', this.dataForm).then(res => {
                   this.$store.dispatch('afetchDictionary');
                 
                      this.$router.push("/dictionary")
                        this.$message({
                message:'添加成功',
                type:'success'
              })
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
         
        }
    }
</script>

<style scoped>
    .defaultForm {
        margin-top: 20px;
        width: 85%
    }
</style>
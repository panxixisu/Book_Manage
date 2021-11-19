<template>
    <div class="defaultForm">
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="135px" >
            <el-form-item label="作者名称" prop="authorName">
                <el-input v-model="dataForm.authorName"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="authorImg" style="text-align:left">
        <el-upload
                              class="avatar-uploader"
                              action="str"
                             :http-request="upload"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload">
                              <img v-if="gettag" :src="'http://www.panxixi.xyz/web/AuthorImg/'+imgUrl" class="avatar">
                              <!-- <img v-if="gettag" :src="geturl" class="avatar"> -->
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
            </el-form-item>
            <el-form-item label="简介" prop="Introduction">
                <el-input v-model="dataForm.Introduction"></el-input>
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
               
                dataForm: {
                    authorName: '',
                    Introduction: '该作者没有留下简介，看看ta的作品吧！',
                   imgName:'',
               
                },
                rules: {
                    Introduction: [
                        { required: true, message: '请输入简介', trigger: 'blur' }
                    ],authorName: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ]
                }
            };
        },created(){
          this.$store.state.AuthorImg.tag = false;
          this.dataForm.imgName = this.$store.state.AuthorImg.imgname 
        },
            computed:{
         gettag(){
            
           return this.$store.state.AuthorImg.tag
         },
         imgUrl:function(){
          this.dataForm.imgName = this.$store.state.AuthorImg.imgname 
           return this.$store.state.AuthorImg.imgname
         },

          
        },
        methods: {
            submitForm(dataForm) {
                this.$refs[dataForm].validate((valid) => {
                if (valid) {
                    this.$http.post('web/php/addNewAuthor.php', this.dataForm).then(res => {
                  
                     this.$store.state.AuthorImg.tag = false
                      this.$store.dispatch('agetAllauthorData')
                        this.$store.dispatch('agetAllauthorData');
               this.$store.dispatch('afetchTopBook');
              this.$store.dispatch('afetchMaxWork');
                      this.$router.push("/showAuthor")
                    })
                } else {
                  
                    return false;
                }
                });
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt1M = file.size / 1024 / 1024 < 1;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 1MB!');
                }
                return isJPG && isLt1M;
            },
              upload(param){
              const file = param.file
            
            
       
                 this.$store.state.AuthorImg.imgdata = file
            
                this.$store.dispatch('auploadAuthor')
             
      
    
            
               
            }
        }
    }
</script>

<style scoped>
    .defaultForm {
        margin-top: 20px;
        width: 85%
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 128px;
        height: 128px;
        line-height: 128px;
        text-align: center;
    }
    .avatar {
        width: 128px;
        height: 128px;
        display: block;
    }
</style>
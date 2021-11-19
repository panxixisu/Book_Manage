<template>
    <div class="defaultForm" v-show="this.$store.state.getReady">
        
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="135px" >
            <el-form-item label="作者名称" prop="authorName" style="text-align:left;">
                <span>&nbsp;&nbsp;&nbsp;</span>{{dataForm.authorName}}
            </el-form-item>
            <el-form-item label="头像" prop="authorImgName" style="text-align:left">
        <el-upload
                              class="avatar-uploader"
                              action="str"
                             :http-request="upload"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload">
                            <img :src="'http://www.panxixi.xyz/web/AuthorImg/'+imgUrl" class="avatar">
                            </el-upload>
            </el-form-item>
            <el-form-item label="简介" prop="Introduction">
                <el-input v-model="dataForm.Introduction"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="ModifyForm('dataForm')">确认修改</el-button>
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    
   
    </div>
</template>

<script>
    export default {
        data() {
            return {
 
               
               
                rules: {
                    Introduction: [
                        { required: true, message: '请输入简介', trigger: 'blur' }
                    ]
                }
            };
        },
        created(){
             
              this.$store.state.AuthorImg.tag = false;
        },
    computed:{
      gettag(){
           return this.$store.state.AuthorImg.tag
         },
        dataForm: function () {
           this.$store.state.AuthorImg.tag = true;
      return this.$store.state.editAuthorData[0];

    },
 imgUrl:function(){
          
         
return this.$store.state.editAuthorData[0].authorImgName;
         },
            // geturl(){
            //     return require('../upload/'+this.$store.state.img.imgname)
               
            // }
          
        },
     
        methods: {
          
            
          
         ModifyForm(dataForm) {
                this.$refs[dataForm].validate((valid) => {
                if (valid) {
                    this.$http.post('web/php/editAuthor.php', this.dataForm).then(res => {
                    
                     this.$store.state.AuthorImg.tag = false
                      this.$store.dispatch('agetAllauthorData')
                  
        this.$store.dispatch('afetchTopBook');
        this.$store.dispatch('afetchMaxWork');
                      this.$router.push("/showAuthor")
                    })
                } else {
                    // console.log('error submit!!');
                    return false;
                }
                });
             
            },
        
           
       
          handleAvatarSuccess(res, file) {
         
        this.imageUrl = URL.createObjectURL(file.raw)
        
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
        width: 95%;
        margin-top: 5px 
    }

    .grid-content {
        border-radius: 4px;
        margin: 20px
    }
    .grid-content-bottom {
        border-radius: 4px;
        margin: 0px 20px 20px 20px
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #c9c0c0;
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
        width: 96px;
        height: 128px;
        line-height: 128px;
        text-align: center;
    }
    .avatar {
        width: 96px;
        height: 128px;
        display: block; 
    }
    .short{
      text-align: left;
    }
  
</style>
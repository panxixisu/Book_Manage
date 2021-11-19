<template>
    <div class="defaultForm">
        
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small"
            label-width="100px" >
            <el-row :gutter="30" >
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item label="所属分类" prop="dicCategory" class="short">
                            <el-select v-model="dataForm.dicCategory" placeholder="请选择分类">
                                <el-option v-for="item in categoryOptions" :key="item.id" :label="item.text" :value="item.val"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属频道" prop="dicChannel" class="short" >
                            <el-radio-group v-model="dataForm.dicChannel">

                                <el-radio v-for="(item,index) in channelOptions" :key="index" :label="item.val" name="channels">{{item.val}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                  
                       
                        <el-form-item label="上架状态" prop="onlineStatus" class="short">
                            <el-switch
                                v-model="dataForm.onlineStatus"
                                active-color="#13ce66"
                                inactive-color="#ff4949" >
                                </el-switch>
                        </el-form-item>
                        <el-form-item label="作者" prop="authorName" class="short">
                            <el-select v-model="dataForm.authorName" 
                                placeholder="输入关键字查询作者"
                                filterable
                                remote 
                                :remote-method="getAuthorOptions"
                                :loading-text="loadingText"
                                :loading="loading">
                                <el-option
                                    v-for="item in authorOptions"
                                    :key="item.id"
                                    :label="item.authorName"
                                    :value="item.authorName">{{item.authorName}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="图书名称" prop="bookName">
                            <el-input v-model="dataForm.bookName"></el-input>
                        </el-form-item>
                        <el-form-item label="BookID" prop="bookId">
                            <el-input v-model="dataForm.bookId" maxlength="10" show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12" class="row-bg">
                    <div class="grid-content">
                        <el-form-item label="封面" prop="imgName">
                            <el-upload
                              class="avatar-uploader"
                              action="str"
                             :http-request="upload"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload">
                              <!-- <img v-if="gettag" :src="'http://www.panxixi.xyz/web/upload/'+imgUrl)" class="avatar"> -->
                              <img v-if="gettag" :src="'http://www.panxixi.xyz/web/upload/'+imgUrl" class="avatar">
                              <!-- <img v-if="gettag" :src="geturl" class="avatar"> -->
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                   
                        <el-form-item label="评分" prop="bookScore">
                            <el-rate style="height:32px;line-height:32px; padding-top:5px" v-model="dataForm.bookScore" :max="10" :allow-half="true"> </el-rate>
                        </el-form-item>
                        <el-form-item label="字数" prop="Words">
                            <el-input v-model.number="dataForm.Words" style="width:150px"><template slot="append">万</template></el-input>
                        </el-form-item>
                     
                        <el-form-item label="标签" prop="labelName">
                            <el-input v-model="dataForm.labelName"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="30" >
                <el-col :span="24">
                    <div class="grid-content-bottom">
                        
                        <el-form-item label="简介" prop="Introduction">
                            <el-input type="textarea" :rows="4" v-model="dataForm.Introduction"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('dataForm')">添加</el-button>
                            <el-button @click="$router.back(-1)">返回</el-button>
                        </el-form-item>
                
                    </div>
                </el-col>
            </el-row>
          

            
        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
 
                // imgUrl:"",
                categoryOptions:[],
                channelOptions:[],
                serialStatusOptions:[],
                authorOptions:[],
                loading: false,
                loadingText:"作者加载中...",
                dataForm: {
                    authorName: '',
                    dicCategory: '',
                    dicChannel: '男',
                   
                    onlineStatus:true,
                    bookId:'',
                    bookName:'',
                    bookScore: 8,
                    labelName:'',
                    // imgName:this.$store.state.img.imgname,
                   imgName:"aaa.jpg",
                    authorName:'',
                    Introduction:'',
               
                    Words:'',
                
                },
                rules: {
                    authorName: [
                        { required: true, message: '请选择作者哦！', trigger: 'blur' }
                    ],
                    dicCategory: [
                        { required: true, message: '请选择分类！', trigger: 'blur' }
                    ],
                    dicChannel: [
                        { required: true, message: '请选择频道！', trigger: 'blur' }
                    ],
                   
                    onlineStatus: [
                        { required: true, message: '请选择上架状态！', trigger: 'blur' }
                    ],
                    bookId: [
                        { required: true, message: '请输入BookID！', trigger: 'blur' }
                    ],
                    bookName: [
                        { required: true, message: '请输入图书名称！', trigger: 'blur' }
                    ],
                    Words: [
                        { required: true, message: '请输入字数' },
                        { type: 'number', message: '必须为数字！' }
                    ]
                }
            };
        },
        created(){
            this.initForm();
            this.$store.state.img.tag = false;
        },
    computed:{
         gettag(){
           return this.$store.state.img.tag
         },
         imgUrl:function(){
           this.dataForm.imgName = this.$store.state.img.imgname 
           return this.$store.state.img.imgname
         },
  // getImgname:'aaa.jpg'
            // geturl(){
            //     return require('../upload/'+this.$store.state.img.imgname)
               
            // }
          
        },
     
        methods: {
            async initForm(){
                await this.getDictionaryOptions("dicCategory");
                await this.getDictionaryOptions("disChannel");
                
            },
            
            test(){
              console.log(this.imgUrl)
            },
            submitForm(dataForm) {
                this.$refs[dataForm].validate((valid) => {
                if (valid) {
                    this.$http.post('web/php/addNewBook.php', this.dataForm).then(res => {
                     
                     this.$store.state.img.tag = false
                      this.$store.dispatch('afetchalldata')
                        this.$store.dispatch('agetAllauthorData');
        this.$store.dispatch('afetchTopBook');
        this.$store.dispatch('afetchMaxWork');
                      this.$router.push("/showbook")
                        this.$message({
                message:'添加成功',
                type:'success'
              })
                    })
                } else {
                    // console.log('error submit!!');
                    return false;
                }
                });
            },
            getAuthorOptions(keyword) {
          //远程搜索获取作者名
                
                 if (keyword !== '') {
                    this.loading = true;
                  this.$http
                          .post("web/php/getAuthorOptions.php", {keyword:keyword})
                          .then(
                            //   function(response){
                            //   console.log(response.data);
                            //     that.alldata = response.data
                            // }
                            (res) => {
                              this.loading = false;
                   
                                     
                                        console.log(res.data)
                                              this.authorOptions = res.data;
                                              console.log(this.authorOptions);
                                            
                              
                            }
                          );
                } else {
                    this.authorOptions = [];
                }
                
            },
           
            async getDictionaryOptions(type){
      //获取分类 频道等数据
              this.$http
                    .post("web/php/configuration.php", {type:type})
                    .then(
                      //   function(response){
                      //   console.log(response.data);
                      //     that.alldata = response.data
                      // }
                      (res) => {
                                if (type == "dicCategory"){
                                          // 分类
                                          console.log(res.data,'adcs')
                                          this.categoryOptions = res.data;
                                      } else {
                                          // 所属频道
                                          this.channelOptions = res.data;
                                      }
                        
                      }
                    );

            },
          handleAvatarSuccess(res, file) {
            console.log('success')
        // this.imageUrl = URL.createObjectURL(file.raw)
        //   console.log(this.imageUrl)
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
              console.log("图片")
              console.log(param)
              const file = param.file
              console.log(file)
            
       
                 this.$store.state.img.imgdata = file
            
                this.$store.dispatch('aupload')
             
      
    
            
               
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
<template>
    <div class="defaultForm" v-show="this.$store.state.getReady">
        <div class="title">
            {{dataForm.chapter}}
        </div>
      
        <el-input type="textarea" readonly="readonly" v-model="dataForm.content" class="content" rows="20" ></el-input> 
        <div style="margin-top:20px;text-align:center">
            <el-button-group>
                <el-button type="primary" icon="el-icon-arrow-left" @click="handlePreRead()" >
                    上一章
                </el-button>
                <el-button type="primary" @click="gotoAuthorDetails()">书籍信息</el-button>
                <el-button type="primary" @click="handleNexRead()" >
                    下一章<i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
            </el-button-group>
        </div>
   
 <span style="display:none">{{chapterPointer}}</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
                // dataForm: {
                //     bookId:'',
                //     id:'',
                //     preId:0,
                //     nextId:0,
                //     name: '',
                //     content: ''
                // }
                dataForm:'',
            };
        },
        created(){
         
        },computed:{
          chapterPointer:function(){
            this.dataForm = this.$store.state.allChapterData[this.$store.state.chapterPointer.now]
            this.$store.state.getReady = true
            return this.$store.state.chapterPointer
          },
        
        },
        methods: {
         
            handlePreRead(){
                if(this.chapterPointer.pre<0){
                 this.$message('已经是首章节了~');
                }else{
                    
                    this.$store.state.chapterPointer.pre  = this.$store.state.chapterPointer.now-2;
                    this.$store.state.chapterPointer.next=this.$store.state.chapterPointer.now;
                    this.$store.state.chapterPointer.now-=1;
                }
            },
            handleNexRead(){
                if(this.chapterPointer.next<0){
                     this.$message('已经是最后一章了~');
                }else{
                   
                    this.$store.state.chapterPointer.pre = this.$store.state.chapterPointer.now;
                    this.$store.state.chapterPointer.next = Number(this.$store.state.chapterPointer.now)+2;
                     this.$store.state.chapterPointer.now+=1;
                     if(this.$store.state.chapterPointer.next>= this.$store.state.allChapterData.length){
                       this.$store.state.chapterPointer.next = -1;
                     }
                    
                }
            },
            gotoAuthorDetails(){
                this.$router.push("/Author/book-details");
            },
          
         
        }
    }
</script>

<style scoped>
    .defaultForm {
        width: 94%;
        margin-top: 10px;
        margin-left: 30px;
    }

    .avatar {
        width: 92px;
        display: block;
    }

    .time {
        font-size: 13px;
        color: #999;
    }

    .title{
        text-align:center;font-size:22px;
    }

    .content{
        margin-top:10px;font-size:13px;color:#b1aeae; 
    }

    .author{
        margin-top:10px;text-align:center;
    }
    
</style>
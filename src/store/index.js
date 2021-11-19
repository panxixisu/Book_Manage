import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: "",   //存放书籍所有数据
    tempData: "",  //用于存放临时数据 如检索出来的额数据
    AuthorData: "",//存放所有作者信息 
    editAuthorData:[],//存放编辑作者数据
    AuthorListWork:[],//存放作者的作品
    getReady:false, //vuex数据是否请求完成，可以渲染页面的标志
    books:[],//存放某个作者的作品集

  user:"",
    editData: [],   //存放编辑书本数据
    allChapterData:[],//存放某本书的所有 章节
    EditChapterData: [],//存放某本书的待编辑某一章节
    ChapterBookName: "",//存放某本书的特定待编辑章节的书名
    ChapterDataBookId: '',//存放某本书的特定待编辑章节的书ID

    chapterIdGroup:[],
    chapterPointer:{
      now:'',
      pre:'',
      next:''
    },
    img: {
      imgname: "aaa.jpg",
      imgdata: "",
      tag: false,
    },
    AuthorImg:{
      imgname: "aaa.jpg",
      imgdata: "",
      tag: false,
    },
  
     topBooks:"", //存放高分书籍
     MaxWork:"",//存放作品量大的作者信息
     dictionary:"",//存放所有字典配置信息
     EditDictionaryData:""  //存放要编辑的字典信息
    // isshow:false,
    // AuthorIsshow:false,

  },
  getters: {

  },
  mutations: {

    fetchalldata(state) {
      axios
        .post("web/php/action.php", {
          action: "fetchall",
        })
        .then(
      
          (res) => {
            
            this.state.data = res.data;
     
          
          }
        );
    },
    fetchTopBook(state) {
      axios
        .post("web/php/getTopBook.php",)
        .then(
    
          (res) => {
          
            this.state.topBooks = res.data
         
          }
        );
    },
    fetchMaxWork(state) {
      axios
        .post("web/php/getMaxWork.php",)
        .then(
      
          (res) => {
           
            this.state.MaxWork = res.data
         
          }
        );
    },
    fetchDictionary(state) {
      axios
        .post("web/php/getDictionary.php",)
        .then(
       
          (res) => {
            
            this.state.dictionary = res.data
         
          }
        );
    },
    getEditDictionaryData(state,n){
      axios
        .post("web/php/getEditDictionaryData.php",{Id:n})
        .then(
     
          (res) => {
           
            this.state.EditDictionaryData = res.data
         
          }
        );
    },
    getAllauthorData(state){
      axios.post("web/php/getAuthorData.php").then(
        (res)=> {
       
          this.state.AuthorData = res.data;
          //  state.isshow = true;
     
        }
      )
    },
    getEditData(state, n) {
    
      axios
        .post("web/php/getEditData.php", { bookId: n })
        .then(
      
          (res) => {
      
            this.state.getReady = true;
            this.state.editData = res.data;
            

          }
        );
    }, 
    getEditAuthorData(state, n){
      axios.post("web/php/getEditAuthorData.php",{authorId:n}).then(
    (res)=>{
   
      this.state.editAuthorData = res.data;
     
    }

      );
      axios.post("web/php/getEditAuthorBook.php",{authorId:n}).then(
        (res)=>{
        
          this.state.books = res.data;
          this.state.getReady = true;
        }
    
          )
    },    
  
    getallChapterData(state, n) {
      axios
        .post("web/php/getChapterData.php", { bookId: n })
        .then(
      
          (res) => {
  
            state.allChapterData = res.data;
            state.ChapterDataBookId = n;
            for(let i =0;i<res.data.length;i++){
              state.chapterIdGroup[i] = res.data[i].chapterId; 
            }
            this.state.getReady = true;
  

          }
        );
      axios.post('web/php/getBookName.php', { bookId: n }).then(res => {
      
        this.state.ChapterBookName = res.data
        this.state.getReady = true;
      })

    }, getEditChapterData(state, n) {
      axios
        .post("web/php/getEditChapterData.php", { chapterId: n })
        .then(
      
          (res) => {
 
            state.EditChapterData = res.data;
            state.EditChapterData[0].bookName = state.ChapterBookName
            this.state.getReady = true;


          }
        );
    },
    upload(state) {
    
      let param = new FormData(); //创建form对象
      param.append('file', this.state.img.imgdata);//通过append向form对象添加数据
  



      axios
        .post("web/php/upload.php", param, {
          // headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(
       
          (res) => {

    

            this.state.img.tag = true
            this.state.img.imgname = res.data
      
            //编辑时修改图片 
            if (this.state.editData[0]) {
           
              this.state.editData[0].imgName = res.data
            }
      
      
          }
        );
    },
    uploadAuthor(state) {

      let param = new FormData(); //创建form对象
      param.append('file', this.state.AuthorImg.imgdata);//通过append向form对象添加数据



      axios
        .post("web/php/uploadAuthor.php", param, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(
   
          (res) => {

 

            this.state.AuthorImg.tag = true
            this.state.AuthorImg.imgname = res.data
            if (this.state.editAuthorData[0]) {
         
              this.state.editAuthorData[0].authorImgName = res.data
   
            }

          
          }
        );
    },




  },
  actions: {
    afetchalldata(context) {
      context.commit('fetchalldata')
    },
    afetchTopBook(context) {
      context.commit('fetchTopBook')
    },afetchMaxWork(context){
      context.commit('fetchMaxWork')
    },afetchDictionary(context){
      context.commit('fetchDictionary')
    },agetEditDictionaryData(context,payload){
      context.commit('getEditDictionaryData',payload)
    },
  agetAllauthorData(context){
    context.commit('getAllauthorData')
  },

    aupload(context) {
      context.commit('upload')
    },auploadAuthor(context){
 
      context.commit('uploadAuthor')
    },
    agetEditData(context, payload) {
      context.commit('getEditData', payload)
  
    },
    
     agetEditAuthorData(context, payload){
      context.commit('getEditAuthorData', payload)

    }, 
   

    agetallChapterData(context, payload) {
      context.commit('getallChapterData', payload)

    }, agetEditChapterData(context, payload) {
      context.commit('getEditChapterData', payload)
    },
 
  },

  modules: {
  },

})

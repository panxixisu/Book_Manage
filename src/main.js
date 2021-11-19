import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'; /* 引入axios进行地址访问*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
Vue.use(ElementUI);
Vue.use(VueLazyload,{
  loading:'./assets/ajax-loader.gif'
})
Vue.config.productionTip = false

axios.defaults.baseURL= 'http://www.panxixi.xyz'
Vue.prototype.$http = axios;
// if (sessionStorage.getItem("store")) {
//   store.replaceState(
//       Object.assign(
//           {},
//           store.state,
//           JSON.parse(sessionStorage.getItem("store"))
//       )
//   );
//   sessionStorage.removeItem("store")
// }

// //监听，在页面刷新时将vuex里的信息保存到sessionStorage里
// window.addEventListener("beforeunload", () => {
//   sessionStorage.setItem("store", JSON.stringify(store.state));
// })




new Vue({
  router,
  store,
  
//   created(){
//     this.init()
//  },methods: {
//   init(){
//     console.log('abd');
//     console.log(this.$store.state.isshow);
//     this.$store.dispatch('afetchalldata');
//   },
//  },
  mounted() {
    
  //   this.$http.get('action.php').then(response => {
  //     this.alldata = response.data;
  //     console.log(response.data);
  //    // get body data
  //    // this.someData = response.body;

  //  }, response => {
  //    console.log("error");
  //  });
  // this.$http.post('action.php',{
  //   action:'fetchall'
  // }).then(function(response){
  //   console.log(response.data);
  // })
  },
  render: h => h(App)
}).$mount('#app')

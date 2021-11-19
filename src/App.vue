<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
html,body, #app{    height: 100%;    margin: 0;    padding: 0;}
</style>

<script>
export default {
  name:'app',
   methods: {
    init(){
      
        this.$store.dispatch('afetchalldata');
        this.$store.dispatch('agetAllauthorData');
        this.$store.dispatch('afetchTopBook');
        this.$store.dispatch('afetchMaxWork');
        this.$store.dispatch('afetchDictionary');
      },
 
  }, 
  
   created(){
   
     this.init();

    
  },
};

</script>

<template>
  <div id="app">
    <router-view/>
    
    <!-- iPhone X底部适配-->
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed:{
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #666666;
    width: 100%;
    height: 100%;
    /* margin-top: 60px; */
  }
  .*{
    margin: 0;
    padding: 0;
    border: none;
  }
  html,body{
    margin:0px;
    height:100%;
  }
  .float-left{
    float: left;
    display: inline-block;
  }
  .float-right{
    float: right;
    display: inline-block;
  }
  .text-align-left{
    text-align: left;
  }
  .text-align-right{
    text-align: right;
  }
  .clear{
    display: block;
    clear: both;
    width: 0.0625rem;
    height: 0.0625rem;
  }
</style>

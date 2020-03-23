import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 动态引入子模块
const dynamicModules = {}
const files = require.context('./',true,/index.js$/)
const initDynamicModules = function(modules, file, split, index = 0){
  if(index ==0 && split[0] != 'index'){
    ++index;
  }
  if(split.length == index + 1){
    if('index' == split[index]){
      modules[split[index -1]] = files(file).default
    }
  }
}

files.keys().filter(file => file != './index.js').forEach(file => {
  let splits = file.replace(/(\.\/|\.js)/g, '').split('\/');
  initDynamicModules(dynamicModules, file, splits)
})

const store = new Vuex.Store({
  modules: dynamicModules
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/*
const index = new Vuex.Store({
    state: { //唯一数据源，我理解为声明全局变量
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
        ],
        baseUrl:"http://192.168.1.105:8000/",
        count:1
    },
    getters: {//针对state数据的过滤，
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    },
    mutations: { //逻辑处理，但Mutation 必须是同步函数
        increment (state) {
            // 变更状态
            state.count++
        }
    },
  actions: {//Action 类似于 mutation,Action 提交的是 mutation，而不是直接变更状态;Action 可以包含任意异步操作.
      setIncrement (context) {
          context.commit('increment')
      }
  }
})*/

const state={//要设置的全局访问的state对象
    baseUrl:"http://192.168.50.239:8000/",
    test:1
    //要设置的初始属性值
};
const store = new Vuex.Store({
    state
});

export default store;


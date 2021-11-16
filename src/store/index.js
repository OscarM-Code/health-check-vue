import { createStore } from 'vuex'

export default createStore({
  state: {
    allLinks: []
  },
  mutations: {
    getAllLinks(state, data){
      data.map(item => {
        state.allLinks.push({id: item._id, name: item.name})
      })
    },
    incrementAllLinks(state, data){
      state.allLinks = [...state.allLinks, {id: data._id, name: data.name}]
    },
    modifyAllLinks(state, data){
      console.log(data);
      let index = state.allLinks.findIndex(c => c.id === data.cat);
      state.allLinks[index].name = data.name;
      console.log(state.allLinks);
    },
    deleteAllLinks(state, category){
      let index = state.allLinks.findIndex(c => c.id === category);
      state.allLinks.splice(index, 1);
    }
  },
  actions: {
  },
  modules: {
  }
})

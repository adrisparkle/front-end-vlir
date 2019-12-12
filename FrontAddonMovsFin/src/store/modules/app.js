
import axios from 'axios'
import router from '../../router/index'
const state = {
  sidebar: {
    opened: false,
  },
  config: {
    palette: {
      primary: '#ff9e21',
      danger: '#e34a4a',
      info: '#4ab2e3',
      success: '#db76df',
      warning: '#f7cc36',
      white: '#fff',
      black: '#000',
      fontColor: '#34495e',
      transparent: 'transparent',
      lighterGray: '#ddd',
    },
  },
  isLoading: true,
}

const mutations = {
}

const actions = {
}

export default {
  state,
  mutations,
  actions,
}

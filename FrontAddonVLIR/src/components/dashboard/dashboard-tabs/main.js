import Vue from 'vue'
import axios from 'axios'
/* eslint-disable no-new */
new Vue({
  el: '#prueba',
  data () {
    return {
      info: null,
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
  },
})

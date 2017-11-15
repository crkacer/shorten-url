<template>
  <div class="hello">
    <input type="text" v-model="inputURL">
    <input type="submit" value="Shorten!" @click="postURL">

  </div>
</template>

<script>
import Shorten from '@/services/ShortenURLService'
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      inputURL: ''
    }
  },
  methods: {
    async postURL () {
      const response = await Shorten.sendURL({
        longUrl: this.inputURL
      })
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

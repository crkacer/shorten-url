<template>
  <div >
    <v-flex xs4 offset-xs4>
      <h3>SHORTEN YOUR URL</h3>
      <br>
      <form>
        <v-text-field label="Enter your url" v-model="inputURL" required id="searchBox" v-on:focus="isReturned = false"></v-text-field>
        <v-text-field v-if="isReturned == true" v-model="returnURL"></v-text-field>
        <v-btn @click="postURL" v-if="isReturned == false">submit</v-btn>
        <v-btn @click="enterURL" v-if="isReturned == true">go</v-btn>
      </form>
    </v-flex>

  </div>

</template>

<script>
import Shorten from '@/services/ShortenURLService'
export default {
  name: 'App',
  data () {
    return {
      baseURL: 'http://localhost:8081/url/',
      isReturned: false,
      inputURL: '',
      outputURL: ''
    }
  },
  computed: {
    returnURL: function () {
      return this.baseURL + this.outputURL
    }
  },
  methods: {
    async postURL () {
      const response = await Shorten.sendURL({
        longUrl: this.inputURL
      })
      this.isReturned = true
      if (response.data.success === true) {
        this.outputURL = response.data.url.shortURL
      }
      console.log(response.data)
    },
    enterURL () {
      console.log(this.returnURL)
      var win = window.open(this.returnURL, '_blank')
      win.focus()
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

#searchBox {
  border: 1px solid black;
}
</style>

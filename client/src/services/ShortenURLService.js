import API from '@/services/API'

export default {
  sendURL (url) {
    return API().post('/url/shortenURL', url)
  }
}

// ShortenURLService.sendURL({
//     url: "http://google.com/"
// });

var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.dev.port

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function (req, res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/getSingerList', function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/singer_list.html',
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/music', function (req, res) {//这里的路径是给前端发送请求的url
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  // axios发送get请求，可以自己配置config
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/lyric', function (req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    let ret = response.data
    if (typeof ret === 'string') {
      const reg = /^\w+\(({[^()]+})\)$/
      const matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/getDiscInfo', function (req, res) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  axios.get(url, {
    headers: {
      referer: `https://y.qq.com/n/yqq/playlist/${req.query.disstid}.html`
    },
    params: req.query
  }).then((response) => {
    let ret = response.data
    if (typeof ret === 'string') {
      const reg = /(?=\{).*(?=\))/g
      const matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[0])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/toplist', function (req, res) {//这里的路径是给前端发送请求的url
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  // axios发送get请求，可以自己配置config
  axios.get(url, {
    headers: {
      origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/m/index.html'
    },
    //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
    params: req.query
  }).then((response) => {
    let ret = response.data
    ret = ret.replace(/[\r\n]/g,"")
    if (typeof ret === 'string') {
      const reg = /(?=\{).*(?=\))/g
      const matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[0])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/toplistDetail', function (req, res) {//这里的路径是给前端发送请求的url
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  // axios发送get请求，可以自己配置config
  axios.get(url, {
    headers: {
      origin: 'https://y.qq.com',
      referer: `https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=${req.query.topid}&type=top`
    },
    //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
    params: req.query
  }).then((response) => {
    let ret = response.data
    if (typeof ret === 'string') {
      const reg = /(?=\{).*(?=\))/g
      const matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[0])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/hotkey', function (req, res) {//这里的路径是给前端发送请求的url
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  // axios发送get请求，可以自己配置config
  axios.get(url, {
    headers: {
      origin: 'https://m.y.qq.com',
      referer: 'https://m.y.qq.com/'
    },
    //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
    params: req.query
  }).then((response) => {
    let ret = response.data
    if (typeof ret === 'string') {
      const reg = /(?=\{).*(?=\))/g
      const matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[0])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/search', function (req, res) {//这里的路径是给前端发送请求的url
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  // axios发送get请求，可以自己配置config
  axios.get(url, {
    headers: {
      origin: 'https://m.y.qq.com',
      referer: 'https://m.y.qq.com/'
    },
    //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
    params: req.query
  }).then((response) => {
    let ret = response.data
    if (typeof ret === 'string') {
      const reg = /(?=\{).*(?=\))/g
      const matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[0])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})

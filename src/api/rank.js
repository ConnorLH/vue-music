import {commonParams} from './config'
import axios from 'axios'

export function getTopList() {
  const url = '/api/toplist'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 1,
    uin: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getTopListDetail(topListId) {
  const url = '/api/toplistDetail'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0,
    notice: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: topListId
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

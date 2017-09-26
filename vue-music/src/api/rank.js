import jsonp from '../common/js/jsonp.js'
import {commonParams,options} from './config.js'

export function getTopList() {
    // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    const data = Object.assign({}, commonParams, {
        format:'jsonp',
        tpl:'v12',
        page:'other',
        rnd:49043098234851024,
        g_tk:5381,
        loginUin:0,
        hostUin:0,
        format:'jsonp',
        inCharset:'utf8',
        outCharset:'GB2312',
        notice:0,
        platform:'yqq',
        needNewCode:0
    })

    return jsonp(url, data, options)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk:5381,
    uin:0,
    format:'json',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    tpl:3,
    page:'detail',
    type:'top',
    topid:27,
  })

  return jsonp(url, data, options)
}
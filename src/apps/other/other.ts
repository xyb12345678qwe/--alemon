import { APlugin, AEvent } from 'alemonjs'
import fetch from 'node-fetch'
import { getMsg } from '../../model/index.js'
import axios from 'axios'
import { compressImage } from './sharp.js'
export class other extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?备案.*$/,
          fnc: 'beian'
        },
        {
          reg: /^(#|\/)?4k壁纸$/,
          fnc: 'fourk'
        },
        {
          reg: /^(#|\/)?第五人格发疯文案$/,
          fnc: 'x'
        }
      ]
    })
  }
  async x(e) {
    fetch(`https://api.52starxi.cn/api/d5rg/d5rg.php?type=json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        e.reply(data.msg)
      })
  }
  async fourk(e: AEvent) {
    // const img = await e.segment.http(
    //   'https://api.52starxi.cn/api/img-4k/img.php'
    // )
    // e.reply(img)
  }
  async beian(e: AEvent) {
    const url = e.msg.replace(/^(#|\/)?备案/, '')
    fetch(
      `https://cn.apihz.cn/api/wangzhan/icp.php?id=10000691&key=4db5a105aa8fea63f3956488ea7f47e4&type=1&domain=${url}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        const { domain, icp, unit, time } = data
        e.reply(`备案号: ${icp} \n单位: ${unit} \n备案时间: ${time}`)
      })
  }
}

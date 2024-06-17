import { APlugin, AEvent } from 'alemonjs'
import { obtainingImages } from '../vue/index.js'
import { DirPath } from '../../config.js'
import { join } from 'path'
export class vue extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?vue$/,
          fnc: 'vue'
        }
      ]
    })
  }
  async vue(e: AEvent) {
    e.reply((await obtainingImages('/public/vue/help.vue')) || '')
  }
}

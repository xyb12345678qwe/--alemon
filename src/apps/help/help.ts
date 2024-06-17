import { APlugin, AEvent } from 'alemonjs'
import { createPlayer, Cct } from '../../model/index.js'

export class help extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?武者帮助$/,
          fnc: 'wuzheHelp'
        }
      ]
    })
  }
  async wuzheHelp(e: AEvent) {
    e.reply(await Cct('wuzhehelp'))
  }
}

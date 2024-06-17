import { APlugin, AEvent } from 'alemonjs'
import {
  createPlayer,
  Cct,
  readPlayer,
  setbattlearchive,
  battlePlayer,
  updatePlayer,
  MIN_HEALTH_BEFORE_ALERT
} from '../../model/index.js'

export class battle extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?比武.*$/,
          fnc: 'competition'
        }
      ]
    })
  }
  async competition(e: AEvent) {
    if (!(await createPlayer(e))) return
    const Buid = e.msg
      .replace(/(\/|#)?比武/, '')
      .trim()
      .replace(/\*/g, ' ')
    // .split(' ')
    // .map(code => code.trim())
    if (!Buid) return e.reply('请输入对手的uid')
    let { player: Bplayer } = await readPlayer(Buid)
    if (!Bplayer) return e.reply('对手不存在')
    if (Bplayer.currentHealth < MIN_HEALTH_BEFORE_ALERT)
      return e.reply('对手状态不佳,无法比武')
    let { player } = await readPlayer(e.user_id)

    if (player.currentHealth < MIN_HEALTH_BEFORE_ALERT)
      return e.reply('状态不佳,无法比武')

    //计算绝对值进行境界判断
    if (Math.abs(Bplayer.level - player.level) >= 5)
      return e.reply('等级差距过大,无法进行比武')

    if (player.uid == Bplayer.uid) return e.reply('妄图自己打自己上天?')

    const results = battlePlayer(
      setbattlearchive(player),
      setbattlearchive(Bplayer)
    )

    player.currentHealth = results.Aplayer.currentHealth
    Bplayer.currentHealth = results.Bplayer.currentHealth

    e.reply(`获胜者为[${results.winner}]`)
    await Promise.all([
      updatePlayer(e.user_id, { player }),
      updatePlayer(Buid, { player: Bplayer })
    ])
  }
}

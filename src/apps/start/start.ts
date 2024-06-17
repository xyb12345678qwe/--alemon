import { APlugin, AEvent } from 'alemonjs'
import {
  createPlayer,
  readPlayer,
  showPersonalInformation,
  findNextLevel,
  updatePlayer,
  breakthroughProbabilityCalculation
} from '../../model/index.js'
export class start extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?踏入武道$/,
          fnc: 'start'
        },
        {
          reg: /^(#|\/)?个人信息$/,
          fnc: 'personalInformation'
        },
        {
          reg: /^(#|\/)?突破$/,
          fnc: 'breakthrough'
        }
      ]
    })
  }
  async breakthrough(e: AEvent) {
    if (!(await createPlayer(e))) return
    let { player } = await readPlayer(e.user_id)
    const nextlevel = await findNextLevel(player.level)
    if (!nextlevel || !nextlevel.name) return e.reply('已经是最高境界了')
    if (player.spiritualEnergy < nextlevel.spiritualEnergy)
      return e.reply(
        `你的灵气不足,目前只有[${player.spiritualEnergy}]灵气,需要[${nextlevel.spiritualEnergy}]灵气,还差[${nextlevel.spiritualEnergy - player.spiritualEnergy}]灵气`
      )
    const probability = await breakthroughProbabilityCalculation(player.level)
    if (probability == 0) return e.reply('已达到最高境界')
    const random = Math.random()
    if (random > probability) return e.reply('突破失败')
    player.level = nextlevel.id
    const {
      spiritualEnergy = 0,
      defenseBonus = 0,
      attackBonus = 0,
      healthBonus = 0,
      criticalHitBonus = 0,
      criticalStrikeBonus = 0
    } = nextlevel
    player.spiritualEnergy -= parseInt(String(spiritualEnergy))
    player.attackBonus += parseInt(String(attackBonus))
    player.defenseBonus += parseInt(String(defenseBonus))
    player.healthBonus += parseInt(String(healthBonus))
    player.criticalHitBonus += parseFloat(String(criticalHitBonus))
    player.criticalStrikeBonus += parseFloat(String(criticalStrikeBonus))

    e.reply(`${player.name}突破成功,境界提升至[${nextlevel.name}]`)
    await updatePlayer(e.user_id, { player })
  }
  async start(e: AEvent) {
    await createPlayer(e)
  }
  async personalInformation(e: AEvent) {
    if (!(await createPlayer(e))) return
    await showPersonalInformation(e)
  }
}

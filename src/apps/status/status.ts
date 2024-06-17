import { APlugin, AEvent } from 'alemonjs'
import {
  createPlayer,
  readPlayer,
  updatePlayer,
  setStatus,
  RETYREATTIME,
  getStatus,
  getMinute,
  MININGTIME,
  isMagicPowerReachedLimit,
  findNextLevel
} from '../../model/index.js'

const rule = [
  {
    reg: /^(#|\/)?闭关$/,
    fnc: 'retreat'
  },
  {
    reg: /^(#|\/)?结束闭关$/,
    fnc: 'finishretreat'
  },
  {
    reg: /^(#|\/)?开始挖矿$/,
    fnc: 'mining'
  },
  {
    reg: /^(#|\/)?结束挖矿$/,
    fnc: 'finishmining'
  },
  {
    reg: /^(#|\/)?强制结束状态$/,
    fnc: 'forcefulterminationstatus'
  }
]

export class status extends APlugin {
  constructor() {
    super({ rule })
  }

  async forcefulterminationstatus(e: AEvent) {
    if (!(await createPlayer(e))) return
    let { status } = await readPlayer(e.user_id)
    if (getStatus(e, status, 0, { reply: false }))
      return e.reply(`处于空闲状态`)
    status = setStatus(status, 0, null)
    e.reply(`强制结束状态成功`)
    await updatePlayer(e.user_id, { status })
  }

  async finishmining(e: AEvent) {
    if (!(await createPlayer(e))) return
    let { player, status } = await readPlayer(e.user_id)
    console.log(status)

    if (!getStatus(e, status, 2)) return
    const minute = getMinute(e, status.startTime, MININGTIME)
    if (!minute) return
    const money = Math.floor(minute * 15)
    player.Stardust += money
    e.reply(`结束挖矿成功,获得星晶${money}`)
    status = setStatus(status, 0, null)
    await updatePlayer(e.user_id, { status })
  }

  async mining(e: AEvent) {
    if (!(await createPlayer(e))) return
    let { status } = await readPlayer(e.user_id)
    if (!getStatus(e, status)) return
    status = setStatus(status, 2)
    await updatePlayer(e.user_id, { status })
    e.reply(`开始挖矿`)
  }

  async retreat(e: AEvent) {
    if (!(await createPlayer(e))) return
    let { status, player } = await readPlayer(e.user_id)
    if (!getStatus(e, status)) return
    if (await isMagicPowerReachedLimit(player))
      return e.reply('灵气已满,无法闭关')
    status = setStatus(status, 1)
    await updatePlayer(e.user_id, { status })
    e.reply(`开始闭关`)
  }

  async finishretreat(e: AEvent) {
    if (!(await createPlayer(e))) return
    let { status, player } = await readPlayer(e.user_id)
    if (!getStatus(e, status, 1)) return
    const minute = getMinute(e, status.startTime, RETYREATTIME)
    if (!minute) return
    const money = Math.floor(minute * 10)
    player.spiritualEnergy += money
    const next = await findNextLevel(player.level)
    if (player.spiritualEnergy > next.spiritualEnergy)
      player.spiritualEnergy = next.spiritualEnergy
    status = setStatus(status, 0, null)
    await updatePlayer(e.user_id, { status, player })
    e.reply(`结束闭关成功,获得灵气${money}`)
  }
}

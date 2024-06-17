import * as DB from '../db/index.js'
import { MIN_HEALTH_BEFORE_ALERT } from './config.js'
import { bloodCalibration } from './data.js'
export interface battlePlayer {
  name: string
  attackBonus: number
  healthBonus: number //生命加成
  defenseBonus: number //防御加成
  criticalHitBonus: number //暴击加成
  criticalStrikeBonus: number //爆击加成
  currentHealth: number //当前生命
  spiritualEnergy: number //灵力
}
export function setbattlearchive(player: any): battlePlayer {
  return {
    name: player.name,
    attackBonus: player.attackBonus, //攻击伤害
    healthBonus: player.healthBonus, //生命加成
    defenseBonus: player.defenseBonus, //防御加成
    criticalHitBonus: player.criticalHitBonus, //暴击加成
    criticalStrikeBonus: player.criticalStrikeBonus, //爆击加成
    currentHealth: player.currentHealth, //当前生命
    spiritualEnergy: player.spiritualEnergy
  }
}
//[A]玩家名
//[B]玩家名
//[C]伤害
const Message = {
  1: '[A]对[B]造成了[C]点伤害',
  2: '[A]战败'
}
/**
 * 配置消息
 * @param options
 * @returns
 */
function getMessage(options: {
  MsgID: number
  A?: string
  B?: string
  C?: number
}) {
  const { MsgID, A, B, C } = options
  return Message[MsgID].replace('[A]', A).replace('[B]', B).replace('[C]', C)
}
export function battlePlayer(Aplayer: battlePlayer, Bplayer: battlePlayer) {
  let msg = []
  let winner = undefined
  while (Aplayer.currentHealth > 50 && Bplayer.currentHealth > 50) {
    const A = handlePlayerAttack(Aplayer, Bplayer)
    msg = msg.concat(A.msg)
    Aplayer = A.attacker
    Bplayer = A.defender //同步一下存档
    winner = A.winner
    const B = handlePlayerAttack(Bplayer, Aplayer)
    msg = msg.concat(B.msg)
    Aplayer = B.defender
    Bplayer = B.attacker //同步一下存档
    winner = B.winner
  }
  console.log(msg)
  Aplayer.currentHealth = bloodCalibration(Aplayer.currentHealth) //进行血量校准
  Bplayer.currentHealth = bloodCalibration(Bplayer.currentHealth)
  return {
    Aplayer,
    Bplayer,
    winner,
    msg
  }
}
function 计算基础攻击(player: battlePlayer): number {
  return player.attackBonus
}
function 计算暴击(player: battlePlayer) {
  const random = Math.random()
  let damage = 计算基础攻击(player)
  if (random < player.criticalHitBonus) {
    damage *= player.criticalStrikeBonus
  }
  return damage
}
function 计算造成伤害(Aplayer: battlePlayer, Bplayer: battlePlayer) {
  //A为进攻方
  const damage = 计算暴击(Aplayer)
  const ultimatelyHurt = damage - Bplayer.defenseBonus //最终伤害
  return ultimatelyHurt < 0 ? 0 : ultimatelyHurt
}
/**
 * 进行普通攻击处理
 * @param attacker
 * @param defender
 * @returns
 */
function handlePlayerAttack(attacker: battlePlayer, defender: battlePlayer) {
  let winner = undefined
  const msg = []
  const damage = 计算造成伤害(attacker, defender)

  defender.currentHealth -= damage
  msg.push(
    getMessage({
      MsgID: 1,
      A: attacker.name,
      B: defender.name,
      C: damage
    })
  )

  if (defender.currentHealth <= MIN_HEALTH_BEFORE_ALERT) {
    msg.push(getMessage({ MsgID: 2, A: defender.name }))
    winner = attacker.name
  }
  return { msg, attacker, defender, winner }
}

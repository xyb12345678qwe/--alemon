import { AEvent } from 'alemonjs/dist'
import { statusType } from '../db/index.js'
import { statusIDType } from './Type.js'
export const statusID = {
  0: '空闲',
  1: '闭关',
  2: '挖矿'
}
export function setStatus(
  status: any,
  statusID: number | string,
  startTime: number = new Date().getTime(),
  endTime: number | null = null,
  data: object = {}
) {
  status.statusID = statusID
  status.startTime = startTime
  status.endTime = endTime
  status.data = data
  return status
}

export function getStatus(
  e: AEvent,
  status: statusType,
  id: keyof statusIDType = 0,
  options: {
    reply?: boolean
  } = {
    reply: true
  }
) {
  const { reply } = options
  if (status.statusID != id) {
    if (reply) {
      e.reply(`你正在${statusID[status.statusID]}中`)
    }
    return false
  }
  return true
}
/**
 *
 * @param e
 * @param time
 * @param minimumTime 最小时间
 * @returns
 */
export function getMinute(e: AEvent, time: number, minimumTime: number = 0) {
  const now = new Date().getTime()
  const minute = (now - time) / 1000 / 60
  if (minute < minimumTime) {
    e.reply(`时间最小必须为${minimumTime}`)
    return false
  }
  return minute
}

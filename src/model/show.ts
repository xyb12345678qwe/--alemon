import { AEvent } from 'alemonjs'
import { readPlayer } from './data.js'
import { Cct } from './image.js'
import { getCurrentLevelName } from './Level.js'
/**
 * 展示个人信息
 * @param e
 */
export async function showPersonalInformation(e: AEvent) {
  const { player } = await readPlayer(e.user_id)
  const level = await getCurrentLevelName(player)
  e.reply(await Cct('personalInformation', { player, level }))
}

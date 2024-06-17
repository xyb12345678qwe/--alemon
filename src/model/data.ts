import { AEvent } from 'alemonjs'
import * as DB from '../db/index.js'
import { base } from './base.js'
import { showPersonalInformation } from './show.js'

/**
 * 创建玩家存档
 */
export async function createPlayer(e: AEvent) {
  if (await isUser(e.user_id)) return true
  const Base = new base()
  await Base.setUid()
  const uid = Base.get('uid')
  await DB.player.create(await Base.getBasePlayer())
  await DB.equipment.create(await Base.get('baseEquipment'))
  await DB.status.create(await Base.get('baseStatus'))
  await DB.UID.create({
    uid,
    AllowAccountBinding: [uid],
    currentlyBoundAccount: e.user_id
  })
  e.reply('开始进行创建账号')
  await showPersonalInformation(e)
  return false
}
/**
 * 判断有无存档
 */
export async function isUser(uid: number | string) {
  return await findUID(uid)
}

/**
 * 读取玩家存档
 * @param uid uid
 * @returns
 */
export async function readPlayer(uid: string): Promise<{
  player: DB.playerType
  bag: DB.bagType
  equipment: DB.equipmentType
  status: DB.statusType
}> {
  const UID = await findUID(uid)
  const [player, bag, equipment] = await Promise.all([
    DB.player.findOne({
      where: { uid: UID.uid },
      raw: true
    }) as unknown as DB.playerType,
    DB.bag.findOne({
      where: { uid: UID.uid },
      raw: true
    }) as unknown as DB.bagType,
    DB.equipment.findOne({
      where: { uid: UID.uid },
      raw: true
    }) as unknown as DB.equipmentType
  ])
  const status = (await DB.status.findOne({
    where: { uid: UID.uid },
    raw: true
  })) as any as DB.statusType

  return {
    player,
    bag,
    equipment,
    status
  }
}

/**
 * 更新玩家存档
 * @param uid uid
 * @param updates 要更新的数据对象
 * @returns
 */
export async function updatePlayer(
  uid: string | number,
  updates: {
    player?: Partial<DB.playerType>
    bag?: Partial<DB.bagType>
    equipment?: Partial<DB.equipmentType>
    status?: Partial<DB.statusType>
  }
) {
  // 找到uid对应的ID
  const UID = (await findUID(uid)) as unknown as DB.UIDType

  const updateTable = async (tableName: string, updateData: any) => {
    if (updates[tableName]) {
      await DB[tableName].update(updateData, { where: { uid: UID.uid } })
    }
  }
  await updateTable('player', updates.player)
  await updateTable('bag', updates.bag)
  await updateTable('equipment', updates.equipment)
  await updateTable('status', updates.status)
}
export async function findUID(uid: number | string) {
  const UID = (await DB.UID.findOne({
    where: {
      [DB.Op.or]: [{ currentlyBoundAccount: uid }, { uid: uid }]
    },
    raw: true
  })) as unknown as DB.UIDType
  return UID
}
/***获取存档数*/
export async function getPlayerMaxId(): Promise<number> {
  const maxId = await DB.player.findOne({
    attributes: [[DB.sequelize.fn('max', DB.sequelize.col('id')), 'maxId']]
  })
  return maxId.get('maxId') as number
}
/***获取最大uid*/
export async function getPlayerMaxuId(): Promise<number> {
  const maxId = await DB.player.findOne({
    attributes: [[DB.sequelize.fn('max', DB.sequelize.col('uid')), 'maxId']]
  })
  return maxId.get('maxId') as number
}

/**
 * 得到uid
 */
export async function getUID() {
  return 100000000 + (await getPlayerMaxuId())
}

/**
 * 血量校准
 * @param life 当前生命值
 * @param SmallestLife 最小生命值
 */
export function bloodCalibration(life: number, SmallestLife = 0) {
  if (life <= SmallestLife) return SmallestLife
}

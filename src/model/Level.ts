import * as DB from '../db/index.js'
export async function findNextLevel(levelId: number) {
  // 直接计算下一个级别的ID
  const nextLevelId = levelId + 1
  // 尝试通过ID检索下一个级别
  return (await DB.WarriorRealm.findByPk(
    nextLevelId
  )) as any as DB.WarriorRealmType // 使用findByPk进行高效的ID检索}
}
/**
 * 进行突破概率计算
 * @param currentLevelId 当前id
 * @returns
 */
export async function breakthroughProbabilityCalculation(
  currentLevelId: number
) {
  let maxId = await getLevelMaxuId()

  // 特殊情况：如果当前等级已经达到最大等级，则无法进行突破，返回0
  if (currentLevelId === maxId) {
    return 0
  }
  if (maxId < 50) maxId = 50
  // 根据当前等级和最大等级计算突破概率
  const probability =
    Math.max(0, Math.min(1, (maxId - currentLevelId) / 100)) +
    (0.01 * currentLevelId) / 10

  // 确保概率值在0到1之间
  return probability
}
/***获取境界数*/
export async function getLevelMaxuId() {
  const maxId = await DB.WarriorRealm.findOne({
    attributes: [[DB.sequelize.fn('max', DB.sequelize.col('id')), 'maxId']]
  })
  return maxId.get('maxId') as number
}
/**
 * 判断灵力是否达到上限
 */
export async function isMagicPowerReachedLimit(player: DB.playerType) {
  const currentLevel = (await DB.WarriorRealm.findByPk(
    player.level
  )) as any as DB.WarriorRealmType
  const next = await findNextLevel(player.level)
  if (!next) return true
  if (currentLevel.spiritualEnergy < next.spiritualEnergy) return false
  return true
}
/**
 * 获取当前境界名
 */
export async function getCurrentLevelName(player: DB.playerType) {
  const currentLevel = (await DB.WarriorRealm.findByPk(
    player.level
  )) as any as DB.WarriorRealmType
  return currentLevel.name
}

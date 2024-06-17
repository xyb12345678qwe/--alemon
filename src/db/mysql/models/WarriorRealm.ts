import { sequelize, TableConfig } from '../index.js'
import { DataTypes, ModelStatic, Model } from 'sequelize'
//境界
export const WarriorRealm = <ModelStatic<Model<WarriorRealmType>>>(
  sequelize.define(
    'WarriorRealm',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      spiritualEnergy: DataTypes.INTEGER, //灵气
      attackBonus: DataTypes.INTEGER, //攻击加成
      healthBonus: DataTypes.INTEGER, //生命加成
      defenseBonus: DataTypes.INTEGER, //防御加成
      criticalHitBonus: DataTypes.INTEGER, //暴击加成
      criticalStrikeBonus: DataTypes.INTEGER //爆击加成
    },
    {
      ...TableConfig
    }
  )
)

export interface WarriorRealmType {
  id: number
  name: string
  spiritualEnergy: number //灵气
  attackBonus: number //攻击加成
  healthBonus: number //生命加成
  defenseBonus: number //防御加成
  criticalHitBonus: number //暴击加成
  criticalStrikeBonus: number //爆击加成
}

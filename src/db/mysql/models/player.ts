import { sequelize, TableConfig } from '../index.js'
import { DataTypes, ModelStatic, Model } from 'sequelize'
export const player = <ModelStatic<Model<playerType>>>sequelize.define(
  'player',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    uid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    timeSaveFileCreation: DataTypes.STRING, //创建存档时间
    attackBonus: DataTypes.INTEGER, //攻击加成
    healthBonus: DataTypes.INTEGER, //生命加成
    defenseBonus: DataTypes.INTEGER, //防御加成
    criticalHitBonus: DataTypes.INTEGER, //暴击加成
    criticalStrikeBonus: DataTypes.INTEGER, //爆击加成
    currentHealth: DataTypes.INTEGER, //当前生命
    doMain: DataTypes.STRING, //界域
    level: DataTypes.INTEGER, //境界
    Stardust: DataTypes.INTEGER, //星晶
    Daohsuan: DataTypes.STRING, //道宣
    TrainingBonus: DataTypes.INTEGER, //修炼加成
    spiritualEnergy: DataTypes.INTEGER //灵气
  },
  TableConfig
)
export interface playerType {
  id: number
  uid: number
  name: string
  timeSaveFileCreation: string
  attackBonus: number
  healthBonus: number
  defenseBonus: number
  criticalHitBonus: number
  criticalStrikeBonus: number
  currentHealth: number
  doMain: string
  level: number
  Stardust: number
  Daohsuan: string
  TrainingBonus: number
  spiritualEnergy: number
}

import { sequelize, TableConfig } from '../index.js'
import { DataTypes, ModelStatic, Model } from 'sequelize'
export const equipment = <ModelStatic<Model<equipmentType>>>sequelize.define(
  'equipment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    uid: DataTypes.INTEGER,
    sword: DataTypes.STRING, //剑
    magicWeapon: DataTypes.STRING, //法宝
    breastplate: DataTypes.STRING //胸甲
  },
  TableConfig
)
export interface equipmentType {
  id: number
  uid: number
  sword: string
  magicWeapon: string
  breastplat: string
}

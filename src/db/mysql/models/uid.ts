import { sequelize, TableConfig } from '../index.js'
import { DataTypes, ModelStatic, Model } from 'sequelize'
export const UID = <ModelStatic<Model<UIDType>>>sequelize.define(
  'UID',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    uid: DataTypes.INTEGER,
    AllowAccountBinding: DataTypes.JSON, //允许绑定账号
    currentlyBoundAccount: DataTypes.STRING //当前绑定账号
  },
  TableConfig
)
export interface UIDType {
  id: number
  uid: number
  AllowAccountBinding: any //允许绑定账号
  currentlyBoundAccount: string //当前绑定账号
}

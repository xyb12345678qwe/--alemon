import { sequelize, TableConfig } from '../index.js'
import { DataTypes, ModelStatic, Model } from 'sequelize'
export const bag = <ModelStatic<Model<bagType>>>sequelize.define(
  'bag',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'player', key: 'uid' }
    }, // 假设存在名为player的玩家表
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  },
  {
    ...TableConfig,
    indexes: [
      {
        fields: ['uid'],
        unique: true
      }
    ]
  }
)

export interface bagType {
  id: number
  uid: number
  name: string // string
  type: string
  quantity: number
}

import { sequelize, TableConfig } from '../index.js'
import { DataTypes, ModelStatic, Model } from 'sequelize'
export const status = <ModelStatic<Model<statusType>>>sequelize.define(
  'status',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    uid: DataTypes.INTEGER,
    statusID: DataTypes.INTEGER, //状态的id
    startTime: DataTypes.INTEGER, //开始时间
    endTime: DataTypes.INTEGER, //结束时间
    data: DataTypes.JSON
  },
  TableConfig
)
export interface statusType {
  id: number
  uid: number
  statusID: number
  startTime: number
  data: object
}

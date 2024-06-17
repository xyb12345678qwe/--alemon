import { Sequelize, Op, literal } from 'sequelize'

export const sequelize = new Sequelize('wuzhe', 'wuzhe', '12345678qwe', {
  host: '107.151.250.22',
  port: 3306,
  dialect: 'mysql',
  logging: false
})

async function connectToDatabase() {
  try {
    await sequelize.authenticate()
    console.log('mysql连接成功')
  } catch (error) {
    console.error('mysql连接失败:', error)
  }
}
export const TableConfig = {
  freezeTableName: true, // 禁止复数表名
  timestamps: false // 去掉自动时间戳字段
}
await connectToDatabase()
export { Op, literal }

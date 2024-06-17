import { findUID } from './data.js'
import { UIDType, sequelize } from '../db/index.js'
export async function getAllBagThing(uid: number, limit = 1000000) {
  const UID = (await findUID(uid)) as unknown as UIDType
  const bag = await sequelize.query(
    `SELECT * FROM bag WHERE uid = ${UID.uid} LIMIT ${limit}`
  )
  return bag
}
export async function getAllBagTypeThing(
  uid: number,
  type: string,
  limit = 1000000
) {
  const UID = (await findUID(uid)) as unknown as UIDType
  const bag = await sequelize.query(
    `SELECT * FROM bag WHERE uid = ${UID.uid} AND type = ${type} LIMIT ${limit}`
  )
  return bag
}

import { getCurrentTime } from './getCurrentTime.js'
import { getPlayerMaxId, getUID } from './data.js'

export class base {
  private uid: number | null = null
  private basePlayer = {
    uid: this.uid,
    name: null,
    timeSaveFileCreation: null,
    attackBonus: 100,
    healthBonus: 500,
    defenseBonus: 50,
    criticalHitBonus: 0.01,
    criticalStrikeBonus: 0.01,
    currentHealth: 500,
    doMain: '凡界',
    level: 1,
    Stardust: 10,
    TrainingBonus: 0.01,
    Daohsuan: '这个人很懒，没有留下什么',
    spiritualEnergy: 0
  }
  private baseEquipment = {
    uid: this.uid,
    sword: null,
    magicWeapon: null,
    breastplate: null
  }
  private baseStatus = {
    uid: this.uid,
    statusID: 0,
    startTime: null,
    endTime: null,
    data: {}
  }

  get(data: string) {
    return this[data]
  }

  async getBasePlayer() {
    this.basePlayer.timeSaveFileCreation = getCurrentTime(new Date())
    const maxId = await getPlayerMaxId()
    this.basePlayer.name = `路人甲${maxId + 1}号`
    return this.basePlayer
  }

  async setUid() {
    if (this.uid) return
    this.uid = await getUID()
    this.basePlayer.uid = this.uid
    this.baseEquipment.uid = this.uid
    this.baseStatus.uid = this.uid
  }
}

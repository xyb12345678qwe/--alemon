import { APlugin } from 'alemonjs'

export class wuzhe extends APlugin {
  constructor() {
    super({
      rule: []
    })
  }
}
class message {
  command = new wuzhe()
  response(reg, fnc) {}
}
export const Message = new message()

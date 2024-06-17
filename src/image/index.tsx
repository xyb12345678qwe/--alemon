import React from 'react'
import { renderToString } from 'react-dom/server'
import { Puppeteer } from './puppeteer.js'
import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { DirPath } from '../../config.js'
import WuzheHelp from '../component/wuzheHelp.js'
import PersonalInformation from '../component/PersonalInformation.js'
class Component {
  puppeteer: typeof Puppeteer.prototype
  #dir = ''
  constructor(dir: string) {
    this.puppeteer = new Puppeteer()
    this.#dir = dir
    mkdirSync(this.#dir, {
      recursive: true
    })
  }
  /**
   * 渲染字符串
   * @param element
   * @param name
   * @returns
   */
  create(element: React.ReactNode, dirs: string, name: string) {
    const html = renderToString(element)
    const dir = join(this.#dir, dirs)
    mkdirSync(dir, {
      recursive: true
    })
    const address = join(dir, name)
    writeFileSync(address, `<!DOCTYPE html>${html}`)
    return address
  }
  async wuzhehelp() {
    return this.puppeteer.render(
      this.create(<WuzheHelp />, 'WuzheHelp', `WuzheHelp.html`)
    )
  }
  async personalInformation(data) {
    return this.puppeteer.render(
      this.create(
        <PersonalInformation data={data} />,
        'WuzheHelp',
        `WuzheHelp.html`
      )
    )
  }
}
export default new Component(join(DirPath, 'public', 'cache'))

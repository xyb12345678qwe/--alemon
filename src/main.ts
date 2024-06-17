import './db/index.js'
import { createApp } from 'alemonjs'
import * as rules from './rules.js'
const app = createApp(import.meta.url)
for (const key in rules) {
  app.use(rules[key])
}
app.mount()

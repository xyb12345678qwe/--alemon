export function getMsg(e, reg) {
  return e.msg
    .replace(reg, '')
    .trim()
    .replace(/\*/g, ' ')
    .split(' ')
    .map(code => code.trim())
}

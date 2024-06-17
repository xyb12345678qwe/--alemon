import component from '../image/index.js'
export async function Cct(img: string, data?: object) {
  const image = await component[img](data)
  if (!image) return '图片生成失败'
  return image
}

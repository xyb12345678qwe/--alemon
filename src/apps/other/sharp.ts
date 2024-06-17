import sharp from 'sharp'

/** 使用sharp库将图片转换为JPEG格式并进行压缩
 * @param {Buffer} img - 图片的Buffer数据
 * @param {number} quality - 压缩质量(0-100)
 * @returns {Promise<Buffer>} - 返回压缩后的Buffer图片
 * @throws {Error} - 当 img 是 undefined 时抛出错误
 */
export async function compressImage(input, quality = 50) {
  const imgBuffer =
    typeof input === 'object' && input?.file ? input.file : input
  const compressedBuffer = await sharp(imgBuffer)
    .toFormat('jpg')
    .jpeg({ quality: quality })
    .toBuffer()

  if (typeof input === 'object' && input?.file) {
    input.file = compressedBuffer
    return input
  }
  return compressedBuffer
}

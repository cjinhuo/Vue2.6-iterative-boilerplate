import { MessageBox, Message } from 'element-ui'

/**
 *
 * @param {*} value 匹配值
 * @param {*} sourceArray 原对象数组
 * @param {*} prop 获取匹配的属性
 * @param {String} comparePropName 对比的属性
 * @description 一个方法，作为过滤器，指定一个 数组对象，value，然后想取 什么值
 */
export function filterField(value, sourceArray, prop = 'label', comparePropName = 'value') {
  if (!Array.isArray(sourceArray)) {
    throw new Error('sourceArray 必须为数组')
  }
  const result = sourceArray.find((item) => item[comparePropName] === value)

  if (result) {
    return result[prop]
  }
  return '-'
}

/**
 *二次确认框
 *
 * @export
 * @param {*} msg 确认框内容
 * @param {string} [title='提示'] 标题
 * @param {*} [options={}] 按钮文本和样式
 * @returns
 */
export function confirm(msg, title = '提示', options = {}) {
  return MessageBox.confirm(msg, title, {
    confirmButtonText: options.confirmButtonText || '确定',
    cancelButtonClass: options.cancelButtonClass || 'btn-custom-cancel',
    cancelButtonText: options.cancelButtonText || '取消',
    center: true,
    ...options
  })
    .then(() => true)
    .catch(() => false)
}

export function uploadCheck(file, size = 1, type = ['image/png', 'image/gif', 'image/jpeg']) {
  if (!type.includes(file.type)) {
    Message.warning('上传文件类型不符合规范')
    return false
  }
  const imgSize = file.size / 1024 / 1024
  if (imgSize > size) {
    Message.warning(`上传文件不能超过${size}M`)
    return false
  }
  return true
}

export function uploadCheckName(file, size = 1, type = ['xlsx']) {
  if (!type.some((v) => file.name.endsWith(v))) {
    Message.warning('上传文件类型不符合规范')
    return false
  }
  const imgSize = file.size / 1024 / 1024
  if (imgSize > size) {
    Message.warning(`上传文件不能超过${size}M`)
    return false
  }
  return true
}

// 将cdn的地址转成文件流下载
export const downloadFile = async (url, name) => {
  const a = document.createElement('a')
  a.href = await toDataUrl(url)
  a.download = name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const toDataUrl = (url) => {
  return fetch(url)
    .then((response) => {
      return response.blob()
    })
    .then((blob) => {
      return URL.createObjectURL(blob)
    })
}

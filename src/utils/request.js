import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '@/router'
// import
// 是否正在刷新的标记
let isLoading = false
let loadingInstance = null
const baseUrl = ''
const loadingShow = () => {
  if (isLoading) return
  isLoading = true
  loadingInstance = Loading.service({
    text: '正在努力加载中....',
    fullscreen: false,
    background: 'transparent'
  })
}
const loadingClose = () => {
  if (!isLoading || !loadingInstance) return
  isLoading = false
  loadingInstance.close()
}

const request = axios.create({
  timeout: 60000,
  withCredentials: true
  // headers: {
  //   'Content-Type': 'application/json'
  // }
})
request.interceptors.request.use(
  (config) => {
    loadingShow()
    const { url, method } = config
    // 只能是开头是api的才能替换
    const reg = /^\/api\//
    if (reg.test(url)) {
      config.url = url.replace('/api/', `${baseUrl}/`)
    }
    if (method === 'get') {
      config.params = config.data
      config.data = {}
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// http response 拦截器 Response
request.interceptors.response.use(
  (response) => {
    loadingClose()
    const res = response.data
    if (res.success) {
      return res.data
    }
    const message = res.message
    Message.error({ message })
    if (res.code === 401) {
      router.push({ name: 'login' })
    }
    return Promise.reject(res)
  },
  (error) => {
    loadingClose()
    if (!error.response) return Promise.reject(error)
    const response = error.response
    const message = response.data.error ? response.data.error.message : '请求错误'
    if (response.status === 401) {
      Message.error({ message: message })
      return location.replace(response.data.error.detail)
    } else {
      Message.error({ message: message })
      return Promise.reject(error)
    }
  }
)
export default request

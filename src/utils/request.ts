/**
 * axios请求配置文件
 * @param
 * @returns
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import NProgress from './progress'

// const TOKEN_INVSSLID: string = 'Token认证失败，请重新登陆'
// const NETWORE_ERROR: string = '网络请求异常，请稍后重试'

/* 创建axios实例 */
const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000, // 请求超过时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

/* axios请求拦截器 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start() // 每次请求时，调用进度条
    config.headers['token'] = Cookies.get('token')
    return config
  },
  (error: any) => {
    console.error('error', error)
    return Promise.reject(error)
  }
)

/* axios响应拦截器 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done() // 请求有响应的时候
    return response.data
  },
  (error: any) => {
    ElMessage({
      message: error,
      type: 'error',
      duration: 2 * 1000
    })

    return Promise.reject(error)
  }
)

export default service

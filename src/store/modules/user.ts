import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { handleLocal, handleSession } from '@/utils/storage'
import { signIn, logout } from '@/api/login'
import { successMessage, warnMessage } from '@/utils/message'

interface UserType {
  token: string
  username: string
  avatar: string
}

export const useUserStore = defineStore('user', {
  state: (): UserType => ({
    token: Cookies.get('token'),
    username: '游客',
    avatar: '@/assets/image/face.gif'
  }),
  getters: {},
  actions: {
    /**
     * @description 设置token
     * @param { string } token 登录令牌
     */
    setToken(token) {
      this.token = token
      Cookies.set('token', token)
    },
    /**
     * @description 设置用户名
     * @param { string } username 设置用户名
     */
    setUsername(username) {
      this.username = username
    },
    /**
     * @description 设置头像
     * @param { string } avatar 头像链接地址
     */
    setAvatar(avatar) {
      this.avatar = avatar
    },
    /**
     * @description 登录逻辑
     * @param { Object } userInfo 登录验证信息
     */
    async setLogin(userInfo) {
      try {
        const {
          data: { token }
        } = await signIn(userInfo)
        this.setToken(token)
        const hour = new Date().getHours()
        const thisTime =
          hour < 8
            ? '早上好'
            : hour <= 11
            ? '上午好'
            : hour <= 13
            ? '中午好'
            : hour < 18
            ? '下午好'
            : '晚上好'
        successMessage(`${thisTime}, 欢迎登录vue3后台`)
      } catch {
        // 在错误发生时怎么处理
        const err = `登录接口异常，未正确返回token...`
        warnMessage(err)
        throw err
      }
    },
    /**
     * @description 退出登录
     */
    async setLogout() {
      await logout()
      handleLocal.clearAll()
      handleSession.clearAll()
      Cookies.remove('token')
      location.reload()
    }
  }
})

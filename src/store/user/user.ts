import { Module } from 'vuex'
import { RootState } from '../types'
import Cookies from 'js-cookie'
import { signIn } from '@/api/login'
import { successMessage, warnMessage } from '@/utils/message'

interface UserState {
  token: string
  username: string
  avatar: string
}

const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: Cookies.get('token'),
      username: '游客',
      avatar: '@/assets/image/face.gif'
    }
  },
  mutations: {
    // 设置token
    setToken(state, token) {
      state.token = token
      Cookies.set('token', token)
    },
    // 设置用户名
    setUsername(state, username) {
      state.username = username
    },
    // 设置头像
    setAvatar(state, avatar) {
      state.avatar = avatar
    }
  },
  actions: {
    /**
     * @description 登录
     */
    async login({ commit }, userInfo) {
      const { token } = await signIn(userInfo)
      if (token) {
        commit('setToken', token)
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
      } else {
        const err = `登录接口异常，未正确返回token...`
        warnMessage(err)
        throw err
      }
    }
  },
  getters: {
    username: state => state.username,
    avatar: state => state.avatar
  }
}

export default userModule

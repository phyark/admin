import { defineStore } from 'pinia'
import { store } from '/@/store/index'

interface UserInfoEntity {}

interface UserState {
  token?: string
  userInfo: null | UserInfoEntity
  roleList: any[]
  sessionTimeout: boolean
  lastUpdateTime: number //
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    // token
    token: undefined,
    // 用户信息
    userInfo: null,
    // 角色列表
    roleList: [],
    // 登录状态是否过期
    sessionTimeout: false,
    // 最后更新时间
    lastUpdateTime: 0,
  }),
  getters: {
    // 获取token
    getToken(): string | undefined {
      return this.token
    },
    // 获取用户信息
    getUserInfo(): null | UserInfoEntity {
      return this.userInfo
    },
    // 获取角色列表
    getRoleList(): any[] {
      return this.roleList
    },
    // 获取登录状态
    getSessionTimeout(): boolean {
      return this.sessionTimeout
    },
    // 获取最后更新时间
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    // 保存token
    setToken(token: string | undefined) {
      this.token = token || ''
    },
    // 保存用户信息
    setUserInfo(info: null | UserInfoEntity) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
    },
    // 保存角色列表
    setRoleList(roleList: any[]) {
      this.roleList = roleList
    },
    // 保存登录状态
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    // 保存最后更新时间
    setLastUpdateTime(time: number) {
      this.lastUpdateTime = time
    },
  },
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}

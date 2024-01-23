import type { Router } from 'vue-router'

import { getStorage, removeStorage } from '/@/utils/storage'

const whiteList = ['/login', '/404']
interface UserInfo {
  username: string
  avatar: string
}

interface UserInfoResponse {
  code: number
  data?: UserInfo
  message: string
}

const mockGetUserInfo = (token: string): Promise<UserInfoResponse> => {
  const isValidToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === isValidToken) {
        resolve({
          code: 200,
          data: {
            username: 'admin',
            avatar: 'https://avatars.githubusercontent.com/u/10102508?v=4',
          },
          message: 'success',
        })
      } else {
        resolve({
          code: 401,
          message: '身份信息已过期',
        })
      }
    })
  })
}

// 鉴权守卫
export const createPermissionGuard = (router: Router) => {
  console.log(
    '%c [鉴权守卫]',
    'background: #ecced8; padding: 2px 4px; color: #282828; border-radius: 4px;',
  )
  router.beforeEach((to, from, next) => {
    // 重定向到登录页
    const redirect = () => {
      return next({
        name: 'login',
        replace: true,
        query: {
          redirect: encodeURIComponent(to.fullPath),
        },
      })
    }

    const ignoreAuth = to.meta.ignoreAuth === true
    const isWhiteList = whiteList.includes(to.path)
    const token = getStorage('_bms_token_')

    // 白名单或免校验页面直接访问
    if (ignoreAuth || isWhiteList) {
      // 当前页面正好是登录页时， 且携带 redirect 参数，并且携带了token
      if (to.path === '/login' && !!token && to.query.redirect) {
        const path = decodeURIComponent(to.query.redirect as string)
        next(path)
        return
      }
      // console.log("无需鉴权，直接访问")
      next()
      return
    }

    // 没有token 重定向到登录页
    if (!token) {
      console.log('当前用户未登录， 重定向到登录页')
      return redirect()
    }

    // 检查token是否过期
    mockGetUserInfo(token).then(({ code, message }) => {
      // 登录过期
      if (code !== 200) {
        alert(message)
        removeStorage('_bms_token_') // 移除token
        return redirect()
      } else {
        next()
      }
    })

    // 修改页面名称
    document.title = to.meta.title as string
  })
}

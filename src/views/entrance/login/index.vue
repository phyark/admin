<script setup lang="ts">
import type {} from 'vue-router'
import { setStorage } from '/@/utils/storage'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '/@/store/modules/system/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const formdata = ref({
  username: '',
  password: '',
})
interface LoginParams {
  username: string
  password: string
}

interface LoginResponse {
  code: string | number
  token?: string
  message: string
}

const mockApi = async (params: LoginParams): Promise<LoginResponse> => {
  return new Promise((resolve) => {
    if (params['username'] === 'admin' && params['password'] === '123456') {
      resolve({
        code: 200,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        message: 'success',
      })
    } else if (params['username'] === 'admin') {
      resolve({
        code: 200,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw99',
        message: 'success',
      })
    } else {
      resolve({
        code: 400,
        message: '用户名或密码错误',
      })
    }
  })
}

console.log('我是userStore', userStore)

const handleLogin = () => {
  const data = formdata.value
  mockApi(data).then((res) => {
    if (res.code === 200) {
      setStorage('_bms_token_', res.token)
      alert('登录成功：' + res.message)
      const redirectPath =
        decodeURIComponent(route.query.redirect as string) || '/'
      router.replace(redirectPath)
    } else {
      alert('登录失败：' + res.message)
    }
  })
}
</script>

<template>
  <div>
    <p>
      <input v-model="formdata.username" type="text" placeholder="用户名" />
    </p>
    <p>
      <input v-model="formdata.password" type="password" placeholder="密码" />
    </p>
    <p>
      <button type="button" @click="handleLogin">登录</button>
    </p>
  </div>
</template>

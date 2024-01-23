import Home from '/@/views/home/index.vue'
import NotFoundPage from '/@/views/entrance/error/404.vue'
import LoginPage from '/@/views/entrance/login/index.vue'
export const basicRoutes = [
  {
    path: '/',
    name: "home",
    component: Home,
    meta: {
      title: '主页',
      ignoreAuth: false,
    },
    alias: ['/', '/home']
  },
  {
    path: '/login',
    name: "login",
    meta: {
      title: '登录',
      ignoreAuth: true,
    },
    component: LoginPage,
  },
  {
    path: "/:path(.*)*",
    name: "notFound",
    meta: {
      title: '找不到页面',
      ignoreAuth: true,
    },
    component: NotFoundPage
  }
];
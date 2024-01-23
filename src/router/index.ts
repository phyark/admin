import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from "./routes";
import { setupRouterGuard } from '/@/router/guard'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})


export const setupRouter = (app: App<Element>) => {
  app.use(router);
  setupRouterGuard(router)
}

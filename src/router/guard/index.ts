import type { Router } from 'vue-router'
import { createPermissionGuard } from './PermissionGuard'

export const setupRouterGuard = (router: Router) => {
  createPermissionGuard(router)
}

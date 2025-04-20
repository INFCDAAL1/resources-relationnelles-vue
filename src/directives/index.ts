// Directives
import role from './role'

// Types
import type { App } from 'vue'

export function registerDirectives (app: App) {
  app.directive('role', role)
}

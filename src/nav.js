import {config} from './utils'

export const pageMap = config.pageMap || {}
export const pageTree = config.pageTree || {}

export const ROOT_URL = pageTree.path || '/'

const requirePage = require.context('../pages', true, /\.(js|md)x?$/)

export function getComponent(file) {
  const page = requirePage.keys().find(key => key === `.${file}`)
  if (page) {
    return requirePage(page)
  } else {
    // eslint-disable-next-line no-console
    console.warn(`no file to require from file: ${file}`)
  }
}

export function getNavName(file) {
  let name
  const Component = getComponent(file)
  if (Component) {
    name = getDisplayName(Component)
  }
  return name || file
}

export function getDisplayName(obj) {
  return (obj.meta ? obj.meta.displayName : null) || obj.displayName || obj.name
}

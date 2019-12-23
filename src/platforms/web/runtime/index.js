/* @flow */

// NOTE: CORE START 2
// QUESTION: BUILD 相对目录的导入，通过 rollup-plugin-alias，实现
// QUESTION: BUILD 如何用 vscode 支持 跳转，参考 jsconfig.json 的用法
import Vue from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platfrm runtime directives & components
// NOTE: UTIL 属性拷贝
extend(Vue.options.directives, platformDirectives)

// NOTE: UTIL sub components
extend(Vue.options.components, platformComponents)

// install platform patch function
// NOTE: CORE FUNCTION __patch__ 算法
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
// NOTE: CORE FUNCTION mount 方法
// QUESTION: RENDER 这个要弄清除
// NOTE: CORE FLOW 7 $mountWithoutCompiler 没有编译方法
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  // QUESTION: BUILD 这里为什么要 setTimieout, 开发工具在实例之后初始化
  setTimeout(() => {
    // QUESTION: BUILD 自动求值
    console.log(process.env.NODE_ENV)
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue)
      } else if (
        // QUESTION: BUILD 这里为什么可以用 NOTE_ENV，编译环境，自动求值了
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test'
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        )
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        `You are running Vue in development mode.\n` +
        `Make sure to turn on production mode when deploying for production.\n` +
        `See more tips at https://vuejs.org/guide/deployment.html`
      )
    }
  }, 0)
}

export default Vue

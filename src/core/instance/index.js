import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// QUESTION: INIT 我们使用的时候是使用构造函数
// NOTE: CORE FLOW 1 new Vue({}) 调用 _init() 方法
// NOTE: CORE INIT instance
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

  // NOTE: CORE INIT mixin constructor invoke，构造函数的调用
  // NOTE: CORE FLOW 2 _init 方法
  // NOTE: CORE START 4
  this._init(options)
}

// QUESTION: INIT 模块化系统，基于 prototype， 有什么好处？
// QUESTION: INIT 各个模块之间怎么通信？
// NOTE: DEP 1 属性初始化
// NOTE: CORE INIT mixin，包括 _init
initMixin(Vue)

// NOTE: CORE INIT state，包括 $watch $set $del
stateMixin(Vue)

// NOTE: CORE INIT event，包括 $on, $emit, $off, $once
eventsMixin(Vue)

// NOTE: CORE INIT lifecycle, 包括 _update，forceUpdate, destory
lifecycleMixin(Vue)

// NOTE: CORE INIT render，包括 _render 方法
renderMixin(Vue)

export default Vue

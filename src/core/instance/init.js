/* @flow */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

import 'core/util/debug-browser';

let uid = 0

export function initMixin (Vue: Class<Component>) {
  // NOTE: INIT INIT _init
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    // NOTE: CORE FLOW 3 子组件的配置初始化
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      // NOTE: CORE FUNCTION 顶级组件的配置初始化
      // NOTE: INJECT 这里初始化了 inject参数
      // NOTE: CORE FLOW 4 组件的配置初始化
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {

      // NOTE: CORE FUNCTION _render _renderProxy
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm

    // get component name
    vm._getName = function(comp) {
      return `comp:${(comp || this || vm).$options.name}`;
    }

    vm._color = function getRandomColor() {
      return debug.colors[Math.floor(Math.random() * debug.colors.length)]
    }

    // type debug.enable('*') in console
    vm._debug = debug(vm._getName());

    vm._debug.color = vm._color()

    vm._count = 1;

    vm._format = function(...args) {
      args[0] = `${vm._getName()}=>` + args[0];
      return args
    }

    vm.log = function(...args) {
      vm._debug(...args)
    }

    vm.log('init component start')

    // NOTE: CORE FLOW 5 初始化所有的配置

    // NOTE: CORE INIT MIXIN lifecycle 初始化，abstract 抽象组件
    initLifecycle(vm)

    // NOTE: CORE INIT MIXIN event 初始化。listener 初始化
    initEvents(vm)

    // NOTE: CORE INIT MIXIN render 初始化。 createElement 初始化
    initRender(vm)

    // NOTE: HOOK 2 beforeCreate
    callHook(vm, 'beforeCreate')

    // NOTE: INJECT init
    // NOTE: CORE INIT MIXIN inject 初始化。
    initInjections(vm) // resolve injections before data/props

    // NOTE: DEP 2 props data computed $watch 观察者建立
    // NOTE: CORE INIT MIXIN state props data computed $watch 观察者建立
    initState(vm)

    // NOTE: INJECT init provide
    // NOTE: CORE INIT MIXIN inject provider初始化
    initProvide(vm) // resolve provide after data/props

    // NOTE: HOOK 3 created
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    vm.log('init component end');

    // NOTE: CORE FLOW 6 $mount 挂载
    if (vm.$options.el) {
    // NOTE: CORE INIT MIXIN $mount 挂载

      vm.log('$mount start');
      vm.$mount(vm.$options.el)
      vm.log('$mount end');
    }
  }
}

export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}

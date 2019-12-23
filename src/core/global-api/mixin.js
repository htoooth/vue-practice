/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {

  // NOTE: CORE FUNCTION mixin
  // QUESTION: CORE 这里的 this 是谁
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}

/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
 // NOTE: DEP !Dep
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
    console.log('dep add wather dep=>%o addSub watcher=>%o')
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  // NOTE: DEP 512 dep add
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.

// NOTE: DEP !currnet Watcher
Dep.target = null

// NOTE: DEP !Watcher FOLO 队列
// QUESTION: DEP 为什么是一个数组，是一个栈队列
// ANSWER: DEP 组件化时有用，push 入栈，pop 出栈
const targetStack = []

// NOTE: DEP !pushTarget 添加依赖
export function pushTarget (target: ?Watcher, key) {
  targetStack.push(target)
  Dep.target = target

  const pre = targetStack.map(() => '+').join('');
  console.log(`${pre}pushTarget:${key || ''}:push=>%s, targetWatcher=>`, targetStack.length, Dep.target);
}

// NOTE: DEP !popTarget 移出依赖
export function popTarget (key) {
  const pre = targetStack.map(i => '-').join('');
  const target = targetStack.pop()
  console.log(`${pre}removeTarget:${key || ''}:remove=>%s,removeWatcher=>%o, targetWatcher=>%o`, targetStack.length, target, targetStack[targetStack.length - 1]);
  Dep.target = targetStack[targetStack.length - 1]
}

// demo data
// boot up the demo
// vm <- getA <- a
// pushTarget => Dep.target = vm
// d <- watch <- a

// Vue.component('Hi', Vue.extend({
//   name: 'helloworld',
//   props: {
//     msg: {
//       type: String
//     }
//   },
//   data() {
//     return {}
//   },
//   render() {
//     return (<span>{this.msg}</span>)
//   }
// }))

// const vm = new Vue({
//   template: '<div>{{ c.x }}</div>',
//   data: {
//     a: 1,
//     d: 2
//   },
//   mounted() {
//   },
//   computed: {
//     b() {
//       return this.a + 1;
//     },
//     c() {
//       return {
//         x: this.b + 1
//       };
//     }
//   },
// }).$mount('#demo')

// setTimeout(() => {
//   vm.a = 2
// }, 10000)

// console.log('setTimout=>');
// window.vueVisiable = {
//   Dep: {
//     target: null,
//     targetStack: []
//   }
// };

let Child = Vue.component('child', Vue.extend({
  name: 'huangtaoPage',
  template: '<div><span>child msg: {{msg2}}</span></div>',
  props: {
    msg: {
      type: Object
    }
  },
  data() {
    return {
      msg2: this.msg
    }
  },
  mounted() {
  }
}))

const vm = new Vue({
  name: 'parent',
  template: `<div>
                  <child :msg="msg"></child>
            </div>`,
  data() {
    return {
      msg: {
        m: 'fdsafdsafd'
      },
      msg2: 'world'
    }
  }
}).$mount('#demo')

console.log('===========completed======================');

setTimeout(() => {
  vm.msg.m = 'world'
}, 3000)

// var a = {
//   b() {
//     return this
//   }
// }

// var b = {
//   b: () => {
//     eval('console.log(this)')
//     return this
//   }
// }

// console.log('a.b=>', a.b())
// console.log('b.b=>',b.b())
// var c = b.b.bind(a)

// var x = {
//   y:c
// }

// console.log('b.b.bind(a)=>',c())
// console.log('x.y()=>', x.y())

// (
//   () => {
//     console.log('out=>',(() => console.log('this=>',this))())
//   }
// )()

// this

// window

// this

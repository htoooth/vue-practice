// demo data
// boot up the demo
// vm <- getA <- a
// pushTarget => Dep.target = vm
// d <- watch <- a
// const vm = new Vue({
//   template: '<div>{{ getA() }}</div>',
//   data: {
//     a: 1,
//     d: 2
//   },
//   mounted() {
//     this.a++
//   },
//   methods: {
//     getA() {
//       return this.a
//     }
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
//   watch: {
//     d() {
//       this.a = 1;
//     }
//   }
// }).$mount('#demo')


// setTimeout(() => {
//   vm.a = 2
// }, 2000)

// window.vueVisiable = {
//   Dep: {
//     target: null,
//     targetStack: []
//   }
// };

// let Child = {
//   name: 'child',
//   template: '<div><span>{{ localMsg }}</span><button @click="change">click</button></div>',
//   data: function() {
//     return {
//       localMsg: this.msg
//     }
//   },
//   props: {
//     msg: String
//   },
//   methods: {
//     change() {
//       this.$emit('update:msg', 'world')
//     }
//   }
// }

// const vm = new Vue({
//   template: `<div>
//                   <child :msg.sync="msg"></child>
//                   <div>settimeout: {{c}}</div>
//             </div>`,
//   beforeUpdate() {
//   },
//   data() {
//     return {
//       msg: 'hello',
//       a: 1
//     }
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
//   components: {
//     Child
//   }
// }).$mount('#demo')


// setTimeout(() => {
//   vm.a = 3
// }, 3000)

var a = {
  b() {
    return this
  }
}

var b = {
  b: () => {
    eval('console.log(this)')
    return this
  }
}

console.log('a.b=>', a.b())
console.log('b.b=>',b.b())
var c = b.b.bind(a)

var x = {
  y:c
}

console.log('b.b.bind(a)=>',c())
console.log('x.y()=>', x.y())

(
  () => {
    console.log('out=>',(() => console.log('this=>',this))())
  }
)()

this

window

this

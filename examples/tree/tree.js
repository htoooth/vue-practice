// demo data
// boot up the demo
const vm = new Vue({
  template: '<div>{{ c.x }}</div>',
  data: {
    a: 1,
    d: 2
  },
  computed: {
    b() {
      return this.a + 1;
    },
    c() {
      return {
        x: this.b + 1
      };
    }
  },
  watch: {
    a() {
      this.d = 1;
    }
  }
}).$mount('#demo')


// setTimeout(() => {
//   vm.a = 2
// }, 2000)

window.vueVisiable = {
  Dep: {
    target: null,
    targetStack: []
  }
};

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

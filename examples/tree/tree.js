// demo data
// boot up the demo
const vm = new Vue({
  template: '<div>{{ x[0].y}}</div>',
  data: {
    a: 1,
    x: [{y:1}, {y:2}, {y:3}]
  },
}).$mount()
// vm.a = 2


setTimeout(() => {
  vm.x[0].y = 2
}, 2000)

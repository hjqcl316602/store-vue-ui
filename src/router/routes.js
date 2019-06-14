

const index = r => require.ensure([], () => r(require('../page/index.vue')), 'index');
const carousel = r => require.ensure([], () => r(require('../page/carousel.vue')), 'carousel');
const refresh = r => require.ensure([], () => r(require('../page/refresh.vue')), 'refresh');
const loadmore = r => require.ensure([], () => r(require('../page/loadmore.vue')), 'loadmore');
const toast = r => require.ensure([], () => r(require('../page/toast.vue')), 'toast');
 
export default  [
  
  { path: '/', redirect: '/index'},
  { path: '/index', name: 'index', component:index ,meta:{ title :'组件列表'   }   },
  { path: '/carousel', name: 'carousel', component:carousel ,meta:{ title :'轮播' ,show:true }   },
  { path: '/refresh', name: 'refresh', component:refresh ,meta:{ title :'下拉刷新' ,show:true }  },
  { path: '/loadmore', name: 'loadmore', component:loadmore ,meta:{ title :'上拉加载更多' ,show:true } } ,
  { path: '/toast', name: 'carousel', component:toast ,meta:{ title :'轻提示' ,show:true }  },
  { path: '*', redirect: '/index'},
]

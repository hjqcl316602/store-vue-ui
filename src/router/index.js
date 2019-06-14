import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './routes';
// 版本升级之后必须要加上这句，之前可不写
Vue.use(VueRouter)

const router = new VueRouter({
  routes:routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
})

router.beforeEach((to,from,next)=>{ 
  document.title = to.meta && to.meta['title']
  next()
})

export default router
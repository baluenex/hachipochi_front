import Vue from 'vue'
import Router from 'vue-router'
import Top from './views/Top'
import Gallery from './views/Gallery'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top,
      meta: {
        title: 'はちぽち.net',
        desc: '僕たちはちぽちをはじめとする、とても可愛らしい我が家のアニマルグッズを紹介するサイトだわん！わん！'
      }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    }
  ]
});

export default router;
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: () =>
      import('../components/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/topPage',
    component: () =>
      import('../views/Home.vue'),
    
    children: [
      {
        path: '/pwd',
        component: () => import(/* webpackChunkName: "about" */ '../views/pwd.vue'),
        meta:{
          title:'图书'
        },
      },
      {
        path: '/showbook',
        component: () => import(/* webpackChunkName: "about" */ '../views/Book/book-show.vue'),
        meta:{
          title:'图书'
        },
      },
      {
        path: '/topPage',
        component: () => import(/* webpackChunkName: "about" */ '../views/topPage.vue'),
        meta:{
          title:'首页'
        },
      },
      {
        path: '/showAuthor',
        component: () => import(/* webpackChunkName: "about" */ '../views/Author/Author-show.vue')
      }, {
        path: '/showAuthor/Author-add',
        component: () => import(/* webpackChunkName: "about" */ '../views/Author/Author-add.vue'),
     
      }, {
        path: '/showAuthor/author-edit',
        component: () => import(/* webpackChunkName: "about" */ '../views/Author/Author-edit.vue')
      },
      {
        path: '/Author/book-read',
        component: () => import(/* webpackChunkName: "about" */ '../views/Author/AuthorBook-read.vue')
      },

      {
        path: '/Author/book-details',
        component: () => import(/* webpackChunkName: "about" */ '../views/Author/AuthorBook-details.vue')
      },
      {
        path: '/showAuthor/author-check',
        component: () => import(/* webpackChunkName: "about" */ '../views/Author/Author-check.vue')
      },
      {
        path: '/showbook/book-chapter',
        component: () => import(/* webpackChunkName: "about" */ '../views/Book/bookchapter.vue')
      },
      {
        path: '/dictionary/dictionary-add',
        component: () => import(/* webpackChunkName: "about" */ '../views/Option/dictionary-add.vue')
      },

      {
        path: '/dictionary/dictionary-edit',
        component: () => import(/* webpackChunkName: "about" */ '../views/Option/dictionary-edit.vue')
      },
      {
        path: '/dictionary',
        component: () => import(/* webpackChunkName: "about" */ '../views/Option/dictionary-show.vue')
      },
      {
        path: '/showbook/book-chapter/chapter-add',
        component: () => import(/* webpackChunkName: "about" */ '../views/Option/chapter-add.vue')
      }, {
        path: '/showbook/book-chapter/chapter-edit',
        component: () => import(/* webpackChunkName: "about" */ '../views/Option/chapter-edit.vue')
      },
      {
        path: '/showbook/book-add',
        component: () => import(/* webpackChunkName: "about" */ '../views/Book/book-add.vue'),
        meta:{
          title:'新增'
        },

      },

      {
        path: '/showbook/book-edit',
        component: () => import(/* webpackChunkName: "about" */ '../views/Book/book-edit.vue')
      },
    ],
  },

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router

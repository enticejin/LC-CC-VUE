import Vue from 'vue'
import Router from 'vue-router'
import store from '../assets/js/store.js'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
    const originalPush = Router.prototype.push
    Router.prototype.push = function push(location) {
      return originalPush.call(this, location).catch(err => err)
    }
Vue.use(Router)
const routes = [
    {
      path: '/',
      name: 'Login',
      component: () => import('../components/webapp/Login.vue')
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('../components/webapp/Index.vue'),
      redirect:"Anchors",//重定向，第一次进入就进入Anchors，不添加的话第一次进入右侧是空白
              children:[
                {
                  path: '/Anchors',
                  name: 'Anchors',
                  meta: {
                              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                          },
                  component: () => import('../components/side/Anchors')
                },
                {
                  path: '/Layout',
                  name: 'Layout',
                  meta: {
                              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                          },
                  component: () => import('../components/side/Layout')
                },
                {
                  path: '/ClockSources',
                  name: 'ClockSources',
                  meta: {
                              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                          },
                  component: () => import('../components/side/ClockSources')
                },
                {
                  path: '/Areas',
                  name: 'Areas',
                  meta: {
                              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                          },
                  component: () => import('../components/side/Areas')
                },
                {
                  path: '/Websocket',
                  name: 'Websocket',
                  component: () => import('../components/websocket/Websocket')
                },
                {
                  path: '/Position',
                  name: 'Position',
                  meta: {
                              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                          },
                  //component: () => import('../components/openlayers/position')
                  component: () => import('../components/openlayers/mapView.vue')
                },
                {
                  path: '/Pages',
                  name: 'Pages',
                  meta: {
                              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                          },
                  component: () => import('../components/side/pages')
                }
              ]
      }
  ];

  const router = new Router({
    routes
  });

  router.beforeEach((to, from, next) => {
      if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      console.log(store.state.token);
          if (store.state.token) {  // 通过vuex state获取当前的token是否存在
              next();
          }
          else {
              next({
                  path: '/',
                  query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
              })
          }
      }
      else {
          next();
      }
  })

  export default router;

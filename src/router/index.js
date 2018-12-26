import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/userList'
    },
    {
      path: '/login',
      name: '登录',
      component: (resolve) => {
        import('../pages/Login/Login').then((module) => {
          resolve(module)
        })
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: (resolve) => {
        import('../pages/demo/demo/demo').then((module) => {
          resolve(module)
        })
      }
    },
    {
      path: '/squill',
      name: 'demo',
      component: (resolve) => {
        import('../pages/demo/demo/squill').then((module) => {
          resolve(module)
        })
      }
    },
    // ==========西瓜帮你找===========
    {
      path: '/',
      name: 'Home4Manage',
      component: (resolve) => {
        import('../components/Home4Manage').then((module) => {
          resolve(module)
        })
      },
      children: [
        {
          path: '/userList',
          name: '用户表',
          component: (resolve) => {
            import('../pages/user/list').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/orderList',
          name: '订单表',
          component: (resolve) => {
            import('../pages/order/list').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/orderListOne',
          name: '订单表2',
          component: (resolve) => {
            import('../pages/order/listOne').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/coupleBackList',
          name: '反馈表',
          component: (resolve) => {
            import('../pages/coupleBack/list').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/auditList',
          name: '审核表',
          component: (resolve) => {
            import('../pages/audit/list').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/reportList',
          name: '施工汇报表',
          component: (resolve) => {
            import('../pages/report/list').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/swiperList',
          name: '幻灯片管理',
          component: (resolve) => {
            import('../pages/swiper/list').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/advertisementList',
          name: '广告管理',
          component: (resolve) => {
            import('../pages/advertisement/list').then((module) => {
              resolve(module)
            })
          }
        }
      ]
    }
  ]
});

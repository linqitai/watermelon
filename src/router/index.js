import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
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
          name: '反馈表',
          component: (resolve) => {
            import('../pages/report/list').then((module) => {
              resolve(module)
            })
          }
        }
      ]
    },
    // ==========西瓜帮你找===========
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => {
        import('../pages/Login/Login').then((module) => {
          resolve(module)
        })
      }
    },
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
          path: '/classplan',
          name: '课程安排',
          component: (resolve) => {
            import('../pages/class/classPlan').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/classList',
          name: '排课信息',
          component: (resolve) => {
            import('../pages/class/classList').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/studentBookList',
          name: '学生订课表',
          component: (resolve) => {
            import('../pages/class/studentBookList').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/teacherList',
          name: '教师列表',
          component: (resolve) => {
            import('../pages/class/teacherList').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/studentList',
          name: '学生列表',
          component: (resolve) => {
            import('../pages/class/studentList').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/teachersArranging',
          name: '教师排班明细表',
          component: (resolve) => {
            import('../pages/class/teachersArranging').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/dropCourseList',
          name: '退课列表',
          component: (resolve) => {
            import('../pages/class/dropCourseList').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/lessonList',
          name: '课程安排',
          component: (resolve) => {
            import('../pages/class/lessonList').then((module) => {
              resolve(module)
            })
          }
        },
        {
          path: '/classplan3',
          name: '课程安排',
          component: (resolve) => {
            import('../pages/class/plan3').then((module) => {
              resolve(module)
            })
          }
        }
      ]
    }
  ]
});

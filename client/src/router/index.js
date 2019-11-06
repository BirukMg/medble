import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../i18n'

import ClientMain from '@/views/client/Main'
import ClientHome from '@/views/client/homePage/Main'
import Try from '@/components/Try'

import Account from '@/views/client/account/Main'
import Login from '@/views/client/account/Login'
import Register from '@/views/client/account/Register'
import EmailConfirmation from '@/views/client/account/ConfEmail'

import ClientProfile from '@/views/client/profile/Profile'
import ClientPost from '@/views/client/post/create/Main'
import PostCategory from '@/views/client/post/create/Category'
import Create from '@/views/client/post/create/Create'
import PostMng from '@/views/client/post/manage/Main'
import PostView from '@/views/client/post/manage/View'

import Resume from '@/views/client/profile/resume/Main'

import ItemDetail from '@/views/client/homePage/items/ItemDetail'
import Posts from '@/views/client/homePage/items/Main'

import MyRequest from '@/views/client/requests/My'
import RequestForMe from '@/views/client/requests/ForMe'

import AdminLogin from '@/views/admin/Login'
import SuperMain from '@/views/admin/super/Main'
import SuperProfile from '@/views/admin/super/Profile'
import SubMain from '@/views/admin/sub/Main'
import SubProfile from '@/views/admin/sub/Profile'

import MngUser from '@/views/admin/super/managment/user/Main'
import MngUserPost from '@/views/admin/super/managment/user/Post'
import MngPost from '@/views/admin/super/managment/post/Main'
import MngAds from '@/views/admin/super/managment/ads/Main'
import MngAdmin from '@/views/admin/super/managment/admins/Main'

import SubMngUser from '@/views/admin/sub/managment/user/Main'
import SubMngUserPost from '@/views/admin/sub/managment/user/Post'
import SubMngPost from '@/views/admin/sub/managment/post/Main'
import SubMngAds from '@/views/admin/sub/managment/ads/Main'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: `/${i18n.locale}/home`
    },
    {
      path: '/:lang',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '/',
          name: 'ClientMain',
          component: ClientMain,
          children: [{
              path: 'home',
              component: ClientHome
            },
            {
              path: 'posts/:category/:item',
              component: Posts
            },
            {
              path: 'detail/:item_id',
              component: ItemDetail
            },
            {
              path: 'profile',
              component: ClientProfile
            },
            {
              path: 'my request',
              component: MyRequest
            },
            {
              path: 'request for me',
              component: RequestForMe
            },
            {
              path: 'my post',
              component: PostMng
            },
            {
              path: 'my resume',
              component: Resume
            },
            {
              path: 'post',
              component: PostCategory
            },
            {
              path: 'create/:category/:item',
              component: Create
            },
            {
              path: 'my post/view/:category/:item_id',
              component: PostView
            }
          ]
        }, {
          path: 'admin',
          name: 'AdminLogin',
          component: AdminLogin
        }, {
          path: 'admin/super',
          name: 'SuperMain',
          component: SuperMain,
          children: [{
              path: 'admin/super/manage users',
              component: MngUser
            },
            {
              path: 'admin/super/manage users/post/:id',
              component: MngUserPost
            },
            {
              path: 'admin/super/manage posts',
              component: MngPost
            },
            {
              path: 'admin/super/manage ads',
              component: MngAds
            },
            {
              path: 'admin/super/manage admins',
              component: MngAdmin
            },
            {
              path: 'admin/super/profile',
              component: SuperProfile
            }
          ]
        }, {
          path: 'admin/sub',
          name: 'SubMain',
          component: SubMain,
          children: [{
              path: 'admin/sub/manage users',
              component: SubMngUser
            },
            {
              path: 'admin/sub/manage users/post/:id',
              component: SubMngUserPost
            },
            {
              path: 'admin/sub/manage posts',
              component: SubMngPost
            },
            {
              path: 'admin/sub/manage ads',
              component: SubMngAds
            },
            {
              path: 'admin/sub/profile',
              component: SubProfile
            }
          ]
        }, {
          path: 'try',
          name: 'Try',
          component: Try
        }, {
          path: 'email confirmation',
          name: 'Email',
          component: EmailConfirmation
        }, {
          path: 'account',
          redirect: `/${i18n.locale}/account/login`,
          name: 'Account',
          component: Account,
          children: [{
              path: 'login',
              component: Login
            },
            {
              path: 'register',
              component: Register
            }
          ]
        }
      ]
    }
  ]
})

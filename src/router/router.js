import Vue from 'vue'
import Router from 'vue-router'

import User from '../views/user/user'
import UserIndex from '../views/user/IndexGuide/IndexGuide'

import UserMovie from "../views/user/MovieGuide/MovieGuide"
import MovieShowing from "../views/user/MovieGuide/MovieShowing"
import MovieCommingSoon from "../views/user/MovieGuide/MovieCommingSoon"

import UserTop from "../views/user/TopGuide/TopGuide"
import TopShowing from "../views/user/TopGuide/TopShowing"
import TopScore from "../views/user/TopGuide/TopScore"

import UserPersonal from "../views/user/PersonalGuide/PersonalGuide"
import PersonalOrder from "../views/user/PersonalGuide/PersonalOrder"
import PersonalFormation from "../views/user/PersonalGuide/PersonalinFormation"
import PersonalCPassword from "../views/user/PersonalGuide/PersonalCPassword"

import Login from "../views/user/LoginGuide/LoginGuide"

import Register from "../views/user/RegisterGuide/RegisterGuide"

import Detail from "../views/user/DetailGuide/DetailGuide"

import DetailSet from "../views/user/DetailGuide/DetailSet"


import Manager from '../views/manager/manager'
import MLogin from "../views/manager/Login/Login"
import Mindex from "../views/manager/IndexGuide/IndexGuide"

import Studio from '../views/manager/StudioGuide/StudioGuide';
import Movie from "../views/manager/MovieGuide/MovieGuide";
import Schedule from '../views/manager/ScheduleGuide/ScheduleGuide';
import MUser from '../views/manager/UserGuide/UserGuide';


import api from '../api/api'
import store from '../store';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/theater/index',
    },
    {
      path: '/theater',
      redirect: '/theater/index',
      beforeEnter: (to, from, next) => {
        //console.log(api.cookie.get)
        if (api.cookie.get('PTT_TOKEN')) {
          store.dispatch('SignIn',api.cookie.get('PTT_TOKEN'));
        } else {
          console.log('未登录')
        }
        next()
      },
      name: User,
      component: User,
      children: [
        {
          path: 'index',
          component: UserIndex
        },
        {
          path: 'movie',
          component: UserMovie,
          redirect: 'movie/showing',
          children: [
            {
              path: 'showing',
              component: MovieShowing
            },
            {
              path: "commingsoon",
              component: MovieCommingSoon
            }
          ]
        },
        {
          path: 'top',
          component: UserTop,
          redirect: "top/showing",
          children: [
            {
              path: 'showing',
              component: TopShowing
            },
            {
              path: "score",
              component: TopScore
            }
          ]
        }, {
          path: 'personal',
          component: UserPersonal,
          redirect: "personal/order",
          beforeEnter: (to, from, next) => {
            //console.log(api.cookie.get)
            if (api.cookie.get('PTT_TOKEN')) {
              next()
            } else {
              console.log('未登录')
              next({path:'/theater'})
            }
            
          },
          children: [
            {
              path: "order",
              component: PersonalOrder
            },
            {
              path: "formation",
              component: PersonalFormation
            },
            {
              path: 'CPassword',
              component: PersonalCPassword
            }
          ]
        },
        {
          path: 'login',
          component: Login
        },
        {
          path: 'register',
          component: Register
        },
        {
          path: "detail",
          component: Detail
        },
        {
          path: 'set',
          component: DetailSet,
          beforeEnter: (to, from, next) => {
            if (api.cookie.get('PTT_TOKEN')) {
              next()
            } else {
              next({
                path: '/theater/register'
              })
            }
            //next()
          },
        }
      ]
    },
    {
      path: '/manager',
      component: Manager,
      redirect: '/manager/login',
      children: [
        {
          path: 'login',
          component: MLogin
        },
        {
          path:'index',
          component: Mindex,
          children: [
            {
              path: 'movie',
              component: Movie
            },
            {
              path: 'studio',
              component: Studio
            },
            {
              path: 'schedule',
              component: Schedule
            },
            {
              path: 'user',
              component: MUser
            }
          ]
        },
       
      ]

    }

  ]
})

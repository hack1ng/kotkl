import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Teams from '@/components/Teams'
import Player from '@/components/Player'
import CreatePlayer from '@/components/CreatePlayer'
import CreateTransaction from '@/components/CreateTransaction'
import ViewTeam from '@/components/ViewTeam'
import ViewMockTrade from '@/components/ViewMockTrade'
import Transactions from '@/components/Transactions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams
    },
    {
      path: '/team/:teamOwner',
      name: 'team',
      component: ViewTeam
    },
    {
      path: '/player',
      name: 'player',
      component: Player
    },
    {
      path: '/player/create',
      name: 'player-create',
      component: CreatePlayer
    },
    {
      path: '/transaction/create',
      name: 'transaction-create',
      component: CreateTransaction
    },
    {
      path: '/mockTrade',
      name: 'mock-trade',
      component: ViewMockTrade
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    }
  ]
})

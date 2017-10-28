import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs'
import CreateSong from '@/components/CreateSong'
import Teams from '@/components/Teams'
import Player from '@/components/Player'
import CreatePlayer from '@/components/CreatePlayer'
import ViewTeam from '@/components/ViewTeam'

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
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'songs-create',
      component: CreateSong
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
    }
  ]
})

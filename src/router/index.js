import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import upload from '@/components/Upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'upload',
    component: upload
  }]
})

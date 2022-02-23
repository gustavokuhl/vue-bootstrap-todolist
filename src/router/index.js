import Vue from 'vue';
import VueRouter from 'vue-router';
import List from '../views/List.vue';
import Form from '../views/Form.vue';
import Conf from '../views/Conf.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: List
  },
  {
    path: '/form',
    name: 'form',
    component: Form
  },
  {
    path: '/conf',
    name: 'conf',
    component: Conf
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

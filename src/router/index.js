import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../pages/Home'
import Desserts from '../pages/Desserts'
import Score from '../pages/Score'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/desserts",
    name: "Desserts",
    component: Desserts
  },
  {
    path: "/score",
    name: "Score",
    component: Score
  },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

export default router;
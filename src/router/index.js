import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Welcome from "../views/Welcome.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes:[
  {path:'/login',name:"Login",component:Login,meta:{isPublic:true}},
  {
    path: "/",
    component: Home,
    children: [
      {path:'/',component:Welcome},

      {
        path: "/categories/create",
        component: () => import("../views/categories/Create.vue"),
      },
      {
        path: "/categories/edit/:id",
        component: () => import("../views/categories/Create.vue"),
        props: true,
      },
      {
        path: "/categories",
        component: () => import("../views/categories/List.vue"),
      },
      // Categories End

      {
        path: "/items/create",
        component: () => import("../views/items/Create.vue"),
      },
      {
        path: "/items/edit/:id",
        component: () => import("../views/items/Create.vue"),
        props: true,
      },
      {
        path: "/items",
        component: () => import("../views/items/List.vue"),
      },
      // Items End

      {
        path: "/heroes/create",
        component: () => import("../views/heroes/Create.vue"),
      },
      {
        path: "/heroes/edit/:id",
        component: () => import("../views/heroes/Create.vue"),
        props: true,
      },
      {
        path: "/heroes",
        component: () => import("../views/heroes/List.vue"),
      },
      //Heroes End

      {
        path: "/articles/create",
        component: () => import("../views/articles/Create.vue"),
      },
      {
        path: "/articles/edit/:id",
        component: () => import("../views/articles/Create.vue"),
        props: true,
      },
      {
        path: "/articles",
        component: () => import("../views/articles/List.vue"),
      },
      //Articles End

      {
        path: "/ads/create",
        component: () => import("../views/ads/Create.vue"),
      },
      {
        path: "/ads/edit/:id",
        component: () => import("../views/ads/Create.vue"),
        props: true,
      },
      {
        path: "/ads",
        component: () => import("../views/ads/List.vue"),
      },
      //Ads End

      {
        path: "/admins/create",
        component: () => import("../views/admins/Create.vue"),
      },
      {
        path: "/admins/edit/:id",
        component: () => import("../views/admins/Create.vue"),
        props: true,
      },
      {
        path: "/admins",
        component: () => import("../views/admins/List.vue"),
      },
      //Admins End
    ],
  }]
})

router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next();
})

export default router;

// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

// Import komponen yang akan digunakan di rute
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ResepKu from './components/ResepKu.vue';
import RecipeForm from './components/RecipeForm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home,
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  { 
    path: '/home/admin', 
    name: 'AdminHome', 
    component: Home, 
    props: { role: 'admin' } 
  },
  { 
    path: '/home/author', 
    name: 'AuthorHome', 
    component: Home, 
    props: { role: 'author' } 
  },
  {
    path: '/resepku',
    name: 'ResepKu',
    component: ResepKu,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user')); // Check if the user is logged in
      if (user) {
        next(); // Allow access if logged in
      } else {
        // Prompt if not logged in
        if (confirm("You need to log in to access your recipes. Would you like to log in now?")) {
          next('/login'); // Redirect to login page
        } else {
          next('/'); // Redirect to home page if user chooses not to log in
        }
      }
    }
  },
  {
    path: '/add-recipe', // Ensure this route exists
    name: 'AddRecipe',
    component: RecipeForm,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

<template>
  <nav class="w-full bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo and Navigation Links -->
        <div class="flex">
          <!-- Logo -->
          <div class="md:flex">
            <a href="#" class="flex items-center">
              <span class="ml-2 text-lg font-semibold text-indigo-600">Masak Yuk</span>
            </a>
          </div>
          <!-- Navigation Links -->
          <div class="hidden md:flex md:ml-6 md:space-x-8">
            <router-link
              to="/"
              class="text-gray-900 hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Home
            </router-link>
            <a
              href="#"
              class="text-gray-900 hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              About
            </a>
            <a
              href="#"
              @click.prevent="handleResepKuClick"
              class="text-gray-900 hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              ResepKu
            </a>
            <a
              href="#"
              class="text-gray-900 hover:text-indigo-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Contact
            </a>
          </div>
        </div>

        <!-- Login/Logout Button -->
        <div class="flex items-center">
          <router-link v-if="!isLoggedIn" to="/login" class="text-sm font-semibold text-gray-900 hover:text-indigo-600">
            Log in <span aria-hidden="true">&rarr;</span>
          </router-link>
          <router-link v-else to="/" @click.native="handleLogout" class="text-sm font-semibold text-gray-900 hover:text-indigo-600 bg-transparent">
            Logout <span aria-hidden="true">&larr;</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>

  <!-- Bagian Background Gambar di Atas -->
  <div class="home-background">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
      <h1 class="text-5xl font-bold text-white">Welcome to Masak Yuk</h1>
      <p class="mt-2 text-lg text-white">
        Explore our collection of delicious recipes!
      </p>
    </div>
  </div>

  <!-- Main Content di Bawah Background -->
  <div class="main-content py-10">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Recipe Collection</h2>

      <div class="mb-6 flex">
        <input
          type="text"
          v-model="searchQuery"
          @input="filterRecipes"
          placeholder="Search for recipes..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          @click="filterRecipes"
          class="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Search
        </button>
      </div>

      <!-- Recipe Grid -->
      <div class="recipe-grid">
        <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
          <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
          <h3 class="recipe-title">{{ recipe.title }}</h3>
          <p>Preparation time: {{ recipe.readyInMinutes }} minutes</p>
          <p>Number of servings: {{ recipe.servings }}</p>
          <a :href="'https://spoonacular.com/recipes/' + recipe.title.replace(/\s+/g, '-') + '-' + recipe.id" target="_blank" class="recipe-link">Go to Recipe</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  inheritAttrs: false,
  data() {
    return {
      recipes: [],
      searchQuery: "", 
      filteredRecipes: [],
      isLoggedIn: false
    };
  },
  mounted() {
    this.checkLoginStatus();
    this.fetchRecipes();
  },
  methods: {
     // Check if the user is logged in
     checkLoginStatus() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.isLoggedIn = user ? true : false;
    },

    async fetchRecipes() {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
          params: {
            number: 20, // jumlah resep yang ditampilkan
            apiKey: "7cfa6262a29f4f30989581822849929f" 
          }
        });
        this.recipes = response.data.recipes;
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },

    // Handle ResepKu click
    handleResepKuClick() {
      if (this.isLoggedIn) {
        this.$router.push('/resepku');
      } else {
        if (confirm("You need to log in to access your recipes. Would you like to log in now?")) {
          this.$router.push('/login');
        } else {
          this.$router.push('/');
        }
      }
    },

    // Handle logout action
    handleLogout() {
      localStorage.removeItem('user'); // Remove user from localStorage
      this.isLoggedIn = false; // Update login status
      this.$router.push('/'); // Redirect to home page
    }
  }
};
</script>

<style scoped>
.home-background {
  background-image: url('../assets/background-makanan.jpg');
  background-size: contain; 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 600px; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-content {
  background-color: white;
}
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.recipe-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.recipe-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.recipe-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.recipe-link {
  color: #6366f1;
  text-decoration: underline;
}
</style>


<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">My Recipes</h1>
  
      <div v-if="savedRecipes.length">
        <div class="recipe-grid">
          <div v-for="recipe in savedRecipes" :key="recipe.id" class="recipe-card">
            <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
            <h3 class="recipe-title">{{ recipe.title }}</h3>
            <p>Preparation time: {{ recipe.readyInMinutes }} minutes</p>
            <p>Number of servings: {{ recipe.servings }}</p>
            <a :href="'https://spoonacular.com/recipes/' + recipe.title.replace(/\s+/g, '-') + '-' + recipe.id" target="_blank" class="recipe-link">Go to Recipe</a>
          </div>
        </div>
      </div>
      
      <div v-else>
        <p class="text-lg text-gray-700">You don't have your own recipe yet. Add your recipe by clicking the plus button on the bottom right.</p>
      </div>
  
      <!-- Plus Icon Button -->
      <button @click="addRecipe" class="plus-button">
        +
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ResepKu",
    data() {
      return {
        savedRecipes: []
      };
    },
    mounted() {
      this.fetchSavedRecipes();
    },
    methods: {
      // Fetch saved recipes from localStorage or backend API
      fetchSavedRecipes() {
        // Example: Assuming recipes are saved in localStorage
        const recipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
        this.savedRecipes = recipes;
      },
      // Function to add a recipe
      addRecipe() {
        this.$router.push('/add-recipe'); // Replace with your route to add a recipe page
      }
    }
  };
  </script>
  
  <style scoped>
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
  
  .plus-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: #6366f1;
    color: white;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .plus-button:hover {
    background-color: #4f46e5;
  }
  </style>
  
<template>
    <div class="recipe-form">
      <h2>Add New Recipe</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Recipe Title</label>
          <input type="text" id="title" v-model="recipe.title" required />
        </div>
  
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="recipe.description" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="servings">Servings</label>
          <input type="number" id="servings" v-model="recipe.servings" required />
        </div>
  
        <div class="form-group">
          <label for="prepTime">Prep  (minute)</label>
          <input type="text" id="prepTime" v-model="recipe.prepTime" required />
        </div>
  
        <div class="form-group">
          <label for="cookTime">Cook Time (minute)</label>
          <input type="text" id="cookTime" v-model="recipe.cookTime" required />
        </div>
  
        <div class="form-group">
          <label for="totalTime">Total Time (minute)</label>
          <input type="text" id="totalTime" v-model="recipe.totalTime" required />
        </div>
  
        <div class="form-group">
          <label for="image">Image</label>
          <input type="file" id="image" @change="handleImageUpload" />
        </div>
  
        <div class="form-action">
          <button type="submit" class="submit-btn">Submit Recipe</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        recipe: {
          title: '',
          description: '',
          servings: 0,
          prepTime: '',
          cookTime: '',
          totalTime: '',
          image: null,
        },
      };
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.recipe.image = file;
        }
      },
      async submitForm() {
        try {
            // Get the user's email from localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.email) {
                alert('User not logged in!');
                return;
            }

            // Prepare the form data for submission
            const formData = new FormData();
            formData.append('title', this.recipe.title);
            formData.append('description', this.recipe.description);
            formData.append('servings', this.recipe.servings);
            formData.append('prepTime', this.recipe.prepTime);
            formData.append('cookTime', this.recipe.cookTime);
            formData.append('totalTime', this.recipe.totalTime);
            formData.append('email', user.email);  // Pass the email of the logged-in user
            
            if (this.recipe.image) {
                formData.append('image', this.recipe.image);  // Assuming you're sending the image as a file
            }

            // Send the POST request to the backend
            const response = await axios.post('http://localhost:8080/api/add-recipe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Recipe submitted:', response.data);
            this.$router.push('/resepku');  // Redirect to the recipe list page
        } catch (error) {
            console.error('Error submitting recipe:', error);
            alert('Failed to submit recipe');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .recipe-form {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-size: 16px;
    color: #555;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .form-group textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .form-group input[type="file"] {
    padding: 5px;
  }
  
  .form-action {
    text-align: center;
  }
  
  .submit-btn {
    width: 100%;
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-btn:hover {
    background-color: #45a049;
  }
  
  .submit-btn:active {
    background-color: #388e3c;
  }
  
  @media (max-width: 600px) {
    .recipe-form {
      padding: 15px;
    }
    h2 {
      font-size: 20px;
    }
    .submit-btn {
      font-size: 16px;
    }
  }
  </style>
  
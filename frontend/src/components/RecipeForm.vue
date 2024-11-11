<template>
  <div class="recipe-form">
    <h2>Add New Recipe</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Recipe Title</label>
        <input 
          type="text" 
          id="title" 
          v-model.trim="recipe.title" 
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea 
          id="description" 
          v-model.trim="recipe.description" 
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="servings">Servings</label>
        <input 
          type="number" 
          id="servings" 
          v-model.number="recipe.servings" 
          min="1" 
          required
        />
      </div>

      <div class="form-group">
        <label for="prepTime">Prep Time (minutes)</label>
        <input 
          type="number" 
          id="prepTime" 
          v-model.number="recipe.prepTime" 
          min="0" 
          required
        />
      </div>

      <div class="form-group">
        <label for="cookTime">Cook Time (minutes)</label>
        <input 
          type="number" 
          id="cookTime" 
          v-model.number="recipe.cookTime" 
          min="0" 
          required
        />
      </div>

      <div class="form-group">
        <label for="totalTime">Total Time (minutes)</label>
        <input 
          type="number" 
          id="totalTime" 
          v-model.number="recipe.totalTime" 
          min="0" 
          required
          :readonly="true"
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <input 
          type="file" 
          id="image" 
          @change="handleImageUpload" 
          accept="image/*"
        />
      </div>

      <div class="form-action">
        <button 
          type="submit" 
          class="submit-btn"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit Recipe' }}
        </button>
      </div>

      <!-- Debug info -->
      <pre v-if="debug">{{ debugInfo }}</pre>
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
        servings: 1,
        prepTime: '',
        cookTime: '',
        totalTime: '',
        image: null,
      },
      isSubmitting: false,
      debug: true,
      debugInfo: null
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          alert('Please upload an image file');
          event.target.value = '';
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size should be less than 5MB');
          event.target.value = '';
          return;
        }
        this.recipe.image = file;
      }
    },
    updateTotalTime() {
      const prep = parseInt(this.recipe.prepTime) || 0;
      const cook = parseInt(this.recipe.cookTime) || 0;
      this.recipe.totalTime = prep + cook;
    },
    async submitForm() {
      // Debugging the data
      console.log("Title: ", this.recipe.title);
      
      try {
        this.isSubmitting = true;

        // Get logged-in user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.email) {
          throw new Error('User not logged in!');
        }

        const formData = new FormData();
        
        // Add recipe data
        formData.append("title", this.recipe.title);
        formData.append("description", this.recipe.description);
        formData.append("servings", this.recipe.servings);
        formData.append("prepTime", this.recipe.prepTime);
        formData.append("cookTime", this.recipe.cookTime);
        formData.append("totalTime", this.recipe.totalTime);
        formData.append("email", user.email); // Use logged-in user's email

        // Handle image (either file or URL)
        if (this.recipe.image instanceof File) {
          // Image is a file, append it as a file
          formData.append('image', this.recipe.image);
        } else if (typeof this.recipe.image === 'string') {
          // Image is a URL, append it as a string
          formData.append('image', this.recipe.image);
        }

        // Debug info
        this.debugInfo = {
          formData: Object.fromEntries(formData.entries()), // Convert formData to object for debugging
          email: user.email // Display the email of logged-in user
        };

        // Submit form to the API
        const response = await axios.post(
          'http://localhost:8080/api/add-recipe',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            timeout: 30000,
          }
        );

        const newRecipe = response.data.recipe;

        // Add the new recipe to localStorage (if using localStorage)
        let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
        savedRecipes.push(newRecipe);
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));

        console.log('Response:', response.data);
        this.$router.push('/resepku');
        this.$emit('add-recipe', newRecipe);
      } catch (error) {
        console.error('Error:', error);
        alert(error.response?.data?.message || error.message);
      } finally {
        this.isSubmitting = false;
      }
    }
  },
  watch: {
    'recipe.prepTime'() {
      this.updateTotalTime();
    },
    'recipe.cookTime'() {
      this.updateTotalTime();
    }
  }
};
</script>

  
  <style scoped>
  .debug-panel {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.debug-panel pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
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
  
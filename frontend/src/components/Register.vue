<template>
  <div class="max-w-md mx-auto mt-40">
    <h1 class="text-3xl font-bold text-gray-900">Register</h1>
    <p class="mt-4 text-gray-600">Isi form di bawah untuk mendaftar.</p>
    
    <!-- Form pendaftaran -->
    <form @submit.prevent="submitForm" class="mt-6 space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Username</label>
        <input 
          v-model="form.username" 
          type="text" 
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md" 
          placeholder="Masukkan username" 
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input 
          v-model="form.email" 
          type="email" 
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md" 
          placeholder="Masukkan email" 
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input 
          v-model="form.password" 
          type="password" 
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md" 
          placeholder="Masukkan password" 
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Role</label>
        <select 
          v-model="form.role" 
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md"
        >
          <option value="" disabled>Pilih Role</option>
          <option value="admin">Admin</option>
          <option value="author">Author</option>
          <!-- <option value="guest">Guest</option> -->
        </select>
        <!-- Debugging helper -->
        <span class="text-sm text-gray-500 mt-1">Selected role: {{ form.role }}</span>
      </div>

      <!-- Error message display -->
      <div v-if="error" class="text-red-600 text-sm">
        {{ error }}
      </div>
      
      <div>
        <button 
          type="submit" 
          :disabled="!isFormValid"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        role: "", // Initialize with empty string
      },
      error: null,
    };
  },
  computed: {
    isFormValid() {
      return this.form.username && 
             this.form.email && 
             this.form.password && 
             this.form.role;
    }
  },
  methods: {
    async submitForm() {
      try {
        this.error = null;
        
        // Log form data before sending
        console.log('Sending form data:', this.form);
        
        const response = await axios.post(
          "http://localhost:8080/api/register", 
          this.form,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log("Response data:", response.data);
        
        // Show success message
        alert("Registrasi berhasil!");
        
        // Redirect to home
        this.$router.push({ name: 'Home' });
      } catch (error) {
        console.error("Registration error:", error);
        this.error = error.response?.data?.message || "Terjadi kesalahan saat registrasi";
      }
    }
  }
};
</script>
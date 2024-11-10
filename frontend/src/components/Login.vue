<template>
  <div class="max-w-md mx-auto mt-20 sm:mt-32 lg:mt-40 px-4">
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Login</h1>
    <p class="mt-4 text-gray-600 text-sm sm:text-base">Masukkan kredensial Anda untuk login.</p>

    <form @submit.prevent="submitForm" class="mt-6 space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input 
          v-model="form.email" 
          type="email" 
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md text-sm sm:text-base" 
          placeholder="Masukkan email" 
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input 
          v-model="form.password" 
          type="password" 
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md text-sm sm:text-base" 
          placeholder="Masukkan password" 
        />
      </div>

      <div v-if="error" class="text-red-600 text-sm">
        {{ error }}
      </div>

      <div>
        <button 
          type="submit" 
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-sm sm:text-base"
        >
          Login
        </button>
      </div>

      <div class="text-center mt-4">
        <router-link 
          to="/register" 
          class="text-indigo-600 hover:text-indigo-800 text-sm sm:text-base"
        >
          Belum punya akun? Daftar di sini
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    async submitForm() {
      try {
        this.error = null;
        
        // Mengirim data ke backend untuk autentikasi
        const response = await axios.post('http://localhost:8080/api/login', this.form);
        console.log(response.data);
        const user = response.data.user;

        if (!user) {
          throw new Error('User data not found in the response');
        }

        // Menyimpan data user ke localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect berdasarkan peran
        if (user.role === 'admin') {
          this.$router.push({ path: `/home/admin` });
        } else if (user.role === 'author') {
          this.$router.push({ path: `/home/author` });
        } else {
          this.$router.push({ path: `/home` });
        }
        
      } catch (error) {
        console.error('Login error:', error);
        this.error = error.response?.data?.message || 'Terjadi kesalahan saat login';
      }
    }
  }
};
</script>

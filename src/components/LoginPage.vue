<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-indigo-600 text-white text-center p-6">
        <div class="flex justify-center mb-3 text-3xl font-bold">+</div>
        <h1 class="text-xl font-bold">Welcome To Impact360</h1>
        <p class="text-indigo-200">Sign in to your account</p>
      </div>

      <!-- Form -->
      <div class="p-6">
        <div v-if="authError" class="bg-red-100 text-red-700 p-3 rounded mb-4" role="alert">
          {{ authError }}
        </div>

        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="loginForm.email"
              :class="[
                'w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400',
                {
                  'border-red-500': emailError && loginForm.email,
                },
              ]"
              placeholder="you@example.com"
              autocomplete="email"
              required
            />
            <p v-if="emailError && loginForm.email" class="text-red-500 text-sm mt-1">
              {{ emailError }}
            </p>
          </div>

          <!-- Password -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-1">
              <label for="password" class="text-sm font-medium text-gray-700">Password</label>
              <router-link to="/forgot-password" class="text-sm text-indigo-600 hover:underline"
                >Forgot password?</router-link
              >
            </div>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="loginForm.password"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center mb-4">
            <input
              type="checkbox"
              id="remember"
              v-model="loginForm.remember"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label for="remember" class="ml-2 block text-sm text-gray-700">Remember me</label>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="animate-spin mr-2">⏳</span>
            <span>{{ isLoading ? 'Signing in...' : 'Sign in' }}</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center my-6">
          <div class="flex-grow h-px bg-gray-300"></div>
          <span class="mx-3 text-sm text-gray-500">Or continue with</span>
          <div class="flex-grow h-px bg-gray-300"></div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <button
            @click="socialLogin('google')"
            class="flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span class="mr-2">🔍</span> Google
          </button>
          <button
            @click="socialLogin('github')"
            class="flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span class="mr-2">🐱</span> GitHub
          </button>
        </div>

        <!-- Footer -->
        <div class="text-center text-sm text-gray-600">
          Don't have an account?
          <router-link to="/register" class="text-indigo-600 hover:underline"
            >Create one</router-link
          >
        </div>
      </div>
    </div>
    <div class="absolute bottom-2 right-4 text-xs text-gray-500">v1.0.0</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../store'

const auth = useAuthStore()

const showPassword = ref(false)
const loginForm = ref({
  email: '',
  password: '',
  remember: false,
})

const isLoading = computed(() => auth.loading)
const authError = computed(() => auth.error)

const emailError = computed(() => {
  if (loginForm.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.value.email)) {
    return 'Please enter a valid email address'
  }
  return ''
})

const handleLogin = async () => {
  await auth.signIn(loginForm.value.email, loginForm.value.password, loginForm.value.remember)
}

const socialLogin = async (provider) => {
  await auth.signInWithOAuth(provider)
}
</script>

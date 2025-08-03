<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 relative">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-indigo-600 text-white text-center p-6">
        <div class="text-3xl font-bold">Impact360</div>
        <p class="text-indigo-200 text-sm">Create a new account</p>
      </div>

      <!-- Form -->
      <div class="p-6">
        <div v-if="authError" class="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
          {{ authError }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              v-model="registerForm.name"
              type="text"
              id="name"
              required
              autocomplete="name"
              placeholder="John Doe"
              class="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              v-model="registerForm.email"
              type="email"
              id="email"
              required
              autocomplete="email"
              :class="[baseInput, emailError ? 'border-red-500' : '']"
              placeholder="you@example.com"
            />
            <p v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="registerForm.password"
                id="password"
                autocomplete="new-password"
                placeholder="••••••••"
                :class="[baseInput, passwordError ? 'border-red-500' : '']"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <p v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</p>
            <div v-if="registerForm.password" class="mt-2">
              <div class="text-xs text-gray-500">Password strength:</div>
              <div class="w-full h-1 bg-gray-200 rounded mt-1">
                <div
                  :style="{
                    width: passwordStrength.percentage + '%',
                    backgroundColor: passwordStrength.color,
                  }"
                  class="h-full rounded"
                ></div>
              </div>
              <p class="text-xs font-medium mt-1" :style="{ color: passwordStrength.color }">
                {{ passwordStrength.label }}
              </p>
            </div>
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700"
              >Confirm Password</label
            >
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="registerForm.confirmPassword"
                id="confirm-password"
                autocomplete="new-password"
                placeholder="••••••••"
                :class="[baseInput, passwordConfirmError ? 'border-red-500' : '']"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {{ showConfirmPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <p v-if="passwordConfirmError" class="text-red-500 text-xs mt-1">
              {{ passwordConfirmError }}
            </p>
          </div>

          <div class="flex items-center text-sm">
            <input
              type="checkbox"
              id="terms"
              v-model="registerForm.terms"
              class="mr-2 text-indigo-600 border-gray-300 rounded"
            />
            <label for="terms">
              I agree to the
              <a href="#" class="text-indigo-600 hover:underline">Terms of Service</a> and
              <a href="#" class="text-indigo-600 hover:underline">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            class="w-full flex justify-center items-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
            :disabled="isLoading || !registerForm.terms"
          >
            <span v-if="isLoading">Creating account...</span>
            <span v-else>Create account</span>
          </button>
        </form>

        <div class="my-6 text-center text-sm text-gray-500 relative">
          <span class="absolute inset-x-0 top-1/2 border-t border-gray-200"></span>
          <span class="bg-white px-2 relative z-10">Or continue with</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            @click="socialLogin('google')"
            class="border rounded-md py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Google
          </button>
          <button
            @click="socialLogin('github')"
            class="border rounded-md py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            GitHub
          </button>
        </div>

        <p class="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <router-link to="/login" class="text-indigo-600 hover:underline font-medium"
            >Sign in</router-link
          >
        </p>
      </div>

      <div class="absolute bottom-2 right-4 text-xs text-gray-400">v1.0.0</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store'

// Store & Router
const router = useRouter()
const auth = useAuthStore()

// Reactive state
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Get loading and error directly from Pinia store
const isLoading = computed(() => auth.loading)
const authError = computed(() => auth.error)

// Validations
const emailError = computed(() => {
  const val = registerForm.value.email
  return val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? 'Please enter a valid email address' : ''
})

const passwordError = computed(() => {
  const val = registerForm.value.password
  return val && val.length < 8 ? 'Password must be at least 8 characters' : ''
})

const passwordConfirmError = computed(() => {
  return registerForm.value.confirmPassword &&
    registerForm.value.confirmPassword !== registerForm.value.password
    ? 'Passwords do not match'
    : ''
})

const passwordStrength = computed(() => {
  const p = registerForm.value.password
  let score = 0
  if (!p) return { percentage: 0, color: '#d1d5db', label: 'None' }
  if (p.length > 7) score += 25
  if (/[A-Z]/.test(p)) score += 25
  if (/[0-9]/.test(p)) score += 25
  if (/[^A-Za-z0-9]/.test(p)) score += 25

  if (score <= 25) return { percentage: 25, color: '#ef4444', label: 'Weak' }
  if (score <= 50) return { percentage: 50, color: '#f59e0b', label: 'Fair' }
  if (score <= 75) return { percentage: 75, color: '#3b82f6', label: 'Good' }
  return { percentage: 100, color: '#10b981', label: 'Strong' }
})

// Form submission handler
const handleRegister = async () => {
  if (emailError.value || passwordError.value || passwordConfirmError.value) return

  if (!registerForm.value.name) {
    auth.error = 'Full name is required'
    return
  }

  if (!registerForm.value.terms) {
    auth.error = 'Please agree to the terms.'
    return
  }

  try {
    await auth.signUp(
      registerForm.value.email,
      registerForm.value.password,
      registerForm.value.name,
    )
    router.push('/ticket')
  } catch (err) {
    console.error('Registration error:', err)
  }
}

// Social login handler
const socialLogin = async (provider) => {
  try {
    await auth.signInWithOAuth(provider)
  } catch (err) {
    auth.error = err.message || `Failed to sign in with ${provider}`
  }
}

// Reusable input class
const baseInput =
  'mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none'
</script>

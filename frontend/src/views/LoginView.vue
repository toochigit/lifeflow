<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        pass: password.value,
      }),
    })

    const data = await response.json()

    if (data.access_token) {
      authStore.setToken(data.access_token)
      router.push('/tasks')
      alert('Connexion réussie !')
      // router.push('/tasks') // On ira là après
    } else {
      alert('Erreur: ' + (data.message || 'Identifiants incorrects'))
    }
  } catch (error) {
    alert('Le serveur NestJS ne répond pas. Est-il allumé sur le port 3000 ?')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div class="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
      <h2 class="text-3xl font-extrabold text-center text-white mb-8">
        LifeFlow <span class="text-blue-500">Vue</span>
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            required
            class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02]"
        >
          Se connecter
        </button>
      </form>
      <p class="mt-6 text-center text-gray-400">
        Pas encore de compte ?
        <router-link to="/register" class="text-blue-500 hover:underline">S'inscrire</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const handleRegister = async () => {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      alert('Compte créé avec succès ! Connecte-toi maintenant.')
      router.push('/') // Redirection vers le login
    } else {
      // Affiche l'erreur du backend (ex: mot de passe trop court)
      alert('Erreur: ' + (Array.isArray(data.message) ? data.message.join(', ') : data.message))
    }
  } catch (error) {
    alert('Le serveur ne répond pas. Vérifie ton backend NestJS !')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div class="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
      <h2 class="text-3xl font-extrabold text-center text-white mb-8">
        Rejoindre <span class="text-green-500">LifeFlow</span>
      </h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="flex gap-4">
          <input
            v-model="firstName"
            type="text"
            placeholder="Prénom"
            required
            class="w-1/2 px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
          />
          <input
            v-model="lastName"
            type="text"
            placeholder="Nom"
            required
            class="w-1/2 px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
          />
        </div>

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe (8+ caractères)"
          required
          class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
        />

        <button
          type="submit"
          class="w-full py-3 px-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02]"
        >
          Créer mon compte
        </button>
      </form>

      <p class="mt-6 text-center text-gray-400">
        Déjà un compte ?
        <router-link to="/" class="text-green-500 hover:underline">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

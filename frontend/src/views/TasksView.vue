<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const tasks = ref<any[]>([])
const newTaskTitle = ref('')
const newTaskDesc = ref('')
const authStore = useAuthStore()

// 1. Charger les tâches
const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:3000/tasks', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    tasks.value = await response.json()
  } catch (error) {
    console.error('Erreur fetch:', error)
  }
}

// 2. Créer une nouvelle tâche
const addTask = async () => {
  if (!newTaskTitle.value) return

  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({
        title: newTaskTitle.value,
        description: newTaskDesc.value,
      }),
    })

    if (response.ok) {
      newTaskTitle.value = '' // On vide les champs
      newTaskDesc.value = ''
      await fetchTasks() // On rafraîchit la liste
    }
  } catch (error) {
    alert('Erreur lors de la création')
  }
}

onMounted(fetchTasks)
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-blue-400">Mes Tâches LifeFlow</h1>
        <button
          @click="
            authStore.logout();
            $router.push('/')
          "
          class="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition"
        >
          Déconnexion
        </button>
      </div>

      <form
        @submit.prevent="addTask"
        class="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8 space-y-4"
      >
        <h2 class="text-xl font-semibold mb-2">Nouvelle tâche</h2>
        <div class="flex flex-col md:flex-row gap-4">
          <input
            v-model="newTaskTitle"
            placeholder="Titre de la tâche"
            required
            class="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            v-model="newTaskDesc"
            placeholder="Description (optionnel)"
            class="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold transition"
          >
            Ajouter
          </button>
        </div>
      </form>

      <div class="flex flex-col gap-4">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="p-4 bg-gray-800 rounded-lg border border-gray-700 flex justify-between items-center hover:border-blue-500 transition"
        >
          <template v-if="task && task.title">
            <div>
              <h3 class="font-bold text-lg text-white">{{ task.title }}</h3>
              <p class="text-gray-400 text-sm">{{ task.description }}</p>
            </div>
            <div class="flex items-center gap-4">
              <span
                :class="task.status === 'DONE' ? 'text-green-400' : 'text-yellow-400'"
                class="font-mono text-sm uppercase"
              >
                {{ task.status }}
              </span>
              <button @click="deleteTask(task.id)" class="text-gray-500 hover:text-red-500">
                🗑️
              </button>
            </div>
          </template>

          <div v-else class="text-red-500 text-xs italic">
            Donnée corrompue détectée (ID: {{ task.id || 'Inconnu' }})
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

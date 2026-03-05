<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const tasks = ref<any[]>([])
const authStore = useAuthStore()

const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:3000/tasks', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    tasks.value = await response.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches', error)
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
          class="text-sm bg-red-600 px-3 py-1 rounded"
        >
          Déconnexion
        </button>
      </div>

      <div class="grid gap-4">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="p-4 bg-gray-800 rounded-lg border border-gray-700 flex justify-between items-center"
        >
          <div>
            <h3 class="font-bold text-lg">{{ task.title }}</h3>
            <p class="text-gray-400 text-sm">{{ task.description }}</p>
          </div>
          <span :class="task.status === 'DONE' ? 'text-green-400' : 'text-yellow-400'">
            {{ task.status }}
          </span>
        </div>

        <div v-if="tasks.length === 0" class="text-center text-gray-500 mt-10">
          Aucune tâche trouvée. Il est temps d'en créer une !
        </div>
      </div>
    </div>
  </div>
</template>

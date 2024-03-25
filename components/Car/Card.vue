<script setup>
import heartFilled from '@/public/assets/heartFilled.png'
import heartOutline from '@/public/assets/heartOutline.png'
const props = defineProps({
  car:Object,
  favored: Boolean
})
const emit = defineEmits(['favor'])
const config = useRuntimeConfig()
</script>
<template>
     <div class="relative shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px]">
         <img :src="favored ? heartFilled : heartOutline" class="absolute w-5 right-3 top-2 z-20" @click="emit('favor', car?.id)" alt="favored">
          <div class="flex h-full" @click="navigateTo(`/car/${car.name}-${car.id}`)">
            <NuxtImg :src="`${config.public.supabase.url}/storage/v1/object/public/image/${car.image}`" alt="car" class="w-[280px] h-full"/>
            <div class="p-4 flex flex-col overflow-auto">
              <div>
                <h1 class="text-2xl text-blue-700 mt-2">{{ car.name }}</h1>
                <p class="text-gray-700">
                  {{ car.description }}
                </p>
              </div>
              <h1 class="mt-auto text-xl">${{ car.price }}</h1>
            </div>
          </div>
        </div>
</template>

<style>
</style>
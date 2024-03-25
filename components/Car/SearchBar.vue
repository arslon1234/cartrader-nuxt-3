<script setup>
const city = ref("")
const handleSearch =()=>{
    if(city.value){
        navigateTo(`/city/${city.value}/car`)
    }
}
</script>

<template>
    <div class="font-serif w-[1000px] text-2xl rounded-full bg-white flex justify-between overflow-hidden drop-shadow-2xl mx-auto">
          <input type="text" v-model="city" placeholder="Search by city..." class="py-3 px-5 w-full text-2xl rounded-full focus:outline-none">
          <button class="bg-sky-500 px-10 text-white" @click="handleSearch">Search</button>
    </div>
</template>
<template>
    <div v-if="cars.length">
       <CarCards :cars="cars"/>
    </div>
    <h1 v-else class="text-red-500 text-3xl">Not Found Card with Filters</h1>
</template>

<script setup>
const route = useRoute()
const {data:cars, refresh} = await useFetchCars(route.params.city, {
    minPrice: route.params.minPrice,
    maxPrice: route.params.maxPrice,
    make: route.params.make,
})
watch(()=>route.query, ()=>{
    window.location.reload()
})
</script>
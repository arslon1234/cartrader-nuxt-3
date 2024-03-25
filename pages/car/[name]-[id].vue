<script setup>
const route = useRoute()
const {toTitleCase} = useUtilities()
const {data: car} = await useFetchCar(route.params.id)
useHead({
    title: toTitleCase(route.params.name)
})
definePageMeta({
    layout: 'custom'
})

if(!car.value){
    throw createError({
        statusCode: 404,
        message: `Car with ID of ${route.params.id} does not exist`
    })
}
</script>
<template>
    <div>
        <CarDetailHero :car="car"/>
        <CarDetailAttributes :features="car.features"/>
        <CarDetailDescription :description="car.description"/>
        <CarDetailContact/>
    </div>
</template>
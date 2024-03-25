<template>
    <div class="flex justify-between mt-24 items-center">
        <h1>My Listings</h1>
        <NuxtLink to="/profile/listings/create" class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer">
            +
        </NuxtLink>
    </div>
    <div class="rounded shadow p-3 mt-5">
        <CarListingCard v-for="listing in listings" :key="listing.id" :listing="listing" @delete-click="handleDelete"/>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "custom"
})
const user = useSupabaseUser()
const {data: listings} = await useFetch(`/api/car/listings/user/${user.value.id}`)

const handleDelete =async(id)=>{
    await $fetch(`/api/car/listings/${id}`,{
        method: "delete"
    })
    listings.value = listings.value.filter(listing => listing.id !== id)
}
</script>

<style lang="scss" scoped>

</style>
<script setup lang="ts">
const {makes} = useCars()
const modal = ref({
  make: false,
  location: false,
  price: false
})
const route = useRoute()
const router = useRouter()
const city = ref("")
const priceRange = ref({
  min: "",
  max:""
})
const updateModal =(key:keyof typeof modal.value)=>{
  modal.value[key] = !modal.value[key]
}
const onChangeLocation =()=>{
  if(!city.value) return;
  if(!isNaN(parseInt(city.value))){
    throw createError({
      statusCode: 404,
      message: "Invalid city format"
    })
  }
  updateModal("location")
  navigateTo(`/city/${city.value}/car/${route.params.make}`)
}
const onChangeMake =(make:string)=>{
  updateModal("make")
  navigateTo(`/city/${route.params.city}/car/${make}`)
}
const priceRangeText = computed(()=>{
  const minPrice = route.query.minPrice
  const maxPrice = route.query.maxPrice
  if(!minPrice && !maxPrice) return "Any"
  else if(!minPrice && maxPrice){
    return `< ${maxPrice}`
  }
  else if(minPrice && !maxPrice){
    return `> ${maxPrice}`
  }else {
    return `$${minPrice}-$${maxPrice}`
  }
})
const onChangePrice =()=>{
  updateModal('price')
  if(priceRange.value.min && priceRange.value.max){
    if(priceRange.value.min > priceRange.value.max) return;
  }
  router.push({
    query:{
      minPrice: priceRange.value.min,
      maxPrice: priceRange.value.max
    }
  })
}
</script>
<template>
    <div class="shadow border w-64 mr-10 z-30 h-[190px]">
        <!-- LOCATION START -->
        <div class="p-5 flex gap-4 justify-between relative cursor-pointer border-b">
          <h3>Location</h3>
          <h3 @click="updateModal('location')" class="text-blue-400 capitalize">
            {{ route.params.city }}
          </h3>
           <div v-if="modal.location" class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white">
            <input type="text" v-model="city" class="border p-1 rounded">
            <button @click="onChangeLocation" class="bg-blue-400 w-full mt-2 rounded text-white p-1">Apply</button>
          </div>
        </div>
        <!-- LOCATION END -->
        <!-- MAKE START -->
        <div class="p-5 flex gap-4 justify-between relative cursor-pointer border-b">
          <h3>Make</h3>
          <h3 class="text-blue-400 capitalize" @click="updateModal('make')">
          {{ route.params.make || "Any" }}
          </h3>
          <div v-if="modal.make" class="absolute border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white">
            <h4 v-for="make in makes" :key="make" class="w-1/3" @click="onChangeMake(make)">
              {{ make }}
            </h4>
          </div>
        </div>
        <!-- MAKE END -->
        <!-- PRICE START -->
        <div class="p-5 flex gap-4 justify-between relative cursor-pointer border-b">
          <h3>Price</h3>
          <h3 @click="updateModal('price')" class="text-blue-400 capitalize">{{ priceRangeText }}</h3>
          <div v-if="modal.price" class="absolute shadow border left-56 p-5 top-1 -m-1 bg-white">
            <input type="number" class="border p-1 rounded" placeholder="Min" v-model="priceRange.min">
            <input type="number" class="border p-1 rounded" placeholder="Max" v-model="priceRange.max">
            <button class="bg-blue-400 w-full mt-2 rounded text-white p-1" @click="onChangePrice">Apply</button>
          </div>
        </div>
        <!-- PRICE END -->
      </div>
</template>

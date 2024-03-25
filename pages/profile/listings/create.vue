<template>
    <div>
        <div class="mt-24">
            <h1 class="text-6xl">Create a New Listing</h1>
        </div>
        {{ info.year }}
        <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
            <CarAddSelect title="Make *" :options="makes" name="make" @change-input="onChangeInput"/>
            <CarAddInput
            v-for="input in inputs"
            :key="input.id"
            :title="input.title"
            :name="input.name"
            :placeholder="input.placeholder"
            @change-input="onChangeInput"
            />
            <CarAddTextarea
            title="Description *"
            name="description"
            placeholder=""
            @change-input="onChangeInput"
           />
           <CarAddImage @change-input="onChangeInput" />
           <div>
            <button @click="handleSubmit" class="bg-blue-400 text-white rounded py-2 px-7 mt-3">Submit</button>
            <p v-if="errorMessage" class="mt-3 text-red-400">{{ errorMessage }}</p>
           </div>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    layout: "custom"
})
const {makes} = useCars()

const user = useSupabaseUser()
const supebase = useSupabaseClient()
const info = useState("addInfo",()=>{
    return {
        make:"",
        model:"",
        year:"",
        miles:"",
        price:"",
        seats:"",
        city:"",
        features:"",
        description:"",
        image: null,
    }
})
const onChangeInput =(data, name)=>{
    info.value[name] = data
}
const inputs = [
  {
    id: 1,
    title: "Model *",
    name: "model",
    placeholder: "Civic",
  },
  {
    id: 2,
    title: "Year *",
    name: "year",
    placeholder: "2019",
  },
  {
    id: 3,
    title: "Price *",
    name: "price",
    placeholder: "1000",
  },
  {
    id: 4,
    title: "Miles *",
    name: "miles",
    placeholder: "10000",
  },
  {
    id: 5,
    title: "City *",
    name: "city",
    placeholder: "Austin",
  },
  {
    id: 6,
    title: "Number of Seats *",
    name: "seats",
    placeholder: "5",
  },
  {
    id: 7,
    title: "Features *",
    name: "features",
    placeholder: "Leather Interior, No Accidents",
  },
];
const errorMessage = ref("")
const isButtonDisabled = computed(()=>{
  for(let key in info.value){
    if(!info.value[key]) return true
  };
  return false
})
const handleSubmit =async()=>{
  const fileName = Math.floor(Math.random() * 100000000)
  const {data, error} = await supebase.storage.from("image").upload("public/" + fileName, info.value.image)
  if(error){
    return errorMessage.value = "Cannot upload image"
  }
  const body = {
    ...info.value,
    city: info.value.city.toLowerCase(),
    features: info.value.features.split(", "),
    numberOfSeats: parseInt(info.value.seats),
    miles: parseInt(info.value.miles),
    price: parseInt(info.value.price),
    year: parseInt(info.value.year),
    name: `${info.value.make} ${info.value.model}`,
    listerId: user.value.id,
    image: data.path
  }
  delete body.seats
  try {
    const response =  $fetch("/api/car/listings", {
      method: 'post',
      body
    })
    navigateTo("/profile/listings")
    response.then((res)=>{
      console.log(res.data)
    })
  } catch (error) {
    console.log(error.message,'message')
    errorMessage.value = error.statusMessage
    supebase.storage.from("image").remove(data.path)
  }
}
</script>

<style lang="scss" scoped>

</style>
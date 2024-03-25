<template>
    <div class="w-[48%] flex flex-col mt-2">
        <label for="" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
        <select v-model="state" name="" id="" class="p-2 border w-100 rounded" @change="onChange">
            <option v-for="option in options" :value="option" :key="option">{{ option }}</option>
        </select>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    options: Array,
    name: String
})
const emits = defineEmits(['changeInput'])
const state = ref('')
const onChange =()=>{
emits('changeInput', state.value, props.name)
}

</script>

<style lang="scss" scoped>

</style>
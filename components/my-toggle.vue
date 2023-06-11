<script setup>
import { computed } from 'vue'

const props = defineProps(["modelValue"]);
const emit = defineEmits(['update:modelValue']);

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
});
</script>
<template>
    <label class="relative inline-flex cursor-pointer">
        <input v-model="value" type="checkbox" class="sr-only peer">
        <div class="w-11 h-6 rounded-full peer bg-[#764462] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9304F]"></div>
        <span class="ml-3 text-sm font-medium">
            <slot/>
        </span>
    </label>
</template>
<template>
    <div class="flex flex-col gap-2">
        <label class="block font-semibold">{{ $props.label }}:</label>
        <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="$props.modelValue"
            @change="$emit('update:modelValue', parseInt($event.target.value))"
        >
            <option
                v-for="(item, index) in $props.items"
                :key="index"
                :value="item.id"
            >
                {{item.name}}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    items: PricingRuleItem[]
    modelValue: number | null
    label?: string
}>()

defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()
</script>
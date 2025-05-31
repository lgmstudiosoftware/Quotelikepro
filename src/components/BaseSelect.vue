<template>
    <div class="flex flex-col gap-2">
        <label class="block font-semibold">{{ $props.label }}:</label>
        <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :value="$props.modelValue"
            @change="onChangeMain($event)"
        >
            <option
                v-for="(item, index) in $props.items"
                :key="index"
                :value="item.id"
            >
                {{item.name}}
            </option>
        </select>


        <div v-if="selectedItem?.options?.length" class="flex flex-col gap-2">
            <label class="block font-semibold">Дополнительно:</label>
            <select
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 w-16"
                :value="$props.subValue"
                @change="$emit('update:subValue', parseInt($event.target.value))"
            >
                <option
                    v-for="sub in selectedItem.options"
                    :key="sub.id"
                    :value="sub.id"
                >
                    {{ sub.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    items: PricingRuleItem[]
    modelValue: number | null
    subValue?: number | null
    label?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
    (e: `update:${string}`, value: number | null): void
}>()

const selectedItem = computed(() =>
    props.items.find(item => item.id === props.modelValue) ?? null
)

function onChangeMain(e: Event) {
    const val = parseInt((e.target as HTMLSelectElement).value)

    emit('update:modelValue', val)
    emit('update:subValue', null)
}
</script>
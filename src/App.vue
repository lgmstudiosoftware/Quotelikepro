<template>
    <div class="p-6 max-w-2xl mx-auto">
        <form class="space-y-4">
            <BaseSelect
                label="Категория продукта"
                :items="pricingRules.categories"
                v-model="defaultFormValues.category"
            />

            <BaseSelect
                label="Выбор цвета"
                :items="pricingRules.colors"
                v-model="defaultFormValues.color"
            />

            <BaseSelect
                label="Выбор локации"
                :items="pricingRules.locations"
                v-model="defaultFormValues.location"
            />
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'

interface DefaultFormValues {
    category: number
    color: number
    location: number
}

const defaultFormValues = ref<DefaultFormValues>({
    category: 1,
    color: 1,
    location: 1
})

const pricingRules = ref<PricingRules>({
    categories: [
        {id: 1, name: 'Электроника', type: 'markup', value: 5},
        {id: 2, name: 'Мебель', type: 'discount', value: 10},
        {id: 3, name: 'Одежда', type: 'none', value: 0},
    ],
    colors: [
        {id: 1, name: 'Белый', type: 'none', value: 0},
        {id: 2, name: 'Красный', type: 'markup', value: 3},
        {id: 3, name: 'Черный', type: 'none', value: 0}
    ],
    locations: [
        {id: 1, name: 'Киев', type: 'markup', value: 2},
        {id: 2, name: 'Львов', type: 'discount', value: 3},
        {id: 3, name: 'Одесса', type: 'none', value: 0}
    ]
})
</script>

<template>
    <div class="p-6 max-w-2xl mx-auto">
        <form class="space-y-4">
            <BaseSelect
                label="Категория продукта"
                :items="pricingRules.categories"
                v-model="defaultFormValues.category.value"
            />

            <BaseSelect
                label="Выбор цвета"
                :items="pricingRules.colors"
                v-model="defaultFormValues.color.value"
                v-model:subValue="defaultFormValues.color.option"
            />

            <BaseSelect
                label="Выбор локации"
                :items="pricingRules.locations"
                v-model="defaultFormValues.location.value"
            />
        </form>

        {{defaultFormValues.color}}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'

interface DefaultFormValue {
    value: number
    option?: number
}

interface DefaultFormValues {
    category: DefaultFormValue
    color: DefaultFormValue
    location: DefaultFormValue
}

const defaultFormValues = ref<DefaultFormValues>({
    category: {
        value: 1
    },
    color: {
        value: 1,
        option: 2,
    },
    location: {
        value: 1
    }
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
        {id: 3, name: 'Черный', type: 'none', value: 0, options: [
                {id: 1, name: 'S', type: 'none', value: 0},
                {id: 2, name: 'M', type: 'markup', value: 4},
                {id: 3, name: 'L', type: 'markup', value: 5},
            ]
        }
    ],
    locations: [
        {id: 1, name: 'Киев', type: 'markup', value: 2},
        {id: 2, name: 'Львов', type: 'discount', value: 3},
        {id: 3, name: 'Одесса', type: 'none', value: 0}
    ]
})
</script>

<template>
    <div class="p-6 max-w-2xl mx-auto">
        <form
            class="space-y-4"
            @submit.prevent="handleCalculate"
        >
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

            <div class="flex flex-col gap-2">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a quantity:</label>
                <input
                    v-model="defaultFormValues.quantity"
                    type="number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    min="1"
                    max="100"
                    value="1"
                />
            </div>

            <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Расчитать
            </button>
        </form>

        <div
            v-if="result"
            class="mt-6 border border-dashed p-4 rounded-lg"
        >
            <h3 class="font-bold mb-1">Результат:</h3>
            <ul>
                <li v-for="adj in result.adjustments" :key="adj.label">
                    {{ adj.label }} <span v-if="adj.value > 0">({{ adj.type === 'markup' ? '+' : '-' }}{{ adj.value }}%) → {{
                        adj.amount.toFixed(2)
                    }} грн</span>
                </li>
            </ul>
            <p>Цена за единицу: {{ result.unitPrice }} грн</p>
            <p>Стоимость: {{ result.totalPrice }} грн</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { pricingRules } from '@/config/pricingRules';
import { usePriceCalculator } from '@/composables/usePriceCalculator';

interface DefaultFormValue {
    value: number
    option?: number
}

interface DefaultFormValues {
    category: DefaultFormValue
    color: DefaultFormValue
    location: DefaultFormValue
    basePrice: number
    quantity: number
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
    },
    quantity: 1,
    basePrice: 100
})

const result = ref<ReturnType<ReturnType<typeof usePriceCalculator>['calculatePrice']> | null>(null);

const { calculatePrice } = usePriceCalculator();

const handleCalculate = () => {
    result.value = calculatePrice(
        {
            category: defaultFormValues.value.category.value,
            color: {
                value: defaultFormValues.value.color.value,
                option: defaultFormValues.value.color.option,
            },
            city: defaultFormValues.value.location.value,
            basePrice: defaultFormValues.value.basePrice,
            quantity: defaultFormValues.value.quantity,
            sellerId: 'VIP'
        }
    );
}
</script>

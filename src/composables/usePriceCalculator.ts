import { pricingRules } from '@/config/pricingRules';

interface CalculatePriceInput {
    basePrice: number
    quantity: number
    city: number
    category: number
    color: {
        value: number
        option?: number
    }
    sellerId: string
}

interface Adjustment {
    label: string
    value: number
    type: 'markup' | 'discount'
    amount: number
}

export function usePriceCalculator() {
    const calculatePrice = ({ basePrice, quantity, category, city, color, sellerId }: CalculatePriceInput) => {
        let finalUnitPrice = basePrice;
        const adjustments: Adjustment[] = [];

        const apply = (label: string, type: 'markup' | 'discount', value: number) => {
            let delta = 0;

            if (type === 'markup') {
                const newPrice = +(finalUnitPrice / (1 - value / 100));
                delta = newPrice - finalUnitPrice;
                finalUnitPrice = newPrice;
            } else {
                delta = (finalUnitPrice * value) / 100;
                finalUnitPrice -= delta;
            }

            adjustments.push({ label, type, value, amount: delta });
        };

        const catRule = pricingRules.categories.find(r => r.id === category);
        if (catRule) {
            apply(`Категория: ${catRule.name}`, catRule.type, catRule.value);
        }

        const colorRule = pricingRules.colors.find(r => r.id === color.value)
        if (colorRule) {
            apply(`Цвет: ${colorRule.name}`, colorRule.type, colorRule.value)

            const option = colorRule.options?.find(o => o.id === color.option)
            if (option) {
                apply(`Опция цвета: ${option.name}`, option.type, option.value)
            }
        }

        const locRule = pricingRules.locations.find(r => r.id === city);
        if (locRule) {
            apply(`Локация: ${locRule.name}`, locRule.type, locRule.value);
        }

        const sellerRule = pricingRules.sellers?.find(r => r.id === sellerId)
        if (sellerRule) {
            apply(`Скидка продавца`, sellerRule.type, sellerRule.value)
        }

        if (quantity > 10) {
            apply(`Объемная скидка (${quantity} шт.)`, 'discount', 5)
        }

        return {
            unitPrice: finalUnitPrice.toFixed(2),
            totalPrice: (finalUnitPrice * quantity).toFixed(2),
            adjustments,
        };
    };

    return { calculatePrice };
}

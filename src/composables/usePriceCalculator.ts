import { pricingRules } from '@/config/pricingRules';

interface CalculatePriceInput {
    basePrice: number
    quantity: number
    city: number
}

interface Adjustment {
    label: string
    value: number
    type: 'markup' | 'discount'
    amount: number
}

export function usePriceCalculator() {
    const calculatePrice = ({ basePrice, quantity, city }: CalculatePriceInput) => {
        let finalUnitPrice = basePrice;
        const adjustments: Adjustment[] = [];

        const apply = (label: string, type: 'markup' | 'discount', value: number) => {
            const delta = (basePrice * value) / 100;
            finalUnitPrice += type === 'markup' ? delta : -delta;
            adjustments.push({ label, type, value, amount: delta });
        };

        const locRule = pricingRules.locations.find(r => r.id === city);
        if (locRule) {
            apply(`Локация: ${locRule.name}`, locRule.type, locRule.value);
        }

        return {
            unitPrice: finalUnitPrice.toFixed(2),
            totalPrice: (finalUnitPrice * quantity).toFixed(2),
            adjustments,
        };
    };

    return { calculatePrice };
}

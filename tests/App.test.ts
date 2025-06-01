import { describe, it, expect } from 'vitest'
import { usePriceCalculator } from '@/composables/usePriceCalculator'

describe('usePriceCalculator', () => {
    const { calculatePrice } = usePriceCalculator()

    it('should apply category markup, color option markup, location discount, seller discount, and volume discount correctly', () => {
        const input = {
            basePrice: 1000,
            quantity: 12,
            category: 1,
            city: 2,
            color: {
                value: 3,
                option: 2
            },
            sellerId: 'VIP'
        }

        const result = calculatePrice(input)

        expect(result.unitPrice).toBeDefined()
        expect(result.totalPrice).toBeDefined()
        expect(result.adjustments.length).toBeGreaterThan(0)

        const labels = result.adjustments.map(a => a.label)
        expect(labels).toContain('Категория: Электроника')
        expect(labels).toContain('Опция цвета: M')
        expect(labels).toContain('Локация: Львов')
        expect(labels).toContain('Скидка продавца')
        expect(labels.find(l => l.includes('Объемная скидка'))).toBeTruthy()
    })
})
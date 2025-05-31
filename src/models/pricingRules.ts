type AdjustmentType = 'markup' | 'discount' | 'none'

interface PricingRuleItem {
    id: number
    name: string
    type: AdjustmentType
    value: number
    options?: PricingRuleItem
}

interface PricingRules {
    categories: PricingRuleItem[]
    colors: PricingRuleItem[]
    locations: PricingRuleItem[]
}
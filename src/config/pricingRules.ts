export const pricingRules = {
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
    ],
    sellers: [
        { id: 'VIP', type: 'discount', value: 2 }
    ]
}
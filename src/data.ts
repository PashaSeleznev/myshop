export type ItemType = {
    id: number,
    title: string,
    img: string,
    description: string,
    category: string,
    price: number,
    quantity?: number
}

export type ItemsType = ItemType[]

export const items: ItemsType = [
    {
        id: 1,
        title: 'Стул серый',
        img: '/src/images/grey-chair-img.jpg',
        description: 'Комфортный серый стул для кухни',
        category: ' chairs all ',
        price: 2000.99
    },
    {
        id: 2,
        title: 'Кресло белое',
        img: '/src/images/white-armchair-img.jpg',
        description: 'Мягкое кресло для вашей гостиной',
        category: ' armchairs all ',
        price: 7000.00
    },
    {
        id: 3,
        title: 'Стол коричневый',
        img: '/src/images/brown-table-img.jpg',
        description: 'Деревянный стол для большой семьи',
        category: ' tables all ',
        price: 21999.00
    },
    {
        id: 4,
        title: 'Кровать серая',
        img: '/src/images/grey-bed-img.jpg',
        description: 'Удобная двуспальная кровать',
        category: ' beds all ',
        price: 37000.00
    },
    {
        id: 5,
        title: 'Диван синий',
        img: '/src/images/blue-sofa-img.jpg',
        description: 'Большой диван для приятных вечеров у телевизора',
        category: ' sofas all ',
        price: 42000.00
    }
]
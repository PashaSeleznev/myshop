import { FC } from "react"

type CategoriesProps = {
  chooseCategory: (category: string) => void
}

const Categories: FC<CategoriesProps> = ({chooseCategory}) => {
  const categories = [
    {
        key: 'all',
        name: 'Все категории'
    },
    {
        key: 'chairs',
        name: 'Стулья'
    },
    {
        key: 'armchairs',
        name: 'Кресла'
    },
    {
      key: 'tables',
      name: 'Столы'
    },
    {
      key: 'beds',
      name: 'Кровати'
    },
    {
      key: 'sofas',
      name: 'Диваны'
    },

  ] 
  return (
    <div className="categories">
        {categories.map(el => (
            <div key={el.key} onClick={() => chooseCategory(el.key)}>{el.name}</div>
        ))}
    </div>
  )
}

export default Categories
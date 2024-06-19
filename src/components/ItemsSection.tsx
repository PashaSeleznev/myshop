import Item from './Item';
import { useState, useEffect, FC } from 'react';
import { ItemsType, ItemType } from '../data';

export type ItemsSectionProps = {
  items: ItemsType,
  onAdd: (item: ItemType) => void,
  onShowItem: (item: ItemType) => void,
  inAccount: boolean
}

const ItemsSection: FC<ItemsSectionProps> = ({items, onAdd, onShowItem, inAccount}) => {
  const [empty, setEmpty] = useState<boolean>(false)

  useEffect(() => {
    if (items.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [items]);

  return (
    <main>
        {items.map(item => ( 
            <Item 
            key={item.id}
            item = {item}
            onAdd = {onAdd} 
            onShowItem = {onShowItem}
            inAccount = {inAccount}
            />
        ))}

        {empty && <p>По вашему запросу ничего не найдено.</p>}
    </main>
  )
}

export default ItemsSection
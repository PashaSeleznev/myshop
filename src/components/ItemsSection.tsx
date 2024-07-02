import Item from './Item';
import { useState, useEffect, FC} from 'react';
import { ItemType } from '../data';
import { useSelector } from 'react-redux';
import { RootStateType } from '../reduxStore';

export type ItemsSectionProps = {
  onAdd: (item: ItemType) => void,
  onShowItem: (item: ItemType) => void,
  inAccount: boolean
}

const ItemsSection: FC<ItemsSectionProps> = ({onAdd, onShowItem, inAccount}) => {

  const items = useSelector((state: RootStateType) => state.filter.currentItems)

  const [empty, setEmpty] = useState<boolean>(false)
  console.log('ItemsSection')
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
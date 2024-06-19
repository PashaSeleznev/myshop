import ToLoginModal from './ToLoginModal';
import { FC, useState } from 'react';
import { ItemsSectionProps } from './ItemsSection';
import { ItemType } from '../data';

type ItemProps = {item: ItemType} & Omit<ItemsSectionProps, 'items'>

const Item: FC<ItemProps> = ({item, onAdd, onShowItem, inAccount}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const handleAddClick = () => {
    if (!inAccount) {
      setIsModalOpen(true);
    } else {
      onAdd(item);
    }
  };

  function closeModal () {
    setIsModalOpen(false)
  }

  return (
    <div className="item">
        {isModalOpen && <ToLoginModal closeModal={closeModal} />}
        <img src={item.img} alt="" onClick={() => onShowItem(item)} />
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <b>{item.price} RUB</b>
        <div className="add-to-cart" onClick={handleAddClick}>+</div>
    </div>
  )
}

export default Item
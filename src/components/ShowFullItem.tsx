import { FC, useState } from 'react';
import ToLoginModal from './ToLoginModal';
import { ItemsSectionProps } from './ItemsSection';
import { ItemType } from '../data';

type ShowFullItemProps = {item: ItemType | null } & Omit<ItemsSectionProps, 'items'> & {closeItem: () => void}

const ShowFullItem: FC<ShowFullItemProps> = ({item, onShowItem, onAdd, closeItem, inAccount}) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleAddClick = () => {
    if (!inAccount && item) {
      setIsModalOpen(true);
    } else if (item) {
      onAdd(item);
    }
  };

  function closeModal () {
    setIsModalOpen(false)
  }

  return (
    <div className='full-item'>
        {item && (
        <div>
          {isModalOpen && <ToLoginModal closeModal={closeModal} />}
          <div className="close" onClick={closeItem}>Закрыть</div>
          <img src={item.img} alt={item.title} onClick={() => onShowItem(item)} />
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <b>{item.price} RUB</b>
          <div className="add-to-cart" onClick={handleAddClick}>+</div>
        </div>
      )}
    </div>
  )
}

export default ShowFullItem
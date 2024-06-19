import { MainPageProps } from './MainPage';
import { FC } from 'react';

type AgreeToDeleteProps = Pick<MainPageProps, 'handleCancel'|'handleDelete'>

const AgreeToDelete: FC<AgreeToDeleteProps> = ({handleCancel, handleDelete}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Вы уверены, что хотите удалить товар из корзины?</h3>
        <button onClick={handleCancel}>Отмена</button>
        <button onClick={handleDelete}>Удалить</button>
      </div>
    </div>
  )
}

export default AgreeToDelete
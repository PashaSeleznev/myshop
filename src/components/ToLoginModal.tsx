import { FC } from 'react';
import { Link} from "react-router-dom";

type closeModalProps = {
  closeModal: () => void
}

const ToLoginModal: FC<closeModalProps> = ({closeModal}) => {  
  return (
    <div className="modal">
        <div className="modal-login">
            <h3>Вы не вошли в аккаунт!</h3>
            <p><Link 
              className='account-link'
              to = '/account'
            >Перейдите в личный кабинет для авторизации.</Link></p>
            <button onClick={() => closeModal()}>Закрыть</button>
        </div>
    </div>
  );
}

export default ToLoginModal

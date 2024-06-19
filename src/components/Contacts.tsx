import AgreeToDelete from "./AgreeToDelete"
import MyMap from "./MyMap";
import { MainPageProps } from "./MainPage";
import { FC } from "react";

export type ContactsProps = Pick<MainPageProps, 'handleCancel'|'handleDelete'|'showDeleteModal'>

const Contacts: FC<ContactsProps> = ({showDeleteModal, handleCancel, handleDelete}) => {
  return (
    <div className="contacts">
      <h2>Наши контакты:</h2>
      <p>Адрес электронной почты: HouseStaff@mail.ru</p>
      <p>Номер телефона: 89210550495</p>
      <p>Адрес: Вологодская обл., г. Череповец, ул. Белинского, 1Г</p>
      <MyMap center = {[59.117786, 37.949123]} zoom = {15} />
      {showDeleteModal && 
      <AgreeToDelete 
        handleCancel = {handleCancel}
        handleDelete = {handleDelete}
      />}
    </div>
  )
}

export default Contacts

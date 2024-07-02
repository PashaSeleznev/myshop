import { FC } from "react";
import MainContainer from "../containers/MainContainer";
import { ItemType } from "../data";

export type MainPageProps = {
    addToOrder: (item: ItemType) => void,
    handleCancel: () => void,
    handleDelete: () => void,
    showDeleteModal: boolean,
    inAccount: boolean
  }

const MainPage: FC<MainPageProps> = ({
    addToOrder,
    handleCancel,
    handleDelete,
    showDeleteModal,
    inAccount
}) => (
    <MainContainer 
        addToOrder = {addToOrder}
        handleCancel = {handleCancel}
        handleDelete = {handleDelete}
        showDeleteModal = {showDeleteModal}
        inAccount = {inAccount}
    />
)

export default MainPage
import { FC } from "react";
import { MainPageProps } from "./MainPage";
import ContactsContainer from "../containers/ContactsContainer";

export type ContactsPageProps = Pick<MainPageProps, 'handleCancel'|'handleDelete'|'showDeleteModal'>

const ContactsPage: FC<ContactsPageProps> = ({
    handleCancel,
    handleDelete,
    showDeleteModal
}) => (
    <ContactsContainer
        handleCancel = {handleCancel}
        handleDelete = {handleDelete}
        showDeleteModal = {showDeleteModal}
    />
)

export default ContactsPage
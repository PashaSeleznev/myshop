import { FC } from "react";
import AccountContainer from "../containers/AccountContainer";
import { ContactsPageProps } from "./ContactsPage";

export type AccountPageProps = ContactsPageProps & {toLogin: (status: boolean) => void}

const AccountPage: FC<AccountPageProps> = ({
    handleCancel,
    handleDelete,
    showDeleteModal,
    toLogin
}) => (
    <AccountContainer
        handleCancel = {handleCancel}
        handleDelete = {handleDelete}
        showDeleteModal = {showDeleteModal}
        toLogin = {toLogin}
    />
)

export default AccountPage
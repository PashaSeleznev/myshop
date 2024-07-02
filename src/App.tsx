import Header from "./components/Header"
import Footer from "./components/Footer"
import { useState} from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ContactsPage from "./pages/ContactsPage";
import AccountPage from "./pages/AccountPage";
import { Provider } from "react-redux"
import {reduxStore} from "./reduxStore";
import { ItemType } from "./data";
import store from "store";


const App = () => {
  const [inAccount, setInAccount] = useState<boolean>(store.get('inAccount') || false)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);

  const addToOrder = (item: ItemType) => {
    reduxStore.dispatch({ type: "ADD_TO_ORDER", payload: item });
  };

  const deleteOrder = (id: ItemType["id"]) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    reduxStore.dispatch({ type: "DELETE_ORDER", payload: deleteItemId });
    setShowDeleteModal(false);
    setDeleteItemId(0);
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
    setDeleteItemId(0);
  };

  const plus = (id: ItemType["id"]) => {
    reduxStore.dispatch({ type: "INCREMENT_QUANTITY", payload: id });
  };

  const minus = (id: ItemType["id"]) => {
    const item = reduxStore.getState().shopCart.orders.find((el: ItemType) => el.id === id);
    if (item && item.quantity === 1) {
      deleteOrder(id);
    } else {
      reduxStore.dispatch({ type: "DECREMENT_QUANTITY", payload: id });
    }
  };

  const toLogin = (status: boolean) => {
        setInAccount(status);
        store.set('inAccount', status);
      }

  return (
    <Provider store = {reduxStore}>
      <Router>
      <div className="wrapper">
        <Header  
        inAccount = {inAccount}
        deleteOrder = {deleteOrder} 
        plus = {plus} 
        minus = {minus} >
        </Header>
        <Routes> 
          
          <Route path="/"
          element={
            <MainPage 
            addToOrder = {addToOrder}
            handleCancel = {handleCancel}
            handleDelete = {handleDelete}
            showDeleteModal = {showDeleteModal}
            inAccount = {inAccount}
            />
          } />

          <Route path="/contacts" 
          element = {
            <ContactsPage 
            handleCancel = {handleCancel}
            handleDelete = {handleDelete}
            showDeleteModal = {showDeleteModal}
            />
          }/>

          <Route path="/account" 
          element = {
            <AccountPage 
            handleCancel = {handleCancel}
            handleDelete = {handleDelete}
            showDeleteModal = {showDeleteModal}
            toLogin = {toLogin}
            />
          }/>

        </Routes> 
        <Footer></Footer>
      </div>
      </Router>
    </Provider>
  )
}

export default App

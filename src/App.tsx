import MainPage from "./components/MainPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useState, useEffect} from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contacts from "./components/Contacts"
import Account from "./components/Account"
import store from "store"
import { ItemType, ItemsType } from "./data";


function App() {
  const storedOrders: ItemsType | [] = store.get('orders') || [];
  const [orders, setOrders] = useState<ItemsType | []>(storedOrders)
  const [inAccount, setInAccount] = useState<boolean>(store.get('inAccount') || false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [deleteItemId, setDeleteItemId] = useState<number>(0)

  useEffect(() => {
    store.set('orders', orders);
  }, [orders]); 

  function addToOrder (item: ItemType) {
    if (inAccount) {
      let isInArray = false
    const updatedOrders: ItemsType = orders.map ((el: ItemType) => {
      if (el.id === item.id) {
        isInArray = true
        return {...el, quantity: (el.quantity ?? 0) + 1}
      }
      return el
    })
    if (!isInArray) {
      setOrders([...orders, {...item, quantity: 1}])
    } else {
      setOrders(updatedOrders)
    }
    } else {
      console.log('Не вошел')
    }
  }

  function deleteOrder (id: ItemType['id']) {
    setDeleteItemId(id)
    setShowDeleteModal(true)
  }

  function handleDelete () {
    const filteredOrders: ItemsType = orders.filter((el) => (
      el.id !== deleteItemId
    ))
    setShowDeleteModal(false)
    setOrders(filteredOrders)
  }

  function handleCancel () {
    setShowDeleteModal(false)
    setDeleteItemId(0)
  }

  function plus (id: ItemType['id']) {
    const updatedOrders = orders.map (el => {
      if (el.id === id) {
        return {...el, quantity: (el.quantity ?? 0) + 1}
      }
      return el
    })
    setOrders(updatedOrders)
  }

  function minus (id: ItemType['id']) {
    let remove = false
    const updatedOrders = orders.map (el => {
      if (el.id === id) {
        if (el.quantity == 1) {
          remove = true
        }
        return {...el, quantity: (el.quantity ?? 0) - 1}
      }
      return el
    })
    if (remove) {
      deleteOrder(id)
    } else {
      setOrders(updatedOrders)
    }
  }

  function toLogin (status: boolean) {
    setInAccount(status);
    store.set('inAccount', status);
  }


  return (
    <Router>
      <div className="wrapper">
        <Header 
        orders = {orders} 
        onDelete = {deleteOrder} 
        plus = {plus} 
        minus = {minus}
        inAccount = {inAccount} ></Header>
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
            <Contacts 
            handleCancel = {handleCancel}
            handleDelete = {handleDelete}
            showDeleteModal = {showDeleteModal}
            />
          }/>

          <Route path="/account" 
          element = {
            <Account 
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
  )
}

export default App

import ItemsSection from "./ItemsSection"
import Categories from "./Categories"
import ShowFullItem from "./ShowFullItem"
import AgreeToDelete from "./AgreeToDelete"
import { ItemsType, items } from "../data"
import Search from "./Search";
import { useState, useEffect, FC } from "react";
import store from "store"
import { ItemType } from "../data"

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
}) => {
  
  const [showFullItem, setShowFullItem] = useState<boolean>(false) 
  const [fullItem, setFullItem] = useState<ItemType | null>(null)
  const newItems: ItemsType = items.map(item => ({ ...item, quantity: 0 }));
  const storedCurrentItems: ItemsType = store.get('currentItems') || newItems
  const [currentItems, setCurrentItems] = useState<ItemsType | []>(storedCurrentItems)
  const [filteredByCategory, setFilteredByCategory] = useState<ItemsType | []>(newItems)

  useEffect(() => {
    store.set('currentItems', currentItems);
  }, [currentItems]);

  function onShowItem (item: ItemType) {
    setFullItem(item)
    setShowFullItem(true)
  }

  function closeItem () {
    setShowFullItem(!showFullItem)
  }

  function chooseCategory (category: string) {
    const filteredItems:ItemsType | null = newItems.filter((el) => (
      el.category.includes(' ' + category + ' ')
    ))
    setCurrentItems(filteredItems)
    setFilteredByCategory(filteredItems)
  }
  
  function findItem (text: string) {
    const value = text.toLowerCase()
    const filteredItems = filteredByCategory.filter((el) => (
      el.title.toLowerCase().includes(value)
    ))
    setCurrentItems(filteredItems)
  }

  return (
    <>
      <Categories chooseCategory = {chooseCategory}/>
      <Search findItem = {findItem}/>
      <ItemsSection items = {currentItems} onAdd = {addToOrder} onShowItem = {onShowItem} inAccount = {inAccount} ></ItemsSection>
      {showFullItem && <ShowFullItem item = {fullItem} onAdd = {addToOrder} onShowItem = {onShowItem} closeItem = {closeItem} inAccount = {inAccount} />}
      {showDeleteModal && 
      <AgreeToDelete 
        handleCancel = {handleCancel}
        handleDelete = {handleDelete}
      />}
    </>
  )
}

export default MainPage
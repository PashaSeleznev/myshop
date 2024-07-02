import ItemsSection from "../components/ItemsSection"
import Categories from "../components/Categories"
import ShowFullItem from "../components/ShowFullItem"
import AgreeToDelete from "../components/AgreeToDelete"
import Search from "../components/Search";
import { useState, FC, useCallback } from "react";
import { ItemType } from "../data"
import { reduxStore } from "../reduxStore"
import { MainPageProps } from "../pages/MainPage";

const MainContainer: FC<MainPageProps> = ({
    addToOrder,
    handleCancel,
    handleDelete,
    showDeleteModal,
    inAccount
}) => {


  const [showFullItem, setShowFullItem] = useState<boolean>(false) 
  const [fullItem, setFullItem] = useState<ItemType | null>(null)

  function onShowItem (item: ItemType) {
    setFullItem(item)
    setShowFullItem(true)
  }

  function closeItem () {
    setShowFullItem(!showFullItem)
  }

  const chooseCategory = useCallback((category: string) => {
    reduxStore.dispatch({ type: "CHOOSE_CATEGORY", payload: category });
  }, [])
  
  const findItem = useCallback((text: string) => {
    reduxStore.dispatch({ type: "FIND_ITEM", payload: text });
  }, [])

  return (
    <>
      <Categories chooseCategory = {chooseCategory}/>
      <Search findItem = {findItem}/>
      <ItemsSection onAdd = {addToOrder} onShowItem = {onShowItem} inAccount = {inAccount} ></ItemsSection>
      {showFullItem && <ShowFullItem item = {fullItem} onAdd = {addToOrder} onShowItem = {onShowItem} closeItem = {closeItem} inAccount = {inAccount} />}
      {showDeleteModal && 
      <AgreeToDelete 
        handleCancel = {handleCancel}
        handleDelete = {handleDelete}
      />}
    </>
  )
}

export default MainContainer
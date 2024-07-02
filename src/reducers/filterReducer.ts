import { ActionType } from "./actionType";
import { ItemsType, items } from "../data"

const newItems: ItemsType = items.map(item => ({ ...item, quantity: 0 }));

const initialState = {
    currentItems: newItems,
    filteredByCategory: newItems,
    input: '',
  }

export const filterReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "CHOOSE_CATEGORY": {
            const category = action.payload
            const filteredItems:ItemsType | null = newItems.filter((el) => (
              el.category.includes(' ' + category + ' ')
            ))
            return {
              ...state,
              currentItems: filteredItems,
              filteredByCategory: filteredItems
            }
          }
      
          case "FIND_ITEM": {
            const value = action.payload.toLowerCase()
            const filteredItems = state.filteredByCategory.filter((el) => (
              el.title.toLowerCase().includes(value)
            ))
              return {
                ...state,
                currentItems: filteredItems,
              }
          }
          
          case "INPUT_CHANGE": {
            return {
              ...state,
              input: action.payload
            }
          }
      
          default:
            return state;
    }
}
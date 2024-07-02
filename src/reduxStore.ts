import { configureStore } from "@reduxjs/toolkit";
import { ItemType, ItemsType, items } from "./data";

type ActionType =
  | { type: 'ADD_TO_ORDER'; payload: ItemType }
  | { type: 'DELETE_ORDER'; payload: number }
  | { type: 'INCREMENT_QUANTITY'; payload: number }
  | { type: 'DECREMENT_QUANTITY'; payload: number }
  | { type: 'CHOOSE_CATEGORY'; payload: string }
  | { type: 'FIND_ITEM'; payload: string }
  | { type: 'INPUT_CHANGE'; payload: string }

export type RootStateType = ReturnType<typeof reduxStore.getState>;

const newItems: ItemsType = items.map(item => ({ ...item, quantity: 0 }));

const initialState = {
  orders: <ItemsType>[],
  currentItems: newItems,
  filteredByCategory: newItems,
  filter: '',
}

const rootReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "ADD_TO_ORDER": {
      const item = action.payload;
      const isInArray = state.orders.some((el: ItemType) => el.id === item.id);
      if (isInArray) {
        return {
          ...state,
          orders: state.orders.map((el: ItemType) =>
            el.id === item.id
              ? { ...el, quantity: (el.quantity ?? 0) + 1 }
              : el
          ),
        };
      } else {
        return {
          ...state,
          orders: [...state.orders, { ...item, quantity: 1 }],
        };
      }
    }

    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((el: ItemType) => el.id !== action.payload),
      };

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        orders: state.orders.map((el: ItemType) =>
          el.id === action.payload
            ? { ...el, quantity: (el.quantity ?? 0) + 1 }
            : el
        ),
      };

    case "DECREMENT_QUANTITY":
      return {
        ...state,
        orders: state.orders.map((el: ItemType) =>
          el.id === action.payload
            ? { ...el, quantity: (el.quantity ?? 0) - 1 }
            : el
        ),
      };

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
        filter: action.payload
      }
    }

    default:
      return state;
  }
}

export const reduxStore = configureStore({
  reducer: rootReducer
})

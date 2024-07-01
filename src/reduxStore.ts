import { configureStore } from "@reduxjs/toolkit";
import { ItemType, ItemsType } from "./data";

type ActionType =
  | { type: 'ADD_TO_ORDER'; payload: ItemType }
  | { type: 'DELETE_ORDER'; payload: number }
  | { type: 'INCREMENT_QUANTITY'; payload: number }
  | { type: 'DECREMENT_QUANTITY'; payload: number }

export type RootStateType = ReturnType<typeof reduxStore.getState>;

const initialState = {
  orders: [] as ItemsType,
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

    default:
      return state;
  }
}

export const reduxStore = configureStore({
  reducer: rootReducer
})

import { ItemType } from "../data";

export type ActionType =
  | { type: 'ADD_TO_ORDER'; payload: ItemType }
  | { type: 'DELETE_ORDER'; payload: number }
  | { type: 'INCREMENT_QUANTITY'; payload: number }
  | { type: 'DECREMENT_QUANTITY'; payload: number }
  | { type: 'CHOOSE_CATEGORY'; payload: string }
  | { type: 'FIND_ITEM'; payload: string }
  | { type: 'INPUT_CHANGE'; payload: string }
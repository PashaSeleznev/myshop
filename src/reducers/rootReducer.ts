import { shopCartReducer } from "./shopCartReducer";
import { filterReducer } from "./filterReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers ({
    shopCart: shopCartReducer,
    filter: filterReducer
})
import {combineReducers} from "redux";
import {catalogReducer} from "./catalogReducer";
import {appReducer} from "./appReducer";

export const rootReducer = combineReducers(
    {
        app: appReducer,
        catalog: catalogReducer
    }
);
